import { Injectable, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import type { QueryParamOptions } from './query-param-types';

@Injectable({ providedIn: 'root' })
export class QueryParamSyncService {
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);

  /**
   * Read the current raw string value for `key` from the live URL.
   */
  getRaw(key: string): string | null {
    const params = this.route.snapshot.queryParamMap;
    return params.has(key) ? params.get(key) : null;
  }

  /**
   * Write a serialised value (or null to remove) to the URL.
   */
  write(key: string, raw: string | null, opts?: QueryParamOptions): void {
    const current = this.router.parseUrl(this.router.url);
    const qp = current.queryParams;

    if (raw === null) {
      // eslint-disable-next-line @typescript-eslint/no-dynamic-delete
      delete qp[key];
    } else {
      qp[key] = raw;
    }

    this.router.navigate([], {
      queryParams: qp,
      replaceUrl: (opts?.history ?? 'replace') === 'replace',
    });
  }
}
