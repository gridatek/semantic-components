import { Component, ViewEncapsulation, signal } from '@angular/core';
import { FormField, form } from '@angular/forms/signals';
import { ScFrame } from '@semantic-components/ui';
import {
  ScEditor,
  ScEditorContent,
  ScEditorContentTitle,
} from '@semantic-components/ui/editor';

/** A title above the text: its own field, set as the text's heading. */
@Component({
  selector: 'app-title-editor-demo',
  imports: [
    FormField,
    ScFrame,
    ScEditor,
    ScEditorContent,
    ScEditorContentTitle,
  ],
  template: `
    <div
      scEditor
      [formField]="noteForm.body"
      scFrame
      class="w-full max-w-lg p-6"
    >
      <textarea
        scEditorContentTitle
        aria-label="Title"
        placeholder="Untitled"
        [formField]="noteForm.title"
      ></textarea>
      <div scEditorContent ariaLabel="Text" class="min-h-32 p-0"></div>
    </div>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class TitleEditorDemo {
  private readonly model = signal({
    title: '',
    body: '<p>The garden wakes up.</p><p>First the crocuses, then the tulips.</p>',
  });
  readonly noteForm = form(this.model);
}
