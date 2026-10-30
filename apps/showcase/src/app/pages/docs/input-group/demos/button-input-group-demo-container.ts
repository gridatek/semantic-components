import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { ButtonInputGroupDemo } from './button-input-group-demo';

@Component({
  selector: 'app-button-input-group-demo-container',
  imports: [DemoContainer, ButtonInputGroupDemo],
  template: `
    <app-demo-container
      title="Button"
      demoUrl="/demos/input-group/button-input-group-demo"
      [code]="code"
    >
      <app-button-input-group-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class ButtonInputGroupDemoContainer {
  readonly code = `import { Component, ViewEncapsulation, signal } from '@angular/core';
import {
  ScInput,
  ScInputGroup,
  ScInputGroupAddon,
  ScInputGroupButton,
  ScInputGroupText,
  ScPopover,
  ScPopoverPortal,
  ScPopoverProvider,
  ScPopoverTrigger,
} from '@semantic-components/ui';
import {
  SiCheckIcon,
  SiCopyIcon,
  SiInfoIcon,
  SiStarIcon,
} from '@semantic-icons/lucide-icons';

@Component({
  selector: 'app-button-input-group-demo',
  imports: [
    ScInput,
    ScInputGroup,
    ScInputGroupAddon,
    ScInputGroupButton,
    ScInputGroupText,
    ScPopover,
    ScPopoverPortal,
    ScPopoverProvider,
    ScPopoverTrigger,
    SiCheckIcon,
    SiCopyIcon,
    SiInfoIcon,
    SiStarIcon,
  ],
  template: \`
    <div class="grid w-full max-w-sm gap-6">
      <div scInputGroup>
        <input
          scInput
          value="https://x.com/shadcn"
          aria-label="Profile URL"
          readonly
        />
        <div scInputGroupAddon align="inline-end">
          <button scInputGroupButton size="icon-xs" (click)="copy()">
            @if (copied()) {
              <svg siCheckIcon></svg>
            } @else {
              <svg siCopyIcon></svg>
            }
            <span class="sr-only">Copy</span>
          </button>
        </div>
      </div>
      <div scInputGroup class="[--radius:9999px]">
        <div scInputGroupAddon>
          <div scPopoverProvider align="start">
            <button
              scInputGroupButton
              scPopoverTrigger
              variant="secondary"
              size="icon-xs"
            >
              <svg siInfoIcon></svg>
              <span class="sr-only">Connection</span>
            </button>
            <ng-template scPopoverPortal>
              <div scPopover class="flex flex-col gap-1 rounded-xl text-sm">
                <p class="font-medium">Your connection is not secure.</p>
                <p>
                  You should not enter any sensitive information on this site.
                </p>
              </div>
            </ng-template>
          </div>
        </div>
        <div scInputGroupAddon class="ps-1.5">
          <span scInputGroupText>https://</span>
        </div>
        <input scInput aria-label="Website" />
        <div scInputGroupAddon align="inline-end">
          <button
            scInputGroupButton
            size="icon-xs"
            [attr.aria-pressed]="favorite()"
            (click)="favorite.set(!favorite())"
          >
            <svg
              siStarIcon
              class="in-aria-pressed:fill-blue-600 in-aria-pressed:stroke-blue-600"
            ></svg>
            <span class="sr-only">Favorite</span>
          </button>
        </div>
      </div>
    </div>
  \`,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class ButtonInputGroupDemo {
  protected readonly copied = signal(false);
  protected readonly favorite = signal(false);

  protected async copy(): Promise<void> {
    await navigator.clipboard.writeText('https://x.com/shadcn');
    this.copied.set(true);
  }
}`;
}
