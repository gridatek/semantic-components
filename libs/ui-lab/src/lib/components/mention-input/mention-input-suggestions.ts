import {
  ConnectedPosition,
  OverlayModule,
  ScrollStrategy,
  ScrollStrategyOptions,
} from '@angular/cdk/overlay';
import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  computed,
  inject,
  input,
} from '@angular/core';
import { cn } from '@semantic-components/ui';
import { ScMentionInputState } from './mention-input-state';

@Component({
  selector: 'div[scMentionInputSuggestions]',
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
        <div role="listbox" [class]="listClass()">
          <ng-content />
        </div>
      </ng-template>
    }
  `,
  host: {
    class: 'contents',
  },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScMentionInputSuggestions {
  readonly classInput = input<string>('', { alias: 'class' });

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
