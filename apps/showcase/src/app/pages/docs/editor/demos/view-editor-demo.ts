import { Component, ViewEncapsulation, signal } from '@angular/core';
import { FormField, form } from '@angular/forms/signals';
import {
  ScEditor,
  ScEditorBlockquote,
  ScEditorBold,
  ScEditorBulletList,
  ScEditorCodeBlock,
  ScEditorContent,
  ScEditorItalic,
  ScEditorTaskList,
  ScEditorToolbar,
  ScEditorToolbarGroup,
  ScEditorView,
} from '@semantic-components/editor';
import {
  SiBoldIcon,
  SiCodeXmlIcon,
  SiItalicIcon,
  SiListIcon,
  SiListTodoIcon,
  SiTextQuoteIcon,
} from '@semantic-icons/lucide-icons';

/**
 * What the editor writes, displayed elsewhere — a published post, a preview —
 * with `scEditorView`: the same styles, no editor.
 */
@Component({
  selector: 'app-view-editor-demo',
  imports: [
    FormField,
    ScEditor,
    ScEditorBlockquote,
    ScEditorBold,
    ScEditorBulletList,
    ScEditorCodeBlock,
    ScEditorContent,
    ScEditorItalic,
    ScEditorTaskList,
    ScEditorToolbar,
    ScEditorToolbarGroup,
    ScEditorView,
    SiBoldIcon,
    SiCodeXmlIcon,
    SiItalicIcon,
    SiListIcon,
    SiListTodoIcon,
    SiTextQuoteIcon,
  ],
  template: `
    <div class="grid w-full gap-6 lg:grid-cols-2">
      <div
        scEditor
        [formField]="postForm.body"
        class="overflow-hidden rounded-lg border"
      >
        <div scEditorToolbar aria-label="Formatting">
          <div scEditorToolbarGroup>
            <button scEditorBold value="bold">
              <svg siBoldIcon></svg>
              <span class="sr-only">Bold</span>
            </button>
            <button scEditorItalic value="italic">
              <svg siItalicIcon></svg>
              <span class="sr-only">Italic</span>
            </button>
            <button scEditorBulletList value="bullet-list">
              <svg siListIcon></svg>
              <span class="sr-only">Bullet list</span>
            </button>
            <button scEditorTaskList value="task-list">
              <svg siListTodoIcon></svg>
              <span class="sr-only">Task list</span>
            </button>
            <button scEditorBlockquote value="blockquote">
              <svg siTextQuoteIcon></svg>
              <span class="sr-only">Blockquote</span>
            </button>
            <button scEditorCodeBlock value="code-block">
              <svg siCodeXmlIcon></svg>
              <span class="sr-only">Code block</span>
            </button>
          </div>
        </div>
        <div scEditorContent ariaLabel="Post" class="max-h-[480px]"></div>
      </div>

      <article
        [scEditorView]="postForm.body().value()"
        aria-label="Published post"
        class="rounded-lg border p-6"
      ></article>
    </div>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class ViewEditorDemo {
  private readonly model = signal({
    body: `<h2>Release notes</h2>
<p>This week's update makes <strong>writing</strong> faster and <em>reading</em> easier.</p>
<ul>
  <li><p>Search and replace in the document</p></li>
  <li><p>Task lists you can tick off</p></li>
</ul>
<ul data-type="taskList">
  <li data-type="taskItem" data-checked="true"><p>Ship the editor</p></li>
  <li data-type="taskItem" data-checked="false"><p>Write the docs</p></li>
</ul>
<blockquote><p>The display is the editor's document, without the editor.</p></blockquote>
<pre><code>&lt;article [scEditorView]="post.body"&gt;&lt;/article&gt;</code></pre>`,
  });
  readonly postForm = form(this.model);
}
