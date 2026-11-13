import { Component, ViewEncapsulation } from '@angular/core';
import {
  ScAvatar,
  ScAvatarFallback,
  ScAvatarImage,
  ScBadge,
  ScCard,
  ScCardBody,
  ScCardFooter,
  ScCardHeader,
  ScCardTitle,
} from '@semantic-components/ui';

/** Contributors: a count, their avatars, a link to the rest. */
@Component({
  selector: 'app-preview-contributors',
  imports: [
    ScAvatar,
    ScAvatarFallback,
    ScAvatarImage,
    ScBadge,
    ScCard,
    ScCardBody,
    ScCardFooter,
    ScCardHeader,
    ScCardTitle,
  ],
  template: `
    <div scCard>
      <div scCardHeader>
        <h2 scCardTitle>
          Contributors <span scBadge variant="secondary">312</span>
        </h2>
      </div>
      <div scCardBody>
        <ul class="flex flex-wrap gap-2" aria-label="Contributors">
          @for (username of usernames; track username) {
            <li>
              <span scAvatar class="grayscale">
                <img
                  scAvatarImage
                  [src]="'https://github.com/' + username + '.png'"
                  [alt]="username"
                />
                <span scAvatarFallback>{{ username.charAt(0) }}</span>
              </span>
            </li>
          }
        </ul>
      </div>
      <div scCardFooter>
        <a href="#" class="text-sm underline underline-offset-4">
          + 810 contributors
        </a>
      </div>
    </div>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class PreviewContributors {
  protected readonly usernames = [
    'shadcn',
    'vercel',
    'nextjs',
    'tailwindlabs',
    'typescript-lang',
    'eslint',
    'prettier',
    'babel',
    'webpack',
    'rollup',
    'parcel',
    'vite',
    'react',
    'vue',
    'angular',
    'solid',
  ];
}
