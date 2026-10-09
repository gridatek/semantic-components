import { Component, signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { ScIntersectionObserver } from '@semantic-components/ui-lab';

/** Minimal stand-in, since jsdom has no IntersectionObserver. */
class FakeIntersectionObserver {
  static instances: FakeIntersectionObserver[] = [];

  disconnected = false;

  constructor(
    readonly callback: IntersectionObserverCallback,
    readonly options: IntersectionObserverInit,
  ) {
    FakeIntersectionObserver.instances.push(this);
  }

  observe(): void {
    // noop
  }

  disconnect(): void {
    this.disconnected = true;
  }

  fire(isIntersecting: boolean): void {
    const entry = {
      isIntersecting,
      intersectionRatio: isIntersecting ? 1 : 0,
    } as IntersectionObserverEntry;
    this.callback([entry], this as unknown as IntersectionObserver);
  }
}

@Component({
  imports: [ScIntersectionObserver],
  template: `
    <div
      scIntersectionObserver
      [once]="once()"
      [rootMargin]="rootMargin()"
      (intersectionObserver)="entries.push($event)"
    ></div>
  `,
})
class Host {
  readonly once = signal(false);
  readonly rootMargin = signal('0px');
  readonly entries: IntersectionObserverEntry[] = [];
}

async function mount() {
  const fixture = TestBed.createComponent(Host);
  await fixture.whenStable();
  const directive = fixture.debugElement.children[0].injector.get(
    ScIntersectionObserver,
  );
  const element = fixture.debugElement.children[0].nativeElement as Element;
  return { fixture, directive, element };
}

function latestObserver(): FakeIntersectionObserver {
  return FakeIntersectionObserver.instances[
    FakeIntersectionObserver.instances.length - 1
  ];
}

describe('ScIntersectionObserver', () => {
  beforeEach(() => {
    FakeIntersectionObserver.instances = [];
    vi.stubGlobal('IntersectionObserver', FakeIntersectionObserver);
  });

  afterEach(() => vi.unstubAllGlobals());

  it('tracks visibility and emits each entry', async () => {
    const { fixture, directive, element } = await mount();

    latestObserver().fire(true);
    fixture.detectChanges();

    expect(directive.isIntersecting()).toBe(true);
    expect(element.getAttribute('data-intersecting')).toBe('true');
    expect(fixture.componentInstance.entries).toHaveLength(1);
  });

  it('recreates the observer when an option changes', async () => {
    const { fixture } = await mount();
    const first = latestObserver();

    fixture.componentInstance.rootMargin.set('100px');
    await fixture.whenStable();

    expect(first.disconnected).toBe(true);
    expect(latestObserver()).not.toBe(first);
    expect(latestObserver().options.rootMargin).toBe('100px');
  });

  it('with once, stops for good after the first hit', async () => {
    const { fixture, directive } = await mount();
    fixture.componentInstance.once.set(true);
    await fixture.whenStable();

    const observer = latestObserver();
    observer.fire(true);
    await fixture.whenStable();

    expect(observer.disconnected).toBe(true);
    expect(directive.isIntersecting()).toBe(true);

    // Changing an option must not start observing again.
    const count = FakeIntersectionObserver.instances.length;
    fixture.componentInstance.rootMargin.set('100px');
    await fixture.whenStable();

    expect(FakeIntersectionObserver.instances).toHaveLength(count);
  });
});
