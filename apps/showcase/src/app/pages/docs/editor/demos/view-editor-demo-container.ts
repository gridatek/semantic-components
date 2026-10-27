import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { ViewEditorDemo } from './view-editor-demo';

@Component({
  selector: 'app-view-editor-demo-container',
  imports: [DemoContainer, ViewEditorDemo],
  template: `
    <app-demo-container
      title="Release notes, side by side"
      demoUrl="/demos/editor/view-editor-demo"
      [code]="code"
    >
      <app-view-editor-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class ViewEditorDemoContainer {
  readonly code = `import { Component, ViewEncapsulation, signal } from '@angular/core';
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
  provideEditor,
} from '@semantic-components/ui/editor';
import { withAlign } from '@semantic-components/ui/editor/align';
import { withHighlight } from '@semantic-components/ui/editor/highlight';
import { withImages } from '@semantic-components/ui/editor/images';
import { withScripts } from '@semantic-components/ui/editor/scripts';
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
 * with \`scEditorView\`: the same styles, no editor.
 */
@Component({
  selector: 'app-view-editor-demo',
  providers: [
    provideEditor(withAlign(), withHighlight(), withImages(), withScripts()),
  ],
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
  template: \`
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
        <!-- Grows with its text, as the display does: no scrollbar to narrow it. -->
        <div scEditorContent ariaLabel="Post" class="max-h-none"></div>
      </div>

      <article
        [scEditorView]="postForm.body().value()"
        aria-label="Published post"
        class="rounded-lg border p-4 lg:mt-[49px]"
      ></article>
    </div>
  \`,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class ViewEditorDemo {
  private readonly model = signal({
    body: \`<h1>Release notes</h1>
<p>This week's update makes <strong>writing</strong> faster and <em>reading</em> easier, with <u>underline</u>, <s>strike</s>, <code>inline code</code>, a <a href="https://tiptap.dev">link</a>, <mark data-color="var(--editor-highlight-yellow)" style="background-color: var(--editor-highlight-yellow)">yellow</mark> and <mark data-color="var(--editor-highlight-green)" style="background-color: var(--editor-highlight-green)">green</mark> highlights, E = mc<sup>2</sup> and H<sub>2</sub>O.</p>
<h2>What's new</h2>
<p>Every block the editor can hold, so the two sides can be compared.</p>
<h3>Lists</h3>
<ul>
  <li><p>Search and replace</p>
    <ul>
      <li><p>Match case</p>
        <ul><li><p>Whole word</p></li></ul>
      </li>
    </ul>
  </li>
  <li><p>Task lists</p></li>
</ul>
<ol>
  <li><p>Write</p>
    <ol>
      <li><p>Review</p>
        <ol><li><p>Ship</p></li></ol>
      </li>
    </ol>
  </li>
  <li><p>Read</p></li>
</ol>
<h4>Tasks</h4>
<ul data-type="taskList">
  <li data-type="taskItem" data-checked="true"><p>Ship the editor</p></li>
  <li data-type="taskItem" data-checked="false"><p>Write the docs</p>
    <ul data-type="taskList">
      <li data-type="taskItem" data-checked="false"><p>The editor page</p></li>
    </ul>
  </li>
</ul>
<h5>Alignment</h5>
<p style="text-align: center">Centred.</p>
<p style="text-align: right">Aligned right.</p>
<p style="text-align: justify">Justified: the lines of this paragraph stretch from one side of the column to the other, so both edges are straight, as on a printed page.</p>
<h6>Media and blocks</h6>
<img src="https://picsum.photos/id/1015/800/400" alt="A river between mountains">
<blockquote><p>The display is the editor's document, without the editor.</p></blockquote>
<pre><code>&lt;article [scEditorView]="post.body"&gt;&lt;/article&gt;</code></pre>
<hr>
<p>That's all for this week.</p>\`,
  });
  readonly postForm = form(this.model);
}`;
}
