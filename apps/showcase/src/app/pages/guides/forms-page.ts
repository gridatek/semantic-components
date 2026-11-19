import { Component, ViewEncapsulation } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ScLink, ScTypeset } from '@semantic-components/ui';
import { DocCode } from '../../components/doc-code/doc-code';
import { TocHeading } from '../../components/toc/toc-heading';

@Component({
  selector: 'app-forms-page',
  imports: [DocCode, RouterLink, ScLink, ScTypeset, TocHeading],
  template: `
    <div class="space-y-12">
      <div class="space-y-2">
        <h1 scTypeset>Forms</h1>
        <p class="text-muted-foreground">
          Every input is a Signal Forms control: bind it with [formField], put
          the rules in the form&apos;s schema, and a scField round it shows the
          label, the description and the errors — named, described and marked
          invalid for screen readers too.
        </p>
      </div>

      <section class="space-y-4">
        <h2 scTypeset appToc>Signal Forms only</h2>
        <p>
          The library is built for Angular&apos;s Signal Forms (<code
            class="bg-muted rounded px-1.5 py-0.5 text-sm"
            >&#64;angular/forms/signals</code
          >): no ngModel, no reactive forms. A control — an input, a select, a
          checkbox, a combobox, a date picker, the Number Group, the OTP Input…
          — takes its value, its state and its errors from the field you bind:
          <code class="bg-muted rounded px-1.5 py-0.5 text-sm"
            >[formField]="profileForm.email"</code
          >.
        </p>
        <app-doc-code [code]="modelCode" language="angular-ts" />
      </section>

      <section class="space-y-4">
        <h2 scTypeset appToc>A field</h2>
        <p>
          <code class="bg-muted rounded px-1.5 py-0.5 text-sm">scField</code>
          holds one control with its text: the label names it, a description and
          the errors are read with it (aria-describedby), and once it is touched
          and invalid, the field and its control say so (data-invalid,
          aria-invalid) and the errors show.
        </p>
        <app-doc-code [code]="fieldCode" language="angular-html" />
        <p>
          The control is anything that takes [formField]: give it the
          field&apos;s
          <code class="bg-muted rounded px-1.5 py-0.5 text-sm">scLabel</code>
          and nothing else. See
          <a scLink routerLink="/docs/components/field">Field</a> for rows,
          groups, choice cards and fieldsets.
        </p>
      </section>

      <section class="space-y-4">
        <h2 scTypeset appToc>Rules in the schema</h2>
        <p>
          Required, minimum and maximum, lengths, patterns and the disabled
          state are the schema&apos;s, not attributes on the control: the form
          knows them, checks them and hands them to the control (an input gets
          its
          <code class="bg-muted rounded px-1.5 py-0.5 text-sm">required</code>,
          a Number Group its bounds). Give each validator a message: it is what
          the errors show, in your words — and your translations.
        </p>
        <app-doc-code [code]="schemaCode" />
      </section>

      <section class="space-y-4">
        <h2 scTypeset appToc>Submitting</h2>
        <p>
          Bind the form to
          <code class="bg-muted rounded px-1.5 py-0.5 text-sm"
            >&lt;form [formRoot]&gt;</code
          >
          and give it a submission action: on submit, every field is marked
          touched, the first invalid control takes the focus, and your action
          runs only once the form is valid.
        </p>
        <app-doc-code [code]="submitCode" language="angular-ts" />
      </section>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
})
export default class FormsPage {
  private readonly modelCode = `import { signal } from '@angular/core';
import { FormField, form } from '@angular/forms/signals';

readonly profile = signal({ name: '', email: '', plan: 'free' });
readonly profileForm = form(this.profile);`;

  private readonly fieldCode = `<div scField>
  <label scLabel>Email</label>
  <input scInput type="email" [formField]="profileForm.email" />
  <p scFieldDescription>We never share it.</p>
  <p scFieldErrors></p>
</div>`;

  private readonly schemaCode = `import { disabled, email, form, maxLength, required } from '@angular/forms/signals';

readonly profileForm = form(this.profile, (path) => {
  required(path.name, { message: 'Enter your name.' });
  maxLength(path.name, 80, { message: 'At most 80 characters.' });
  required(path.email, { message: 'Enter your email.' });
  email(path.email, { message: 'That is not an email.' });
  disabled(path.plan, () => !this.canChangePlan());
});`;

  private readonly submitCode = `readonly profileForm = form(this.profile, schema, {
  submission: {
    action: async () => this.api.save(this.profile()),
  },
});

// <form [formRoot]="profileForm">
//   …fields…
//   <button scButton type="submit">Save</button>
// </form>`;
}
