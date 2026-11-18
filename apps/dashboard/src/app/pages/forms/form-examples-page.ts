import { Component, ViewEncapsulation, inject, signal } from '@angular/core';
import {
  FormField,
  FormRoot,
  email,
  form,
  pattern,
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
  ScFieldGroup,
  ScInput,
  ScInputGroup,
  ScInputGroupAddon,
  ScLabel,
  ScLegend,
  ScNativeSelect,
  ScNativeSelectContainer,
  ScNativeSelectIcon,
  ScNativeSelectOption,
  ScRadio,
  ScRadioGroup,
  ScSwitch,
  ScTextarea,
  ScToaster,
} from '@semantic-components/ui';
import {
  SiChevronDownIcon,
  SiCreditCardIcon,
  SiMailIcon,
} from '@semantic-icons/lucide-icons';
import { PageHeader } from '../../layout/page-header';

/** Form Examples (Pro): forms a product needs — contact, newsletter, card, feedback. */
@Component({
  selector: 'app-form-examples-page',
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
    ScFieldGroup,
    ScInput,
    ScInputGroup,
    ScInputGroupAddon,
    ScLabel,
    ScLegend,
    ScNativeSelect,
    ScNativeSelectContainer,
    ScNativeSelectIcon,
    ScNativeSelectOption,
    ScRadio,
    ScRadioGroup,
    ScSwitch,
    ScTextarea,
    SiChevronDownIcon,
    SiCreditCardIcon,
    SiMailIcon,
    PageHeader,
  ],
  template: `
    <app-page-header
      i18n-title="@@forms.formExamples.formExamples"
      title="Form Examples"
      [trail]="[{ label: t.forms }, { label: t.examples }]"
    />

    <div class="grid gap-4 xl:grid-cols-2">
      <form [formRoot]="contactForm" (submit)="sendContact($event)">
        <div scCard>
          <div scCardHeader>
            <h2 i18n="@@forms.formExamples.contactUs" scCardTitle>
              Contact us
            </h2>
            <p
              i18n="@@forms.formExamples.weReplyWithinAWorking"
              scCardDescription
            >
              We reply within a working day
            </p>
          </div>
          <div scCardBody>
            <div scFieldGroup>
              <div class="grid gap-4 sm:grid-cols-2">
                <div scField>
                  <label i18n="@@forms.formExamples.name" scLabel>Name</label>
                  <input
                    scInput
                    autocomplete="name"
                    [formField]="contactForm.name"
                  />
                  <div scFieldErrors></div>
                </div>
                <div scField>
                  <label i18n="@@forms.formExamples.email" scLabel>Email</label>
                  <input
                    scInput
                    type="email"
                    autocomplete="email"
                    [formField]="contactForm.email"
                  />
                  <div scFieldErrors></div>
                </div>
              </div>
              <div scField>
                <label i18n="@@forms.formExamples.topic" scLabel>Topic</label>
                <div scNativeSelectContainer class="w-full">
                  <select scNativeSelect [formField]="contactForm.topic">
                    <option
                      i18n="@@forms.formExamples.sales"
                      scNativeSelectOption
                      value="sales"
                    >
                      Sales
                    </option>
                    <option
                      i18n="@@forms.formExamples.support"
                      scNativeSelectOption
                      value="support"
                    >
                      Support
                    </option>
                    <option
                      i18n="@@forms.formExamples.press"
                      scNativeSelectOption
                      value="press"
                    >
                      Press
                    </option>
                  </select>
                  <svg siChevronDownIcon scNativeSelectIcon></svg>
                </div>
              </div>
              <div scField>
                <label i18n="@@forms.formExamples.message" scLabel
                  >Message</label
                >
                <textarea
                  scTextarea
                  rows="4"
                  [formField]="contactForm.message"
                ></textarea>
                <div scFieldErrors></div>
              </div>
            </div>
          </div>
          <div scCardFooter class="justify-end">
            <button
              i18n="@@forms.formExamples.sendMessage"
              scButton
              type="submit"
            >
              Send message
            </button>
          </div>
        </div>
      </form>

      <div class="flex flex-col gap-4">
        <form [formRoot]="newsletterForm" (submit)="sendNewsletter($event)">
          <div scCard>
            <div scCardHeader>
              <h2 i18n="@@forms.formExamples.newsletter" scCardTitle>
                Newsletter
              </h2>
              <p i18n="@@forms.formExamples.oneEmailAMonthNo" scCardDescription>
                One email a month, no more
              </p>
            </div>
            <div scCardBody>
              <div scField>
                <label i18n="@@forms.formExamples.email" scLabel class="sr-only"
                  >Email</label
                >
                <div class="flex gap-2">
                  <div scInputGroup>
                    <input
                      i18n-placeholder="@@forms.formExamples.youExampleCom"
                      scInput
                      type="email"
                      placeholder="you@example.com"
                      [formField]="newsletterForm.email"
                    />
                    <div scInputGroupAddon><svg siMailIcon></svg></div>
                  </div>
                  <button
                    i18n="@@forms.formExamples.subscribe"
                    scButton
                    type="submit"
                  >
                    Subscribe
                  </button>
                </div>
                <div scFieldErrors></div>
              </div>
            </div>
          </div>
        </form>

        <form [formRoot]="feedbackForm" (submit)="sendFeedback($event)">
          <div scCard>
            <div scCardHeader>
              <h2 i18n="@@forms.formExamples.feedback" scCardTitle>Feedback</h2>
              <p
                i18n="@@forms.formExamples.howWasYourExperience"
                scCardDescription
              >
                How was your experience?
              </p>
            </div>
            <div scCardBody>
              <div scFieldGroup>
                <fieldset class="flex flex-col gap-3">
                  <legend
                    i18n="@@forms.formExamples.yourRating"
                    scLegend
                    variant="label"
                  >
                    Your rating
                  </legend>
                  <div
                    scRadioGroup
                    [formField]="feedbackForm.rating"
                    class="flex flex-wrap gap-4"
                  >
                    @for (r of ratings; track r) {
                      <label scLabel
                        ><input scRadio type="radio" [value]="r" />{{
                          r
                        }}</label
                      >
                    }
                  </div>
                </fieldset>
                <div scField orientation="horizontal">
                  <input scSwitch [formField]="feedbackForm.contact" />
                  <label
                    i18n="@@forms.formExamples.youMayContactMeAbout"
                    scLabel
                    >You may contact me about it</label
                  >
                </div>
              </div>
            </div>
            <div scCardFooter class="justify-end">
              <button
                i18n="@@forms.formExamples.sendFeedback"
                scButton
                type="submit"
              >
                Send feedback
              </button>
            </div>
          </div>
        </form>
      </div>

      <form
        [formRoot]="cardForm"
        class="xl:col-span-2"
        (submit)="sendCard($event)"
      >
        <div scCard>
          <div scCardHeader>
            <h2 i18n="@@forms.formExamples.paymentCard" scCardTitle>
              Payment card
            </h2>
            <p
              i18n="@@forms.formExamples.usedForYourSubscription"
              scCardDescription
            >
              Used for your subscription
            </p>
          </div>
          <div scCardBody>
            <div scFieldGroup class="grid gap-4 md:grid-cols-4">
              <div scField class="md:col-span-2">
                <label i18n="@@forms.formExamples.nameOnTheCard" scLabel
                  >Name on the card</label
                >
                <input
                  scInput
                  autocomplete="cc-name"
                  [formField]="cardForm.name"
                />
                <div scFieldErrors></div>
              </div>
              <div scField class="md:col-span-2">
                <label i18n="@@forms.formExamples.cardNumber" scLabel
                  >Card number</label
                >
                <div scInputGroup>
                  <input
                    scInput
                    inputmode="numeric"
                    autocomplete="cc-number"
                    [formField]="cardForm.number"
                  />
                  <div scInputGroupAddon><svg siCreditCardIcon></svg></div>
                </div>
                <div scFieldErrors></div>
              </div>
              <div scField>
                <label i18n="@@forms.formExamples.expiryMmYy" scLabel
                  >Expiry (MM/YY)</label
                >
                <input
                  scInput
                  autocomplete="cc-exp"
                  [formField]="cardForm.expiry"
                />
                <div scFieldErrors></div>
              </div>
              <div scField>
                <label scLabel>CVC</label>
                <input
                  scInput
                  inputmode="numeric"
                  autocomplete="cc-csc"
                  [formField]="cardForm.cvc"
                />
                <div scFieldErrors></div>
              </div>
            </div>
          </div>
          <div scCardFooter class="justify-end">
            <button i18n="@@forms.formExamples.saveCard" scButton type="submit">
              Save card
            </button>
          </div>
        </div>
      </form>
    </div>
  `,
  host: { class: 'flex flex-col gap-4' },
  encapsulation: ViewEncapsulation.None,
})
export class FormExamplesPage {
  /** The template's words that sit in bindings, translated. */
  private readonly t = {
    forms: $localize`:@@forms.formExamples.forms:Forms`,
    examples: $localize`:@@forms.formExamples.examples:Examples`,
  };

