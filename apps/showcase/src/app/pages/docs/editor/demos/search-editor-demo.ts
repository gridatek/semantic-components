import { Component, ViewEncapsulation, signal } from '@angular/core';
import { FormField, form } from '@angular/forms/signals';
import {
  ScButton,
  ScCollapsible,
  ScCollapsiblePanel,
  ScCollapsibleTrigger,
  ScFrame,
  ScInput,
  ScToggle,
  ScToolbar,
  ScToolbarSeparator,
  ScToolbarWidget,
  ScToolbarWidgetGroup,
} from '@semantic-components/ui';
import {
  ScEditor,
  ScEditorCommand,
  ScEditorContent,
  provideEditor,
} from '@semantic-components/ui/editor';
import {
  ScEditorReplace,
  ScEditorReplaceAll,
  ScEditorReplaceInput,
  ScEditorSearchBar,
  ScEditorSearchClose,
  ScEditorSearchInput,
  ScEditorSearchNext,
  ScEditorSearchPrevious,
  ScEditorSearchResults,
  withSearch,
} from '@semantic-components/ui/editor/search';
import {
  SiBoldIcon,
  SiChevronDownIcon,
  SiChevronUpIcon,
  SiItalicIcon,
  SiSearchIcon,
  SiXIcon,
} from '@semantic-icons/lucide-icons';

const DRAFT = `<p>The colour of the sky changes with the hour: the colour of dawn, the colour of noon, the colour of dusk.</p>
<p>Write colour once, find it everywhere.</p>`;

/** The core editor and one feature: search and replace, with Ctrl / ⌘ + F. */
@Component({
  selector: 'app-search-editor-demo',
  providers: [provideEditor(withSearch())],
  imports: [
    ScCollapsible,
    ScCollapsiblePanel,
    ScCollapsibleTrigger,
    ScButton,
    ScToolbar,
    ScToolbarWidget,
    ScToolbarWidgetGroup,
    ScToolbarSeparator,
    ScToggle,
    ScFrame,
    FormField,
    ScEditor,
    ScEditorCommand,
    ScEditorContent,
    ScEditorReplace,
    ScEditorReplaceAll,
    ScEditorReplaceInput,
    ScEditorSearchBar,
    ScEditorSearchClose,
    ScEditorSearchInput,
    ScEditorSearchNext,
    ScEditorSearchPrevious,
    ScEditorSearchResults,
    ScInput,
    SiBoldIcon,
    SiChevronDownIcon,
    SiChevronUpIcon,
    SiItalicIcon,
    SiSearchIcon,
    SiXIcon,
  ],
  template: `
    <div class="w-full">
      <div scEditor [formField]="editorForm.body" class="flex flex-col gap-2">
        <div scToolbar aria-label="Formatting" class="w-full flex-wrap">
          <div scToolbarWidgetGroup>
            <button scToolbarWidget scToggle scEditorCommand="bold">
              <svg siBoldIcon></svg>
              <span class="sr-only">Bold</span>
            </button>
            <button scToolbarWidget scToggle scEditorCommand="italic">
              <svg siItalicIcon></svg>
              <span class="sr-only">Italic</span>
            </button>
          </div>

          <div scToolbarSeparator></div>

          <div scToolbarWidgetGroup>
            <button
              scToolbarWidget
              scButton
              variant="ghost"
              [scCollapsibleTrigger]="search"
            >
              <svg siSearchIcon></svg>
              <span class="sr-only">Search and replace</span>
            </button>
          </div>
        </div>

        <div
          scCollapsible
          #search="scCollapsible"
          [(open)]="searchOpen"
          class="contents"
        >
          <!-- The panel only animates: the gap above is inside it. -->
          <div scCollapsiblePanel class="-mt-2">
            <div class="pt-2">
              <div
                scFrame
                scEditorSearchBar
                [(open)]="searchOpen"
                aria-label="Search and replace"
                class="flex flex-col gap-1.5 p-2"
              >
                <div class="flex flex-wrap items-center gap-2">
                  <input
                    scInput
                    scEditorSearchInput
                    aria-label="Search"
                    placeholder="Search…"
                    class="h-8 min-w-40 flex-1"
                  />
                  <span
                    scEditorSearchResults
                    #results="scEditorSearchResults"
                    class="text-muted-foreground data-[state=none]:text-destructive min-w-16 text-sm whitespace-nowrap tabular-nums"
                  >
                    @if (results.state() === 'found') {
                      {{ (results.index() ?? 0) + 1 }} of {{ results.count() }}
                    } @else if (results.state() === 'none') {
                      No results
                    }
                  </span>
                  <button
                    scButton
                    variant="ghost"
                    size="icon-sm"
                    scEditorSearchPrevious
                  >
                    <svg siChevronUpIcon></svg>
                    <span class="sr-only">Previous match</span>
                  </button>
                  <button
                    scButton
                    variant="ghost"
                    size="icon-sm"
                    scEditorSearchNext
                  >
                    <svg siChevronDownIcon></svg>
                    <span class="sr-only">Next match</span>
                  </button>
                  <button
                    scButton
                    variant="ghost"
                    size="icon-sm"
                    scEditorSearchClose
                  >
                    <svg siXIcon></svg>
                    <span class="sr-only">Close search</span>
                  </button>
                </div>
                <div class="flex flex-wrap items-center gap-2">
                  <input
                    scInput
                    scEditorReplaceInput
                    aria-label="Replace with"
                    placeholder="Replace with…"
                    class="h-8 min-w-40 flex-1"
                  />
                  <button scButton variant="outline" size="sm" scEditorReplace>
                    Replace
                  </button>
                  <button
                    scButton
                    variant="outline"
                    size="sm"
                    scEditorReplaceAll
                  >
                    Replace all
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div scFrame scEditorContent ariaLabel="Draft"></div>
      </div>
    </div>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class SearchEditorDemo {
  private readonly searchOpen = signal(false);
  private readonly model = signal({ body: DRAFT });
  private readonly editorForm = form(this.model);
}
