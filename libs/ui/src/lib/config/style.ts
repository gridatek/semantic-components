import { inject } from '@angular/core';
import type { ScStyle } from '@semantic-components/styles';
import { nova } from '@semantic-components/styles/nova';
import { SC_CONFIG } from './config';

/**
 * The app's style (`provideSemanticComponents({ style })`), nova by default: the
 * classes of the parts that follow it. In an injection context, e.g. a field:
 * `private readonly buttonStyles = injectStyle().button;`
 */
export function injectStyle(): ScStyle {
  return inject(SC_CONFIG).style ?? nova;
}
