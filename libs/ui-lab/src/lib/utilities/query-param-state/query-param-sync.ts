import { Service, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import type { QueryParamOptions } from './query-param-types';

@Service()
export class QueryParamSyncService {
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);

  private pendingParams: Record<string, string> | null = null;
  private pendingReplace = true;
  private flushScheduled = false;

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
