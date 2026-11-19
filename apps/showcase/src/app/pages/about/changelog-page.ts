import { Component, ViewEncapsulation } from '@angular/core';
import { ScTypeset } from '@semantic-components/ui';
import { TocHeading } from '../../components/toc/toc-heading';

interface Release {
  /** ISO date; shown as written. */
  readonly date: string;
  readonly changes: readonly string[];
}

@Component({
  selector: 'app-changelog-page',
  imports: [ScTypeset, TocHeading],
  template: `
    <div class="space-y-12">
      <div class="space-y-2">
        <h1 scTypeset>Changelog</h1>
        <p class="text-muted-foreground">
          What changed, newest first. The library is pre-release: names and APIs
          still change when a better one is found — each change is listed here,
          with what replaces it.
        </p>
      </div>

      @for (release of releases; track release.date) {
        <section class="space-y-4">
          <h2 scTypeset appToc>
            <time [attr.datetime]="release.date">{{ release.date }}</time>
          </h2>
          <ul class="list-disc space-y-2 ps-6">
            @for (change of release.changes; track change) {
              <li>{{ change }}</li>
            }
          </ul>
        </section>
      }
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
})
export default class ChangelogPage {
  private readonly releases: Release[] = [
    {
      date: '2026-11-19',
      changes: [
        '“Field” is now only scField (a label, a control and its text): OTP Field is OTP Input (scOtpInput, scOtpInputGroup, scOtpInputSlot), Password Field is Password Group (no root: the input goes in your scField, scPasswordGroup holds the state, Generate goes inside it), Number Field is Number Group (scNumberGroup is the control; the scrub area round the label reaches it through the field), scColorPickerField is scColorPickerInput.',
        'Key hints are the library’s Kbd: ScMenuShortcut, ScCommandShortcut and ScQuestionnaireChoiceShortcut are gone — write <kbd scKbd> in the item; the menu, the command list and the choice place it.',
        'scSeparator takes content (an icon, a dot, a word) as well as drawing a line; ScOtpInputSeparator is gone.',
        'OTP Input: the inputs are a group named by the field’s label, each named once from slotLabel (“Character {index} of {length}”).',
        'Header (was Navbar): three parts — scHeader, scHeaderMobileMenuToggle, ng-template scHeaderMobileMenu; the links are the Navigation Menu’s.',
        'The Color Picker takes its look from the styles; a link in a popup closes it at once, and a navigation that ends closes it too.',
        'These docs: a reading width, demos with their code folded below, and the new Guides and About pages.',
      ],
    },
    {
      date: '2026-11-18',
      changes: [
        'Presets are styles: @semantic-components/styles, provideSemanticComponents({ style }), injectStyle(). The /presets page is /customize.',
      ],
    },
    {
      date: '2026-11-17',
      changes: [
        'CSS variables of our own and Base UI’s take an --sc- prefix (shadcn’s keep their names).',
      ],
    },
    {
      date: '2026-11-16',
      changes: [
        'Editor: one scEditorCommand="name" beside scToggle in the library’s Toolbar; scEditorBlock for your own block menu; no header or footer parts.',
      ],
    },
    {
      date: '2026-11-13',
      changes: [
        'Names: Provider > Component > Content > Header / Body / Footer; alignment, not align.',
        'AI Elements: shadcn’s 21 patterns as demos.',
      ],
    },
    {
      date: '2026-11-12',
      changes: [
        'Rewritten: Combobox (on Angular Aria), Carousel (on Embla), Navigation Menu. ScThemeModeToggle removed: any control calls ScThemeManager.',
      ],
    },
    {
      date: '2026-11-11',
      changes: [
        'Rewritten: OTP Field, Collapsible, Command; restyled: Toast, Native Select.',
      ],
    },
    {
      date: '2026-11-10',
      changes: [
        'Rewritten: Checkbox, Switch, Slider, Toggle Group, Toolbar; new: Checkbox Group; restyled: Radio Group, Toggle.',
      ],
    },
    {
      date: '2026-11-07',
      changes: ['Restyled: Label, Field, Textarea, Input Button.'],
    },
    {
      date: '2026-11-06',
      changes: [
        'Rewritten: Tooltip, Popover, Sheet, Drawer, Resizable, Preview Card (shadcn’s Hover Card); restyled: Skeleton, Separator, Calendar.',
      ],
    },
    {
      date: '2026-11-05',
      changes: [
        'Rewritten: Menu, Menubar and Context Menu (one set of parts), Tabs, Accordion; restyled: Code Block, Dialog, Attachment, Bubble, Marker, Kbd, Item, Empty, Spinner.',
      ],
    },
    {
      date: '2026-10-30',
      changes: [
        'Rewritten: Sidebar, Select; Button Group renamed Control Group.',
      ],
    },
    {
      date: '2026-10-29',
      changes: ['Rewritten: Password, Progress; new: Tree Table, JSON Viewer.'],
    },
  ];
}
