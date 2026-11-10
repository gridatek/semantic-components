import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { SpacingCardDemo } from './spacing-card-demo';

@Component({
  selector: 'app-spacing-card-demo-container',
  imports: [DemoContainer, SpacingCardDemo],
  template: `
    <app-demo-container
      title="Spacing"
      demoUrl="/demos/card/spacing-card-demo"
      [code]="code"
    >
      <app-spacing-card-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class SpacingCardDemoContainer {
  readonly code = `import { Component, ViewEncapsulation, computed, signal } from '@angular/core';
import {
  ScButton,
  ScCard,
  ScCardContent,
  ScCardDescription,
  ScCardFooter,
  ScCardHeader,
  ScCardTitle,
  ScToggleGroup,
  ScToggleGroupItem,
} from '@semantic-components/ui';

/**
 * The --card-spacing variable: the gap between the sections and the inset of
 * every part, set with a class.
 */
@Component({
  selector: 'app-spacing-card-demo',
  imports: [
    ScButton,
    ScCard,
    ScCardContent,
    ScCardDescription,
    ScCardFooter,
    ScCardHeader,
    ScCardTitle,
    ScToggleGroup,
    ScToggleGroupItem,
  ],
  template: \`
    <div class="grid w-full max-w-sm gap-4">
      <div
        scToggleGroup
        variant="outline"
        size="sm"
        aria-label="Card spacing"
        class="justify-center"
        [value]="[spacing()]"
        (valueChange)="choose($event[0])"
      >
        @for (option of options; track option.value) {
          <button scToggleGroupItem [value]="option.value">
            {{ option.label }}
          </button>
        }
      </div>
      <div scCard [class]="spacingClass()">
        <div scCardHeader>
          <h4 scCardTitle>Weekly digest</h4>
          <p scCardDescription>
            A summary of your team&apos;s activity, every Monday.
          </p>
        </div>
        <div scCardContent>
          <p class="text-sm">
            Mentions, merged pull requests and upcoming deadlines, in one email.
          </p>
        </div>
        <div scCardFooter class="gap-2">
          <button scButton variant="outline">Preview</button>
          <button scButton>Subscribe</button>
        </div>
      </div>
    </div>
  \`,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class SpacingCardDemo {
  protected readonly options = [
    { value: '4', label: '16px', class: '[--card-spacing:--spacing(4)]' },
    { value: '5', label: '20px', class: '[--card-spacing:--spacing(5)]' },
    { value: '6', label: '24px', class: '[--card-spacing:--spacing(6)]' },
    { value: '8', label: '32px', class: '[--card-spacing:--spacing(8)]' },
  ];

  protected readonly spacing = signal('4');

  protected readonly spacingClass = computed(
    () => this.options.find((o) => o.value === this.spacing())?.class ?? '',
  );

  protected choose(value: string | string[] | null): void {
    // A single group: keep a choice, even when the chosen one is pressed again.
    if (typeof value === 'string' && value) this.spacing.set(value);
  }
}`;
}
