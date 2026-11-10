import { Component, ViewEncapsulation } from '@angular/core';
import { UsageCode } from '../../../../components/usage-code/usage-code';
import { AvatarUsageDemo } from './avatar-usage-demo';

@Component({
  selector: 'app-avatar-usage-demo-container',
  imports: [UsageCode, AvatarUsageDemo],
  template: `
    <app-usage-code [code]="code">
      <ng-template><app-avatar-usage-demo /></ng-template>
    </app-usage-code>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class AvatarUsageDemoContainer {
  readonly code = `import { Component, ViewEncapsulation } from '@angular/core';
import {
  ScAvatar,
  ScAvatarFallback,
  ScAvatarImage,
} from '@semantic-components/ui';

@Component({
  selector: 'app-avatar-usage-demo',
  imports: [ScAvatar, ScAvatarFallback, ScAvatarImage],
  template: \`
    <span scAvatar>
      <img scAvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
      <span scAvatarFallback>CN</span>
    </span>
  \`,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class AvatarUsageDemo {}`;
}
