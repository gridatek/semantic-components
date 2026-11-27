import {
  Component,
  ViewEncapsulation,
  computed,
  input,
  signal,
} from '@angular/core';
import {
  ScAccordion,
  ScAccordionHeader,
  ScAccordionItem,
  ScAccordionPanel,
  ScAccordionPanelContent,
  ScAccordionTrigger,
  ScAccordionTriggerIcon,
  ScAvatar,
  ScAvatarBadge,
  ScAvatarFallback,
  ScAvatarGroup,
  ScAvatarGroupCount,
  ScAvatarImage,
  ScBadge,
  ScButton,
  ScCalendar,
  ScCalendarHeader,
  ScCalendarNext,
  ScCalendarPrevious,
  type ScCalendarValue,
  ScCard,
  ScCardAction,
  ScCardBody,
  ScCardDescription,
  ScCardFooter,
  ScCardHeader,
  ScCardTitle,
  ScCheckbox,
  ScDatePicker,
  ScDatePickerTrigger,
  ScField,
  ScFieldContentWrapper,
  ScFieldDescription,
  ScFrame,
  ScInput,
  ScInputButton,
  ScKbd,
  ScLabel,
  ScPopover,
  ScPopoverPortal,
  ScPopoverProvider,
  ScRadio,
  ScRadioGroup,
  ScSelect,
  ScSelectGroup,
  ScSelectIcon,
  ScSelectItem,
  ScSelectItemIndicator,
  ScSelectItemText,
  ScSelectList,
  ScSelectPopup,
  ScSelectPortal,
  ScSelectTrigger,
  ScSelectValue,
  ScSpinner,
  ScSwitch,
  ScTabs,
  ScTabsList,
  ScTabsPanel,
  ScTabsPanelContent,
  ScTabsTab,
  ScTextarea,
  ScTooltip,
  ScTooltipArrow,
  ScTooltipPortal,
  ScTooltipProvider,
  ScTooltipTrigger,
  injectFormatDate,
} from '@semantic-components/ui';
import {
  SiArrowRightIcon,
  SiBellIcon,
  SiCalendarIcon,
  SiCheckIcon,
  SiChevronDownIcon,
  SiChevronLeftIcon,
  SiChevronRightIcon,
  SiLoaderCircleIcon,
  SiMailIcon,
  SiPlusIcon,
  SiSaveIcon,
  SiTrash2Icon,
} from '@semantic-icons/lucide-icons';
import { PEOPLE } from '../../data/people';
import { PageHeader } from '../../layout/page-header';
import { initials, injectFormats } from '../../shared/formats';

const TITLES: Record<string, string> = {
  button: $localize`:@@ui.element.button:Button`,
  avatar: $localize`:@@ui.element.avatar:Avatar`,
  badge: $localize`:@@ui.element.badge:Badge`,
  tooltip: $localize`:@@ui.element.tooltip:Tooltip`,
  input: $localize`:@@ui.element.input:Input`,
  textarea: $localize`:@@ui.element.textarea:Textarea`,
  switch: $localize`:@@ui.element.switch:Switch`,
  tabs: $localize`:@@ui.element.tabs:Tabs`,
  select: $localize`:@@ui.element.select:Select`,
  checkbox: $localize`:@@ui.element.checkbox:Checkbox`,
  accordion: $localize`:@@ui.element.accordion:Accordion`,
  card: $localize`:@@ui.element.card:Card`,
  'radio-group': $localize`:@@ui.element.radioGroup:Radio Group`,
  'date-picker': $localize`:@@ui.element.datePicker:Date Picker`,
};

/**
 * UI Elements: one library component per page, in its variants (the
 * reference links these to its component docs; here they're in the app).
 */
