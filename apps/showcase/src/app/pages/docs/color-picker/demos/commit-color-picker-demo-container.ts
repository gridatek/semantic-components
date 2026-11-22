import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { CommitColorPickerDemo } from './commit-color-picker-demo';

@Component({
  selector: 'app-commit-color-picker-demo-container',
  imports: [DemoContainer, CommitColorPickerDemo],
  template: `
    <app-demo-container
      title="Commit"
      [code]="code"
      demoUrl="/demos/color-picker/commit-color-picker-demo"
    >
      <app-commit-color-picker-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class CommitColorPickerDemoContainer {
  private readonly code = `import { Component, ViewEncapsulation, signal } from '@angular/core';
import {
  ScButton,
  ScColorPicker,
  ScColorPickerArea,
  ScColorPickerSlider,
} from '@semantic-components/ui';

/** [(value)] follows every step; (valueCommit) once a change finishes — to save. setColor() from outside. */
@Component({
  selector: 'app-commit-color-picker-demo',
  imports: [ScButton, ScColorPicker, ScColorPickerArea, ScColorPickerSlider],
  template: \`
    <div class="grid w-64 gap-3">
      <div
        scColorPicker
        #picker="scColorPicker"
        aria-label="Theme color"
        class="grid gap-3"
        [(value)]="color"
        (valueCommit)="saved.set($event)"
      >
        <div scColorPickerArea aria-label="Color"></div>
        <input scColorPickerSlider="hue" aria-label="Hue" />
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
export class CommitColorPickerDemo {
  private readonly color = signal('#f97316');
  private readonly saved = signal('—');
}`;
}
