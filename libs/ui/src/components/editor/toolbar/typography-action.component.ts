import { CdkMenu, CdkMenuItem, CdkMenuTrigger } from '@angular/cdk/menu';
import { ChangeDetectionStrategy, Component, ViewEncapsulation, inject } from '@angular/core';

import { Level } from '@tiptap/extension-heading';

import { ScEditor } from '../editor';
import { ScExtensions } from '../extensions';

@Component({
  selector: 'sc-typography-action',
  imports: [CdkMenuTrigger, CdkMenu, CdkMenuItem],
  template: `
    <button
      class="flex items-center justify-center rounded-lg bg-gray-100 px-3 py-1.5 text-sm font-medium text-gray-500 hover:bg-gray-200 hover:text-gray-900 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-50 dark:bg-gray-600 dark:text-gray-400 dark:hover:bg-gray-500 dark:hover:text-white dark:focus:ring-gray-600"
      [cdkMenuTriggerFor]="typographyDropdown"
      type="button"
    >
      Format
      <svg
        class="-me-0.5 ms-1.5 size-3.5"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <path
          stroke="currentColor"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="m19 9-7 7-7-7"
        />
      </svg>
    </button>

    <!-- Heading Dropdown -->
    <ng-template #typographyDropdown>
      <div class="z-10 w-72 rounded bg-white p-2 shadow dark:bg-gray-700" cdkMenu>
        <ul class="space-y-1 text-sm font-medium" aria-labelledby="typographyDropdownButton">
          <li>
            <button
              class="flex w-full items-center justify-between rounded px-3 py-2 text-base text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-600"
              (cdkMenuItemTriggered)="setParagraph()"
              cdkMenuItem
              type="button"
            >
              Paragraph
              <div class="space-x-1.5">
                <kbd
                  class="rounded-lg border border-gray-200 bg-gray-100 px-2 py-1 text-xs font-semibold text-gray-500 dark:border-gray-500 dark:bg-gray-600 dark:text-gray-400"
                >
                  Cmd
                </kbd>
                <kbd
                  class="rounded-lg border border-gray-200 bg-gray-100 px-2 py-1 text-xs font-semibold text-gray-500 dark:border-gray-500 dark:bg-gray-600 dark:text-gray-400"
                >
                  Alt
                </kbd>
                <kbd
                  class="rounded-lg border border-gray-200 bg-gray-100 px-2 py-1 text-xs font-semibold text-gray-500 dark:border-gray-500 dark:bg-gray-600 dark:text-gray-400"
                >
                  0
                </kbd>
              </div>
            </button>
          </li>
          <li>
            <button
              class="flex w-full items-center justify-between rounded px-3 py-2 text-base text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-600"
              (cdkMenuItemTriggered)="setHeadingLevel(1)"
              data-heading-level="1"
              cdkMenuItem
              type="button"
            >
              Heading 1
              <div class="space-x-1.5">
                <kbd
                  class="rounded-lg border border-gray-200 bg-gray-100 px-2 py-1 text-xs font-semibold text-gray-500 dark:border-gray-500 dark:bg-gray-600 dark:text-gray-400"
                >
                  Cmd
                </kbd>
                <kbd
                  class="rounded-lg border border-gray-200 bg-gray-100 px-2 py-1 text-xs font-semibold text-gray-500 dark:border-gray-500 dark:bg-gray-600 dark:text-gray-400"
                >
                  Alt
                </kbd>
                <kbd
                  class="rounded-lg border border-gray-200 bg-gray-100 px-2 py-1 text-xs font-semibold text-gray-500 dark:border-gray-500 dark:bg-gray-600 dark:text-gray-400"
                >
                  1
                </kbd>
              </div>
            </button>
          </li>
          <li>
            <button
              class="flex w-full items-center justify-between rounded px-3 py-2 text-base text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-600"
              (cdkMenuItemTriggered)="setHeadingLevel(2)"
              data-heading-level="2"
              cdkMenuItem
              type="button"
            >
              Heading 2
              <div class="space-x-1.5">
                <kbd
                  class="rounded-lg border border-gray-200 bg-gray-100 px-2 py-1 text-xs font-semibold text-gray-500 dark:border-gray-500 dark:bg-gray-600 dark:text-gray-400"
                >
                  Cmd
                </kbd>
                <kbd
                  class="rounded-lg border border-gray-200 bg-gray-100 px-2 py-1 text-xs font-semibold text-gray-500 dark:border-gray-500 dark:bg-gray-600 dark:text-gray-400"
                >
                  Alt
                </kbd>
                <kbd
                  class="rounded-lg border border-gray-200 bg-gray-100 px-2 py-1 text-xs font-semibold text-gray-500 dark:border-gray-500 dark:bg-gray-600 dark:text-gray-400"
                >
                  2
                </kbd>
              </div>
            </button>
          </li>
          <li>
            <button
              class="flex w-full items-center justify-between rounded px-3 py-2 text-base text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-600"
              (cdkMenuItemTriggered)="setHeadingLevel(3)"
              data-heading-level="3"
              cdkMenuItem
              type="button"
            >
              Heading 3
              <div class="space-x-1.5">
                <kbd
                  class="rounded-lg border border-gray-200 bg-gray-100 px-2 py-1 text-xs font-semibold text-gray-500 dark:border-gray-500 dark:bg-gray-600 dark:text-gray-400"
                >
                  Cmd
                </kbd>
                <kbd
                  class="rounded-lg border border-gray-200 bg-gray-100 px-2 py-1 text-xs font-semibold text-gray-500 dark:border-gray-500 dark:bg-gray-600 dark:text-gray-400"
                >
                  Alt
                </kbd>
                <kbd
                  class="rounded-lg border border-gray-200 bg-gray-100 px-2 py-1 text-xs font-semibold text-gray-500 dark:border-gray-500 dark:bg-gray-600 dark:text-gray-400"
                >
                  3
                </kbd>
              </div>
            </button>
          </li>
          <li>
            <button
              class="flex w-full items-center justify-between rounded px-3 py-2 text-base text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-600"
              (cdkMenuItemTriggered)="setHeadingLevel(4)"
              data-heading-level="4"
              cdkMenuItem
              type="button"
            >
              Heading 4
              <div class="space-x-1.5">
                <kbd
                  class="rounded-lg border border-gray-200 bg-gray-100 px-2 py-1 text-xs font-semibold text-gray-500 dark:border-gray-500 dark:bg-gray-600 dark:text-gray-400"
                >
                  Cmd
                </kbd>
                <kbd
                  class="rounded-lg border border-gray-200 bg-gray-100 px-2 py-1 text-xs font-semibold text-gray-500 dark:border-gray-500 dark:bg-gray-600 dark:text-gray-400"
                >
                  Alt
                </kbd>
                <kbd
                  class="rounded-lg border border-gray-200 bg-gray-100 px-2 py-1 text-xs font-semibold text-gray-500 dark:border-gray-500 dark:bg-gray-600 dark:text-gray-400"
                >
                  4
                </kbd>
              </div>
            </button>
          </li>
          <li>
            <button
              class="flex w-full items-center justify-between rounded px-3 py-2 text-base text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-600"
              (cdkMenuItemTriggered)="setHeadingLevel(5)"
              data-heading-level="5"
              cdkMenuItem
              type="button"
            >
              Heading 5
              <div class="space-x-1.5">
                <kbd
                  class="rounded-lg border border-gray-200 bg-gray-100 px-2 py-1 text-xs font-semibold text-gray-500 dark:border-gray-500 dark:bg-gray-600 dark:text-gray-400"
                >
                  Cmd
                </kbd>
                <kbd
                  class="rounded-lg border border-gray-200 bg-gray-100 px-2 py-1 text-xs font-semibold text-gray-500 dark:border-gray-500 dark:bg-gray-600 dark:text-gray-400"
                >
                  Alt
                </kbd>
                <kbd
                  class="rounded-lg border border-gray-200 bg-gray-100 px-2 py-1 text-xs font-semibold text-gray-500 dark:border-gray-500 dark:bg-gray-600 dark:text-gray-400"
                >
                  5
                </kbd>
              </div>
            </button>
          </li>
          <li>
            <button
              class="flex w-full items-center justify-between rounded px-3 py-2 text-base text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-600"
              (cdkMenuItemTriggered)="setHeadingLevel(6)"
              data-heading-level="6"
              cdkMenuItem
              type="button"
            >
              Heading 6
              <div class="space-x-1.5">
                <kbd
                  class="rounded-lg border border-gray-200 bg-gray-100 px-2 py-1 text-xs font-semibold text-gray-500 dark:border-gray-500 dark:bg-gray-600 dark:text-gray-400"
                >
                  Cmd
                </kbd>
                <kbd
                  class="rounded-lg border border-gray-200 bg-gray-100 px-2 py-1 text-xs font-semibold text-gray-500 dark:border-gray-500 dark:bg-gray-600 dark:text-gray-400"
                >
                  Alt
                </kbd>
                <kbd
                  class="rounded-lg border border-gray-200 bg-gray-100 px-2 py-1 text-xs font-semibold text-gray-500 dark:border-gray-500 dark:bg-gray-600 dark:text-gray-400"
                >
                  6
                </kbd>
              </div>
            </button>
          </li>
        </ul>
      </div>
    </ng-template>
  `,
  styles: ``,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TypographyActionComponent {
  private readonly parent = inject(ScEditor, { host: true });

  extensionsService = inject(ScExtensions);

  get editor() {
    return this.parent.editor;
  }

  setParagraph() {
    this.editor.chain().focus().setParagraph().run();
  }

  setHeadingLevel(level: Level) {
    this.editor.chain().focus().toggleHeading({ level: level }).run();
  }
}
