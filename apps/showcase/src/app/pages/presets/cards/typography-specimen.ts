import { Component, ViewEncapsulation, signal } from '@angular/core';
import { FormField, form } from '@angular/forms/signals';
import {
  ScButton,
  ScCard,
  ScCardBody,
  ScCardFooter,
  ScDialog,
  ScDialogClose,
  ScDialogDescription,
  ScDialogFooter,
  ScDialogHeader,
  ScDialogPortal,
  ScDialogProvider,
  ScDialogTitle,
  ScDialogTrigger,
  ScField,
  ScFieldGroup,
  ScInput,
  ScLabel,
  ScSelect,
  ScSelectGroup,
  ScSelectIcon,
  ScSelectItem,
  ScSelectItemIndicator,
  ScSelectItemText,
  ScSelectLabel,
  ScSelectList,
  ScSelectOnFocus,
  ScSelectPopup,
  ScSelectPortal,
  ScSelectTrigger,
  ScSelectValue,
  ScTextarea,
} from '@semantic-components/ui';
import {
  SiCheckIcon,
  SiChevronDownIcon,
  SiXIcon,
} from '@semantic-icons/lucide-icons';

/** The fonts at work, and a feedback form in a dialog. */
@Component({
  selector: 'app-preview-typography-specimen',
  imports: [
    FormField,
    ScButton,
    ScCard,
    ScCardBody,
    ScCardFooter,
    ScDialog,
    ScDialogClose,
    ScDialogDescription,
    ScDialogFooter,
    ScDialogHeader,
    ScDialogPortal,
    ScDialogProvider,
    ScDialogTitle,
    ScDialogTrigger,
    ScField,
    ScFieldGroup,
    ScInput,
    ScLabel,
    ScSelect,
    ScSelectGroup,
    ScSelectIcon,
    ScSelectItem,
    ScSelectItemIndicator,
    ScSelectItemText,
    ScSelectLabel,
    ScSelectList,
    ScSelectOnFocus,
    ScSelectPopup,
    ScSelectPortal,
    ScSelectTrigger,
    ScSelectValue,
    ScTextarea,
    SiCheckIcon,
    SiChevronDownIcon,
    SiXIcon,
  ],
  template: `
    <div scCard>
      <div scCardBody class="flex flex-col gap-2">
        <p class="text-muted-foreground text-xs font-medium uppercase">
          Inherit - Geist
        </p>
        <h2 class="font-heading text-2xl font-medium">
          Designing with rhythm and hierarchy.
        </h2>
        <p class="text-muted-foreground text-sm leading-relaxed">
          A strong body style keeps long-form content readable and balances the
          visual weight of headings.
        </p>
        <p class="text-muted-foreground text-sm leading-relaxed">
          Thoughtful spacing and cadence help paragraphs scan quickly without
          feeling dense.
        </p>
      </div>
      <div scCardFooter>
        <div scDialogProvider class="w-full" [(open)]="open">
          <button scButton scDialogTrigger variant="outline" class="w-full">
            Share Feedback
          </button>
          <ng-template scDialogPortal>
            <div scDialog>
              <button scDialogClose>
                <svg siXIcon></svg>
                <span class="sr-only">Close</span>
              </button>
              <div scDialogHeader>
                <h2 scDialogTitle>Share Feedback</h2>
                <p scDialogDescription>
                  Let us know how we can improve your experience.
                </p>
              </div>
              <div scFieldGroup>
                <div class="grid grid-cols-2 gap-3">
                  <div scField>
                    <label scLabel>Name</label>
                    <input
                      cdkFocusInitial
                      scSelectOnFocus="program"
                      scInput
                      placeholder="Your name"
                      [formField]="feedback.name"
                    />
                  </div>
                  <div scField>
                    <label scLabel>Email</label>
                    <input
                      scInput
                      type="email"
                      placeholder="you@example.com"
                      [formField]="feedback.email"
                    />
                  </div>
                </div>
                <div scField>
                  <div
                    scSelect
                    class="w-full"
                    [items]="categories"
                    [formField]="feedback.category"
                  >
                    <label scSelectLabel>Category</label>
                    <div scSelectTrigger class="w-full">
                      <span scSelectValue></span>
                      <svg scSelectIcon siChevronDownIcon></svg>
                    </div>
                    <ng-template scSelectPortal>
                      <div scSelectPopup>
                        <div scSelectList>
                          <div scSelectGroup>
                            @for (item of categories; track item.value) {
                              <div scSelectItem [value]="item.value">
                                <span scSelectItemText>{{ item.label }}</span>
                                <span scSelectItemIndicator>
                                  <svg siCheckIcon></svg>
                                </span>
                              </div>
                            }
                          </div>
                        </div>
                      </div>
                    </ng-template>
                  </div>
                </div>
                <div scField>
                  <label scLabel>Message</label>
                  <textarea
                    scTextarea
                    placeholder="Tell us what's on your mind..."
                    class="min-h-24 resize-none"
                    [formField]="feedback.message"
                  ></textarea>
                </div>
              </div>
              <div scDialogFooter>
                <button scDialogClose variant="outline" size="default">
                  Cancel
                </button>
                <button scButton (click)="open.set(false)">Submit</button>
              </div>
            </div>
          </ng-template>
        </div>
      </div>
    </div>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class PreviewTypographySpecimen {
  protected readonly open = signal(false);
  protected readonly categories = [
    { label: 'General', value: 'general' },
    { label: 'Bug Report', value: 'bug' },
    { label: 'Feature Request', value: 'feature' },
    { label: 'Improvement', value: 'improvement' },
  ];
  protected readonly feedback = form(
    signal({ name: '', email: '', category: 'general', message: '' }),
  );
}
