import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { InTextLinkDemo } from './in-text-link-demo';

@Component({
  selector: 'app-in-text-link-demo-container',
  imports: [DemoContainer, InTextLinkDemo],
  template: `
    <app-demo-container
      title="In text"
      demoUrl="/demos/link/in-text-link-demo"
      [code]="code"
    >
      <app-in-text-link-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class InTextLinkDemoContainer {
  readonly code = `import { Component, ViewEncapsulation } from '@angular/core';
import { ScLink } from '@semantic-components/ui';

/** A link in a sentence: underlined, in the text's colour and size. */
@Component({
  selector: 'app-in-text-link-demo',
  imports: [ScLink],
  template: \`
    <div class="max-w-md space-y-4 text-sm">
      <p>
        Read the
        <a scLink href="/docs/components/button">Button</a>
        docs before you style a link as one.
      </p>
      <p class="text-muted-foreground">
        By continuing, you agree to our
        <a scLink href="/docs/components/link">Terms of Service</a>
        and
        <a scLink href="/docs/components/link">Privacy Policy</a>.
      </p>
    </div>
  \`,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class InTextLinkDemo {}`;
}
