import { Component, ViewEncapsulation, inject, signal } from '@angular/core';
import {
  FormField,
  FormRoot,
  applyEach,
  email,
  form,
  required,
  submit,
} from '@angular/forms/signals';
import {
  ScButton,
  ScCard,
  ScCardBody,
  ScCardDescription,
  ScCardFooter,
  ScCardHeader,
  ScCardTitle,
  ScField,
  ScFieldErrors,
  ScInput,
  ScLabel,
  ScNativeSelect,
  ScNativeSelectContainer,
  ScNativeSelectIcon,
  ScNativeSelectOption,
  ScToaster,
} from '@semantic-components/ui';
import {
  SiChevronDownIcon,
  SiPlusIcon,
  SiTrash2Icon,
} from '@semantic-icons/lucide-icons';
import { PageHeader } from '../../layout/page-header';

interface Member {
  name: string;
  email: string;
  role: 'Admin' | 'Editor' | 'Viewer';
}

const blank = (): Member => ({ name: '', email: '', role: 'Editor' });

/** Repeater Forms (Pro): rows of the same fields, added and removed, checked as one. */
@Component({
  selector: 'app-form-repeater-page',
  imports: [
    FormField,
    FormRoot,
    ScButton,
    ScCard,
    ScCardBody,
    ScCardDescription,
    ScCardFooter,
    ScCardHeader,
    ScCardTitle,
    ScField,
    ScFieldErrors,
    ScInput,
    ScLabel,
    ScNativeSelect,
    ScNativeSelectContainer,
    ScNativeSelectIcon,
    ScNativeSelectOption,
    SiChevronDownIcon,
    SiPlusIcon,
    SiTrash2Icon,
    PageHeader,
  ],
  template: `
    <app-page-header
      i18n-title="@@forms.formRepeater.repeaterForms"
      title="Repeater Forms"
      [trail]="[{ label: t.forms }, { label: t.repeater }]"
    />

    <form
      [formRoot]="inviteForm"
      class="mx-auto w-full max-w-4xl"
      (submit)="send($event)"
    >
      <div scCard>
        <div scCardHeader>
          <h2 i18n="@@forms.formRepeater.inviteYourTeam" scCardTitle>
            Invite your team
          </h2>
          <p i18n="@@forms.formRepeater.oneRowPerPersonUp" scCardDescription>
            One row per person; up to ten at a time.
          </p>
        </div>
        <div scCardBody class="flex flex-col gap-4">
          @for (member of inviteForm.members; track $index; let i = $index) {
            <fieldset
              class="grid items-start gap-3 rounded-lg border p-4 md:grid-cols-[1fr_1fr_10rem_auto]"
            >
              <legend
                i18n="@@forms.formRepeater.person"
                class="text-muted-foreground px-1 text-xs"
              >
                Person {{ i + 1 }}
              </legend>
              <div scField>
                <label i18n="@@forms.formRepeater.name" scLabel>Name</label>
                <input scInput [formField]="member.name" />
                <div scFieldErrors></div>
              </div>
              <div scField>
                <label i18n="@@forms.formRepeater.email" scLabel>Email</label>
                <input scInput type="email" [formField]="member.email" />
                <div scFieldErrors></div>
              </div>
              <div scField>
                <label i18n="@@forms.formRepeater.role" scLabel>Role</label>
                <div scNativeSelectContainer class="w-full">
                  <select scNativeSelect [formField]="member.role">
                    <option
                      i18n="@@forms.formRepeater.admin"
                      scNativeSelectOption
                      value="Admin"
                    >
                      Admin
                    </option>
                    <option
                      i18n="@@forms.formRepeater.editor"
                      scNativeSelectOption
                      value="Editor"
                    >
                      Editor
                    </option>
                    <option
                      i18n="@@forms.formRepeater.viewer"
                      scNativeSelectOption
                      value="Viewer"
                    >
                      Viewer
                    </option>
                  </select>
                  <svg siChevronDownIcon scNativeSelectIcon></svg>
                </div>
              </div>
              <button
                scButton
                type="button"
                variant="ghost"
                size="icon"
                class="md:mt-6"
                [disabled]="model().members.length === 1"
                (click)="remove(i)"
              >
                <svg siTrash2Icon></svg>
                <span i18n="@@forms.formRepeater.removePerson" class="sr-only"
                  >Remove person {{ i + 1 }}</span
                >
              </button>
            </fieldset>
          }
          <button
            scButton
            type="button"
            variant="outline"
            class="self-start"
            [disabled]="model().members.length >= 10"
            (click)="add()"
          >
            <svg siPlusIcon></svg>
            <ng-container i18n="@@forms.formRepeater.addAPerson"
              >Add a person</ng-container
            >
          </button>
        </div>
        <div scCardFooter class="justify-between">
          <span
            i18n="@@forms.formRepeater.of10"
            class="text-muted-foreground text-sm"
            >{{ model().members.length }} of 10</span
          >
          <button
            i18n="@@forms.formRepeater.sendInvitations"
            scButton
            type="submit"
          >
            Send invitations
          </button>
        </div>
      </div>
    </form>
  `,
  host: { class: 'flex flex-col gap-4' },
  encapsulation: ViewEncapsulation.None,
})
export class FormRepeaterPage {
  /** The template's words that sit in bindings, translated. */
  private readonly t = {
    forms: $localize`:@@forms.formRepeater.forms:Forms`,
    repeater: $localize`:@@forms.formRepeater.repeater:Repeater`,
  };

  private readonly toaster = inject(ScToaster);
  private readonly model = signal<{ members: Member[] }>({
    members: [
      {
        name: 'Emily Carter',
        email: 'emily.carter@northwind.io',
        role: 'Admin',
      },
      blank(),
    ],
  });
  private readonly inviteForm = form(this.model, (path) => {
    applyEach(path.members, (member) => {
      required(member.name, {
        message: $localize`:@@forms.formRepeater.aNameIsNeeded:A name is needed.`,
      });
      required(member.email, {
        message: $localize`:@@forms.formRepeater.anEmailIsNeeded:An email is needed.`,
      });
      email(member.email, {
        message: $localize`:@@forms.formRepeater.notAnEmailAddress:Not an email address.`,
      });
    });
  });

  private add(): void {
    this.model.update((m) => ({ members: [...m.members, blank()] }));
  }

  private remove(index: number): void {
    this.model.update((m) => ({
      members: m.members.filter((_, i) => i !== index),
    }));
  }

  private send(event: Event): void {
    event.preventDefault();
    void submit(this.inviteForm, async () => {
      const count = this.model().members.length;
      this.toaster.show({
        variant: 'success',
        title: $localize`:@@forms.formRepeater.invitationsSent:${count} invitations sent`,
      });
      this.model.set({ members: [blank()] });
      this.inviteForm().reset();
      return undefined;
    });
  }
}
