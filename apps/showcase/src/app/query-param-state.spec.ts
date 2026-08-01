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

describe('injectQueryParam', () => {
  it('seeds both call sites for a key from the URL', async () => {
    const c = await mount(TwoCallSites, '/?q=hello');
    expect(c.a.value()).toBe('hello');
    expect(c.b.value()).toBe('hello');
  });

  it('propagates a write to a sibling call site in the same tick', async () => {
    const c = await mount(TwoCallSites, '/?q=hello');

    c.a.set('world');
    TestBed.tick();

    // Before the fix this stayed 'hello' until the router round-trip landed.
    expect(c.b.value()).toBe('world');
  });

  it('propagates clear() to a sibling call site', async () => {
    const c = await mount(TwoCallSites, '/?q=hello');

    c.a.clear();
    TestBed.tick();

    expect(c.b.value()).toBe('');
  });

  it('reflects external navigation into every call site', async () => {
    const c = await mount(TwoCallSites, '/?q=hello');

    await c.router.navigateByUrl('/?q=external');
    TestBed.tick();

    expect(c.a.value()).toBe('external');
    expect(c.b.value()).toBe('external');
  });

  it('corrects a value the parser cannot round-trip', async () => {
    const c = await mount(Truncating, '/?page=2');

    c.page.set(3.7);
    TestBed.tick();

    expect(c.page.value()).toBe(3);
  });
});
