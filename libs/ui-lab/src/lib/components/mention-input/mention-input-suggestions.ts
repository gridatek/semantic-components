import { ConnectedPosition, OverlayModule } from '@angular/cdk/overlay';
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

const positions: ConnectedPosition[] = [
  {
    originX: 'start',
    originY: 'bottom',
    overlayX: 'start',
    overlayY: 'top',
    offsetY: 4,
  },
  {
    originX: 'start',
    originY: 'top',
    overlayX: 'start',
    overlayY: 'bottom',
    offsetY: -4,
  },
];

@Component({
  selector: 'div[scMentionInputSuggestions]',
  imports: [OverlayModule],
  template: `
    @if (state.overlayOrigin; as origin) {
      <ng-template
        cdkConnectedOverlay
        [cdkConnectedOverlayOrigin]="origin"
        [cdkConnectedOverlayOpen]="true"
        [cdkConnectedOverlayPositions]="positions"
      >
        <div role="listbox" [class]="listClass()">
          <ng-content />
        </div>
      </ng-template>
    }
  `,
  host: {
    'data-slot': 'mention-input-suggestion-list',
    class: 'contents',
  },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScMentionInputSuggestions {
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly state = inject(ScMentionInputState);
  protected readonly positions = positions;

  protected readonly listClass = computed(() =>
    cn(
      'bg-popover text-popover-foreground z-50 w-64 rounded-lg ring-1 ring-foreground/10 p-1 text-sm shadow-md outline-hidden',
      'animate-in fade-in-0 zoom-in-95',
      this.classInput(),
    ),
  );
}
