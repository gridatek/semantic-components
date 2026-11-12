import { Component, ViewEncapsulation } from '@angular/core';
import {
  ScButton,
  ScCard,
  ScCardContent,
  ScCardDescription,
  ScCardFooter,
  ScCardHeader,
  ScCardTitle,
  ScFrame,
} from '@semantic-components/ui';

/** A deployment's variables, the secret ones masked. */
@Component({
  selector: 'app-preview-environment-variables',
  imports: [
    ScFrame,
    ScButton,
    ScCard,
    ScCardContent,
    ScCardDescription,
    ScCardFooter,
    ScCardHeader,
    ScCardTitle,
  ],
  template: `
    <div scCard>
      <div scCardHeader>
        <h2 scCardTitle>Environment Variables</h2>
        <p scCardDescription>Production · 8 variables</p>
      </div>
      <div scCardContent class="flex flex-col gap-2">
        @for (env of variables; track env.key) {
          <div
            scFrame
            class="flex items-center gap-2 px-2.5 py-2 font-mono text-xs"
          >
            <span class="font-medium">{{ env.key }}</span>
            <span class="text-muted-foreground ms-auto">
              @if (env.masked) {
                <span aria-hidden="true">••••••••</span>
                <span class="sr-only">Hidden</span>
              } @else {
                https://api.example.com
              }
            </span>
          </div>
        }
      </div>
      <div scCardFooter>
        <button scButton variant="outline">Edit</button>
        <button scButton class="ms-auto">Deploy</button>
      </div>
    </div>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class PreviewEnvironmentVariables {
  protected readonly variables = [
    { key: 'DATABASE_URL', masked: true },
    { key: 'NEXT_PUBLIC_API', masked: false },
    { key: 'STRIPE_SECRET', masked: true },
  ];
}
