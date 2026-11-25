import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { RtlTreeNextDemo } from './rtl-tree-next-demo';

@Component({
  selector: 'app-rtl-tree-next-demo-container',
  imports: [DemoContainer, RtlTreeNextDemo],
  template: `
    <app-demo-container
      title="RTL"
      demoUrl="/demos/tree-next/rtl-tree-next-demo"
      [code]="code"
    >
      <app-rtl-tree-next-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class RtlTreeNextDemoContainer {
  private readonly code = `import { Dir } from '@angular/cdk/bidi';
import { NgTemplateOutlet } from '@angular/common';
import { Component, LOCALE_ID, ViewEncapsulation, signal } from '@angular/core';
import {
  ScFrame,
  ScTreeNext,
  ScTreeNextGroup,
  ScTreeNextGroupContent,
  ScTreeNextItem,
  ScTreeNextItemIndicator,
  ScTreeNextItemLabel,
} from '@semantic-components/ui';
import {
  SiChevronRightIcon,
  SiFileIcon,
  SiFolderIcon,
} from '@semantic-icons/lucide-icons';

interface FileNode {
  id: string;
  name: string;
  children?: FileNode[];
}

const FILES: FileNode[] = [
  {
    id: 'documents',
    name: 'المستندات',
    children: [
      { id: 'report', name: 'التقرير السنوي.pdf' },
      { id: 'budget', name: 'الميزانية.xlsx' },
    ],
  },
  {
    id: 'photos',
    name: 'الصور',
    children: [
      { id: 'trip', name: 'رحلة الصيف.jpg' },
      { id: 'family', name: 'العائلة.png' },
    ],
  },
  { id: 'notes', name: 'ملاحظات.txt' },
];

/** Right to left: the rows from the right, the chevrons mirrored, → closes and ← opens. */
@Component({
  selector: 'app-rtl-tree-next-demo',
  imports: [
    Dir,
    NgTemplateOutlet,
    ScFrame,
    ScTreeNext,
    ScTreeNextGroup,
    ScTreeNextGroupContent,
    ScTreeNextItem,
    ScTreeNextItemIndicator,
    ScTreeNextItemLabel,
    SiChevronRightIcon,
    SiFileIcon,
    SiFolderIcon,
  ],
  providers: [{ provide: LOCALE_ID, useValue: 'ar' }],
  template: \`
    <div dir="rtl" lang="ar" scFrame class="w-64 p-2">
      <ul scTreeNext aria-label="الملفات" [(expanded)]="expanded">
        <ng-container
          [ngTemplateOutlet]="branch"
          [ngTemplateOutletContext]="{ $implicit: files }"
          ngTemplateOutletInjector="outlet"
        />
      </ul>
    </div>

    <ng-template #branch let-files>
      @for (file of files; track file.id) {
        <li scTreeNextItem [value]="file.id">
          <div scTreeNextItemLabel>
            <span scTreeNextItemIndicator><svg siChevronRightIcon></svg></span>
            @if (file.children) {
              <svg siFolderIcon></svg>
            } @else {
              <svg siFileIcon></svg>
            }
            {{ file.name }}
          </div>
          @if (file.children) {
            <ul scTreeNextGroup>
              <ng-template scTreeNextGroupContent>
                <ng-container
                  [ngTemplateOutlet]="branch"
                  [ngTemplateOutletContext]="{ $implicit: file.children }"
                  ngTemplateOutletInjector="outlet"
                />
              </ng-template>
            </ul>
          }
        </li>
      }
    </ng-template>
  \`,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class RtlTreeNextDemo {
  private readonly files = FILES;
  private readonly expanded = signal(['documents']);
}`;
}
