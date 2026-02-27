import {
  ChangeDetectionStrategy,
  Component,
  signal,
  ViewEncapsulation,
} from '@angular/core';
import {
  ScOptField,
  ScOptFieldSlotGroup,
  ScOptFieldSeparator,
  ScOptFieldSlot,
} from '@semantic-components/ui-lab';

@Component({
  selector: 'app-verification-opt-field-demo',
  imports: [
    ScOptField,
    ScOptFieldSlotGroup,
    ScOptFieldSeparator,
    ScOptFieldSlot,
  ],
  template: `
    <div class="max-w-sm rounded-lg border p-6">
      <div class="space-y-4">
        <div class="space-y-2 text-center">
          <h4 class="font-semibold">Enter verification code</h4>
          <p class="text-muted-foreground text-sm">
            We sent a code to your email address
          </p>
        </div>
        <div class="flex justify-center">
          <div scOptField [(value)]="code">
            <div scOptFieldSlotGroup>
              <div scOptFieldSlot></div>
              <div scOptFieldSlot></div>
              <div scOptFieldSlot></div>
            </div>
            <div scOptFieldSeparator>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="size-4"
              >
                <line x1="5" x2="19" y1="12" y2="12" />
              </svg>
            </div>
            <div scOptFieldSlotGroup>
              <div scOptFieldSlot></div>
              <div scOptFieldSlot></div>
              <div scOptFieldSlot></div>
            </div>
          </div>
        </div>
        <p class="text-muted-foreground text-center text-sm">
          @if (code().length === 6) {
            Code entered: {{ code() }}
          } @else {
            Enter all 6 digits
          }
        </p>
      </div>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VerificationOptFieldDemo {
  readonly code = signal('');
}
