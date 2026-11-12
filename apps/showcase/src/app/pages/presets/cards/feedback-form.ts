import { Component, ViewEncapsulation, signal } from '@angular/core';
import { FormField, form } from '@angular/forms/signals';
import {
  ScButton,
  ScCard,
  ScCardContent,
  ScCardFooter,
  ScField,
  ScFieldGroup,
  ScLabel,
  ScNativeSelect,
  ScNativeSelectContainer,
  ScNativeSelectIcon,
  ScNativeSelectOption,
  ScTextarea,
} from '@semantic-components/ui';
import { SiChevronDownIcon } from '@semantic-icons/lucide-icons';

/** Feedback: a topic (a native select) and a message. */
@Component({
  selector: 'app-preview-feedback-form',
  imports: [
    FormField,
    ScButton,
    ScCard,
    ScCardContent,
    ScCardFooter,
    ScField,
    ScFieldGroup,
    ScLabel,
    ScNativeSelect,
    ScNativeSelectContainer,
    ScNativeSelectIcon,
    ScNativeSelectOption,
    ScTextarea,
    SiChevronDownIcon,
  ],
  template: `
    <div scCard>
      <div scCardContent>
        <div scFieldGroup>
          <div scField>
            <label scLabel>Topic</label>
            <div scNativeSelectContainer class="w-full">
              <select scNativeSelect [formField]="feedback.topic">
                @for (topic of topics; track topic.value) {
                  <option scNativeSelectOption [value]="topic.value">
                    {{ topic.label }}
                  </option>
                }
              </select>
              <svg siChevronDownIcon scNativeSelectIcon></svg>
            </div>
          </div>
          <div scField>
            <label scLabel>Feedback</label>
            <textarea
              scTextarea
              placeholder="Your feedback helps us improve..."
              [formField]="feedback.message"
            ></textarea>
          </div>
        </div>
      </div>
      <div scCardFooter>
        <button scButton>Submit</button>
      </div>
    </div>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class PreviewFeedbackForm {
  protected readonly topics = [
    { value: '', label: 'Select a topic' },
    { value: 'ai', label: 'AI' },
    { value: 'accounts', label: 'Accounts and Access Controls' },
    { value: 'billing', label: 'Billing' },
    { value: 'cdn', label: 'CDN (Firewall, Caching)' },
    {
      value: 'ci-cd',
      label: 'CI/CD (Builds, Deployments, Environment Variables)',
    },
    {
      value: 'dashboard',
      label: 'Dashboard Interface (Navigation, UI Issues)',
    },
    { value: 'domains', label: 'Domains' },
    { value: 'frameworks', label: 'Frameworks' },
    { value: 'marketplace', label: 'Marketplace and Integrations' },
    {
      value: 'observability',
      label: 'Observability (Observability, Logs, Monitoring)',
    },
    { value: 'storage', label: 'Storage' },
  ];
  protected readonly feedback = form(signal({ topic: '', message: '' }));
}
