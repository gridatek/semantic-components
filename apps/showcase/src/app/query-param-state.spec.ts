import { Component, inject } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { Router, provideRouter } from '@angular/router';
import {
  injectQueryParam,
  parseAsInteger,
  parseAsString,
} from '@semantic-components/ui-lab';

@Component({ template: '' })
class TwoCallSites {
  readonly a = injectQueryParam('q', parseAsString.withDefault(''));
  readonly b = injectQueryParam('q', parseAsString.withDefault(''));
  readonly router = inject(Router);
}

@Component({ template: '' })
class Truncating {
  readonly page = injectQueryParam('page', parseAsInteger.withDefault(1));
}

async function mount<T>(type: new () => T, url = '/'): Promise<T> {
  TestBed.configureTestingModule({
    providers: [provideRouter([{ path: '**', children: [] }])],
  });
  await TestBed.inject(Router).navigateByUrl(url);
  return TestBed.createComponent(type).componentInstance;
}

/** Run effects, then let the service's microtask batch and the router settle. */
async function settle(): Promise<void> {
  TestBed.tick();
  for (let i = 0; i < 5; i++) await Promise.resolve();
  await new Promise((resolve) => setTimeout(resolve, 0));
}

describe('injectQueryParam', () => {
  it('seeds both call sites for a key from the URL', async () => {
    const c = await mount(TwoCallSites, '/?q=hello');
    expect(c.a.value()).toBe('hello');
    expect(c.b.value()).toBe('hello');
  });

  it('propagates a write to a sibling call site synchronously', async () => {
    const c = await mount(TwoCallSites, '/?q=hello');

    c.a.set('world');

    // No tick: the linkedSignal `set` interceptor publishes to the shared raw
    // value during the write itself, not on the next change detection.
    expect(c.b.value()).toBe('world');
  });

  it('propagates clear() to a sibling call site synchronously', async () => {
    const c = await mount(TwoCallSites, '/?q=hello');

    c.a.clear();

    expect(c.b.value()).toBe('');
  });

  it('propagates a write made through the exposed signal', async () => {
    const c = await mount(TwoCallSites, '/?q=hello');

    c.a.value.set('direct');

    expect(c.b.value()).toBe('direct');
  });

  it('reflects external navigation into every call site', async () => {
    const c = await mount(TwoCallSites, '/?q=hello');

    await c.router.navigateByUrl('/?q=external');
    TestBed.tick();

    expect(c.a.value()).toBe('external');
    expect(c.b.value()).toBe('external');
  });

  it('projects the value onto the URL', async () => {
    const c = await mount(TwoCallSites, '/?q=hello');

    c.a.set('world');
    await settle();

    expect(c.router.url).toContain('q=world');
  });

  it('strips the param from the URL on clear()', async () => {
    const c = await mount(TwoCallSites, '/?q=hello');

    c.a.clear();
    await settle();

    expect(c.router.url).not.toContain('q=');
  });

  it('corrects a value the parser cannot round-trip', async () => {
    const c = await mount(Truncating, '/?page=2');

    c.page.set(3.7);

    expect(c.page.value()).toBe(3);
  });

  it('corrects even when the serialised form already matches the URL', async () => {
    const c = await mount(Truncating, '/?page=3');

    c.page.set(3.7);

    expect(c.page.value()).toBe(3);
  });
});

@Component({ template: '' })
class Debounced {
  readonly q = injectQueryParam(
    'q',
    parseAsString.withDefault('').withOptions({ debounceMs: 300 }),
  );
  readonly router = inject(Router);
}

describe('debounce vs back navigation', () => {
  it('does not resurrect a pending write after the URL changes', async () => {
    const c = await mount(Debounced, '/?q=one');

    // Type, then navigate before the debounce window closes.
    c.q.set('typed');
    await c.router.navigateByUrl('/?q=two');
    TestBed.tick();

    await new Promise((r) => setTimeout(r, 400));
    await settle();

    expect(c.router.url).toContain('q=two');
    expect(c.q.value()).toBe('two');
  });
});
