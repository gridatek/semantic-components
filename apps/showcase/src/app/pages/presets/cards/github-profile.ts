import { Component, ViewEncapsulation, signal } from '@angular/core';
import { FormField, form } from '@angular/forms/signals';
import {
  ScButton,
  ScCard,
  ScCardContent,
  ScCardDescription,
  ScCardFooter,
  ScCardHeader,
  ScCardTitle,
  ScField,
  ScFieldDescription,
  ScFieldGroup,
  ScInput,
  ScLabel,
  ScNativeSelect,
  ScNativeSelectContainer,
  ScNativeSelectIcon,
  ScNativeSelectOption,
  ScTextarea,
} from '@semantic-components/ui';
import { SiChevronDownIcon } from '@semantic-icons/lucide-icons';

/** A profile form: each field with a description under it. */
@Component({
  selector: 'app-preview-github-profile',
  imports: [
    FormField,
    ScButton,
    ScCard,
    ScCardContent,
    ScCardDescription,
    ScCardFooter,
    ScCardHeader,
    ScCardTitle,
    ScField,
    ScFieldDescription,
    ScFieldGroup,
    ScInput,
    ScLabel,
    ScNativeSelect,
    ScNativeSelectContainer,
    ScNativeSelectIcon,
    ScNativeSelectOption,
    ScTextarea,
    SiChevronDownIcon,
  ],
  template: `
    <div scCard class="mx-auto w-full max-w-md">
      <div scCardHeader>
        <h2 scCardTitle>Profile</h2>
        <p scCardDescription>Manage your profile information.</p>
      </div>
      <div scCardContent>
        <div scFieldGroup>
          <div scField>
            <label scLabel>Name</label>
            <input scInput placeholder="shadcn" [formField]="profile.name" />
            <p scFieldDescription>
              Your name may appear around GitHub where you contribute or are
              mentioned. You can remove it at any time.
            </p>
          </div>
          <div scField>
            <label scLabel>Public Email</label>
            <div scNativeSelectContainer class="w-full">
              <select scNativeSelect [formField]="profile.email">
                <option scNativeSelectOption value="m@shadcn.com">
                  m&#64;shadcn.com
                </option>
                <option scNativeSelectOption value="m@gmail.com">
                  m&#64;gmail.com
                </option>
              </select>
              <svg siChevronDownIcon scNativeSelectIcon></svg>
            </div>
            <p scFieldDescription>
              You can manage verified email addresses in your
              <a href="#email-settings">email settings</a>.
            </p>
          </div>
          <div scField>
            <label scLabel>Bio</label>
            <textarea
              scTextarea
              placeholder="Tell us a little bit about yourself"
              [formField]="profile.bio"
            ></textarea>
            <p scFieldDescription>
              You can <span>&#64;mention</span> other users and organizations to
              link to them.
            </p>
          </div>
        </div>
      </div>
      <div scCardFooter>
        <button scButton>Save Profile</button>
      </div>
    </div>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class PreviewGithubProfile {
  protected readonly profile = form(
    signal({ name: '', email: 'm@shadcn.com', bio: '' }),
  );
}
