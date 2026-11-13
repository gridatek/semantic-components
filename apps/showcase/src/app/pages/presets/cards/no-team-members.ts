import { Component, ViewEncapsulation } from '@angular/core';
import {
  ScAvatar,
  ScAvatarFallback,
  ScAvatarGroup,
  ScAvatarImage,
  ScButton,
  ScCard,
  ScCardBody,
  ScEmpty,
  ScEmptyBody,
  ScEmptyDescription,
  ScEmptyHeader,
  ScEmptyMedia,
  ScEmptyTitle,
} from '@semantic-components/ui';

/** No team yet: avatars as the empty state's picture. */
@Component({
  selector: 'app-preview-no-team-members',
  imports: [
    ScAvatar,
    ScAvatarFallback,
    ScAvatarGroup,
    ScAvatarImage,
    ScButton,
    ScCard,
    ScCardBody,
    ScEmpty,
    ScEmptyBody,
    ScEmptyDescription,
    ScEmptyHeader,
    ScEmptyMedia,
    ScEmptyTitle,
  ],
  template: `
    <div scCard>
      <div scCardBody>
        <div scEmpty class="h-56 border">
          <div scEmptyHeader>
            <div scEmptyMedia>
              <div scAvatarGroup class="grayscale">
                @for (person of people; track person.handle) {
                  <span scAvatar size="lg">
                    <img
                      scAvatarImage
                      [src]="'https://github.com/' + person.handle + '.png'"
                      [alt]="'@' + person.handle"
                    />
                    <span scAvatarFallback>{{ person.initials }}</span>
                  </span>
                }
              </div>
            </div>
            <h2 scEmptyTitle>No Team Members</h2>
            <div scEmptyDescription>
              Invite your team to collaborate on this project.
            </div>
          </div>
          <div scEmptyBody>
            <button scButton size="sm">Invite Members</button>
          </div>
        </div>
      </div>
    </div>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class PreviewNoTeamMembers {
  protected readonly people = [
    { handle: 'shadcn', initials: 'CN' },
    { handle: 'maxleiter', initials: 'LR' },
    { handle: 'evilrabbit', initials: 'ER' },
  ];
}
