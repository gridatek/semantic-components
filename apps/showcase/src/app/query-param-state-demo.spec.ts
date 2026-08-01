import { TestBed } from '@angular/core/testing';
import { Router, provideRouter } from '@angular/router';
import { DemoQueryParamStateDemo } from './pages/docs/query-param-state/demos/demo-query-param-state-demo';

async function mountDemo(url = '/'): Promise<DemoQueryParamStateDemo> {
  TestBed.configureTestingModule({
    providers: [provideRouter([{ path: '**', children: [] }])],
  });
  await TestBed.inject(Router).navigateByUrl(url);
  const fixture = TestBed.createComponent(DemoQueryParamStateDemo);
  fixture.detectChanges();
  return fixture.componentInstance;
}

describe('DemoQueryParamStateDemo', () => {
  it('mirrors the URL into the form model', async () => {
    const c = await mountDemo('/?q=angular&page=3&sort=desc');

    expect(c.formModel()).toEqual({ q: 'angular', page: 3, sort: 'desc' });
  });

  it('pushes a form-model edit back into the params synchronously', async () => {
    const c = await mountDemo('/?q=angular&page=3&sort=desc');

    // This is the write path signal forms uses when a field changes.
    c.formModel.update((m) => ({ ...m, q: 'signals' }));

    expect(c.search.value()).toBe('signals');
    expect(c.page.value()).toBe(3);
    expect(c.sort.value()).toBe('desc');
  });

  it('keeps the form model consistent after the edit', async () => {
    const c = await mountDemo('/?q=angular&page=3&sort=desc');

    c.formModel.update((m) => ({ ...m, page: 7 }));

    expect(c.formModel()).toEqual({ q: 'angular', page: 7, sort: 'desc' });
  });

  it('reset() clears every param', async () => {
    const c = await mountDemo('/?q=angular&page=3&sort=desc');

    c.reset();

    expect(c.search.value()).toBe('');
    expect(c.page.value()).toBe(1);
    expect(c.sort.value()).toBe('asc');
  });
});
