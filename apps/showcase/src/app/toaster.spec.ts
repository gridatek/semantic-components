import { EnvironmentInjector, createEnvironmentInjector } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { SC_CONFIG, ScToaster, provideScConfig } from '@semantic-components/ui';

describe('ScToaster', () => {
  let toaster: ScToaster;
  const ids = () => toaster.toasts().map((toast) => toast.id);

  beforeEach(() => {
    vi.useFakeTimers();
    vi.spyOn(console, 'warn').mockImplementation(() => undefined);
    toaster = TestBed.inject(ScToaster);
  });

  afterEach(() => {
    toaster.dismissAll();
    vi.useRealTimers();
    vi.restoreAllMocks();
  });

  it('dismisses a toast after its duration', () => {
    const id = toaster.show({ description: 'Saved', duration: 1000 });
    vi.advanceTimersByTime(999);
    expect(ids()).toEqual([id]);
    vi.advanceTimersByTime(1);
    expect(ids()).toEqual([]);
  });

  it('keeps a toast without a duration, and a loading one', () => {
    toaster.show({ description: 'Stays', duration: 0 });
    toaster.loading({ description: 'Loading' });
    vi.advanceTimersByTime(60_000);
    expect(toaster.toasts()).toHaveLength(2);
  });

  it('pauses while its position is held, then runs what is left', () => {
    const id = toaster.show({
      description: 'Saved',
      duration: 1000,
      position: 'top-end',
    });
    vi.advanceTimersByTime(400);
    toaster.ɵhold('top-end');
    vi.advanceTimersByTime(5000);
    expect(ids()).toEqual([id]);

    toaster.ɵrelease('top-end');
    vi.advanceTimersByTime(599);
    expect(ids()).toEqual([id]);
    vi.advanceTimersByTime(1);
    expect(ids()).toEqual([]);
  });

  it('holds only its own position', () => {
    toaster.show({ description: 'Top', duration: 1000, position: 'top-end' });
    const bottom = toaster.show({
      description: 'Bottom',
      duration: 1000,
      position: 'bottom-end',
    });
    toaster.ɵhold('bottom-end');
    vi.advanceTimersByTime(1000);
    expect(ids()).toEqual([bottom]);
  });

  it('starts a toast shown at a held position paused', () => {
    toaster.show({ description: 'First', duration: 0, position: 'top-end' });
    toaster.ɵhold('top-end');
    const id = toaster.show({
      description: 'Second',
      duration: 1000,
      position: 'top-end',
    });
    vi.advanceTimersByTime(2000);
    expect(ids()).toContain(id);
    toaster.ɵrelease('top-end');
    vi.advanceTimersByTime(1000);
    expect(ids()).not.toContain(id);
  });

  it('lets an emptied position go', () => {
    const id = toaster.show({ description: 'Only', position: 'top-end' });
    toaster.ɵhold('top-end');
    toaster.dismiss(id);
    expect(toaster.ɵheld().has('top-end')).toBe(false);
  });

  it('updates a toast in place, and starts its timer again', () => {
    const id = toaster.loading({ description: 'Uploading' });
    vi.advanceTimersByTime(10_000);
    toaster.update(id, { variant: 'success', description: 'Uploaded' });

    expect(toaster.toasts()).toEqual([
      expect.objectContaining({
        id,
        variant: 'success',
        description: 'Uploaded',
        duration: 5000,
      }),
    ]);
    vi.advanceTimersByTime(5000);
    expect(ids()).toEqual([]);
  });

  it('keeps the fields an update leaves out', () => {
    const id = toaster.show({
      title: 'Upload',
      description: 'Uploading',
      duration: 3000,
    });
    toaster.update(id, { description: 'Uploaded' });
    expect(toaster.toasts()[0]).toEqual(
      expect.objectContaining({ title: 'Upload', duration: 3000 }),
    );
  });

  it('shows a promise loading, then its success', async () => {
    const promise = toaster.promise(Promise.resolve('Report'), {
      loading: { description: 'Saving' },
      success: (name) => ({ description: `${name} saved` }),
      error: { description: 'Not saved' },
    });
    expect(toaster.toasts()[0].variant).toBe('loading');

    await promise;
    expect(toaster.toasts()[0]).toEqual(
      expect.objectContaining({
        variant: 'success',
        description: 'Report saved',
      }),
    );
  });

  it('shows a promise that fails as an error', async () => {
    const promise = toaster.promise(Promise.reject(new Error('Offline')), {
      loading: { description: 'Saving' },
      success: { description: 'Saved' },
      error: (error) => ({ description: (error as Error).message }),
    });

    await expect(promise).rejects.toThrow('Offline');
    expect(toaster.toasts()[0]).toEqual(
      expect.objectContaining({ variant: 'error', description: 'Offline' }),
    );
  });

  it('keeps at most five, dismissing the oldest', () => {
    const first = toaster.show({ description: '1' });
    for (const n of [2, 3, 4, 5, 6]) toaster.show({ description: `${n}` });
    expect(toaster.toasts()).toHaveLength(5);
    expect(ids()).not.toContain(first);
  });
});

describe('ScToaster config', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.spyOn(console, 'warn').mockImplementation(() => undefined);
  });

  afterEach(() => {
    TestBed.inject(ScToaster).dismissAll();
    vi.useRealTimers();
    vi.restoreAllMocks();
  });

  it('takes its defaults from provideScConfig', () => {
    TestBed.configureTestingModule({
      providers: [
        provideScConfig({
          toaster: { position: 'top-center', duration: 1000, maxToasts: 2 },
        }),
      ],
    });
    const toaster = TestBed.inject(ScToaster);
    for (const n of [1, 2, 3]) toaster.show({ description: `${n}` });

    expect(toaster.toasts().map((toast) => toast.description)).toEqual([
      '2',
      '3',
    ]);
    expect(toaster.toasts()[0].position).toBe('top-center');
    vi.advanceTimersByTime(1000);
    expect(toaster.toasts()).toEqual([]);
  });

  it('merges a config given again into the one above', () => {
    TestBed.configureTestingModule({
      providers: [provideScConfig({ toaster: { position: 'top-center' } })],
    });
    const child = createEnvironmentInjector(
      [provideScConfig({ toaster: { duration: 1000 } })],
      TestBed.inject(EnvironmentInjector),
    );
    expect(child.get(SC_CONFIG).toaster).toEqual({
      position: 'top-center',
      duration: 1000,
    });
  });
});
