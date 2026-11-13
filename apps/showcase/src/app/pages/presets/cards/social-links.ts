import { Component, ViewEncapsulation, signal } from '@angular/core';
import { FormField, form } from '@angular/forms/signals';
import {
  ScButton,
  ScCard,
  ScCardBody,
  ScCardFooter,
  ScCardHeader,
  ScCardTitle,
  ScField,
  ScFieldGroup,
  ScInput,
  ScInputGroup,
  ScInputGroupAddon,
  ScLabel,
} from '@semantic-components/ui';
import {
  SiCameraIcon,
  SiCirclePlusIcon,
  SiCloudIcon,
  SiGlobeIcon,
} from '@semantic-icons/lucide-icons';

/** An artist's links: four fields, each an icon and an input. */
@Component({
  selector: 'app-preview-social-links',
  imports: [
    FormField,
    ScButton,
    ScCard,
    ScCardBody,
    ScCardFooter,
    ScCardHeader,
    ScCardTitle,
    ScField,
    ScFieldGroup,
    ScInput,
    ScInputGroup,
    ScInputGroupAddon,
    ScLabel,
    SiCameraIcon,
    SiCirclePlusIcon,
    SiCloudIcon,
    SiGlobeIcon,
  ],
  template: `
    <div scCard>
      <div scCardHeader>
        <h2 scCardTitle>Social Links</h2>
      </div>
      <div scCardBody>
        <div scFieldGroup>
          <div scField>
            <label scLabel>Spotify Artist URL</label>
            <div scInputGroup>
              <input scInput [formField]="links.spotify" />
              <div scInputGroupAddon><svg siCirclePlusIcon></svg></div>
            </div>
          </div>
          <div scField>
            <label scLabel>Instagram Handle</label>
            <div scInputGroup>
              <input scInput [formField]="links.instagram" />
              <div scInputGroupAddon><svg siCameraIcon></svg></div>
            </div>
          </div>
          <div scField>
            <label scLabel>SoundCloud URL</label>
            <div scInputGroup>
              <input
                scInput
                placeholder="soundcloud.com/username"
                [formField]="links.soundcloud"
              />
              <div scInputGroupAddon><svg siCloudIcon></svg></div>
            </div>
          </div>
          <div scField>
            <label scLabel>Website</label>
            <div scInputGroup>
              <input
                scInput
                placeholder="https://yoursite.com"
                [formField]="links.website"
              />
              <div scInputGroupAddon><svg siGlobeIcon></svg></div>
            </div>
          </div>
        </div>
      </div>
      <div scCardFooter class="justify-end gap-2">
        <button scButton variant="secondary">Discard</button>
        <button scButton>Save Changes</button>
      </div>
    </div>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class PreviewSocialLinks {
  protected readonly links = form(
    signal({
      spotify: 'spotify.com/artist/3j...2k',
      instagram: '@julianduryea_music',
      soundcloud: '',
      website: '',
    }),
  );
}
