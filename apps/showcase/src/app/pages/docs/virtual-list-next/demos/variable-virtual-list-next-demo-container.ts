import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { VariableVirtualListNextDemo } from './variable-virtual-list-next-demo';

@Component({
  selector: 'app-variable-virtual-list-next-demo-container',
  imports: [DemoContainer, VariableVirtualListNextDemo],
  template: `
    <app-demo-container
      title="Variable sizes"
      [code]="code"
      demoUrl="/demos/virtual-list-next/variable-virtual-list-next-demo"
    >
      <app-variable-virtual-list-next-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class VariableVirtualListNextDemoContainer {
  private readonly code = `import { Component, ViewEncapsulation } from '@angular/core';
import { ScFrame } from '@semantic-components/ui';
import {
  ScVirtualListNext,
  ScVirtualListNextRow,
} from '@semantic-components/ui/virtual-list';

/** Rows of any height — messages long and short: estimated, then measured; the list and its scrollbar follow, and you keep your place as rows above settle. */
@Component({
  selector: 'app-variable-virtual-list-next-demo',
  imports: [ScFrame, ScVirtualListNext, ScVirtualListNextRow],
  template: \`
    <ol
      scVirtualListNext
      #list="scVirtualListNext"
      tabindex="0"
      [count]="messages.length"
      [estimate]="96"
      [key]="keyOf"
      [gap]="8"
      aria-label="Messages"
      scFrame
      class="h-96 w-full max-w-md overflow-y-auto"
    >
      @for (row of list.rows(); track row.key) {
        <li [scVirtualListNextRow]="row" class="px-3 first:pt-3">
          <div scFrame size="sm" class="bg-muted p-3 text-sm">
            <p class="font-medium">{{ messages[row.index].from }}</p>
            <p>{{ messages[row.index].text }}</p>
          </div>
        </li>
      }
    </ol>
    <p class="text-muted-foreground text-sm" data-testid="range">
      @if (list.range(); as range) {
        Rendered: {{ range.first + 1 }}–{{ range.last + 1 }} of
        {{ list.count() }}
      }
    </p>
  \`,
  host: { class: 'flex w-full flex-col items-center gap-3' },
  encapsulation: ViewEncapsulation.None,
})
export class VariableVirtualListNextDemo {
  private readonly words =
    'the plan for the release is ready and the team would like your thoughts before friday when we meet to decide'.split(
      ' ',
    );
  private readonly names = [
    'Ada',
    'Grace',
    'Alan',
    'Katherine',
    'Margaret',
    'Hedy',
    'Linus',
    'Barbara',
    'Dennis',
    'Radia',
  ];
  private readonly messages = Array.from({ length: 2_000 }, (_, i) => ({
    id: 'm' + i,
    from: this.names[i % 10],
    text:
      this.words.slice(0, 4 + ((i * 7) % 18)).join(' ') +
      '.' +
      (i % 5 === 0 ? ' ' + this.words.join(' ') + '.' : ''),
  }));
  private readonly keyOf = (index: number) => this.messages[index].id;
}`;
}