@Component({
  selector: 'app-ui-element-page',
  imports: [
    ScInputButton,
    ScAccordion,
    ScAccordionHeader,
    ScAccordionItem,
    ScAccordionPanel,
    ScAccordionPanelContent,
    ScAccordionTrigger,
    ScAccordionTriggerIcon,
    ScAvatar,
    ScAvatarBadge,
    ScAvatarFallback,
    ScAvatarGroup,
    ScAvatarGroupCount,
    ScAvatarImage,
    ScBadge,
    ScButton,
    ScCalendar,
    ScCalendarHeader,
    ScCalendarNext,
    ScCalendarPrevious,
    ScCard,
    ScCardAction,
    ScCardBody,
    ScCardDescription,
    ScCardFooter,
    ScCardHeader,
    ScCardTitle,
    ScCheckbox,
    ScDatePicker,
    ScDatePickerTrigger,
    ScField,
    ScFieldContentWrapper,
    ScFieldDescription,
    ScFrame,
    ScInput,
    ScKbd,
    ScLabel,
    ScPopover,
    ScPopoverPortal,
    ScPopoverProvider,
    ScRadio,
    ScRadioGroup,
    ScSelect,
    ScSelectGroup,
    ScSelectIcon,
    ScSelectItem,
    ScSelectItemIndicator,
    ScSelectItemText,
    ScSelectList,
    ScSelectPopup,
    ScSelectPortal,
    ScSelectTrigger,
    ScSelectValue,
    ScSpinner,
    ScSwitch,
    ScTabs,
    ScTabsList,
    ScTabsPanel,
    ScTabsPanelContent,
    ScTabsTab,
    ScTextarea,
    ScTooltip,
    ScTooltipArrow,
    ScTooltipPortal,
    ScTooltipProvider,
    ScTooltipTrigger,
    SiArrowRightIcon,
    SiBellIcon,
    SiCalendarIcon,
    SiCheckIcon,
    SiChevronDownIcon,
    SiChevronLeftIcon,
    SiChevronRightIcon,
    SiLoaderCircleIcon,
    SiMailIcon,
    SiPlusIcon,
    SiSaveIcon,
    SiTrash2Icon,
    PageHeader,
  ],
  template: `
    <app-page-header
      [title]="title()"
      [trail]="[{ label: t.uiElements }, { label: title() }]"
    />

    @switch (element()) {
      @case ('button') {
        <div class="grid gap-4 lg:grid-cols-2">
          <section scFrame class="flex flex-col gap-4 p-6">
            <h2 i18n="@@ui.element.variants" class="font-medium">Variants</h2>
            <div class="flex flex-wrap gap-2">
              <button i18n="@@ui.element.default" scButton>Default</button>
              <button
                i18n="@@ui.element.secondary"
                scButton
                variant="secondary"
              >
                Secondary
              </button>
              <button i18n="@@ui.element.outline" scButton variant="outline">
                Outline
              </button>
              <button i18n="@@ui.element.ghost" scButton variant="ghost">
                Ghost
              </button>
              <button
                i18n="@@ui.element.destructive"
                scButton
                variant="destructive"
              >
                Destructive
              </button>
              <button i18n="@@ui.element.link" scButton variant="link">
                Link
              </button>
            </div>
          </section>
          <section scFrame class="flex flex-col gap-4 p-6">
            <h2 i18n="@@ui.element.sizes" class="font-medium">Sizes</h2>
            <div class="flex flex-wrap items-center gap-2">
              <button i18n="@@ui.element.extraSmall" scButton size="xs">
                Extra small
              </button>
              <button i18n="@@ui.element.small" scButton size="sm">
                Small
              </button>
              <button i18n="@@ui.element.default" scButton>Default</button>
              <button i18n="@@ui.element.large" scButton size="lg">
                Large
              </button>
            </div>
          </section>
          <section scFrame class="flex flex-col gap-4 p-6">
            <h2 i18n="@@ui.element.withIcons" class="font-medium">
              With icons
            </h2>
            <div class="flex flex-wrap items-center gap-2">
              <button scButton>
                <svg siMailIcon></svg>
                <ng-container i18n="@@ui.element.email">Email</ng-container>
              </button>
              <button scButton variant="outline">
                <ng-container i18n="@@ui.element.next">Next</ng-container>
                <svg siArrowRightIcon class="rtl:-scale-x-100"></svg>
              </button>
              <button scButton variant="outline" size="icon">
                <svg siPlusIcon></svg
                ><span i18n="@@ui.element.add" class="sr-only">Add</span>
              </button>
              <button scButton variant="destructive" size="icon">
                <svg siTrash2Icon></svg
                ><span i18n="@@ui.element.delete" class="sr-only">Delete</span>
              </button>
            </div>
          </section>
          <section scFrame class="flex flex-col gap-4 p-6">
            <h2 i18n="@@ui.element.states" class="font-medium">States</h2>
            <div class="flex flex-wrap items-center gap-2">
              <button scButton disabled>
                <svg
                  i18n-aria-label="@@ui.element.loading"
                  scSpinner
                  siLoaderCircleIcon
                  aria-label="Loading"
                ></svg>
                <ng-container i18n="@@ui.element.saving">Saving</ng-container>
              </button>
              <button
                i18n="@@ui.element.disabled"
                scButton
                variant="outline"
                disabled
              >
                Disabled
              </button>
            </div>
          </section>
        </div>
      }
      @case ('avatar') {
        <div class="grid gap-4 lg:grid-cols-2">
          <section scFrame class="flex flex-col gap-4 p-6">
            <h2 i18n="@@ui.element.sizes" class="font-medium">Sizes</h2>
            <div class="flex items-center gap-3">
              <span scAvatar size="sm"
                ><img scAvatarImage [src]="people[1].avatar" alt="" /><span
                  scAvatarFallback
                  >EC</span
                ></span
              >
              <span scAvatar
                ><img scAvatarImage [src]="people[2].avatar" alt="" /><span
                  scAvatarFallback
                  >JJ</span
                ></span
              >
              <span scAvatar size="lg"
                ><img scAvatarImage [src]="people[3].avatar" alt="" /><span
                  scAvatarFallback
                  >MH</span
                ></span
              >
            </div>
          </section>
          <section scFrame class="flex flex-col gap-4 p-6">
            <h2 i18n="@@ui.element.fallbackAndBadge" class="font-medium">
              Fallback and badge
            </h2>
            <div class="flex items-center gap-3">
              <span scAvatar><span scAvatarFallback>AB</span></span>
              <span scAvatar>
                <img scAvatarImage [src]="people[4].avatar" alt="" />
                <span scAvatarFallback>DK</span>
                <span scAvatarBadge class="bg-success"></span>
              </span>
            </div>
          </section>
          <section scFrame class="flex flex-col gap-4 p-6 lg:col-span-2">
            <h2 i18n="@@ui.element.group" class="font-medium">Group</h2>
            <div scAvatarGroup>
              @for (person of people.slice(0, 5); track person.id) {
                <span scAvatar>
                  <img
                    scAvatarImage
                    [src]="person.avatar"
                    [alt]="person.name"
                  />
                  <span scAvatarFallback>{{ initialsOf(person.name) }}</span>
                </span>
              }
              <div scAvatarGroupCount>+{{ f.count(people.length - 5) }}</div>
            </div>
          </section>
        </div>
      }
      @case ('badge') {
        <section scFrame class="flex flex-col gap-4 p-6">
          <h2 i18n="@@ui.element.variants" class="font-medium">Variants</h2>
          <div class="flex flex-wrap items-center gap-2">
            <span i18n="@@ui.element.default" scBadge>Default</span>
            <span i18n="@@ui.element.secondary" scBadge variant="secondary"
              >Secondary</span
            >
            <span i18n="@@ui.element.outline" scBadge variant="outline"
              >Outline</span
            >
            <span i18n="@@ui.element.destructive" scBadge variant="destructive"
              >Destructive</span
            >
            <span scBadge variant="secondary"
              ><svg siCheckIcon></svg>
              <ng-container i18n="@@ui.element.verified"
                >Verified</ng-container
              ></span
            >
            <span scBadge class="rounded-full tabular-nums">{{
              f.count(8)
            }}</span>
          </div>
        </section>
      }
      @case ('tooltip') {
        <section scFrame class="flex flex-col gap-4 p-6">
          <h2 i18n="@@ui.element.sides" class="font-medium">Sides</h2>
          <div class="flex flex-wrap gap-2">
            @for (side of sides; track side) {
              <div scTooltipProvider [side]="side">
                <button scButton scTooltipTrigger variant="outline">
                  {{ side }}
                </button>
                <ng-template scTooltipPortal>
                  <div i18n="@@ui.element.onThe" scTooltip>
                    On the {{ side }}<span scTooltipArrow></span>
                  </div>
                </ng-template>
              </div>
            }
            <div scTooltipProvider>
              <button scButton scTooltipTrigger variant="outline" size="icon">
                <svg siSaveIcon></svg>
                <span i18n="@@ui.element.save" class="sr-only">Save</span>
              </button>
              <ng-template scTooltipPortal>
                <div i18n="@@ui.element.saveCtrlS" scTooltip>
                  Save <kbd scKbd>Ctrl S</kbd><span scTooltipArrow></span>
                </div>
              </ng-template>
            </div>
          </div>
        </section>
      }
      @case ('input') {
        <div class="grid gap-4 lg:grid-cols-2">
          <section scFrame class="flex flex-col gap-4 p-6">
            <h2 i18n="@@ui.element.kinds" class="font-medium">Kinds</h2>
            <div scField>
              <label i18n="@@ui.element.text" scLabel>Text</label
              ><input
                i18n-placeholder="@@ui.element.yourName"
                scInput
                placeholder="Your name"
              />
            </div>
            <div scField>
              <label i18n="@@ui.element.email" scLabel>Email</label
              ><input
                i18n-placeholder="@@ui.element.youExampleCom"
                scInput
                type="email"
                placeholder="you@example.com"
              />
            </div>
            <div scField>
              <label i18n="@@ui.element.number" scLabel>Number</label
              ><input scInput type="number" value="42" />
            </div>
          </section>
          <section scFrame class="flex flex-col gap-4 p-6">
            <h2 i18n="@@ui.element.states" class="font-medium">States</h2>
            <div scField>
              <label i18n="@@ui.element.withADescription" scLabel
                >With a description</label
              >
              <input scInput />
              <p i18n="@@ui.element.shownUnderTheField" scFieldDescription>
                Shown under the field.
              </p>
            </div>
            <div scField>
              <label i18n="@@ui.element.disabled" scLabel>Disabled</label
              ><input scInput disabled value="Can’t change" />
            </div>
            <div scField>
              <label i18n="@@ui.element.readOnly" scLabel>Read-only</label
              ><input scInput readonly value="Read me" />
            </div>
            <div scField>
              <label i18n="@@ui.element.file" scLabel>File</label
              ><input scInput type="file" />
            </div>
          </section>
        </div>
      }
      @case ('textarea') {
        <div class="grid gap-4 lg:grid-cols-2">
          <section scFrame class="flex flex-col gap-4 p-6">
            <h2 i18n="@@ui.element.default" class="font-medium">Default</h2>
            <div scField>
              <label i18n="@@ui.element.message" scLabel>Message</label>
              <textarea
                i18n-placeholder="@@ui.element.typeYourMessage"
                scTextarea
                placeholder="Type your message"
              ></textarea>
            </div>
          </section>
          <section scFrame class="flex flex-col gap-4 p-6">
            <h2 i18n="@@ui.element.withDescriptionDisabled" class="font-medium">
              With description, disabled
            </h2>
            <div scField>
              <label i18n="@@ui.element.bio" scLabel>Bio</label>
              <textarea scTextarea rows="3"></textarea>
              <p i18n="@@ui.element.aSentenceOrTwo" scFieldDescription>
                A sentence or two.
              </p>
            </div>
            <div scField>
              <label i18n="@@ui.element.disabled" scLabel>Disabled</label>
              <textarea scTextarea disabled>Can’t change</textarea>
            </div>
          </section>
        </div>
      }
      @case ('switch') {
        <section scFrame class="flex max-w-xl flex-col gap-4 p-6">
          <h2 i18n="@@ui.element.settings" class="font-medium">Settings</h2>
          <div scField orientation="horizontal">
            <input scSwitch type="checkbox" id="sw-1" [checked]="true" />
            <label i18n="@@ui.element.airplaneMode" scLabel for="sw-1"
              >Airplane mode</label
            >
          </div>
          <div scField orientation="horizontal">
            <div scFieldContentWrapper>
              <label i18n="@@ui.element.marketingEmails" scLabel for="sw-2"
                >Marketing emails</label
              >
              <p
                i18n="@@ui.element.newsAboutFeaturesAndOffers"
                scFieldDescription
              >
                News about features and offers.
              </p>
            </div>
            <input scSwitch type="checkbox" id="sw-2" />
          </div>
          <div scField orientation="horizontal">
            <input scSwitch type="checkbox" id="sw-3" disabled />
            <label i18n="@@ui.element.disabled" scLabel for="sw-3"
              >Disabled</label
            >
          </div>
        </section>
      }
      @case ('tabs') {
        <section scFrame class="flex flex-col gap-4 p-6">
          <h2 i18n="@@ui.element.account" class="font-medium">Account</h2>
          <div scTabs value="account">
            <div scTabsList>
              <button i18n="@@ui.element.account" scTabsTab value="account">
                Account
              </button>
              <button i18n="@@ui.element.password" scTabsTab value="password">
                Password
              </button>
              <button i18n="@@ui.element.team" scTabsTab value="team">
                Team
              </button>
            </div>
            <div scTabsPanel value="account">
              <ng-template scTabsPanelContent
                ><p
                  i18n="@@ui.element.changeYourNameAndEmail"
                  class="pt-4 text-sm"
                >
                  Change your name and email here.
                </p></ng-template
              >
            </div>
            <div scTabsPanel value="password">
              <ng-template scTabsPanelContent
                ><p
                  i18n="@@ui.element.changeYourPasswordHere"
                  class="pt-4 text-sm"
                >
                  Change your password here.
                </p></ng-template
              >
            </div>
            <div scTabsPanel value="team">
              <ng-template scTabsPanelContent
                ><p
                  i18n="@@ui.element.invitePeopleAndSetTheir"
                  class="pt-4 text-sm"
                >
                  Invite people and set their roles.
                </p></ng-template
              >
            </div>
          </div>
        </section>
      }
      @case ('select') {
        <section scFrame class="flex max-w-sm flex-col gap-4 p-6">
          <h2 i18n="@@ui.element.aFruit" class="font-medium">A fruit</h2>
          <div scField>
            <label i18n="@@ui.element.fruit" scLabel>Fruit</label>
            <div
              scSelect
              [value]="fruit()"
              (valueChange)="fruit.set($any($event))"
              [items]="fruits"
            >
              <button scSelectTrigger class="w-full">
                <span scSelectValue></span>
                <svg scSelectIcon siChevronDownIcon></svg>
              </button>
              <ng-template scSelectPortal>
                <div scSelectPopup>
                  <div scSelectList>
                    <div scSelectGroup>
                      @for (item of fruits; track item.value) {
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
          <p i18n="@@ui.element.chosen" class="text-muted-foreground text-sm">
            Chosen: {{ fruit() }}
          </p>
        </section>
      }
      @case ('checkbox') {
        <section scFrame class="flex max-w-xl flex-col gap-4 p-6">
          <h2 i18n="@@ui.element.choices" class="font-medium">Choices</h2>
          <div scField orientation="horizontal">
            <input scCheckbox type="checkbox" id="cb-1" [checked]="true" />
            <label i18n="@@ui.element.acceptTheTerms" scLabel for="cb-1"
              >Accept the terms</label
            >
          </div>
          <div scField orientation="horizontal">
            <input scCheckbox type="checkbox" id="cb-2" />
            <div scFieldContentWrapper>
              <label i18n="@@ui.element.sendMeACopy" scLabel for="cb-2"
                >Send me a copy</label
              >
              <p i18n="@@ui.element.toTheEmailOnYour" scFieldDescription>
                To the email on your account.
              </p>
            </div>
          </div>
          <div scField orientation="horizontal">
            <input
              scCheckbox
              type="checkbox"
              id="cb-3"
              [indeterminate]="true"
            />
            <label i18n="@@ui.element.someSelected" scLabel for="cb-3"
              >Some selected</label
            >
          </div>
          <div scField orientation="horizontal">
            <input scCheckbox type="checkbox" id="cb-4" disabled />
            <label i18n="@@ui.element.disabled" scLabel for="cb-4"
              >Disabled</label
            >
          </div>
        </section>
      }
      @case ('accordion') {
        <section scFrame class="flex max-w-2xl flex-col gap-4 p-6">
          <h2 i18n="@@ui.element.questions" class="font-medium">Questions</h2>
          <div scAccordion>
            @for (item of questions; track item.id) {
              <div scAccordionItem [value]="item.id">
                <h3 scAccordionHeader>
                  <button scAccordionTrigger>
                    {{ item.q }}
                    <svg siChevronDownIcon scAccordionTriggerIcon></svg>
                  </button>
                </h3>
                <div scAccordionPanel>
                  <ng-template scAccordionPanelContent>{{
                    item.a
                  }}</ng-template>
                </div>
              </div>
            }
          </div>
        </section>
      }
      @case ('card') {
        <div class="grid gap-4 lg:grid-cols-3">
          <div scCard>
            <div scCardHeader>
              <h2 i18n="@@ui.element.simple" scCardTitle>Simple</h2>
              <p i18n="@@ui.element.aTitleAndADescription" scCardDescription>
                A title and a description
              </p>
            </div>
            <div
              i18n="@@ui.element.theContentGoesHere"
              scCardBody
              class="text-sm"
            >
              The content goes here.
            </div>
          </div>
          <div scCard>
            <div scCardHeader>
              <h2 i18n="@@ui.element.withAnAction" scCardTitle>
                With an action
              </h2>
              <p i18n="@@ui.element.inTheHeaderSCorner" scCardDescription>
                In the header’s corner
              </p>
              <div scCardAction>
                <button scButton variant="ghost" size="icon-sm">
                  <svg siBellIcon></svg
                  ><span i18n="@@ui.element.notifyMe" class="sr-only"
                    >Notify me</span
                  >
                </button>
              </div>
            </div>
            <div
              i18n="@@ui.element.threeNewMessagesToday"
              scCardBody
              class="text-sm"
            >
              Three new messages today.
            </div>
          </div>
          <div scCard>
            <div scCardHeader>
              <h2 i18n="@@ui.element.withAFooter" scCardTitle>With a footer</h2>
              <p i18n="@@ui.element.forTheButtons" scCardDescription>
                For the buttons
              </p>
            </div>
            <div i18n="@@ui.element.readyToPublish" scCardBody class="text-sm">
              Ready to publish?
            </div>
            <div scCardFooter class="gap-2">
              <button i18n="@@ui.element.cancel" scButton variant="outline">
                Cancel
              </button>
              <button i18n="@@ui.element.publish" scButton>Publish</button>
            </div>
          </div>
        </div>
      }
      @case ('radio-group') {
        <section scFrame class="flex max-w-xl flex-col gap-4 p-6">
          <h2
            i18n="@@ui.element.notifyMeAbout"
            class="font-medium"
            id="rg-title"
          >
            Notify me about
          </h2>
          <div
            scRadioGroup
            aria-labelledby="rg-title"
            class="flex flex-col gap-3"
          >
            <label scLabel
              ><input
                scRadio
                type="radio"
                name="notify"
                value="all"
                checked
              /><ng-container i18n="@@ui.element.allNewMessages"
                >All new messages</ng-container
              ></label
            >
            <label scLabel
              ><input
                scRadio
                type="radio"
                name="notify"
                value="mentions"
              /><ng-container i18n="@@ui.element.mentionsOnly"
                >Mentions only</ng-container
              ></label
            >
            <label scLabel
              ><input
                scRadio
                type="radio"
                name="notify"
                value="none"
              /><ng-container i18n="@@ui.element.nothing"
                >Nothing</ng-container
              ></label
            >
          </div>
        </section>
      }
      @case ('date-picker') {
        <section scFrame class="flex max-w-sm flex-col gap-4 p-6">
          <h2 i18n="@@ui.element.aDate" class="font-medium">A date</h2>
          <div scDatePicker #dp="scDatePicker" [(value)]="date">
            <div
              scPopoverProvider
              [origin]="trigger.overlayOrigin"
              alignment="start"
            >
              <button
                scInputButton
                scDatePickerTrigger
                #trigger="scDatePickerTrigger"
                class="w-full"
              >
                <svg siCalendarIcon></svg>
                <span>{{ formatDate(date()) || t.pickADate }}</span>
              </button>
              <ng-template scPopoverPortal>
                <div
                  i18n-aria-label="@@ui.element.chooseADate"
                  scPopover
                  class="w-auto p-0"
                  aria-label="Choose a date"
                >
                  <div
                    i18n-aria-label="@@ui.element.chooseADate"
                    scCalendar
                    initialFocus
                    aria-label="Choose a date"
                    [mode]="dp.mode()"
                    [value]="dp.draft()"
                    (valueChange)="dp.pick($event)"
                  >
                    <div scCalendarHeader>
                      <button scCalendarPrevious>
                        <svg siChevronLeftIcon></svg>
                        <span i18n="@@ui.element.previousMonth" class="sr-only"
                          >Previous month</span
                        >
                      </button>
                      <button scCalendarNext>
                        <svg siChevronRightIcon></svg>
                        <span i18n="@@ui.element.nextMonth" class="sr-only"
                          >Next month</span
                        >
                      </button>
                    </div>
                  </div>
                </div>
              </ng-template>
            </div>
          </div>
        </section>
      }
    }
  `,
  host: { class: 'flex flex-col gap-4' },
  encapsulation: ViewEncapsulation.None,
})
export class UiElementPage {
  /** Figures as the library writes them (the dashboard's choices). */
  private readonly f = injectFormats();
  // The value as written: Intl's, in the user's digits — or your own format.
  private readonly formatDate = injectFormatDate();
  /** In the user's numbering system. */

