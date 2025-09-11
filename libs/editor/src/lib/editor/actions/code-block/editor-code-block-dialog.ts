import { DialogRef } from '@angular/cdk/dialog';
import { ChangeDetectionStrategy, Component, ViewEncapsulation, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { LangType, langsArray } from '@semantic-components/code-highlighter';

export interface CodeBlockData {
  language: LangType;
  code: string;
}

@Component({
  selector: 'sc-editor-code-block-dialog',
  imports: [ReactiveFormsModule],
  template: `
    <div
      class="z-50 h-[calc(100%-1rem)] max-h-full w-full items-center justify-center overflow-y-auto overflow-x-hidden md:inset-0"
      tabindex="-1"
    >
      <div class="relative max-h-full w-full max-w-2xl p-4">
        <!-- Modal content -->
        <div class="relative rounded-lg bg-white shadow">
          <!-- Modal header -->
          <div class="flex items-center justify-between rounded-t border-b p-4 md:p-5">
            <h3 class="text-xl font-semibold text-gray-900">Insert Code Block</h3>
            <button
              class="end-2.5 ms-auto inline-flex size-8 items-center justify-center rounded-lg bg-transparent text-sm text-gray-400 hover:bg-gray-200 hover:text-gray-900"
              (click)="dialogRef.close()"
              type="button"
            >
              <svg
                class="size-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 14"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                />
              </svg>
              <span class="sr-only">Close modal</span>
            </button>
          </div>
          <!-- Modal body -->
          <div class="p-4 md:p-5">
            <form class="space-y-4" [formGroup]="codeBlockForm">
              <div>
                <label class="mb-2 block text-sm font-medium text-gray-900" for="language">
                  Language
                </label>
                <select
                  class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
                  id="language"
                  formControlName="language"
                >
                  <option value="">Select language</option>
                  @for (lang of languages; track lang) {
                    <option [value]="lang">{{ formatLanguageName(lang) }}</option>
                  }
                </select>
              </div>

              <div>
                <label class="mb-2 block text-sm font-medium text-gray-900" for="code">Code</label>
                <textarea
                  class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
                  id="code"
                  rows="10"
                  formControlName="code"
                  placeholder="Enter your code here..."
                ></textarea>
              </div>

              <button
                class="w-full rounded-lg bg-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300"
                [disabled]="!codeBlockForm.valid"
                (click)="submitCodeBlock()"
              >
                Insert Code Block
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: ``,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScEditorCodeBlockDialog {
  readonly dialogRef = inject<DialogRef<CodeBlockData>>(DialogRef<CodeBlockData>);

  readonly languages = langsArray;

  readonly codeBlockForm = new FormGroup({
    language: new FormControl<LangType>('typescript', Validators.required),
    code: new FormControl('', Validators.required),
  });

  get language() {
    return this.codeBlockForm.get('language');
  }

  get code() {
    return this.codeBlockForm.get('code');
  }

  submitCodeBlock() {
    if (this.codeBlockForm.valid) {
      this.dialogRef.close({
        language: this.language?.value as LangType,
        code: this.code?.value || '',
      });
    }
  }

  formatLanguageName(lang: LangType): string {
    const languageNames: Record<LangType, string> = {
      'angular-ts': 'Angular TypeScript',
      'angular-html': 'Angular HTML',
      shellscript: 'Shell Script',
      typescript: 'TypeScript',
      javascript: 'JavaScript',
      html: 'HTML',
      css: 'CSS',
      json: 'JSON',
      markdown: 'Markdown',
      python: 'Python',
      java: 'Java',
      cpp: 'C++',
      c: 'C',
      rust: 'Rust',
      go: 'Go',
      php: 'PHP',
      ruby: 'Ruby',
      sql: 'SQL',
      yaml: 'YAML',
      xml: 'XML',
      bash: 'Bash',
    };

    return languageNames[lang] || lang;
  }
}
