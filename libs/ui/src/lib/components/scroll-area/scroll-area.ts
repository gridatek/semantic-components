import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  ViewEncapsulation,
  computed,
  input,
  viewChild,
} from '@angular/core';
import { cn } from '../../utils';
import { ScScrollBar } from './scroll-area-scrollbar';
import { SC_SCROLL_AREA, type ScScrollAreaContext } from './scroll-area-types';

@Component({
  selector: 'div[scScrollArea]',
  imports: [ScScrollBar],
  providers: [{ provide: SC_SCROLL_AREA, useExisting: ScScrollArea }],
  host: {
    'data-slot': 'scroll-area',
    '[class]': 'class()',
  },
  template: `
    <div
      data-slot="scroll-area-viewport"
      class="h-full w-full overflow-auto"
      tabindex="0"
      #viewport
    >
      <div style="min-width: 100%; display: table">
        <ng-content />
      </div>
    </div>
    <div scScrollBar orientation="vertical"></div>
    <div scScrollBar orientation="horizontal"></div>
  `,
  styles: `
    [data-slot='scroll-area-viewport'] {
      scrollbar-width: none;
    }
    [data-slot='scroll-area-viewport']::-webkit-scrollbar {
      display: none;
    }
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScScrollArea implements ScScrollAreaContext {
  readonly classInput = input<string>('', { alias: 'class' });

  private readonly viewportRef =
    viewChild<ElementRef<HTMLElement>>('viewport');

  readonly viewport = computed(() => this.viewportRef()?.nativeElement);

  protected readonly class = computed(() =>
    cn('group relative overflow-hidden', this.classInput()),
  );
}
