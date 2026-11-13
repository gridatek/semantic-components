import { Component, ViewEncapsulation, signal } from '@angular/core';
import { FormField, form } from '@angular/forms/signals';
import {
  ScButton,
  ScCard,
  ScCardBody,
  ScCardDescription,
  ScCardFooter,
  ScCardHeader,
  ScCardTitle,
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
  ScSelectPopup,
  ScSelectPortal,
  ScSelectTrigger,
  ScSelectValue,
  ScTextarea,
} from '@semantic-components/ui';
import { SiCheckIcon, SiChevronDownIcon } from '@semantic-icons/lucide-icons';

/** A bug report: a title, two selects side by side, the steps. */
@Component({
  selector: 'app-preview-report-bug',
  imports: [
    FormField,
    ScButton,
    ScCard,
    ScCardBody,
    ScCardDescription,
    ScCardFooter,
    ScCardHeader,
    ScCardTitle,
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
    ScSelectPopup,
    ScSelectPortal,
    ScSelectTrigger,
    ScSelectValue,
    ScTextarea,
    SiCheckIcon,
    SiChevronDownIcon,
  ],
  template: `
    <div scCard>
      <div scCardHeader>
        <h2 scCardTitle>Report Bug</h2>
        <p scCardDescription>Help us fix issues faster.</p>
      </div>
      <div scCardBody>
        <div scFieldGroup>
          <div scField>
            <label scLabel>Title</label>
            <input
              scInput
              placeholder="Brief description of the issue"
              [formField]="bug.title"
            />
          </div>
          <div class="grid grid-cols-2 gap-3">
            @for (select of selects; track select.key) {
              <div scField>
                <div
                  scSelect
                  class="w-full"
                  [items]="select.items"
                  [formField]="bug[select.key]"
                >
                  <label scSelectLabel>{{ select.label }}</label>
                  <div scSelectTrigger class="w-full">
                    <span scSelectValue></span>
                    <svg scSelectIcon siChevronDownIcon></svg>
                  </div>
                  <ng-template scSelectPortal>
                    <div scSelectPopup>
                      <div scSelectList>
                        <div scSelectGroup>
                          @for (item of select.items; track item.value) {
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
            }
          </div>
          <div scField>
            <label scLabel>Steps to reproduce</label>
            <textarea
              scTextarea
              class="min-h-24 resize-none"
              placeholder="1. Go to&#10;2. Click on&#10;3. Observe..."
              [formField]="bug.steps"
            ></textarea>
          </div>
        </div>
      </div>
      <div scCardFooter>
        <div class="flex w-full justify-end gap-2">
          <button scButton variant="outline">Attach File</button>
          <button scButton>Submit Bug</button>
        </div>
      </div>
    </div>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class PreviewReportBug {
  protected readonly bug = form(
    signal({
      title: '',
      severity: 'medium',
      component: 'dashboard',
      steps: '',
    }),
  );
  protected readonly selects = [
    {
      key: 'severity',
      label: 'Severity',
      items: [
        { label: 'Critical', value: 'critical' },
        { label: 'High', value: 'high' },
        { label: 'Medium', value: 'medium' },
        { label: 'Low', value: 'low' },
      ],
    },
    {
      key: 'component',
      label: 'Component',
      items: [
        { label: 'Dashboard', value: 'dashboard' },
        { label: 'Auth', value: 'auth' },
        { label: 'API', value: 'api' },
        { label: 'Billing', value: 'billing' },
      ],
    },
  ] as const;
}
