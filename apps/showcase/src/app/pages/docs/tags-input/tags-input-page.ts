import { Component, ViewEncapsulation } from '@angular/core';
import { ScHeading } from '@semantic-components/ui';
import { ComponentBadges } from '../../../components/component-badges/component-badges';
import { TocHeading } from '../../../components/toc/toc-heading';
import { BasicTagsInputDemoContainer } from './demos/basic-tags-input-demo-container';
import { EmailsTagsInputDemoContainer } from './demos/emails-tags-input-demo-container';
import { FormTagsInputDemoContainer } from './demos/form-tags-input-demo-container';
import { LimitTagsInputDemoContainer } from './demos/limit-tags-input-demo-container';

@Component({
  selector: 'app-tags-input-page',
  imports: [
    BasicTagsInputDemoContainer,
    EmailsTagsInputDemoContainer,
    LimitTagsInputDemoContainer,
    FormTagsInputDemoContainer,
    TocHeading,
    ComponentBadges,
    ScHeading,
  ],
  template: `
    <div class="space-y-8">
      <div class="space-y-2">
        <h1 scHeading>Tags Input</h1>
        <p class="text-muted-foreground">
          Tags typed into one field — a string[] for Signal Forms — checked
          before they go in, and reached by the keyboard without a Tab stop
          each.
        </p>
        <app-component-badges path="tags-input" />
      </div>

      <section class="space-y-4">
        <h2 scHeading appToc>Basic</h2>
        <p class="text-muted-foreground">
          Enter or a comma adds a tag, and so does leaving the field; a
          duplicate is refused. Backspace or ← in the empty field goes to the
          last tag — ← → between tags, Delete removes one.
        </p>
        <app-basic-tags-input-demo-container />
      </section>

      <section class="space-y-4">
        <h2 scHeading appToc>Emails</h2>
        <p class="text-muted-foreground">
          accept decides what goes in — here an address, once. Refused text
          stays, marked, to be corrected; a pasted list is split on commas and
          new lines.
        </p>
        <app-emails-tags-input-demo-container />
      </section>

      <section class="space-y-4">
        <h2 scHeading appToc>Limit and clear</h2>
        <p class="text-muted-foreground">
          maxLength: at five, nothing more goes in (data-full on it). The count
          is yours to write; Clear removes them all.
        </p>
        <app-limit-tags-input-demo-container />
      </section>

      <section class="space-y-4">
        <h2 scHeading appToc>Form</h2>
        <p class="text-muted-foreground">
          A [formField]: one to five keywords, from the schema — its maxLength
          also stops a sixth going in; its errors once it is touched.
        </p>
        <app-form-tags-input-demo-container />
      </section>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
})
export default class TagsInputPage {}
