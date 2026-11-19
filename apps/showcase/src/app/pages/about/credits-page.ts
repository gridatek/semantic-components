import { Component, ViewEncapsulation } from '@angular/core';
import { ScLink, ScTypeset } from '@semantic-components/ui';
import { TocHeading } from '../../components/toc/toc-heading';

interface Credit {
  readonly name: string;
  readonly url: string;
  readonly what: string;
}

@Component({
  selector: 'app-credits-page',
  imports: [ScLink, ScTypeset, TocHeading],
  template: `
    <div class="space-y-12">
      <div class="space-y-2">
        <h1 scTypeset>Credits</h1>
        <p class="text-muted-foreground">
          Semantic Components stands on the work of others: the libraries that
          showed the way, and the open-source projects it is built with. Thank
          you.
        </p>
      </div>

      @for (group of groups; track group.title) {
        <section class="space-y-4">
          <h2 scTypeset appToc>{{ group.title }}</h2>
          <p>{{ group.intro }}</p>
          <ul class="space-y-3">
            @for (credit of group.credits; track credit.name) {
              <li>
                <a
                  scLink
                  [href]="credit.url"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="font-medium"
                  >{{ credit.name }}</a
                >
                — {{ credit.what }}
              </li>
            }
          </ul>
        </section>
      }
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
})
export default class CreditsPage {
  private readonly groups: {
    title: string;
    intro: string;
    credits: Credit[];
  }[] = [
    {
      title: 'The references',
      intro:
        'The libraries whose ideas these components follow — their look, their parts, their behaviour.',
      credits: [
        {
          name: 'shadcn/ui',
          url: 'https://ui.shadcn.com',
          what: 'the look, in its eight styles, the examples and the theme variables.',
        },
        {
          name: 'Base UI',
          url: 'https://base-ui.com',
          what: 'the parts, their names and their behaviour, for most components.',
        },
        {
          name: 'Radix UI',
          url: 'https://www.radix-ui.com',
          what: 'the accessible patterns that shaped the first components.',
        },
        {
          name: 'WAI-ARIA Authoring Practices',
          url: 'https://www.w3.org/WAI/ARIA/apg/',
          what: 'the keyboard and screen-reader patterns.',
        },
      ],
    },
    {
      title: 'Built with',
      intro: 'The projects the library and its parts are made of.',
      credits: [
        {
          name: 'Angular',
          url: 'https://angular.dev',
          what: 'signals, Signal Forms, localize, SSR — and the CDK and Angular Aria for overlays, focus and accessible widgets.',
        },
        {
          name: 'Tailwind CSS',
          url: 'https://tailwindcss.com',
          what: 'the styles, with tw-animate-css for the animations.',
        },
        {
          name: 'class-variance-authority',
          url: 'https://cva.style',
          what: 'the variants.',
        },
        {
          name: 'Lucide',
          url: 'https://lucide.dev',
          what: 'the icons, through @semantic-icons/lucide-icons.',
        },
        {
          name: 'Tiptap and ProseMirror',
          url: 'https://tiptap.dev',
          what: 'the Editor.',
        },
        {
          name: 'CodeMirror',
          url: 'https://codemirror.net',
          what: 'the Code Editor.',
        },
        {
          name: 'Shiki',
          url: 'https://shiki.style',
          what: 'code highlighting.',
        },
        {
          name: 'Embla Carousel',
          url: 'https://www.embla-carousel.com',
          what: 'the Carousel.',
        },
        {
          name: 'D3',
          url: 'https://d3js.org',
          what: 'the charts’ scales and shapes (with Recharts’ API as the model).',
        },
        {
          name: 'TanStack Table and Hotkeys',
          url: 'https://tanstack.com',
          what: 'the Data Table and keyboard shortcuts.',
        },
        {
          name: 'PDF.js',
          url: 'https://mozilla.github.io/pdf.js/',
          what: 'the PDF Viewer.',
        },
        {
          name: 'libphonenumber-js',
          url: 'https://github.com/catamphetamine/libphonenumber-js',
          what: 'the Phone Input.',
        },
        {
          name: 'Emojibase',
          url: 'https://emojibase.dev',
          what: 'the Emoji Picker’s data.',
        },
        {
          name: 'canvas-confetti',
          url: 'https://github.com/catdad/canvas-confetti',
          what: 'the Confetti.',
        },
        {
          name: 'uqr',
          url: 'https://github.com/unjs/uqr',
          what: 'the QR Code.',
        },
        {
          name: 'Geist and Noto Sans Arabic',
          url: 'https://vercel.com/font',
          what: 'the fonts of this site.',
        },
      ],
    },
  ];
}
