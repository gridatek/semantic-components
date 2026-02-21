import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { MenuBarDemo } from './menu-bar-demo';

@Component({
  selector: 'app-menu-bar-demo-container',
  imports: [DemoContainer, MenuBarDemo],
  template: `
    <app-demo-container
      title="Basic"
      demoUrl="/demos/menu-bar/menu-bar-demo"
      [code]="code"
    >
      <app-menu-bar-demo />
    </app-demo-container>
  `,
  host: { class: 'block' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MenuBarDemoContainer {
  readonly code = `import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import {
  ScMenu,
  ScMenuBar,
  ScMenuBarItem,
  ScMenuContent,
  ScMenuItem,
  ScMenuPortal,
  ScMenuSeparator,
} from '@semantic-components/ui';
import {
  SiBoldIcon,
  SiChartBarIcon,
  SiChartColumnIcon,
  SiChartLineIcon,
  SiChartPieIcon,
  SiCheckIcon,
  SiChevronRightIcon,
  SiClipboardIcon,
  SiCopyIcon,
  SiDownloadIcon,
  SiFileTextIcon,
  SiFolderOpenIcon,
  SiGlobeIcon,
  SiImageIcon,
  SiItalicIcon,
  SiLinkIcon,
  SiListIndentIncreaseIcon,
  SiMinusIcon,
  SiPencilIcon,
  SiPrinterIcon,
  SiScissorsIcon,
  SiSearchIcon,
  SiStrikethroughIcon,
  SiTableIcon,
  SiTextAlignCenterIcon,
  SiTextAlignEndIcon,
  SiTextAlignJustifyIcon,
  SiTextAlignStartIcon,
  SiTrash2Icon,
  SiUnderlineIcon,
  SiUndo2Icon,
  SiRedo2Icon,
  SiUploadIcon,
  SiUserPlusIcon,
} from '@semantic-icons/lucide-icons';

@Component({
  selector: 'app-menu-bar-demo',
  imports: [
    ScMenuBar,
    ScMenuBarItem,
    ScMenu,
    ScMenuContent,
    ScMenuItem,
    ScMenuPortal,
    ScMenuSeparator,
    SiBoldIcon,
    SiChartBarIcon,
    SiChartColumnIcon,
    SiChartLineIcon,
    SiChartPieIcon,
    SiCheckIcon,
    SiChevronRightIcon,
    SiClipboardIcon,
    SiCopyIcon,
    SiDownloadIcon,
    SiFileTextIcon,
    SiFolderOpenIcon,
    SiGlobeIcon,
    SiImageIcon,
    SiItalicIcon,
    SiLinkIcon,
    SiListIndentIncreaseIcon,
    SiMinusIcon,
    SiPencilIcon,
    SiPrinterIcon,
    SiScissorsIcon,
    SiSearchIcon,
    SiStrikethroughIcon,
    SiTableIcon,
    SiTextAlignCenterIcon,
    SiTextAlignEndIcon,
    SiTextAlignJustifyIcon,
    SiTextAlignStartIcon,
    SiTrash2Icon,
    SiUnderlineIcon,
    SiUndo2Icon,
    SiRedo2Icon,
    SiUploadIcon,
    SiUserPlusIcon,
  ],
  template: \`
    <div scMenuBar>
      <!-- File -->
      <div scMenuBarItem value="File">
        File
        <ng-template scMenuPortal>
          <div scMenu>
            <ng-template scMenuContent>
              <div scMenuItem value="New">
                <svg siFileTextIcon class="size-4 shrink-0" aria-hidden="true"></svg>
                <span class="flex-1">New</span>
                <span class="ml-auto text-xs tracking-widest text-muted-foreground">⌘N</span>
              </div>
              <div scMenuItem value="Open">
                <svg siFolderOpenIcon class="size-4 shrink-0" aria-hidden="true"></svg>
                <span class="flex-1">Open</span>
                <span class="ml-auto text-xs tracking-widest text-muted-foreground">⌘O</span>
              </div>
              <div scMenuItem value="Make a copy">
                <svg siCopyIcon class="size-4 shrink-0" aria-hidden="true"></svg>
                <span class="flex-1">Make a copy</span>
              </div>
              <div scMenuSeparator></div>
              <div scMenuItem value="Share">
                <svg siUserPlusIcon class="size-4 shrink-0" aria-hidden="true"></svg>
                <span class="flex-1">Share</span>
                <svg siChevronRightIcon class="ml-auto size-4 shrink-0" aria-hidden="true"></svg>
                <ng-template scMenuPortal>
                  <div scMenu>
                    <ng-template scMenuContent>
                      <div scMenuItem value="Share with others">
                        <svg siUserPlusIcon class="size-4 shrink-0" aria-hidden="true"></svg>
                        <span class="flex-1">Share with others</span>
                      </div>
                      <div scMenuItem value="Publish to web">
                        <svg siGlobeIcon class="size-4 shrink-0" aria-hidden="true"></svg>
                        <span class="flex-1">Publish to web</span>
                      </div>
                    </ng-template>
                  </div>
                </ng-template>
              </div>
              <div scMenuItem value="Download">
                <svg siDownloadIcon class="size-4 shrink-0" aria-hidden="true"></svg>
                <span class="flex-1">Download</span>
              </div>
              <div scMenuItem value="Print">
                <svg siPrinterIcon class="size-4 shrink-0" aria-hidden="true"></svg>
                <span class="flex-1">Print</span>
              </div>
              <div scMenuSeparator></div>
              <div scMenuItem value="Rename">
                <svg siPencilIcon class="size-4 shrink-0" aria-hidden="true"></svg>
                <span class="flex-1">Rename</span>
              </div>
              <div scMenuItem value="Delete">
                <svg siTrash2Icon class="size-4 shrink-0" aria-hidden="true"></svg>
                <span class="flex-1">Move to trash</span>
              </div>
            </ng-template>
          </div>
        </ng-template>
      </div>

      <!-- Edit -->
      <div scMenuBarItem value="Edit">
        Edit
        <ng-template scMenuPortal>
          <div scMenu>
            <ng-template scMenuContent>
              <div scMenuItem value="Undo">
                <svg siUndo2Icon class="size-4 shrink-0" aria-hidden="true"></svg>
                <span class="flex-1">Undo</span>
                <span class="ml-auto text-xs tracking-widest text-muted-foreground">⌘Z</span>
              </div>
              <div scMenuItem value="Redo">
                <svg siRedo2Icon class="size-4 shrink-0" aria-hidden="true"></svg>
                <span class="flex-1">Redo</span>
                <span class="ml-auto text-xs tracking-widest text-muted-foreground">⌘Y</span>
              </div>
              <div scMenuSeparator></div>
              <div scMenuItem value="Cut">
                <svg siScissorsIcon class="size-4 shrink-0" aria-hidden="true"></svg>
                <span class="flex-1">Cut</span>
                <span class="ml-auto text-xs tracking-widest text-muted-foreground">⌘X</span>
              </div>
              <div scMenuItem value="Copy">
                <svg siCopyIcon class="size-4 shrink-0" aria-hidden="true"></svg>
                <span class="flex-1">Copy</span>
                <span class="ml-auto text-xs tracking-widest text-muted-foreground">⌘C</span>
              </div>
              <div scMenuItem value="Paste">
                <svg siClipboardIcon class="size-4 shrink-0" aria-hidden="true"></svg>
                <span class="flex-1">Paste</span>
                <span class="ml-auto text-xs tracking-widest text-muted-foreground">⌘V</span>
              </div>
              <div scMenuSeparator></div>
              <div scMenuItem value="Find and replace">
                <svg siSearchIcon class="size-4 shrink-0" aria-hidden="true"></svg>
                <span class="flex-1">Find and replace</span>
                <span class="ml-auto text-xs tracking-widest text-muted-foreground">⇧⌘H</span>
              </div>
            </ng-template>
          </div>
        </ng-template>
      </div>

      <!-- View -->
      <div scMenuBarItem value="View">
        View
        <ng-template scMenuPortal>
          <div scMenu>
            <ng-template scMenuContent>
              <div scMenuItem value="Show print layout" [disabled]="true">
                <svg siCheckIcon class="size-4 shrink-0" aria-hidden="true"></svg>
                <span class="flex-1">Show print layout</span>
              </div>
              <div scMenuItem value="Show ruler" [disabled]="true">
                <svg siCheckIcon class="size-4 shrink-0" aria-hidden="true"></svg>
                <span class="flex-1">Show ruler</span>
              </div>
              <div scMenuSeparator></div>
              <div scMenuItem value="Zoom in">
                <span class="flex-1">Zoom in</span>
                <span class="ml-auto text-xs tracking-widest text-muted-foreground">⌘+</span>
              </div>
              <div scMenuItem value="Zoom out">
                <span class="flex-1">Zoom out</span>
                <span class="ml-auto text-xs tracking-widest text-muted-foreground">⌘-</span>
              </div>
              <div scMenuSeparator></div>
              <div scMenuItem value="Full screen">
                <span class="flex-1">Full screen</span>
              </div>
            </ng-template>
          </div>
        </ng-template>
      </div>

      <!-- Insert -->
      <div scMenuBarItem value="Insert">
        Insert
        <ng-template scMenuPortal>
          <div scMenu>
            <ng-template scMenuContent>
              <div scMenuItem value="Image">
                <svg siImageIcon class="size-4 shrink-0" aria-hidden="true"></svg>
                <span class="flex-1">Image</span>
                <svg siChevronRightIcon class="ml-auto size-4 shrink-0" aria-hidden="true"></svg>
                <ng-template scMenuPortal>
                  <div scMenu>
                    <ng-template scMenuContent>
                      <div scMenuItem value="Upload from computer">
                        <svg siUploadIcon class="size-4 shrink-0" aria-hidden="true"></svg>
                        <span class="flex-1">Upload from computer</span>
                      </div>
                      <div scMenuItem value="Search the web">
                        <svg siSearchIcon class="size-4 shrink-0" aria-hidden="true"></svg>
                        <span class="flex-1">Search the web</span>
                      </div>
                      <div scMenuItem value="By URL">
                        <svg siLinkIcon class="size-4 shrink-0" aria-hidden="true"></svg>
                        <span class="flex-1">By URL</span>
                      </div>
                    </ng-template>
                  </div>
                </ng-template>
              </div>
              <div scMenuItem value="Table">
                <svg siTableIcon class="size-4 shrink-0" aria-hidden="true"></svg>
                <span class="flex-1">Table</span>
              </div>
              <div scMenuItem value="Chart">
                <svg siChartColumnIcon class="size-4 shrink-0" aria-hidden="true"></svg>
                <span class="flex-1">Chart</span>
                <svg siChevronRightIcon class="ml-auto size-4 shrink-0" aria-hidden="true"></svg>
                <ng-template scMenuPortal>
                  <div scMenu>
                    <ng-template scMenuContent>
                      <div scMenuItem value="Bar">
                        <svg siChartBarIcon class="size-4 shrink-0" aria-hidden="true"></svg>
                        <span class="flex-1">Bar</span>
                      </div>
                      <div scMenuItem value="Column">
                        <svg siChartColumnIcon class="size-4 shrink-0" aria-hidden="true"></svg>
                        <span class="flex-1">Column</span>
                      </div>
                      <div scMenuItem value="Line">
                        <svg siChartLineIcon class="size-4 shrink-0" aria-hidden="true"></svg>
                        <span class="flex-1">Line</span>
                      </div>
                      <div scMenuItem value="Pie">
                        <svg siChartPieIcon class="size-4 shrink-0" aria-hidden="true"></svg>
                        <span class="flex-1">Pie</span>
                      </div>
                    </ng-template>
                  </div>
                </ng-template>
              </div>
              <div scMenuItem value="Horizontal line">
                <svg siMinusIcon class="size-4 shrink-0" aria-hidden="true"></svg>
                <span class="flex-1">Horizontal line</span>
              </div>
            </ng-template>
          </div>
        </ng-template>
      </div>

      <!-- Format -->
      <div scMenuBarItem value="Format">
        Format
        <ng-template scMenuPortal>
          <div scMenu>
            <ng-template scMenuContent>
              <div scMenuItem value="Text">
                <svg siBoldIcon class="size-4 shrink-0" aria-hidden="true"></svg>
                <span class="flex-1">Text</span>
                <svg siChevronRightIcon class="ml-auto size-4 shrink-0" aria-hidden="true"></svg>
                <ng-template scMenuPortal>
                  <div scMenu>
                    <ng-template scMenuContent>
                      <div scMenuItem value="Bold">
                        <svg siBoldIcon class="size-4 shrink-0" aria-hidden="true"></svg>
                        <span class="flex-1">Bold</span>
                        <span class="ml-auto text-xs tracking-widest text-muted-foreground">⌘B</span>
                      </div>
                      <div scMenuItem value="Italic">
                        <svg siItalicIcon class="size-4 shrink-0" aria-hidden="true"></svg>
                        <span class="flex-1">Italic</span>
                        <span class="ml-auto text-xs tracking-widest text-muted-foreground">⌘I</span>
                      </div>
                      <div scMenuItem value="Underline">
                        <svg siUnderlineIcon class="size-4 shrink-0" aria-hidden="true"></svg>
                        <span class="flex-1">Underline</span>
                        <span class="ml-auto text-xs tracking-widest text-muted-foreground">⌘U</span>
                      </div>
                      <div scMenuItem value="Strikethrough">
                        <svg siStrikethroughIcon class="size-4 shrink-0" aria-hidden="true"></svg>
                        <span class="flex-1">Strikethrough</span>
                        <span class="ml-auto text-xs tracking-widest text-muted-foreground">⇧⌘X</span>
                      </div>
                      <div scMenuSeparator></div>
                      <div scMenuItem value="Size">
                        <span class="flex-1">Size</span>
                        <svg siChevronRightIcon class="ml-auto size-4 shrink-0" aria-hidden="true"></svg>
                        <ng-template scMenuPortal>
                          <div scMenu>
                            <ng-template scMenuContent>
                              <div scMenuItem value="Increase font size">
                                <span class="flex-1">Increase font size</span>
                                <span class="ml-auto text-xs tracking-widest text-muted-foreground">⇧⌘.</span>
                              </div>
                              <div scMenuItem value="Decrease font size">
                                <span class="flex-1">Decrease font size</span>
                                <span class="ml-auto text-xs tracking-widest text-muted-foreground">⇧⌘,</span>
                              </div>
                            </ng-template>
                          </div>
                        </ng-template>
                      </div>
                    </ng-template>
                  </div>
                </ng-template>
              </div>
              <div scMenuItem value="Paragraph styles">
                <svg siTextAlignJustifyIcon class="size-4 shrink-0" aria-hidden="true"></svg>
                <span class="flex-1">Paragraph styles</span>
                <svg siChevronRightIcon class="ml-auto size-4 shrink-0" aria-hidden="true"></svg>
                <ng-template scMenuPortal>
                  <div scMenu>
                    <ng-template scMenuContent>
                      <div scMenuItem value="Normal text">Normal text</div>
                      <div scMenuItem value="Heading 1">Heading 1</div>
                      <div scMenuItem value="Heading 2">Heading 2</div>
                    </ng-template>
                  </div>
                </ng-template>
              </div>
              <div scMenuItem value="Align & indent">
                <svg siListIndentIncreaseIcon class="size-4 shrink-0" aria-hidden="true"></svg>
                <span class="flex-1">Align & indent</span>
                <svg siChevronRightIcon class="ml-auto size-4 shrink-0" aria-hidden="true"></svg>
                <ng-template scMenuPortal>
                  <div scMenu>
                    <ng-template scMenuContent>
                      <div scMenuItem value="Align left">
                        <svg siTextAlignStartIcon class="size-4 shrink-0" aria-hidden="true"></svg>
                        <span class="flex-1">Align left</span>
                      </div>
                      <div scMenuItem value="Align center">
                        <svg siTextAlignCenterIcon class="size-4 shrink-0" aria-hidden="true"></svg>
                        <span class="flex-1">Align center</span>
                      </div>
                      <div scMenuItem value="Align right">
                        <svg siTextAlignEndIcon class="size-4 shrink-0" aria-hidden="true"></svg>
                        <span class="flex-1">Align right</span>
                      </div>
                      <div scMenuItem value="Justify">
                        <svg siTextAlignJustifyIcon class="size-4 shrink-0" aria-hidden="true"></svg>
                        <span class="flex-1">Justify</span>
                      </div>
                    </ng-template>
                  </div>
                </ng-template>
              </div>
            </ng-template>
          </div>
        </ng-template>
      </div>
    </div>
  \`,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MenuBarDemo {}`;
}
