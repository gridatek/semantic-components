import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { ActivationListboxDemo } from './activation-listbox-demo';

@Component({
  selector: 'app-activation-listbox-demo-container',
  imports: [DemoContainer, ActivationListboxDemo],
  template: `
    <app-demo-container
      title="Selection that follows focus"
      [code]="code"
      demoUrl="/demos/listbox/activation-listbox-demo"
    >
      <app-activation-listbox-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class ActivationListboxDemoContainer {
  private readonly code = `import { Component, ViewEncapsulation, signal } from '@angular/core';
import {
  ScListboxItem,
  ScListboxItemIcon,
  ScListboxItemIndicator,
  ScListboxMultiple,
} from '@semantic-components/ui';
import { SiCheckIcon, SiFileIcon } from '@semantic-icons/lucide-icons';

/** activation="automatic" with several: the arrows choose — Ctrl + arrow moves without choosing, Ctrl + Space or Ctrl-click adds. */
@Component({
  selector: 'app-activation-listbox-demo',
  imports: [
    ScListboxItem,
    ScListboxItemIcon,
    ScListboxItemIndicator,
    ScListboxMultiple,
    SiCheckIcon,
    SiFileIcon,
  ],
  template: \`
    <div class="grid w-64 gap-2">
      <div
        scListbox
        multiple
        activation="automatic"
        aria-label="Files"
        [(value)]="files"
      >
        @for (item of items; track item.value) {
          <div scListboxItem [value]="item.value">
            <span scListboxItemIcon><svg siFileIcon></svg></span>
            {{ item.label }}
            <span scListboxItemIndicator><svg siCheckIcon></svg></span>
          </div>
        }
      </div>
      <p class="text-muted-foreground text-sm" data-testid="picked">
        {{ files().length + ' selected' }}
      </p>
    </div>
  \`,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class ActivationListboxDemo {
  private readonly files = signal<string[]>(['readme']);
  private readonly items = [
    { value: 'readme', label: 'README.md' },
    { value: 'package', label: 'package.json' },
    { value: 'tsconfig', label: 'tsconfig.json' },
    { value: 'main', label: 'main.ts' },
  ];
}`;
}
