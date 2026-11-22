import { Directive, InjectionToken, TemplateRef, inject } from '@angular/core';
import type { ScToken } from './token-input-value';

export interface ScTokenInputTokenContext {
  $implicit: ScToken;
}

/** A token's own, given to the parts inside its template. */
export interface ScTokenInputTokenRef {
  readonly token: ScToken;
  remove(): void;
}

export const SC_TOKEN_INPUT_TOKEN = new InjectionToken<ScTokenInputTokenRef>(
  'SC_TOKEN_INPUT_TOKEN',
);

/**
 * A token's content, written once: the editor stamps it in each token's
 * chip, the token its context (`let-token`). Without it, a token shows its
 * label.
 */
@Directive({
  selector: 'ng-template[scTokenInputToken]',
})
export class ScTokenInputToken {
  readonly templateRef =
    inject<TemplateRef<ScTokenInputTokenContext>>(TemplateRef);

  static ngTemplateContextGuard(
    _directive: ScTokenInputToken,
    context: unknown,
  ): context is ScTokenInputTokenContext {
    return !!context;
  }
}
