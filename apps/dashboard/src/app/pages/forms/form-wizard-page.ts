import { Component, ViewEncapsulation, inject, signal } from '@angular/core';
import {
  FormField,
  FormRoot,
  email,
  form,
  minLength,
  required,
} from '@angular/forms/signals';
import {
  ScButton,
  ScCard,
  ScCardBody,
  ScCardHeader,
  ScCardTitle,
  ScField,
  ScFieldErrors,
  ScFieldGroup,
  ScInput,
  ScLabel,
  ScLegend,
  ScRadio,
  ScRadioGroup,
  ScStepper,
  ScStepperConnector,
  ScStepperDescription,
  ScStepperIndicator,
  ScStepperItem,
  ScStepperList,
  ScStepperNext,
  ScStepperPanel,
  ScStepperPrevious,
  ScStepperTitle,
  ScStepperTrigger,
  ScToaster,
} from '@semantic-components/ui';
import { SiCheckIcon } from '@semantic-icons/lucide-icons';
import { PageHeader } from '../../layout/page-header';
import { injectFormats } from '../../shared/formats';

const EMPTY = {
  account: { email: '', password: '' },
  profile: { name: '', company: '' },
  plan: { plan: 'pro' },
};

/** Form Wizard (Pro): one form in steps, each checked before the next. */
@Component({
  selector: 'app-form-wizard-page',
  imports: [
    FormField,
    FormRoot,
    ScButton,
    ScCard,
    ScCardBody,
    ScCardHeader,
    ScCardTitle,
    ScField,
    ScFieldErrors,
    ScFieldGroup,
    ScInput,
    ScLabel,
    ScLegend,
    ScRadio,
    ScRadioGroup,
    ScStepper,
    ScStepperDescription,
    ScStepperIndicator,
    ScStepperItem,
    ScStepperList,
    ScStepperNext,
    ScStepperPanel,
    ScStepperPrevious,
    ScStepperConnector,
    ScStepperTitle,
    ScStepperTrigger,
    SiCheckIcon,
    PageHeader,
  ],
  template: `
    <app-page-header
      i18n-title="@@forms.formWizard.formWizard"
      title="Form Wizard"
      [trail]="[{ label: t.forms }, { label: t.wizard }]"
    />

    <form
      [formRoot]="wizardForm"
      class="mx-auto w-full max-w-3xl"
      (submit)="finish($event)"
    >
      <div scCard>
        <div scCardHeader>
          <h2 i18n="@@forms.formWizard.setUpYourWorkspace" scCardTitle>
            Set up your workspace
          </h2>
        </div>
        <div scCardBody>
          <div
            scStepper
            linear
            [(selectedIndex)]="step"
            #stepper="scStepper"
            class="flex flex-col gap-6"
          >
            <div scStepperList>
              <div
                scStepperItem
                [stepControl]="wizardForm.account"
                #s1="scStepperItem"
              >
                <button scStepperTrigger>
                  <span scStepperIndicator>
                    @if (s1.status() === 'complete') {
                      <svg siCheckIcon></svg>
                    } @else {
                      {{ f.count(1) }}
                    }
                  </span>
                  <span
                    i18n="@@forms.formWizard.accountEmailAndPassword"
                    class="flex flex-col items-start"
                  >
                    <span scStepperTitle>Account</span>
                    <span scStepperDescription>Email and password</span>
                  </span>
                </button>
                <div scStepperConnector></div>
              </div>
              <div
                scStepperItem
                [stepControl]="wizardForm.profile"
                #s2="scStepperItem"
              >
                <button scStepperTrigger>
                  <span scStepperIndicator>
                    @if (s2.status() === 'complete') {
                      <svg siCheckIcon></svg>
                    } @else {
                      {{ f.count(2) }}
                    }
                  </span>
                  <span
                    i18n="@@forms.formWizard.profileYouAndYourTeam"
                    class="flex flex-col items-start"
                  >
                    <span scStepperTitle>Profile</span>
                    <span scStepperDescription>You and your team</span>
                  </span>
                </button>
                <div scStepperConnector></div>
              </div>
              <div
                scStepperItem
                [stepControl]="wizardForm.plan"
                #s3="scStepperItem"
              >
                <button scStepperTrigger>
                  <span scStepperIndicator>
                    @if (s3.status() === 'complete') {
                      <svg siCheckIcon></svg>
                    } @else {
                      {{ f.count(3) }}
                    }
                  </span>
                  <span
                    i18n="@@forms.formWizard.planAndReview"
                    class="flex flex-col items-start"
                  >
                    <span scStepperTitle>Plan</span>
                    <span scStepperDescription>And review</span>
                  </span>
                </button>
              </div>
            </div>

            <div scStepperPanel [step]="0">
              <div scFieldGroup>
                <div scField>
                  <label i18n="@@forms.formWizard.email" scLabel>Email</label>
                  <input
                    scInput
                    type="email"
                    autocomplete="email"
                    [formField]="wizardForm.account.email"
                  />
                  <div scFieldErrors></div>
                </div>
                <div scField>
                  <label i18n="@@forms.formWizard.password" scLabel
                    >Password</label
                  >
                  <input
                    scInput
                    type="password"
                    autocomplete="new-password"
                    [formField]="wizardForm.account.password"
                  />
                  <div scFieldErrors></div>
                </div>
              </div>
            </div>

            <div scStepperPanel [step]="1">
              <div scFieldGroup>
                <div scField>
                  <label i18n="@@forms.formWizard.yourName" scLabel
                    >Your name</label
                  >
                  <input
                    scInput
                    autocomplete="name"
                    [formField]="wizardForm.profile.name"
                  />
                  <div scFieldErrors></div>
                </div>
                <div scField>
                  <label i18n="@@forms.formWizard.company" scLabel
                    >Company</label
                  >
                  <input
                    scInput
                    autocomplete="organization"
                    [formField]="wizardForm.profile.company"
                  />
                  <div scFieldErrors></div>
                </div>
              </div>
            </div>

            <div scStepperPanel [step]="2">
              <div scFieldGroup>
                <fieldset class="flex flex-col gap-3">
                  <legend
                    i18n="@@forms.formWizard.plan"
                    scLegend
                    variant="label"
                  >
                    Plan
                  </legend>
                  <div
                    scRadioGroup
                    [formField]="wizardForm.plan.plan"
                    class="grid gap-3 sm:grid-cols-3"
                  >
                    @for (p of plans; track p.value) {
                      <label
                        scLabel
                        class="has-checked:border-primary flex-col items-start rounded-lg border p-4"
                      >
                        <span class="flex items-center gap-2"
                          ><input scRadio type="radio" [value]="p.value" />{{
                            p.label
                          }}</span
                        >
                        <span
                          i18n="@@forms.formWizard.perMonth"
                          class="text-muted-foreground font-normal"
                          >{{ f.wholeMoney(p.price) }} / month</span
                        >
                      </label>
                    }
                  </div>
                </fieldset>
                <dl
                  class="bg-muted/50 grid grid-cols-[auto_1fr] gap-x-6 gap-y-2 rounded-lg p-4 text-sm"
                >
                  <dt
                    i18n="@@forms.formWizard.email"
                    class="text-muted-foreground"
                  >
                    Email
                  </dt>
                  <dd>{{ model().account.email || '—' }}</dd>
                  <dt
                    i18n="@@forms.formWizard.name"
                    class="text-muted-foreground"
                  >
                    Name
                  </dt>
                  <dd>{{ model().profile.name || '—' }}</dd>
                  <dt
                    i18n="@@forms.formWizard.company"
                    class="text-muted-foreground"
                  >
                    Company
                  </dt>
                  <dd>{{ model().profile.company || '—' }}</dd>
                </dl>
              </div>
            </div>

            <div class="flex justify-between gap-2">
              <button
                i18n="@@forms.formWizard.back"
                scStepperPrevious
                type="button"
              >
                Back
              </button>
              @if (stepper.isLastStep()) {
                <button
                  i18n="@@forms.formWizard.createWorkspace"
                  scButton
                  type="submit"
                >
                  Create workspace
                </button>
              } @else {
                <button
                  i18n="@@forms.formWizard.next"
                  scStepperNext
                  type="button"
                >
                  Next
                </button>
              }
            </div>
          </div>
        </div>
      </div>
    </form>
  `,
  host: { class: 'flex flex-col gap-4' },
  encapsulation: ViewEncapsulation.None,
})
export class FormWizardPage {
  /** Figures as the library writes them (the dashboard's choices). */
  private readonly f = injectFormats();
  /** In the user's numbering system. */

