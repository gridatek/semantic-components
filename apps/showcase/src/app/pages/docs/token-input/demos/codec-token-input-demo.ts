import { Component, ViewEncapsulation, computed, signal } from '@angular/core';
import {
  type ScTokenCodec,
  ScTokenInput,
  ScTokenInputEditor,
  ScTokenInputToken,
  type ScTokenInputValue,
  tokenInputFromText,
  tokenInputToText,
} from '@semantic-components/ui';

const people = new Map([
  ['u1', 'Hollis Grant'],
  ['u2', 'Amara Diallo'],
]);

/** A codec of your own: mentions as <@id> — how the text is copied, pasted and sent; read back with tokenInputFromText. */
const slackCodec: ScTokenCodec = {
  format: (token) => `<@${token.value}>`,
  parse: (text) =>
    text.split(/(<@\w+>)/).map((part) => {
      const id = /^<@(\w+)>$/.exec(part)?.[1];
      return id
        ? { type: 'mention', value: id, label: people.get(id) ?? id }
        : part;
    }),
};

@Component({
  selector: 'app-codec-token-input-demo',
  imports: [ScTokenInput, ScTokenInputEditor, ScTokenInputToken],
  template: `
    <div class="grid w-full max-w-md gap-2">
      <div scTokenInput [codec]="codec" [(value)]="message">
        <div scTokenInputEditor aria-label="Message"></div>
        <ng-template scTokenInputToken let-token>
          &#64;{{ token.label }}
        </ng-template>
      </div>
      <p class="text-muted-foreground font-mono text-xs" data-testid="picked">
        {{ text() }}
      </p>
    </div>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class CodecTokenInputDemo {
  private readonly codec = slackCodec;
  private readonly message = signal<ScTokenInputValue>(
    tokenInputFromText('Ship it, <@u1> and <@u2>!', slackCodec),
  );
  private readonly text = computed(() =>
    tokenInputToText(this.message(), this.codec),
  );
}