  /** The template's words that sit in bindings, translated. */
  private readonly t = {
    uiElements: $localize`:@@ui.element.uiElements:UI Elements`,
    pickADate: $localize`:@@ui.element.pickADate:Pick a date`,
  };

  /** The route's `:element`. */
  readonly element = input.required<string>();

  private readonly title = computed(
    () =>
      TITLES[this.element()] ?? $localize`:@@ui.element.uiElement:UI Element`,
  );
  private readonly people = PEOPLE;
  private readonly sides = ['top', 'right', 'bottom', 'left'] as const;
  private readonly fruits = [
    $localize`:@@ui.element.apple:Apple`,
    $localize`:@@ui.element.banana:Banana`,
    $localize`:@@ui.element.blueberry:Blueberry`,
    $localize`:@@ui.element.grapes:Grapes`,
    $localize`:@@ui.element.pineapple:Pineapple`,
  ].map((value) => ({ value, label: value }));
  private readonly fruit = signal(this.fruits[0].value);
  private readonly date = signal<ScCalendarValue>(Temporal.Now.plainDateISO());
  private readonly questions = [
    {
      id: 'a',
      q: $localize`:@@ui.element.isItAccessible:Is it accessible?`,
      a: $localize`:@@ui.element.yesItFollowsTheWai:Yes. It follows the WAI-ARIA disclosure pattern.`,
    },
    {
      id: 'b',
      q: $localize`:@@ui.element.isItStyled:Is it styled?`,
      a: $localize`:@@ui.element.yesByTheStyleLike:Yes — by the style, like every other part.`,
    },
    {
      id: 'c',
      q: $localize`:@@ui.element.isItAnimated:Is it animated?`,
      a: $localize`:@@ui.element.yesUnlessYouPreferReduced:Yes, unless you prefer reduced motion.`,
    },
  ];
  private readonly initialsOf = initials;
}
