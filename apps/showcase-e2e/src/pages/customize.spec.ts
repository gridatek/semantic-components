import { expectNoA11yViolations } from '../axe';
import { fromOtherSite } from '../interaction';
import { expect, test } from '../test';

test.describe('Customize Page', () => {
  // The largest page: in Firefox and WebKit, beside the other workers, it
  // takes more than the 5 s of an expect to show, and its tests more than 30 s.
  // (In a beforeEach: test.slow(callback) at the describe level marks the test
  // slow without tripling its timeout.)
  test.beforeEach(({ browserName }) => {
    test.slow(browserName !== 'chromium');
  });

  // One after the other, in one worker (Nx's style runs a file's tests side
  // by side): four of this page at once, beside other pages, froze WebKit's
  // pages for more than the 90 s of a test. 'default', not 'serial': a
  // failure doesn't skip the rest.
  test.describe.configure({ mode: 'default' });

  // To show, and to close (its leave animation, on WebKit's lagging clock).
  const shown = { timeout: 30_000 };

  test('the style card picks a style, which reloads in it', async ({
    page,
  }) => {
    await page.goto('/customize');
    const style = page.getByRole('button', { name: /Style/ });
    await expect(style).toContainText('nova', { ignoreCase: true, ...shown });
    // The options still to come are there, not usable yet.
    await expect(
      page.getByRole('button', { name: /Base Color/ }),
    ).toBeDisabled();
    await style.click();
    await expect(
      page.getByRole('menuitemradio', { name: 'Nova' }),
    ).toHaveAttribute('aria-checked', 'true');
    await page.getByRole('menuitemradio', { name: 'Maia' }).click();
    // The page loads again, in it: a heavy page, slower in Firefox and WebKit.
    await expect(style).toContainText('maia', { ignoreCase: true, ...shown });
    await expect(
      page.getByRole('heading', { name: 'Contribution History' }),
    ).toBeVisible();
  });

  test("the demos' placeholder links stay on this page (a bare # is the home page's)", async ({
    page,
  }) => {
    await page.goto('/customize');
    await expect(
      page.getByRole('link', { name: 'email settings' }),
    ).toBeVisible(shown);
    // Every link of the page's content that would leave for the home page.
    await expect
      .poll(() =>
        page
          .locator('main a[href]')
          .evaluateAll((links) =>
            (links as HTMLAnchorElement[])
              .filter((a) => a.pathname === '/')
              .map(
                (a) => `${a.textContent?.trim()} (${a.getAttribute('href')})`,
              ),
          ),
      )
      .toEqual([]);
  });

  test("shadcn's Create demos, both pages, at work", async ({ page }) => {
    const messages: string[] = [];
    page.on('console', (m) => {
      // The avatars are GitHub's, as in shadcn's demos.
      if (fromOtherSite(m, page)) return;
      if (m.type() === 'warning' || m.type() === 'error')
        messages.push(m.text().split('\n')[0]);
    });
    await page.goto('/customize');
    // A card from each page of shadcn's preview.
    await expect(
      page.getByRole('heading', { name: 'Recent Transactions' }),
    ).toBeVisible(shown);
    await expect(
      page.getByRole('heading', { name: 'Invoice #INV-2847' }),
    ).toBeVisible();
    // The scenes set the sliders; off disables them.
    const kitchen = page.locator('app-preview-kitchen-island');
    await kitchen.getByRole('button', { name: 'Nightlight' }).click();
    await expect(
      kitchen.getByRole('slider', { name: 'Brightness' }),
    ).toHaveValue('15', shown);
    await kitchen.getByRole('switch', { name: 'Kitchen Island' }).click();
    await expect(
      kitchen.getByRole('slider', { name: 'Brightness' }),
    ).toBeDisabled(shown);
    // Its dialog opens on its first field and closes. Focus in it before the
    // key: WebKit on CI still opens it when the key would come.
    await page.getByRole('button', { name: 'Share Feedback' }).click();
    await expect(page.getByRole('dialog')).toBeVisible(shown);
    await expect
      .poll(
        () =>
          page.evaluate(
            () => !!document.activeElement?.closest('[role=dialog]'),
          ),
        shown,
      )
      .toBe(true);
    await page.keyboard.press('Escape');
    await expect(page.getByRole('dialog')).toHaveCount(0, shown);
    expect(messages).toEqual([]);
  });

  test('Live Audio Waveform: draws while on screen, the page idle otherwise', async ({
    page,
  }) => {
    // Every animation frame asked for, counted.
    await page.addInitScript(() => {
      const w = window as unknown as { frames: number };
      w.frames = 0;
      const ask = window.requestAnimationFrame.bind(window);
      window.requestAnimationFrame = (callback) => {
        w.frames++;
        return ask(callback);
      };
    });
    const frames = () =>
      page.evaluate(() => (window as unknown as { frames: number }).frames);
    await page.goto('/customize');
    const waveform = page.getByRole('img', { name: 'Processing audio' });
    await expect(waveform).toBeAttached(shown);
    await expect(waveform).not.toBeInViewport();
    // Off screen, still processing: no frame drawn (a page of thousands of
    // elements laid out each frame froze WebKit on a busy runner). Once the
    // charts' entrance has played: a second with the page's own frames once
    // in a while, not one a frame.
    await expect
      .poll(async () => {
        const before = await frames();
        await page.waitForTimeout(1000); // eslint-disable-line playwright/no-wait-for-timeout
        return (await frames()) - before;
      }, shown)
      .toBeLessThan(5);
    // On screen: the wave moves.
    await waveform.scrollIntoViewIfNeeded();
    await expect
      .poll(async () => {
        const before = await frames();
        await page.waitForTimeout(500); // eslint-disable-line playwright/no-wait-for-timeout
        return (await frames()) - before;
      }, shown)
      .toBeGreaterThan(5);
    await expect
      .poll(() =>
        waveform.locator('canvas').evaluate((canvas: HTMLCanvasElement) => {
          const ctx = canvas.getContext('2d');
          if (!ctx || !canvas.width) return 0;
          const { data } = ctx.getImageData(0, 0, canvas.width, canvas.height);
          let painted = 0;
          for (let i = 3; i < data.length; i += 4) if (data[i]) painted++;
          return painted;
        }),
      )
      .toBeGreaterThan(0);
  });

  test('no accessibility violations, light and dark', async ({ page }) => {
    // The largest page, checked twice: more than 30 s on CI in Firefox and
    // WebKit (slow there, above).
    await page.goto('/customize');
    await expectNoA11yViolations(page);
    await expectNoA11yViolations(page, { dark: true });
  });

  test('Nova, Sleep Report: each stack rounded at its top, whichever stage is there', async ({
    page,
    baseURL,
  }) => {
    await page.context().addCookies([
      {
        name: 'sc-style',
        value: 'nova',
        url: baseURL ?? 'http://localhost:4200',
      },
    ]);
    await page.goto('/customize');
    const plot = page.getByRole('group', {
      name: 'Sleep stages by hour, 10pm to 6am',
    });
    await plot.waitFor({ state: 'attached', ...shown });
    // Seen, it enters: scrolled to, as a reader would.
    await plot.scrollIntoViewIfNeeded();
    await expect(plot).toBeVisible();
    // Per hour, the topmost drawn segment (the highest on screen): rounded.
    await expect
      .poll(
        () =>
          plot.evaluate((svg) => {
            const tops = new Map<string, { y: number; rx: string }>();
            for (const box of svg.querySelectorAll(
              '[data-slot=chart-bar] > svg',
            )) {
              const height = Number(box.getAttribute('height'));
              if (height <= 0) continue;
              const x = box.getAttribute('x') ?? '';
              const y = Number(box.getAttribute('y'));
              const rect = box.querySelector('rect');
              const rx = rect ? getComputedStyle(rect).rx : '0px';
              const top = tops.get(x);
              if (!top || y < top.y) tops.set(x, { y, rx });
            }
            // Square: no rx (auto) or 0px.
            return [...tops.values()].map((top) => parseFloat(top.rx) > 0);
          }),
        shown,
      )
      .toEqual([true, true, true, true, true, true, true, true, true]);
  });

  test('Weekly Fitness Summary: a bar chart — each day out of 100, its load on hover or with the keys', async ({
    page,
  }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.goto('/customize');
    const plot = page.getByRole('group', {
      name: 'Workout load by day, Monday to Sunday',
    });
    await plot.waitFor({ state: 'attached', ...shown });
    await plot.scrollIntoViewIfNeeded();
    // A bar per day, each over its track (the whole 0 to 100).
    const chart = page.locator('[data-slot=chart]', { has: plot });
    await expect(chart.locator('[data-slot=chart-bar] > svg')).toHaveCount(7);
    await expect(chart.locator('[data-slot=chart-bar] > rect')).toHaveCount(7);
    // Out of 100, not of the week's best day: Friday (91) short of its track.
    const friday = await chart.evaluate((element) => {
      const bar = element.querySelectorAll('[data-slot=chart-bar] > svg')[4];
      const track = element.querySelectorAll('[data-slot=chart-bar] > rect')[4];
      return (
        Number(bar.getAttribute('height')) /
        Number(track.getAttribute('height'))
      );
    });
    expect(friday).toBeCloseTo(0.91, 2);
    // The days' initials on top; their loads said by the tooltip.
    await expect(
      chart.locator('[data-slot=chart-category-axis] text').first(),
    ).toHaveText('M');
    // Focused again until it answers: on CI (WebKit, the largest page) the
    // first focus may come before the chart listens (still hydrating).
    const tooltip = page.locator('[data-slot=chart-tooltip]');
    await expect(async () => {
      await plot.blur();
      await plot.focus();
      await expect(tooltip).toContainText('Monday', { timeout: 2000 });
    }).toPass(shown);
    await expect(tooltip).toContainText('84%');
  });
});
