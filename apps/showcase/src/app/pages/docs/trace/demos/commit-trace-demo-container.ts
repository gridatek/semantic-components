import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { CommitTraceDemo } from './commit-trace-demo';

@Component({
  selector: 'app-commit-trace-demo-container',
  imports: [DemoContainer, CommitTraceDemo],
  template: `
    <app-demo-container
      title="Commit"
      demoUrl="/demos/trace/commit-trace-demo"
      [code]="code"
    >
      <app-commit-trace-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class CommitTraceDemoContainer {
  readonly code = `import { Component, ViewEncapsulation } from '@angular/core';
import {
  ScCollapsible,
  ScCollapsibleBody,
  ScCollapsibleContent,
  ScCollapsiblePanel,
  ScCollapsibleTrigger,
  ScSheet,
  ScSheetDescription,
  ScSheetHeader,
  ScSheetPortal,
  ScSheetProvider,
  ScSheetTitle,
  ScSheetTrigger,
  ScTrace,
  ScTraceCollapsible,
  ScTraceCollapsibleContent,
  ScTraceCollapsibleIcon,
  ScTraceCollapsibleTrigger,
  ScTraceDescription,
  ScTraceIcon,
  ScTraceLine,
  ScTraceTitle,
} from '@semantic-components/ui';
import {
  ScCodeBlock,
  ScCodeBlockContent,
} from '@semantic-components/ui/code-block';
import {
  SiChevronRightIcon,
  SiFilePenIcon,
  SiFilePlusIcon,
  SiGitCommitHorizontalIcon,
} from '@semantic-icons/lucide-icons';

/** A row per changed file — Added, Edited or Deleted in its title, the line counts in its description — each opening its diff in a sheet. */
@Component({
  selector: 'app-commit-trace-demo',
  imports: [
    ScCollapsible,
    ScCollapsibleBody,
    ScCollapsibleContent,
    ScCollapsiblePanel,
    ScCollapsibleTrigger,
    ScSheet,
    ScSheetDescription,
    ScSheetHeader,
    ScSheetPortal,
    ScSheetProvider,
    ScSheetTitle,
    ScSheetTrigger,
    ScTrace,
    ScTraceCollapsible,
    ScTraceCollapsibleContent,
    ScTraceCollapsibleIcon,
    ScTraceCollapsibleTrigger,
    ScTraceDescription,
    ScTraceIcon,
    ScTraceLine,
    ScTraceTitle,
    ScCodeBlock,
    ScCodeBlockContent,
    SiGitCommitHorizontalIcon,
    SiFilePlusIcon,
    SiFilePenIcon,
    SiChevronRightIcon,
  ],
  template: \`
    <div scTrace class="max-w-sm">
      <div scCollapsible scTraceCollapsible>
        <button
          scCollapsibleTrigger
          scTraceCollapsibleTrigger
          [panel]="commit.panel"
          [expanded]="true"
        >
          <span scTraceLine>
            <span scTraceIcon><svg siGitCommitHorizontalIcon></svg></span>
            <span scTraceTitle>Committed a1b2c3: Fix the login redirect</span>
          </span>
          <span scTraceCollapsibleIcon><svg siChevronRightIcon></svg></span>
        </button>
        <div scCollapsiblePanel #commit="scCollapsiblePanel">
          <ng-template scCollapsibleContent>
            <div scCollapsibleBody>
              <div scTraceCollapsibleContent>
                <div scTrace>
                  @for (file of files; track file.path) {
                    <div scSheetProvider>
                      <button scSheetTrigger>
                        <span scTraceLine>
                          <span scTraceIcon>
                            @if (file.added) {
                              <svg siFilePlusIcon></svg>
                            } @else {
                              <svg siFilePenIcon></svg>
                            }
                          </span>
                          <span scTraceTitle>
                            {{ file.added ? 'Added' : 'Edited' }}
                            {{ file.path }}
                          </span>
                          <span scTraceDescription class="font-mono">
                            +{{ file.additions }} −{{ file.deletions }}
                          </span>
                          <span scTraceIcon
                            ><svg siChevronRightIcon></svg
                          ></span>
                        </span>
                      </button>
                      <ng-template scSheetPortal>
                        <div scSheet>
                          <div scSheetHeader>
                            <h2 scSheetTitle class="font-mono">
                              {{ file.path }}
                            </h2>
                            <p scSheetDescription>
                              {{ file.additions }} additions,
                              {{ file.deletions }} deletions
                            </p>
                          </div>
                          <div scCodeBlock class="mx-6 mb-6 w-auto">
                            <pre
                              scCodeBlockContent
                              language="diff"
                              [code]="file.diff"
                            ></pre>
                          </div>
                        </div>
                      </ng-template>
                    </div>
                  }
                </div>
              </div>
            </div>
          </ng-template>
        </div>
      </div>
    </div>
  \`,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class CommitTraceDemo {
  protected readonly files = [
    {
      path: 'app/login/login-page.ts',
      added: false,
      additions: 2,
      deletions: 2,
      diff: [
        '@@ -14,7 +14,7 @@',
        "   const next = route.snapshot.queryParamMap.get('next');",
        '-  const redirectTo =',
        "-    next && next.startsWith('/') ? next : '/';",
        '+  const redirectTo = safeRedirect(next);',
        '+',
        '   router.navigateByUrl(redirectTo);',
      ].join('\\n'),
    },
    {
      path: 'lib/auth/redirect.ts',
      added: true,
      additions: 7,
      deletions: 0,
      diff: [
        '@@ -0,0 +1,7 @@',
        '+export function safeRedirect(next: string | null) {',
        "+  if (!next || !next.startsWith('/') || next.startsWith('//')) {",
        "+    return '/';",
        '+  }',
        '+',
        '+  return next;',
        '+}',
      ].join('\\n'),
    },
  ];
}`;
}