  private readonly toaster = inject(ScToaster);
  private readonly ratings = [
    $localize`:@@forms.formExamples.poor:Poor`,
    $localize`:@@forms.formExamples.fair:Fair`,
    $localize`:@@forms.formExamples.good:Good`,
    $localize`:@@forms.formExamples.great:Great`,
  ];

  private readonly contact = signal({
    name: '',
    email: '',
    topic: 'support',
    message: '',
  });
  private readonly contactForm = form(this.contact, (path) => {
    required(path.name);
    required(path.email);
    email(path.email);
    required(path.message);
  });

  private readonly newsletter = signal({ email: '' });
  private readonly newsletterForm = form(this.newsletter, (path) => {
    required(path.email);
    email(path.email);
  });

  private readonly feedback = signal({
    rating: this.ratings[2],
    contact: false,
  });
  private readonly feedbackForm = form(this.feedback);

  private readonly card = signal({ name: '', number: '', expiry: '', cvc: '' });
  private readonly cardForm = form(this.card, (path) => {
    required(path.name);
    required(path.number);
    pattern(path.number, /^[\d ]{12,19}$/, {
      message: $localize`:@@forms.formExamples.n12To19Digits:12 to 19 digits.`,
    });
    required(path.expiry);
    pattern(path.expiry, /^(0[1-9]|1[0-2])\/\d{2}$/, {
      message: $localize`:@@forms.formExamples.asMmYy:As MM/YY.`,
    });
    required(path.cvc);
    pattern(path.cvc, /^\d{3,4}$/, {
      message: $localize`:@@forms.formExamples.n3Or4Digits:3 or 4 digits.`,
    });
  });

  private sendContact(event: Event): void {
    event.preventDefault();
    void submit(this.contactForm, async () => {
      this.toaster.show({
        variant: 'success',
        title: $localize`:@@forms.formExamples.messageSent:Message sent`,
      });
      this.contact.set({ name: '', email: '', topic: 'support', message: '' });
      this.contactForm().reset();
      return undefined;
    });
  }

  private sendNewsletter(event: Event): void {
    event.preventDefault();
    void submit(this.newsletterForm, async () => {
      this.toaster.show({
        variant: 'success',
        title: $localize`:@@forms.formExamples.subscribed:Subscribed`,
        description: this.newsletter().email,
      });
      return undefined;
    });
  }

  private sendFeedback(event: Event): void {
    event.preventDefault();
    this.toaster.show({
      variant: 'success',
      title: $localize`:@@forms.formExamples.thanksNoted:Thanks — “${this.feedback().rating}” noted`,
    });
  }

  private sendCard(event: Event): void {
    event.preventDefault();
    void submit(this.cardForm, async () => {
      this.toaster.show({
        variant: 'success',
        title: $localize`:@@forms.formExamples.cardSaved:Card saved`,
      });
      return undefined;
    });
  }
}
