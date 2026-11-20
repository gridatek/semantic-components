import { Component, ViewEncapsulation } from '@angular/core';
import { RouterLink } from '@angular/router';
import {
  ScBubble,
  ScBubbleContent,
  ScFrame,
  ScLink,
  ScTabs,
  ScTabsList,
  ScTabsPanel,
  ScTabsPanelContent,
  ScTabsTab,
} from '@semantic-components/ui';
import {
  ARTICLE_SAMPLE,
  CHANGELOG_SAMPLE,
  CHAT_QUESTION,
  CHAT_SAMPLE,
  DOCS_SAMPLE,
  NOTES_SAMPLE,
} from './samples';

/** A sample: its tab, its HTML, and the question before it (a chat). */
interface Sample {
  readonly value: string;
  readonly label: string;
  readonly html: string;
  readonly question?: string;
}

/**
 * Typeset: content you don't write the markup of — docs, a chat answer, an
 * article, a changelog, notes — set by one container, each sample as HTML
 * would arrive from markdown.
 */
@Component({
  selector: 'app-typeset',
  imports: [
    RouterLink,
    ScBubble,
    ScBubbleContent,
    ScFrame,
    ScLink,
    ScTabs,
    ScTabsList,
    ScTabsPanel,
    ScTabsPanelContent,
    ScTabsTab,
  ],
  template: `
    <section
      class="flex flex-col items-center gap-2 px-6 py-8 text-center md:py-16 lg:py-20 xl:gap-4"
    >
      <h1
        class="text-primary max-w-4xl text-3xl leading-tight font-semibold tracking-tight text-balance lg:leading-[1.1] xl:text-5xl xl:tracking-tighter"
      >
        Typeset
      </h1>
      <p class="text-foreground max-w-2xl text-base text-balance sm:text-lg">
        Styles for the text you don't write the markup of — docs, a chat answer,
        an article. One CSS file: put your content in a container, and every
        heading, list, table and code block in it is set.
      </p>
      <div class="flex flex-wrap justify-center gap-2 pt-2">
        <a scLink variant="button" size="sm" routerLink="/docs/guides/typeset">
          Get started
        </a>
      </div>
    </section>

    <section class="mx-auto w-full max-w-5xl px-4 pb-16">
      <div scTabs value="docs" class="w-full items-center">
        <div scTabsList aria-label="Samples">
          @for (sample of samples; track sample.value) {
            <button scTabsTab [value]="sample.value">{{ sample.label }}</button>
          }
        </div>
        @for (sample of samples; track sample.value) {
          <div scTabsPanel [value]="sample.value" class="w-full">
            <ng-template scTabsPanelContent>
              <div scFrame class="px-6 py-8 md:px-12 md:py-12">
                <div class="mx-auto flex max-w-[37em] flex-col gap-6">
                  @if (sample.question) {
                    <div scBubble alignment="end">
                      <div scBubbleContent>{{ sample.question }}</div>
                    </div>
                  }
                  <article class="typeset" [innerHTML]="sample.html"></article>
                </div>
              </div>
            </ng-template>
          </div>
        }
      </div>
    </section>
  `,
  host: { class: 'block' },
  encapsulation: ViewEncapsulation.None,
})
export default class Typeset {
  private readonly samples: readonly Sample[] = [
    { value: 'docs', label: 'Docs', html: DOCS_SAMPLE },
    {
      value: 'chat',
      label: 'Chat',
      html: CHAT_SAMPLE,
      question: CHAT_QUESTION,
    },
    { value: 'article', label: 'Article', html: ARTICLE_SAMPLE },
    { value: 'changelog', label: 'Changelog', html: CHANGELOG_SAMPLE },
    { value: 'notes', label: 'Notes', html: NOTES_SAMPLE },
  ];
}
