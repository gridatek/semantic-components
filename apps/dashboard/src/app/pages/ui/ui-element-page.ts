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
  ScSelectLabel,
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
import { initials } from '../../shared/format';

const TITLES: Record<string, string> = {
  button: 'Button',
  avatar: 'Avatar',
  badge: 'Badge',
  tooltip: 'Tooltip',
  input: 'Input',
  textarea: 'Textarea',
  switch: 'Switch',
  tabs: 'Tabs',
  select: 'Select',
  checkbox: 'Checkbox',
  accordion: 'Accordion',
  card: 'Card',
  'radio-group': 'Radio Group',
  'date-picker': 'Date Picker',
};

/**
 * UI Elements: one library component per page, in its variants (the
 * reference links these to its component docs; here they're in the app).
 */
@Component({
  selector: 'app-ui-element-page',
  imports: [
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
    ScSelectLabel,
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
      [trail]="[{ label: 'UI Elements' }, { label: title() }]"
    />

    @switch (element()) {
      @case ('button') {
        <div class="grid gap-4 lg:grid-cols-2">
          <section scFrame class="flex flex-col gap-4 p-6">
            <h2 class="font-medium">Variants</h2>
            <div class="flex flex-wrap gap-2">
              <button scButton>Default</button>
              <button scButton variant="secondary">Secondary</button>
              <button scButton variant="outline">Outline</button>
              <button scButton variant="ghost">Ghost</button>
              <button scButton variant="destructive">Destructive</button>
              <button scButton variant="link">Link</button>
            </div>
          </section>
          <section scFrame class="flex flex-col gap-4 p-6">
            <h2 class="font-medium">Sizes</h2>
            <div class="flex flex-wrap items-center gap-2">
              <button scButton size="xs">Extra small</button>
              <button scButton size="sm">Small</button>
              <button scButton>Default</button>
              <button scButton size="lg">Large</button>
            </div>
          </section>
          <section scFrame class="flex flex-col gap-4 p-6">
            <h2 class="font-medium">With icons</h2>
            <div class="flex flex-wrap items-center gap-2">
              <button scButton><svg siMailIcon></svg> Email</button>
              <button scButton variant="outline">
                Next <svg siArrowRightIcon></svg>
              </button>
              <button scButton variant="outline" size="icon">
                <svg siPlusIcon></svg><span class="sr-only">Add</span>
              </button>
              <button scButton variant="destructive" size="icon">
                <svg siTrash2Icon></svg><span class="sr-only">Delete</span>
              </button>
            </div>
          </section>
          <section scFrame class="flex flex-col gap-4 p-6">
            <h2 class="font-medium">States</h2>
            <div class="flex flex-wrap items-center gap-2">
              <button scButton disabled>
                <svg scSpinner siLoaderCircleIcon aria-label="Loading"></svg>
                Saving
              </button>
              <button scButton variant="outline" disabled>Disabled</button>
            </div>
          </section>
        </div>
      }
      @case ('avatar') {
        <div class="grid gap-4 lg:grid-cols-2">
          <section scFrame class="flex flex-col gap-4 p-6">
            <h2 class="font-medium">Sizes</h2>
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
            <h2 class="font-medium">Fallback and badge</h2>
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
            <h2 class="font-medium">Group</h2>
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
              <div scAvatarGroupCount>+{{ people.length - 5 }}</div>
            </div>
          </section>
        </div>
      }
      @case ('badge') {
        <section scFrame class="flex flex-col gap-4 p-6">
          <h2 class="font-medium">Variants</h2>
          <div class="flex flex-wrap items-center gap-2">
            <span scBadge>Default</span>
            <span scBadge variant="secondary">Secondary</span>
            <span scBadge variant="outline">Outline</span>
            <span scBadge variant="destructive">Destructive</span>
            <span scBadge variant="secondary"
              ><svg siCheckIcon></svg> Verified</span
            >
            <span scBadge class="rounded-full tabular-nums">8</span>
          </div>
        </section>
      }
      @case ('tooltip') {
        <section scFrame class="flex flex-col gap-4 p-6">
          <h2 class="font-medium">Sides</h2>
          <div class="flex flex-wrap gap-2">
            @for (side of sides; track side) {
              <div scTooltipProvider [side]="side">
                <button scButton scTooltipTrigger variant="outline">
                  {{ side }}
                </button>
                <ng-template scTooltipPortal>
                  <div scTooltip>
                    On the {{ side }}<span scTooltipArrow></span>
                  </div>
                </ng-template>
              </div>
            }
            <div scTooltipProvider>
              <button scButton scTooltipTrigger variant="outline" size="icon">
                <svg siSaveIcon></svg>
                <span class="sr-only">Save</span>
              </button>
              <ng-template scTooltipPortal>
                <div scTooltip>
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
            <h2 class="font-medium">Kinds</h2>
            <div scField>
              <label scLabel>Text</label
              ><input scInput placeholder="Your name" />
            </div>
            <div scField>
              <label scLabel>Email</label
              ><input scInput type="email" placeholder="you@example.com" />
            </div>
            <div scField>
              <label scLabel>Number</label
              ><input scInput type="number" value="42" />
            </div>
          </section>
          <section scFrame class="flex flex-col gap-4 p-6">
            <h2 class="font-medium">States</h2>
            <div scField>
              <label scLabel>With a description</label>
              <input scInput />
              <p scFieldDescription>Shown under the field.</p>
            </div>
            <div scField>
              <label scLabel>Disabled</label
              ><input scInput disabled value="Can’t change" />
            </div>
            <div scField>
              <label scLabel>Read-only</label
              ><input scInput readonly value="Read me" />
            </div>
            <div scField>
              <label scLabel>File</label><input scInput type="file" />
            </div>
          </section>
        </div>
      }
      @case ('textarea') {
        <div class="grid gap-4 lg:grid-cols-2">
          <section scFrame class="flex flex-col gap-4 p-6">
            <h2 class="font-medium">Default</h2>
            <div scField>
              <label scLabel>Message</label>
              <textarea scTextarea placeholder="Type your message"></textarea>
            </div>
          </section>
          <section scFrame class="flex flex-col gap-4 p-6">
            <h2 class="font-medium">With description, disabled</h2>
            <div scField>
              <label scLabel>Bio</label>
              <textarea scTextarea rows="3"></textarea>
              <p scFieldDescription>A sentence or two.</p>
            </div>
            <div scField>
              <label scLabel>Disabled</label>
              <textarea scTextarea disabled>Can’t change</textarea>
            </div>
          </section>
        </div>
      }
      @case ('switch') {
        <section scFrame class="flex max-w-xl flex-col gap-4 p-6">
          <h2 class="font-medium">Settings</h2>
          <div scField orientation="horizontal">
            <input scSwitch type="checkbox" id="sw-1" [checked]="true" />
            <label scLabel for="sw-1">Airplane mode</label>
          </div>
          <div scField orientation="horizontal">
            <div scFieldContentWrapper>
              <label scLabel for="sw-2">Marketing emails</label>
              <p scFieldDescription>News about features and offers.</p>
            </div>
            <input scSwitch type="checkbox" id="sw-2" />
          </div>
          <div scField orientation="horizontal">
            <input scSwitch type="checkbox" id="sw-3" disabled />
            <label scLabel for="sw-3">Disabled</label>
          </div>
        </section>
      }
      @case ('tabs') {
        <section scFrame class="flex flex-col gap-4 p-6">
          <h2 class="font-medium">Account</h2>
          <div scTabs value="account">
            <div scTabsList>
              <button scTabsTab value="account">Account</button>
              <button scTabsTab value="password">Password</button>
              <button scTabsTab value="team">Team</button>
            </div>
            <div scTabsPanel value="account">
              <ng-template scTabsPanelContent
                ><p class="pt-4 text-sm">
                  Change your name and email here.
                </p></ng-template
              >
            </div>
            <div scTabsPanel value="password">
              <ng-template scTabsPanelContent
                ><p class="pt-4 text-sm">
                  Change your password here.
                </p></ng-template
              >
            </div>
            <div scTabsPanel value="team">
              <ng-template scTabsPanelContent
                ><p class="pt-4 text-sm">
                  Invite people and set their roles.
                </p></ng-template
              >
            </div>
          </div>
        </section>
      }
      @case ('select') {
        <section scFrame class="flex max-w-sm flex-col gap-4 p-6">
          <h2 class="font-medium">A fruit</h2>
          <div scField>
            <div
              scSelect
              [value]="fruit()"
              (valueChange)="fruit.set($any($event))"
              [items]="fruits"
            >
              <label scSelectLabel>Fruit</label>
              <div scSelectTrigger class="w-full">
                <span scSelectValue></span>
                <svg scSelectIcon siChevronDownIcon></svg>
              </div>
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
          <p class="text-muted-foreground text-sm">Chosen: {{ fruit() }}</p>
        </section>
      }
      @case ('checkbox') {
        <section scFrame class="flex max-w-xl flex-col gap-4 p-6">
          <h2 class="font-medium">Choices</h2>
          <div scField orientation="horizontal">
            <input scCheckbox type="checkbox" id="cb-1" [checked]="true" />
            <label scLabel for="cb-1">Accept the terms</label>
          </div>
          <div scField orientation="horizontal">
            <input scCheckbox type="checkbox" id="cb-2" />
            <div scFieldContentWrapper>
              <label scLabel for="cb-2">Send me a copy</label>
              <p scFieldDescription>To the email on your account.</p>
            </div>
          </div>
          <div scField orientation="horizontal">
            <input
              scCheckbox
              type="checkbox"
              id="cb-3"
              [indeterminate]="true"
            />
            <label scLabel for="cb-3">Some selected</label>
          </div>
          <div scField orientation="horizontal">
            <input scCheckbox type="checkbox" id="cb-4" disabled />
            <label scLabel for="cb-4">Disabled</label>
          </div>
        </section>
      }
      @case ('accordion') {
        <section scFrame class="flex max-w-2xl flex-col gap-4 p-6">
          <h2 class="font-medium">Questions</h2>
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
              <h2 scCardTitle>Simple</h2>
              <p scCardDescription>A title and a description</p>
            </div>
            <div scCardBody class="text-sm">The content goes here.</div>
          </div>
          <div scCard>
            <div scCardHeader>
              <h2 scCardTitle>With an action</h2>
              <p scCardDescription>In the header’s corner</p>
              <div scCardAction>
                <button scButton variant="ghost" size="icon-sm">
                  <svg siBellIcon></svg><span class="sr-only">Notify me</span>
                </button>
              </div>
            </div>
            <div scCardBody class="text-sm">Three new messages today.</div>
          </div>
          <div scCard>
            <div scCardHeader>
              <h2 scCardTitle>With a footer</h2>
              <p scCardDescription>For the buttons</p>
            </div>
            <div scCardBody class="text-sm">Ready to publish?</div>
            <div scCardFooter class="gap-2">
              <button scButton variant="outline">Cancel</button>
              <button scButton>Publish</button>
            </div>
          </div>
        </div>
      }
      @case ('radio-group') {
        <section scFrame class="flex max-w-xl flex-col gap-4 p-6">
          <h2 class="font-medium" id="rg-title">Notify me about</h2>
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
              />All new messages</label
            >
            <label scLabel
              ><input
                scRadio
                type="radio"
                name="notify"
                value="mentions"
              />Mentions only</label
            >
            <label scLabel
              ><input
                scRadio
                type="radio"
                name="notify"
                value="none"
              />Nothing</label
            >
          </div>
        </section>
      }
      @case ('date-picker') {
        <section scFrame class="flex max-w-sm flex-col gap-4 p-6">
          <h2 class="font-medium">A date</h2>
          <div scDatePicker #dp="scDatePicker" [(value)]="date">
            <div
              scPopoverProvider
              [origin]="trigger.overlayOrigin"
              alignment="start"
            >
              <button
                scDatePickerTrigger
                #trigger="scDatePickerTrigger"
                class="w-full"
              >
                <svg siCalendarIcon></svg>
                <span>{{ dp.text() || 'Pick a date' }}</span>
              </button>
              <ng-template scPopoverPortal>
                <div scPopover class="w-auto p-0" aria-label="Choose a date">
                  <div
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
                        <span class="sr-only">Previous month</span>
                      </button>
                      <button scCalendarNext>
                        <svg siChevronRightIcon></svg>
                        <span class="sr-only">Next month</span>
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
  /** The route's `:element`. */
  readonly element = input.required<string>();

  private readonly title = computed(
    () => TITLES[this.element()] ?? 'UI Element',
  );
  private readonly people = PEOPLE;
  private readonly sides = ['top', 'right', 'bottom', 'left'] as const;
  private readonly fruits = [
    'Apple',
    'Banana',
    'Blueberry',
    'Grapes',
    'Pineapple',
  ].map((value) => ({ value, label: value }));
  private readonly fruit = signal('Apple');
  private readonly date = signal<ScCalendarValue>(Temporal.Now.plainDateISO());
  private readonly questions = [
    {
      id: 'a',
      q: 'Is it accessible?',
      a: 'Yes. It follows the WAI-ARIA disclosure pattern.',
    },
    {
      id: 'b',
      q: 'Is it styled?',
      a: 'Yes — by the preset, like every other part.',
    },
    {
      id: 'c',
      q: 'Is it animated?',
      a: 'Yes, unless you prefer reduced motion.',
    },
  ];
  private readonly initialsOf = initials;
}
