import { Component, ViewEncapsulation, signal } from '@angular/core';
import { FormField, form, max, min } from '@angular/forms/signals';
import {
  ScAlertDialog,
  ScAlertDialogAction,
  ScAlertDialogCancel,
  ScAlertDialogDescription,
  ScAlertDialogFooter,
  ScAlertDialogHeader,
  ScAlertDialogPortal,
  ScAlertDialogProvider,
  ScAlertDialogTitle,
  ScAlertDialogTrigger,
  ScBadge,
  ScButton,
  ScCard,
  ScCardContent,
  ScCheckbox,
  ScControlGroup,
  ScField,
  ScFieldGroup,
  ScInput,
  ScInputGroup,
  ScInputGroupAddon,
  ScInputGroupText,
  ScItem,
  ScItemActions,
  ScItemBody,
  ScItemDescription,
  ScItemTitle,
  ScMenu,
  ScMenuContent,
  ScMenuGroup,
  ScMenuItem,
  ScMenuLabel,
  ScMenuPortal,
  ScMenuProvider,
  ScMenuSeparator,
  ScMenuTrigger,
  ScRadio,
  ScRadioGroup,
  ScSlider,
  ScSwitch,
  ScTextarea,
} from '@semantic-components/ui';
import { SiChevronUpIcon, SiSearchIcon } from '@semantic-icons/lucide-icons';

/** A few parts side by side: buttons, an input and a textarea, badges, radios, a checkbox, a switch, an alert dialog and a button group with a menu. */
@Component({
  selector: 'app-preview-ui-elements',
  imports: [
    ScSlider,
    ScItemTitle,
    ScItemDescription,
    ScItemBody,
    ScItemActions,
    ScItem,
    FormField,
    ScAlertDialog,
    ScAlertDialogAction,
    ScAlertDialogCancel,
    ScAlertDialogDescription,
    ScAlertDialogFooter,
    ScAlertDialogHeader,
    ScAlertDialogPortal,
    ScAlertDialogProvider,
    ScAlertDialogTitle,
    ScAlertDialogTrigger,
    ScBadge,
    ScButton,
    ScCard,
    ScCardContent,
    ScCheckbox,
    ScControlGroup,
    ScField,
    ScFieldGroup,
    ScInput,
    ScInputGroup,
    ScInputGroupAddon,
    ScInputGroupText,
    ScMenu,
    ScMenuContent,
    ScMenuGroup,
    ScMenuItem,
    ScMenuLabel,
    ScMenuPortal,
    ScMenuProvider,
    ScMenuSeparator,
    ScMenuTrigger,
    ScRadio,
    ScRadioGroup,
    ScSwitch,
    ScTextarea,
    SiChevronUpIcon,
    SiSearchIcon,
  ],
  template: `
    <div scCard class="w-full">
      <div scCardContent class="flex flex-col gap-6">
        <div class="flex flex-col gap-4">
          <div class="flex flex-wrap gap-2">
            <button scButton>Button</button>
            <button scButton variant="secondary">Secondary</button>
            <button scButton variant="outline">Outline</button>
            <button scButton variant="ghost">Ghost</button>
          </div>
          <div scItem variant="outline">
            <div scItemBody>
              <div scItemTitle>Two-factor authentication</div>
              <p scItemDescription class="text-pretty xl:hidden 2xl:block">
                Verify via email or phone number.
              </p>
            </div>
            <div scItemActions class="hidden md:flex">
              <button scButton size="sm" variant="secondary">Enable</button>
            </div>
          </div>
        </div>
        <input
          scSlider
          aria-label="Slider"
          class="flex-1"
          [step]="10"
          [formField]="settings.slider"
        />
        <div scFieldGroup>
          <div scField>
            <div scInputGroup>
              <input scInput placeholder="Name" aria-label="Name" />
              <div scInputGroupAddon align="inline-end">
                <span scInputGroupText><svg siSearchIcon></svg></span>
              </div>
            </div>
          </div>
          <div scField class="flex-1">
            <textarea
              scTextarea
              placeholder="Message"
              aria-label="Message"
              class="resize-none"
            ></textarea>
          </div>
        </div>
        <div class="flex items-center gap-2">
          <div class="flex gap-2">
            <span scBadge>Badge</span>
            <span scBadge variant="secondary">Secondary</span>
            <span scBadge variant="outline">Outline</span>
          </div>
          <div
            scRadioGroup
            [formField]="settings.fruit"
            aria-label="Fruit preference"
            class="ms-auto flex w-fit flex-row gap-3"
          >
            <input scRadio value="apple" aria-label="Apple" />
            <input scRadio value="banana" aria-label="Banana" />
          </div>
          <div class="flex gap-3">
            <input
              scCheckbox
              aria-label="Enable email alerts"
              [formField]="settings.emailAlerts"
            />
            <input
              scCheckbox
              aria-label="Enable text alerts"
              [formField]="settings.textAlerts"
            />
          </div>
        </div>
        <div class="flex items-center gap-4">
          <div scAlertDialogProvider>
            <button scButton scAlertDialogTrigger variant="outline">
              Alert Dialog
            </button>
            <ng-template scAlertDialogPortal>
              <div scAlertDialog size="sm">
                <div scAlertDialogHeader>
                  <h2 scAlertDialogTitle>Allow accessory to connect?</h2>
                  <p scAlertDialogDescription>
                    Do you want to allow the USB accessory to connect to this
                    device and your data?
                  </p>
                </div>
                <div scAlertDialogFooter>
                  <button scAlertDialogCancel>Don&apos;t allow</button>
                  <button scAlertDialogAction>Allow</button>
                </div>
              </div>
            </ng-template>
          </div>
          <div scMenuProvider side="top" align="end">
            <div scControlGroup aria-label="Conversation">
              <button scButton variant="outline">Button Group</button>
              <button scButton scMenuTrigger variant="outline" size="icon">
                <svg siChevronUpIcon></svg>
                <span class="sr-only">Open quick actions</span>
              </button>
            </div>
            <ng-template scMenuPortal>
              <div scMenu class="w-fit">
                <ng-template scMenuContent>
                  <div scMenuGroup>
                    <div scMenuLabel>Quick Actions</div>
                    <div scMenuItem value="mute">Mute Conversation</div>
                    <div scMenuItem value="read">Mark as Read</div>
                    <div scMenuItem value="block">Block User</div>
                  </div>
                  <div scMenuSeparator></div>
                  <div scMenuGroup>
                    <div scMenuLabel>Conversation</div>
                    <div scMenuItem value="share">Share Conversation</div>
                    <div scMenuItem value="copy">Copy Conversation</div>
                    <div scMenuItem value="report">Report Conversation</div>
                  </div>
                  <div scMenuSeparator></div>
                  <div scMenuGroup>
                    <div scMenuItem value="delete" variant="destructive">
                      Delete Conversation
                    </div>
                  </div>
                </ng-template>
              </div>
            </ng-template>
          </div>
          <input
            scSwitch
            class="ms-auto"
            aria-label="Enable compact notifications"
            [formField]="settings.compact"
          />
        </div>
      </div>
    </div>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class PreviewUiElements {
  protected readonly settings = form(
    signal({
      slider: 500,
      fruit: 'apple',
      emailAlerts: true,
      textAlerts: false,
      compact: true,
    }),
    (path) => {
      min(path.slider, 0);
      max(path.slider, 1000);
    },
  );
}
