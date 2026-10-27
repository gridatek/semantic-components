import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { SearchEditorDemo } from './search-editor-demo';

@Component({
  selector: 'app-search-editor-demo-container',
  imports: [DemoContainer, SearchEditorDemo],
  template: `
    <app-demo-container
      title="Find and replace in a draft"
      [code]="code"
      demoUrl="/demos/editor/search-editor-demo"
    >
      <app-search-editor-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class SearchEditorDemoContainer {
  readonly code = `import { Component, ViewEncapsulation, signal } from '@angular/core';
import { FormField, form } from '@angular/forms/signals';
import {
  ScEditor,
  ScEditorBold,
  ScEditorContent,
  ScEditorItalic,
  ScEditorSeparator,
  ScEditorToolbar,
  ScEditorToolbarGroup,
  provideEditor,
} from '@semantic-components/ui/editor';
import {
  ScEditorReplace,
  ScEditorReplaceAll,
  ScEditorReplaceInput,
  ScEditorSearch,
  ScEditorSearchBar,
  ScEditorSearchClose,
  ScEditorSearchInput,
  ScEditorSearchNext,
  ScEditorSearchPrevious,
  ScEditorSearchResults,
  withSearch,
} from '@semantic-components/ui/editor/search';
import { ScInput } from '@semantic-components/ui';
import {
  SiBoldIcon,
  SiChevronDownIcon,
  SiChevronUpIcon,
  SiItalicIcon,
  SiSearchIcon,
  SiXIcon,
} from '@semantic-icons/lucide-icons';

const DRAFT = \`<p>The colour of the sky changes with the hour: the colour of dawn, the colour of noon, the colour of dusk.</p>
<p>Write colour once, find it everywhere.</p>\`;

/** The core editor and one feature: search and replace, with Ctrl / ⌘ + F. */
@Component({
  selector: 'app-search-editor-demo',
  providers: [provideEditor(withSearch())],
  imports: [
    FormField,
    ScEditor,
    ScEditorBold,
    ScEditorContent,
    ScEditorItalic,
    ScEditorReplace,
    ScEditorReplaceAll,
    ScEditorReplaceInput,
    ScEditorSearch,
    ScEditorSearchBar,
    ScEditorSearchClose,
    ScEditorSearchInput,
    ScEditorSearchNext,
    ScEditorSearchPrevious,
    ScEditorSearchResults,
    ScEditorSeparator,
    ScEditorToolbar,
    ScEditorToolbarGroup,
    ScInput,
    SiBoldIcon,
    SiChevronDownIcon,
    SiChevronUpIcon,
    SiItalicIcon,
    SiSearchIcon,
    SiXIcon,
  ],
  template: \`
    <div class="w-full">
      <div
        scEditor
        [formField]="editorForm.body"
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
          </div>

          <div scEditorSeparator></div>

          <div scEditorToolbarGroup>
            <button scEditorSearch #search="scEditorSearch" value="search">
              <svg siSearchIcon></svg>
              <span class="sr-only">Search and replace</span>
            </button>
          </div>
        </div>

        @if (search.open()) {
          <div scEditorSearchBar aria-label="Search and replace">
            <input
              scInput
              scEditorSearchInput
              aria-label="Search"
              placeholder="Search…"
              class="h-8 w-40"
            />
            <span
              scEditorSearchResults
              #results="scEditorSearchResults"
              class="min-w-16"
            >
              @if (results.state() === 'found') {
                {{ (results.index() ?? 0) + 1 }} of {{ results.count() }}
              } @else if (results.state() === 'none') {
                No results
              }
            </span>
            <button scEditorSearchPrevious>
              <svg siChevronUpIcon></svg>
              <span class="sr-only">Previous match</span>
            </button>
            <button scEditorSearchNext>
              <svg siChevronDownIcon></svg>
              <span class="sr-only">Next match</span>
            </button>
            <input
              scInput
              scEditorReplaceInput
              aria-label="Replace with"
              placeholder="Replace with…"
              class="h-8 w-40"
            />
            <button scEditorReplace>Replace</button>
            <button scEditorReplaceAll>Replace all</button>
            <button scEditorSearchClose class="ms-auto">
              <svg siXIcon></svg>
              <span class="sr-only">Close search</span>
            </button>
          </div>
        }

        <div scEditorContent ariaLabel="Draft"></div>
      </div>
    </div>
  \`,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class SearchEditorDemo {
  private readonly model = signal({ body: DRAFT });
  readonly editorForm = form(this.model);
}`;
}
