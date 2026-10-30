import { Directionality } from '@angular/cdk/bidi';
import {
  ConnectedPosition,
  OverlayModule,
  ScrollStrategy,
  ScrollStrategyOptions,
} from '@angular/cdk/overlay';
import {
  Component,
  ViewEncapsulation,
  computed,
  inject,
  input,
} from '@angular/core';
import { cn } from '../../utils/cn/cn';
import { ScElementDirectionality } from '../../utils/element-directionality';
import { ScMentionInputState } from './mention-input-state';

@Component({
  selector: 'div[scMentionInputSuggestions]',
  providers: [{ provide: Directionality, useClass: ScElementDirectionality }],
  imports: [OverlayModule],
  template: `
    @if (state.overlayOrigin; as origin) {
      <ng-template
        cdkConnectedOverlay
        [cdkConnectedOverlayOrigin]="origin"
        [cdkConnectedOverlayOpen]="true"
        [cdkConnectedOverlayPositions]="positions()"
        [cdkConnectedOverlayScrollStrategy]="scrollStrategy"
      >
        <div
          role="listbox"
          [id]="state.listboxId"
          [attr.aria-label]="label() || null"
          [class]="listClass()"
        >
          <ng-content />
        </div>
      </ng-template>
    }
  `,
  host: {
    class: 'contents',
  },
  encapsulation: ViewEncapsulation.None,
})
export class ScMentionInputSuggestions {
  readonly classInput = input<string>('', { alias: 'class' });
  /** The list's name: none by default — name it. */
  readonly label = input('', { alias: 'aria-label' });

  protected readonly state = inject(ScMentionInputState);
  protected readonly scrollStrategy: ScrollStrategy = inject(
    ScrollStrategyOptions,
  ).reposition();

  protected readonly positions = computed((): ConnectedPosition[] => {
    const offset = this.state.caretOffset();
    return [
      {
        originX: 'start',
        originY: 'top',
        overlayX: 'start',
        overlayY: 'top',
        offsetX: offset.x,
        offsetY: offset.y,
      },
      {
        originX: 'start',
        originY: 'top',
        overlayX: 'start',
        overlayY: 'bottom',
        offsetX: offset.x,
        offsetY: offset.y - 20,
      },
    ];
  });

  protected readonly listClass = computed(() =>
    cn(
      'bg-popover text-popover-foreground z-50 w-64 rounded-lg ring-1 ring-foreground/10 p-1 text-sm shadow-md outline-hidden',
      'animate-in fade-in-0 zoom-in-95',
      this.classInput(),
    ),
  );
}
