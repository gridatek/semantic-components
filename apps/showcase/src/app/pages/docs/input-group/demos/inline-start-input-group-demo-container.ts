import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { InlineStartInputGroupDemo } from './inline-start-input-group-demo';

@Component({
  selector: 'app-inline-start-input-group-demo-container',
  imports: [DemoContainer, InlineStartInputGroupDemo],
  template: `
    <app-demo-container
      title="Inline Start"
      demoUrl="/demos/input-group/inline-start-input-group-demo"
      [code]="code"
    >
      <app-inline-start-input-group-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class InlineStartInputGroupDemoContainer {
  readonly code = `import { Component, ViewEncapsulation } from '@angular/core';
import {
  ScField,
  ScFieldDescription,
  ScInput,
  ScInputGroup,
  ScInputGroupAddon,
  ScLabel,
} from '@semantic-components/ui';
import { SiSearchIcon } from '@semantic-icons/lucide-icons';

@Component({
  selector: 'app-inline-start-input-group-demo',
  imports: [
    ScField,
    ScFieldDescription,
    ScInput,
    ScInputGroup,
    ScInputGroupAddon,
    ScLabel,
    SiSearchIcon,
  ],
  template: \`
    <div scField class="max-w-sm">
      <label scLabel>Search</label>
      <div scInputGroup>
        <input scInput placeholder="Search..." />
        <div scInputGroupAddon align="inline-start">
          <svg siSearchIcon class="text-muted-foreground"></svg>
        </div>
      </div>
      <p scFieldDescription>Icon positioned at the start.</p>
    </div>
  \`,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class InlineStartInputGroupDemo {}`;
}