  /** In the user's numbering system. */

  /** The template's words that sit in bindings, translated. */
  private readonly t = {
    forms: $localize`:@@forms.formWizard.forms:Forms`,
    wizard: $localize`:@@forms.formWizard.wizard:Wizard`,
  };

  private readonly toaster = inject(ScToaster);
  private readonly step = signal(0);
  private readonly plans = [
    {
      value: 'starter',
      label: $localize`:@@forms.formWizard.starter:Starter`,
      price: 19,
    },
    {
      value: 'pro',
      label: $localize`:@@forms.formWizard.pro:Pro`,
      price: 49,
    },
    {
      value: 'team',
      label: $localize`:@@forms.formWizard.team:Team`,
      price: 99,
    },
  ];
  private readonly model = signal(structuredClone(EMPTY));
  private readonly wizardForm = form(this.model, (path) => {
    required(path.account.email);
    email(path.account.email);
    required(path.account.password);
    minLength(path.account.password, 8);
    required(path.profile.name);
    required(path.profile.company);
    required(path.plan.plan);
  });

  private finish(event: Event): void {
    event.preventDefault();
    if (this.wizardForm().invalid()) return;
    this.toaster.show({
      variant: 'success',
      title: $localize`:@@forms.formWizard.isReady:${this.model().profile.company} is ready`,
      description: $localize`:@@forms.formWizard.yourWorkspaceWasCreated:Your workspace was created.`,
    });
    this.model.set(structuredClone(EMPTY));
    this.wizardForm().reset();
    this.step.set(0);
  }
}
