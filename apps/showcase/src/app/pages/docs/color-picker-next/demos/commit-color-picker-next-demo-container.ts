import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { CommitColorPickerNextDemo } from './commit-color-picker-next-demo';

@Component({
  selector: 'app-commit-color-picker-next-demo-container',
  imports: [DemoContainer, CommitColorPickerNextDemo],
  template: `
    <app-demo-container
      title="Commit"
      [code]="code"
      demoUrl="/demos/color-picker-next/commit-color-picker-next-demo"
    >
      <app-commit-color-picker-next-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class CommitColorPickerNextDemoContainer {
  private readonly code = `import { Component, ViewEncapsulation, signal } from '@angular/core';
import {
  ScButton,
  ScColorPickerNext,
  ScColorPickerNextArea,
  ScColorPickerNextSlider,
} from '@semantic-components/ui';

/** [(value)] follows every step; (valueCommit) once a change finishes — to save. setColor() from outside. */
@Component({
  selector: 'app-commit-color-picker-next-demo',
  imports: [
    ScButton,
    ScColorPickerNext,
    ScColorPickerNextArea,
    ScColorPickerNextSlider,
  ],
  template: \`
    <div class="grid w-64 gap-3">
      <div
        scColorPickerNext
        #picker="scColorPickerNext"
        aria-label="Theme color"
        class="grid gap-3"
        [(value)]="color"
        (valueCommit)="saved.set($event)"
      >
        <div scColorPickerNextArea aria-label="Color"></div>
        <input scColorPickerNextSlider="hue" aria-label="Hue" />
      </div>
      <button
        scButton
        variant="outline"
        size="sm"
        (click)="picker.setColor('rebeccapurple')"
      >
        Use purple
      </button>
      <p class="text-muted-foreground font-mono text-xs" data-testid="picked">
        {{ color() }}
      </p>
      <p class="text-muted-foreground font-mono text-xs" data-testid="saved">
        Saved: {{ saved() }}
      </p>
    </div>
  \`,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class CommitColorPickerNextDemo {
  private readonly color = signal('#f97316');
  private readonly saved = signal('—');
}`;
}
