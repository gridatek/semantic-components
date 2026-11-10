import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { InputToolbarDemo } from './input-toolbar-demo';

@Component({
  selector: 'app-input-toolbar-demo-container',
  imports: [DemoContainer, InputToolbarDemo],
  template: `
    <app-demo-container
      title="With input"
      demoUrl="/demos/toolbar/input-toolbar-demo"
      [code]="code"
    >
      <app-input-toolbar-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class InputToolbarDemoContainer {
  readonly code = `import { Component, ViewEncapsulation, signal } from '@angular/core';
import {
  ScButton,
  ScInput,
  ScToolbar,
  ScToolbarSeparator,
  ScToolbarWidget,
} from '@semantic-components/ui';
import { SiMinusIcon, SiPlusIcon } from '@semantic-icons/lucide-icons';

/** An input as a widget — one, last: Left and Right also move its text cursor. */
@Component({
  selector: 'app-input-toolbar-demo',
  imports: [
    ScButton,
    ScInput,
    ScToolbar,
    ScToolbarSeparator,
    ScToolbarWidget,
    SiMinusIcon,
    SiPlusIcon,
  ],
  template: \`
    <div scToolbar aria-label="Zoom">
      <button
        scToolbarWidget
        scButton
        variant="ghost"
        size="icon-sm"
        (click)="zoom.set(zoom() - 10)"
      >
        <svg siMinusIcon></svg>
        <span class="sr-only">Zoom out</span>
      </button>
      <button
        scToolbarWidget
        scButton
        variant="ghost"
        size="icon-sm"
        (click)="zoom.set(zoom() + 10)"
      >
        <svg siPlusIcon></svg>
        <span class="sr-only">Zoom in</span>
      </button>
      <div scToolbarSeparator></div>
      <input
        scToolbarWidget
        scInput
        type="number"
        aria-label="Zoom, in percent"
        class="h-8 w-20"
        [value]="zoom()"
        (change)="setZoom($event)"
      />
    </div>
  \`,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class InputToolbarDemo {
  protected readonly zoom = signal(100);

  protected setZoom(event: Event): void {
    this.zoom.set((event.target as HTMLInputElement).valueAsNumber || 100);
  }
}`;
}
