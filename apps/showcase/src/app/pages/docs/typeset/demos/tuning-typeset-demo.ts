import { Component, ViewEncapsulation } from '@angular/core';

/**
 * Three variables tune it: the size, the line height and the space between
 * blocks. Here set on the container (a one-off); a style class of yours
 * (`.typeset-chat { --typeset-size: … }`) does the same for every use.
 */
@Component({
  selector: 'app-tuning-typeset-demo',
  template: `
    <div class="grid w-full max-w-3xl gap-8 md:grid-cols-2">
      <article class="typeset">
        <h3>Docs</h3>
        <p>The defaults: roomy, for reading a page from top to bottom.</p>
        <p>Each block keeps its distance from the last.</p>
      </article>
      <article
        class="typeset"
        style="
          --typeset-size: 0.875rem;
          --typeset-leading: 1.5;
          --typeset-flow: 0.5em;
        "
      >
        <h3>Chat</h3>
        <p>Smaller and tighter, for an answer in a narrow panel.</p>
        <p>Each block closer to the last.</p>
      </article>
    </div>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class TuningTypesetDemo {}
