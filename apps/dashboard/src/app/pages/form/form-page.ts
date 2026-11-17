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
  ScFileUpload,
  ScFileUploadDropzone,
  ScFileUploadInput,
  ScFileUploadItem,
  ScFileUploadItemName,
  ScFileUploadItemPreview,
  ScFileUploadItemRemove,
  ScFileUploadItemSize,
  ScFileUploadList,
  ScFileUploadTrigger,
  ScInput,
  ScInputGroup,
  ScInputGroupAddon,
  ScInputGroupText,
  ScLabel,
  ScPasswordField,
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
    ScFileUpload,
    ScFileUploadDropzone,
    ScFileUploadInput,
    ScFileUploadItem,
    ScFileUploadItemName,
    ScFileUploadItemPreview,
    ScFileUploadItemRemove,
    ScFileUploadItemSize,
    ScFileUploadList,
    ScFileUploadTrigger,
    ScInput,
    ScInputGroup,
    ScInputGroupAddon,
    ScInputGroupText,
    ScLabel,
    ScPasswordField,
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
    <app-page-header title="Form" [trail]="[{ label: 'Form' }]" />

    <div class="grid grid-cols-1 gap-4 xl:grid-cols-2">
      <div scCard>
        <div scCardHeader>
          <h2 scCardTitle id="inputs-title">Default Inputs</h2>
        </div>
        <div scCardBody>
          <div scFieldGroup>
            <div scField>
              <label scLabel>Input</label>
              <input scInput [formField]="inputs.plain" />
            </div>
            <div scField>
              <label scLabel>Input with Placeholder</label>
              <input
                scInput
                placeholder="Firstname"
                [formField]="inputs.firstName"
              />
            </div>
            <div scField>
              <div scSelect [formField]="inputs.country" [items]="countries">
                <div scSelectLabel>Select Input</div>
                <div scSelectTrigger class="w-full">
                  <span scSelectValue placeholder="Select an option"></span>
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
            <div scPasswordField #password="scPasswordField">
              <label scLabel>Password Input</label>
              <div scPasswordGroup>
                <input
                  scPasswordInput
                  placeholder="Enter your Password"
                  [formField]="inputs.password"
                />
                <button scPasswordToggle>
                  @if (password.visible()) {
                    <svg siEyeOffIcon></svg>
                    <span class="sr-only">Hide password</span>
                  } @else {
                    <svg siEyeIcon></svg>
                    <span class="sr-only">Show password</span>
                  }
                </button>
              </div>
            </div>
            <div scField>
              <label scLabel>Time Picker Input</label>
              <input scInput type="time" [formField]="inputs.time" />
            </div>
            <div scField>
              <label scLabel>Card</label>
              <div scInputGroup>
                <input
                  scInput
                  inputmode="numeric"
                  autocomplete="cc-number"
                  placeholder="Card number"
                  [formField]="inputs.card"
                />
                <div scInputGroupAddon><svg siCreditCardIcon></svg></div>
              </div>
              <p scFieldDescription>16 digits, no spaces.</p>
            </div>
          </div>
        </div>
      </div>

      <div class="flex flex-col gap-4">
        <div scCard>
          <div scCardHeader>
            <h2 scCardTitle id="textarea-title">Textarea Input</h2>
          </div>
          <div scCardBody>
            <div scFieldGroup>
              <div scField>
                <label scLabel>Description</label>
                <textarea
                  scTextarea
                  placeholder="Leave a comment..."
                  [formField]="texts.description"
                ></textarea>
              </div>
              <div scField>
                <label scLabel>Disabled</label>
                <textarea
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
            <h2 scCardTitle id="group-title">Input Group</h2>
          </div>
          <div scCardBody>
            <div scFieldGroup>
              <div scField>
                <label scLabel>Email</label>
                <div scInputGroup>
                  <input
                    scInput
                    type="email"
                    placeholder="name@example.com"
                    [formField]="groups.email"
                  />
                  <div scInputGroupAddon><svg siMailIcon></svg></div>
                </div>
              </div>
              <div scField>
                <label scLabel>Phone</label>
                <div scInputGroup>
                  <input scInput type="tel" [formField]="groups.phone" />
                  <div scInputGroupAddon>
                    <span scInputGroupText>+1</span>
                  </div>
                </div>
              </div>
              <div scField>
                <label scLabel>Website</label>
                <div scInputGroup>
                  <input
                    scInput
                    placeholder="www.example.com"
                    [formField]="groups.website"
                  />
                  <div scInputGroupAddon>
                    <span scInputGroupText>https://</span>
                  </div>
                </div>
                <p scFieldDescription>
                  Without the protocol: it's added for you.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div scCard>
        <div scCardHeader>
          <h2 scCardTitle id="file-title">File Input</h2>
        </div>
        <div scCardBody>
          <div scFileUpload #upload="scFileUpload" multiple>
            <input scFileUploadInput />
            <div scFileUploadDropzone>
              <svg siUploadIcon></svg>
              <p>Drop files here</p>
              <button scFileUploadTrigger size="sm">Browse files</button>
            </div>
            <ul scFileUploadList aria-label="Chosen files">
              @for (file of upload.value(); track file) {
                <li scFileUploadItem [file]="file">
                  <span scFileUploadItemPreview><svg siFileIcon></svg></span>
                  <span scFileUploadItemName>{{ file.name }}</span>
                  <span scFileUploadItemSize></span>
                  <button scFileUploadItemRemove>
                    <svg siXIcon></svg>
                    <span class="sr-only">Remove {{ file.name }}</span>
                  </button>
                </li>
              }
            </ul>
          </div>
        </div>
      </div>

      <div scCard>
        <div scCardHeader>
          <h2 scCardTitle id="choices-title">
            Checkbox, Radio Buttons, Toggle Switch
          </h2>
        </div>
        <div scCardBody class="grid grid-cols-1 gap-6 sm:grid-cols-3">
          <div scFieldGroup>
            <div scField orientation="horizontal">
              <input scCheckbox [formField]="choices.checkDefault" />
              <label scLabel>Default</label>
            </div>
            <div scField orientation="horizontal">
              <input scCheckbox [formField]="choices.checkChecked" />
              <label scLabel>Checked</label>
            </div>
            <div scField orientation="horizontal">
              <input scCheckbox [formField]="choices.checkDisabled" />
              <label scLabel>Disabled</label>
            </div>
          </div>
          <div
            scRadioGroup
            [formField]="choices.radio"
            aria-label="Radio Buttons"
          >
            <label scField orientation="horizontal">
              <input scRadio value="default" />
              Default
            </label>
            <label scField orientation="horizontal">
              <input scRadio value="selected" />
              Selected
            </label>
            <label scField orientation="horizontal">
              <input scRadio value="disabled" disabled />
              Disabled
            </label>
          </div>
          <div scFieldGroup>
            <div scField orientation="horizontal">
              <input scSwitch [formField]="choices.switchOff" />
              <label scLabel>Toggle me</label>
            </div>
            <div scField orientation="horizontal">
              <input scSwitch [formField]="choices.switchOn" />
              <label scLabel>Toggle me (checked)</label>
            </div>
            <div scField orientation="horizontal">
              <input scSwitch [formField]="choices.switchDisabled" />
              <label scLabel>Disabled</label>
            </div>
            <div scField orientation="horizontal">
              <input scSwitch [formField]="choices.switchDisabledOn" />
              <label scLabel>Disabled (checked)</label>
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
  protected readonly countries = [
    { value: 'us', label: 'United States' },
    { value: 'ca', label: 'Canada' },
    { value: 'fr', label: 'France' },
    { value: 'de', label: 'Germany' },
  ];

  protected readonly inputs = form(
    signal({
      plain: '',
      firstName: '',
      country: '',
      password: '',
      time: '09:30',
      card: '',
    }),
    (path) => {
      pattern(path.card, /^\d{16}$/, { message: '16 digits' });
    },
  );

  protected readonly texts = form(
    signal({ description: '', disabled: '' }),
    (path) => {
      disabled(path.disabled);
    },
  );

  protected readonly groups = form(
    signal({ email: '', phone: '', website: '' }),
    (path) => {
      required(path.email);
    },
  );

  protected readonly choices = form(
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
