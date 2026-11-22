import { Component, ViewEncapsulation, signal } from '@angular/core';
import {
  FormField,
  disabled,
  form,
  pattern,
  required,
} from '@angular/forms/signals';
import {
  ScCard,
  ScCardBody,
  ScCardHeader,
  ScCardTitle,
  ScCheckbox,
  ScField,
  ScFieldDescription,
  ScFieldGroup,
  ScFileInput,
  ScFileInputDropzone,
  ScFileInputItem,
  ScFileInputItemPreview,
  ScFileInputItemRemove,
  ScFileInputItemSize,
  ScFileInputList,
  ScFileInputTrigger,
  ScInput,
  ScInputGroup,
  ScInputGroupAddon,
  ScInputGroupText,
  ScLabel,
  ScPasswordGroup,
  ScPasswordInput,
  ScPasswordToggle,
  ScRadio,
  ScRadioGroup,
  ScSelect,
  ScSelectGroup,
  ScSelectIcon,
  ScSelectItem,
  ScSelectItemIndicator,
  ScSelectItemText,
  ScSelectLabel,
  ScSelectList,
  ScSelectPopup,
  ScSelectPortal,
  ScSelectTrigger,
  ScSelectValue,
  ScSwitch,
  ScTextarea,
} from '@semantic-components/ui';
import {
  SiCheckIcon,
  SiChevronDownIcon,
  SiCreditCardIcon,
  SiEyeIcon,
  SiEyeOffIcon,
  SiFileIcon,
  SiMailIcon,
  SiUploadIcon,
  SiXIcon,
} from '@semantic-icons/lucide-icons';
import { PageHeader } from '../../layout/page-header';

