import {
  DestroyRef,
  Service,
  WritableSignal,
  inject,
  signal,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router } from '@angular/router';
import type { QueryParamOptions } from './query-param-types';

@Service()
export class QueryParamSyncService {
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);
  private readonly destroyRef = inject(DestroyRef);

  private pendingParams: Record<string, string> | null = null;
  private pendingReplace = true;
  private flushScheduled = false;

  /**
   * One shared raw value per param key. Every `injectQueryParam(key)` call site
   * observes the same signal, so a write from one is visible to all of them in
   * the same tick instead of only after the URL round-trip.
   */
  private readonly rawSignals = new Map<
    string,
    WritableSignal<string | null>
  >();

  constructor() {
    // A single subscription feeds every registered key, rather than one per
    // call site.
    this.route.queryParamMap
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((params) => {
        for (const [key, sig] of this.rawSignals) {
          sig.set(params.has(key) ? params.get(key) : null);
        }
      });
  }

  /**
   * The shared raw value for `key`, created on first use and seeded from the
   * live URL. Holding the *serialised string* rather than the parsed value
   * means signal equality collapses no-op updates on its own, so parsers that
   * return fresh objects (`parseAsJson`, `parseAsArrayOf`, the `Date` parsers)
   * don't re-notify on every navigation.
   */
  raw(key: string): WritableSignal<string | null> {
    let sig = this.rawSignals.get(key);
    if (sig === undefined) {
      sig = signal(this.getRaw(key));
      this.rawSignals.set(key, sig);
    }
    return sig;
  }

  /**
   * Read the current raw string value for `key` from the live URL.
   */
  getRaw(key: string): string | null {
    const params = this.route.snapshot.queryParamMap;
    return params.has(key) ? params.get(key) : null;
  }

  /**
   * Write a serialised value (or null to remove) to the URL.
   * Synchronous writes within the same microtask are batched into a single
   * navigation so they don't overwrite each other.
   */
  write(key: string, raw: string | null, opts?: QueryParamOptions): void {
    if (this.pendingParams === null) {
      this.pendingParams = {
        ...this.router.parseUrl(this.router.url).queryParams,
      };
      this.pendingReplace = true;
    }

    if (raw === null) {
      // eslint-disable-next-line @typescript-eslint/no-dynamic-delete
      delete this.pendingParams[key];
    } else {
      this.pendingParams[key] = raw;
    }

    // Any non-replace write flips the whole batch to push.
    if ((opts?.history ?? 'replace') !== 'replace') {
      this.pendingReplace = false;
    }

    if (!this.flushScheduled) {
      this.flushScheduled = true;
      queueMicrotask(() => this.flush());
    }
  }

  private flush(): void {
    const params = this.pendingParams;
    const replace = this.pendingReplace;
    this.pendingParams = null;
    this.flushScheduled = false;

    if (params === null) return;

    this.router.navigate([], {
      queryParams: params,
      replaceUrl: replace,
    });
  }
}
