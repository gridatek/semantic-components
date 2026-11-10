import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { RtlToolbarDemo } from './rtl-toolbar-demo';

@Component({
  selector: 'app-rtl-toolbar-demo-container',
  imports: [DemoContainer, RtlToolbarDemo],
  template: `
    <app-demo-container
      title="RTL"
      demoUrl="/demos/toolbar/rtl-toolbar-demo"
      [code]="code"
    >
      <app-rtl-toolbar-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class RtlToolbarDemoContainer {
  readonly code = `import { Component, ViewEncapsulation, signal } from '@angular/core';
import {
  ScButton,
  ScToggle,
  ScToolbar,
  ScToolbarSeparator,
  ScToolbarWidget,
  ScToolbarWidgetGroup,
} from '@semantic-components/ui';
import {
  SiTextAlignEndIcon,
  SiTextAlignStartIcon,
} from '@semantic-icons/lucide-icons';

/** In a right-to-left page: the first widget at the right; Left moves to the next. */
@Component({
  selector: 'app-rtl-toolbar-demo',
  imports: [
    ScButton,
    ScToggle,
    ScToolbar,
    ScToolbarSeparator,
    ScToolbarWidget,
    ScToolbarWidgetGroup,
    SiTextAlignEndIcon,
    SiTextAlignStartIcon,
  ],
  template: \`
    <div dir="rtl" lang="ar">
      <div scToolbar aria-label="التنسيق">
        <div scToolbarWidgetGroup aria-label="المحاذاة" [(value)]="alignment">
          <button scToolbarWidget scToggle size="sm" value="start">
            <svg siTextAlignStartIcon></svg>
            <span class="sr-only">محاذاة البداية</span>
          </button>
          <button scToolbarWidget scToggle size="sm" value="end">
            <svg siTextAlignEndIcon></svg>
            <span class="sr-only">محاذاة النهاية</span>
          </button>
        </div>
        <div scToolbarSeparator></div>
        <button scToolbarWidget scButton variant="ghost" size="sm">حفظ</button>
      </div>
    </div>
  \`,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class RtlToolbarDemo {
  protected readonly alignment = signal(['start']);
}`;
}