/** The form page: every kind of input, as shadcndashboard's Form page shows them. */
@Component({
  selector: 'app-form-page',
  imports: [
    FormField,
    ScCard,
    ScCardBody,
    ScCardHeader,
    ScCardTitle,
    ScCheckbox,
    ScField,
    ScFieldDescription,
    ScFieldGroup,
    ScFileInput,
    ScFileInputDropzone,
    ScFileInputItem,
    ScFileInputItemPreview,
    ScFileInputItemRemove,
    ScFileInputItemSize,
    ScFileInputList,
    ScFileInputTrigger,
    ScInput,
    ScInputGroup,
    ScInputGroupAddon,
    ScInputGroupText,
    ScLabel,
    ScPasswordGroup,
    ScPasswordInput,
    ScPasswordToggle,
    ScRadio,
    ScRadioGroup,
    ScSelect,
    ScSelectGroup,
    ScSelectIcon,
    ScSelectItem,
    ScSelectItemIndicator,
    ScSelectItemText,
    ScSelectLabel,
    ScSelectList,
    ScSelectPopup,
    ScSelectPortal,
    ScSelectTrigger,
    ScSelectValue,
    ScSwitch,
    ScTextarea,
    SiCheckIcon,
    SiChevronDownIcon,
    SiCreditCardIcon,
    SiEyeIcon,
    SiEyeOffIcon,
    SiFileIcon,
    SiMailIcon,
    SiUploadIcon,
    SiXIcon,
    PageHeader,
  ],
  template: `
    <app-page-header
      i18n-title="@@form.form"
      title="Form"
      [trail]="[{ label: t.form }]"
    />

    <div class="grid grid-cols-1 gap-4 xl:grid-cols-2">
      <div scCard>
        <div scCardHeader>
          <h2 i18n="@@form.defaultInputs" scCardTitle id="inputs-title">
            Default Inputs
          </h2>
        </div>
        <div scCardBody>
          <div scFieldGroup>
            <div scField>
              <label i18n="@@form.input" scLabel>Input</label>
              <input scInput [formField]="inputs.plain" />
            </div>
            <div scField>
              <label i18n="@@form.inputWithPlaceholder" scLabel
                >Input with Placeholder</label
              >
              <input
                i18n-placeholder="@@form.firstname"
                scInput
                placeholder="Firstname"
                [formField]="inputs.firstName"
              />
            </div>
            <div scField>
              <div scSelect [formField]="inputs.country" [items]="countries">
                <div i18n="@@form.selectInput" scSelectLabel>Select Input</div>
                <div scSelectTrigger class="w-full">
                  <span
                    i18n-placeholder="@@form.selectAnOption"
                    scSelectValue
                    placeholder="Select an option"
                  ></span>
                  <svg scSelectIcon siChevronDownIcon></svg>
                </div>
                <ng-template scSelectPortal>
                  <div scSelectPopup>
                    <div scSelectList>
                      <div scSelectGroup>
                        @for (item of countries; track item.value) {
                          <div scSelectItem [value]="item.value">
                            <span scSelectItemText>{{ item.label }}</span>
                            <span scSelectItemIndicator
                              ><svg siCheckIcon></svg
                            ></span>
                          </div>
                        }
                      </div>
                    </div>
                  </div>
                </ng-template>
              </div>
            </div>
            <div scField>
              <label i18n="@@form.passwordInput" scLabel>Password Input</label>
              <div scPasswordGroup #password="scPasswordGroup">
                <input
                  i18n-placeholder="@@form.enterYourPassword"
                  scPasswordInput
                  placeholder="Enter your Password"
                  [formField]="inputs.password"
                />
                <button scPasswordToggle>
                  @if (password.visible()) {
                    <svg siEyeOffIcon></svg>
                    <span i18n="@@form.hidePassword" class="sr-only"
                      >Hide password</span
                    >
                  } @else {
                    <svg siEyeIcon></svg>
                    <span i18n="@@form.showPassword" class="sr-only"
                      >Show password</span
                    >
                  }
                </button>
              </div>
            </div>
            <div scField>
              <label i18n="@@form.timePickerInput" scLabel
                >Time Picker Input</label
              >
              <input scInput type="time" [formField]="inputs.time" />
            </div>
            <div scField>
              <label i18n="@@form.card" scLabel>Card</label>
              <div scInputGroup>
                <input
                  i18n-placeholder="@@form.cardNumber"
                  scInput
                  inputmode="numeric"
                  autocomplete="cc-number"
                  placeholder="Card number"
                  [formField]="inputs.card"
                />
                <div scInputGroupAddon><svg siCreditCardIcon></svg></div>
              </div>
              <p i18n="@@form.n16DigitsNoSpaces" scFieldDescription>
                16 digits, no spaces.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div class="flex flex-col gap-4">
        <div scCard>
          <div scCardHeader>
            <h2 i18n="@@form.textareaInput" scCardTitle id="textarea-title">
              Textarea Input
            </h2>
          </div>
          <div scCardBody>
            <div scFieldGroup>
              <div scField>
                <label i18n="@@form.description" scLabel>Description</label>
                <textarea
                  i18n-placeholder="@@form.leaveAComment"
                  scTextarea
                  placeholder="Leave a comment..."
                  [formField]="texts.description"
                ></textarea>
              </div>
              <div scField>
                <label i18n="@@form.disabled" scLabel>Disabled</label>
                <textarea
                  i18n-placeholder="@@form.leaveAComment"
                  scTextarea
                  placeholder="Leave a comment..."
                  [formField]="texts.disabled"
                ></textarea>
              </div>
            </div>
          </div>
        </div>

        <div scCard>
          <div scCardHeader>
            <h2 i18n="@@form.inputGroup" scCardTitle id="group-title">
              Input Group
            </h2>
          </div>
          <div scCardBody>
            <div scFieldGroup>
              <div scField>
                <label i18n="@@form.email" scLabel>Email</label>
                <div scInputGroup>
                  <input
                    i18n-placeholder="@@form.nameExampleCom"
                    scInput
                    type="email"
                    placeholder="name@example.com"
                    [formField]="groups.email"
                  />
                  <div scInputGroupAddon><svg siMailIcon></svg></div>
                </div>
              </div>
              <div scField>
                <label i18n="@@form.phone" scLabel>Phone</label>
                <div scInputGroup>
                  <input scInput type="tel" [formField]="groups.phone" />
                  <div scInputGroupAddon>
                    <span scInputGroupText>+1</span>
                  </div>
                </div>
              </div>
              <div scField>
                <label i18n="@@form.website" scLabel>Website</label>
                <div scInputGroup>
                  <input
                    i18n-placeholder="@@form.wwwExampleCom"
                    scInput
                    placeholder="www.example.com"
                    [formField]="groups.website"
                  />
                  <div i18n="@@form.https" scInputGroupAddon>
                    <span scInputGroupText>https://</span>
                  </div>
                </div>
                <p i18n="@@form.withoutTheProtocolItS" scFieldDescription>
                  Without the protocol: it's added for you.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div scCard>
        <div scCardHeader>
          <h2 i18n="@@form.fileInput" scCardTitle id="file-title">
            File Input
          </h2>
        </div>
        <div scCardBody>
          <div scFileInput #upload="scFileInput" multiple>
            <div scFileInputDropzone>
              <svg siUploadIcon></svg>
              <p i18n="@@form.dropFilesHere">Drop files here</p>
              <button i18n="@@form.browseFiles" scFileInputTrigger size="sm">
                Browse files
              </button>
            </div>
            <ul
              i18n-aria-label="@@form.chosenFiles"
              scFileInputList
              aria-label="Chosen files"
            >
              @for (file of upload.value(); track file) {
                <li scFileInputItem [file]="file">
                  <span scFileInputItemPreview><svg siFileIcon></svg></span>
                  <span class="min-w-0 flex-1 truncate">{{ file.name }}</span>
                  <span scFileInputItemSize></span>
                  <button scFileInputItemRemove>
                    <svg siXIcon></svg>
                    <span i18n="@@form.remove" class="sr-only"
                      >Remove {{ file.name }}</span
                    >
                  </button>
                </li>
              }
            </ul>
          </div>
        </div>
      </div>

      <div scCard>
        <div scCardHeader>
          <h2
            i18n="@@form.checkboxRadioButtonsToggleSwitch"
            scCardTitle
            id="choices-title"
          >
            Checkbox, Radio Buttons, Toggle Switch
          </h2>
        </div>
        <div scCardBody class="grid grid-cols-1 gap-6 sm:grid-cols-3">
          <div scFieldGroup>
            <div scField orientation="horizontal">
              <input scCheckbox [formField]="choices.checkDefault" />
              <label i18n="@@form.default" scLabel>Default</label>
            </div>
            <div scField orientation="horizontal">
              <input scCheckbox [formField]="choices.checkChecked" />
              <label i18n="@@form.checked" scLabel>Checked</label>
            </div>
            <div scField orientation="horizontal">
              <input scCheckbox [formField]="choices.checkDisabled" />
              <label i18n="@@form.disabled" scLabel>Disabled</label>
            </div>
          </div>
          <div
            i18n-aria-label="@@form.radioButtons"
            scRadioGroup
            [formField]="choices.radio"
            aria-label="Radio Buttons"
          >
            <label scField orientation="horizontal">
              <input scRadio value="default" />
              <ng-container i18n="@@form.default">Default</ng-container>
            </label>
            <label scField orientation="horizontal">
              <input scRadio value="selected" />
              <ng-container i18n="@@form.selected">Selected</ng-container>
            </label>
            <label scField orientation="horizontal">
              <input scRadio value="disabled" disabled />
              <ng-container i18n="@@form.disabled">Disabled</ng-container>
            </label>
          </div>
          <div scFieldGroup>
            <div scField orientation="horizontal">
              <input scSwitch [formField]="choices.switchOff" />
              <label i18n="@@form.toggleMe" scLabel>Toggle me</label>
            </div>
            <div scField orientation="horizontal">
              <input scSwitch [formField]="choices.switchOn" />
              <label i18n="@@form.toggleMeChecked" scLabel
                >Toggle me (checked)</label
              >
            </div>
            <div scField orientation="horizontal">
              <input scSwitch [formField]="choices.switchDisabled" />
              <label i18n="@@form.disabled" scLabel>Disabled</label>
            </div>
            <div scField orientation="horizontal">
              <input scSwitch [formField]="choices.switchDisabledOn" />
              <label i18n="@@form.disabledChecked" scLabel
                >Disabled (checked)</label
              >
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  host: { class: 'flex flex-col gap-4' },
  encapsulation: ViewEncapsulation.None,
})
export class FormPage {
  /** The template's words that sit in bindings, translated. */
  private readonly t = {
    form: $localize`:@@form.form:Form`,
  };

  private readonly countries = [
    { value: 'us', label: $localize`:@@form.unitedStates:United States` },
    { value: 'ca', label: $localize`:@@form.canada:Canada` },
    { value: 'fr', label: $localize`:@@form.france:France` },
    { value: 'de', label: $localize`:@@form.germany:Germany` },
  ];

  private readonly inputs = form(
    signal({
      plain: '',
      firstName: '',
      country: '',
      password: '',
      time: '09:30',
      card: '',
    }),
    (path) => {
      pattern(path.card, /^\d{16}$/, {
        message: $localize`:@@form.n16Digits:16 digits`,
      });
    },
  );

  private readonly texts = form(
    signal({ description: '', disabled: '' }),
    (path) => {
      disabled(path.disabled);
    },
  );

  private readonly groups = form(
    signal({ email: '', phone: '', website: '' }),
    (path) => {
      required(path.email);
    },
  );

  private readonly choices = form(
    signal({
      checkDefault: false,
      checkChecked: true,
      checkDisabled: false,
      radio: 'selected',
      switchOff: false,
      switchOn: true,
      switchDisabled: false,
      switchDisabledOn: true,
    }),
    (path) => {
      disabled(path.checkDisabled);
      disabled(path.switchDisabled);
      disabled(path.switchDisabledOn);
    },
  );
}
