import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  computed,
  inject,
  input,
} from '@angular/core';

import { cn } from '@semantic-components/utils';

import { ScWordCount } from '../services/word-count.service';

@Component({
  selector: 'sc-editor-word-count',
  imports: [],
  template: `
    <div [class]="containerClass()">
      @if (showWords()) {
        <span [class]="textClass('words')">
          {{ wordCount().words }}
          @if (wordLimit()) {
            <span class="text-gray-400">/ {{ wordLimit() }}</span>
          }
          {{ wordCount().words === 1 ? 'word' : 'words' }}
        </span>
      }

      @if (showCharacters()) {
        <span [class]="textClass('characters')">
          {{ wordCount().characters }}
          @if (characterLimit()) {
            <span class="text-gray-400">/ {{ characterLimit() }}</span>
          }
          {{ wordCount().characters === 1 ? 'character' : 'characters' }}
        </span>
      }

      @if (showProgress() && (characterLimit() || wordLimit())) {
        <div class="flex gap-2">
          @if (characterLimit()) {
            <div class="flex items-center gap-1">
              <div class="h-2 w-16 rounded-full bg-gray-200 dark:bg-gray-700">
                <div
                  class="h-2 rounded-full transition-all duration-300"
                  [class]="progressBarClass('characters')"
                  [style.width.%]="characterProgress()"
                ></div>
              </div>
              <span class="text-xs text-gray-500">C</span>
            </div>
          }
          @if (wordLimit()) {
            <div class="flex items-center gap-1">
              <div class="h-2 w-16 rounded-full bg-gray-200 dark:bg-gray-700">
                <div
                  class="h-2 rounded-full transition-all duration-300"
                  [class]="progressBarClass('words')"
                  [style.width.%]="wordProgress()"
                ></div>
              </div>
              <span class="text-xs text-gray-500">W</span>
            </div>
          }
        </div>
      }
    </div>
  `,
  styles: ``,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScEditorWordCount {
  private readonly wordCountService = inject(ScWordCount);

  readonly showWords = input(true);
  readonly showCharacters = input(false);
  readonly showProgress = input(true);

  readonly classInput = input<string>('', {
    alias: 'class',
  });

  protected readonly containerClass = computed(() =>
    cn('flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400', this.classInput()),
  );

  protected readonly wordCount = computed(() => this.wordCountService.wordCount());
  protected readonly characterLimit = computed(() => this.wordCountService.characterLimit());
  protected readonly wordLimit = computed(() => this.wordCountService.wordLimit());

  protected readonly characterProgress = computed(() =>
    this.wordCountService.getProgressPercentage('characters'),
  );

  protected readonly wordProgress = computed(() =>
    this.wordCountService.getProgressPercentage('words'),
  );

  protected textClass(type: 'words' | 'characters'): string {
    const isExceeded =
      type === 'words'
        ? this.wordCountService.isWordLimitExceeded()
        : this.wordCountService.isCharacterLimitExceeded();

    return cn('text-sm', {
      'text-red-500 dark:text-red-400': isExceeded,
      'text-gray-600 dark:text-gray-400': !isExceeded,
    });
  }

  protected progressBarClass(type: 'words' | 'characters'): string {
    const progress = type === 'words' ? this.wordProgress() : this.characterProgress();

    if (progress >= 100) {
      return 'bg-red-500';
    } else if (progress >= 80) {
      return 'bg-yellow-500';
    } else {
      return 'bg-green-500';
    }
  }
}
