import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
  ViewEncapsulation,
} from '@angular/core';
import { cn } from '../../utils';
import { SC_COLOR_PICKER } from './color-picker';

@Component({
  selector: 'button[sc-color-picker-eyedropper]',
  template: `
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
      <path d="m2 22 1-1h3l9-9" />
      <path d="M3 21v-3l9-9" />
      <path
        d="m15 6 3.4-3.4a2.1 2.1 0 1 1 3 3L18 9l.4.4a2.1 2.1 0 1 1-3 3l-3.8-3.8a2.1 2.1 0 1 1 3-3l.4.4Z"
      />
    </svg>
    <span class="sr-only">Pick color from screen</span>
  `,
  host: {
    'data-slot': 'color-picker-eyedropper',
    type: 'button',
    '[class]': 'class()',
    '[disabled]': 'colorPicker.disabled() || !isSupported()',
    '(click)': 'pickColor()',
  },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScColorPickerEyeDropper {
  readonly colorPicker = inject(SC_COLOR_PICKER);

  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn(
      'inline-flex size-9 items-center justify-center rounded-md border border-input bg-background',
      'hover:bg-accent hover:text-accent-foreground',
      'focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
      'disabled:pointer-events-none disabled:opacity-50',
      this.classInput(),
    ),
  );

  isSupported(): boolean {
    return 'EyeDropper' in window;
  }

  async pickColor(): Promise<void> {
    if (!this.isSupported() || this.colorPicker.disabled()) return;

    try {
      // @ts-expect-error EyeDropper API not yet in TypeScript types
      const eyeDropper = new window.EyeDropper();
      const result = await eyeDropper.open();
      this.colorPicker.setHex(result.sRGBHex);
    } catch {
      // User cancelled or error
    }
  }
}
