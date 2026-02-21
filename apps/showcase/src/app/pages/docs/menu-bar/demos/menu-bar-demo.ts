import {
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
  ],
  template: `
    <div scMenuBar>
      <!-- File -->
      <div scMenuBarItem value="File">
        File
        <ng-template scMenuPortal>
          <div scMenu>
            <ng-template scMenuContent>
              <div scMenuItem value="New">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  class="size-4 shrink-0"
                  aria-hidden="true"
                >
                  <path
                    d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"
                  />
                  <path d="M14 2v4a2 2 0 0 0 2 2h4" />
                  <path d="M10 9H8" />
                  <path d="M16 13H8" />
                  <path d="M16 17H8" />
                </svg>
                <span class="flex-1">New</span>
                <span
                  class="ml-auto text-xs tracking-widest text-muted-foreground"
                >
                  &#8984;N
                </span>
              </div>
              <div scMenuItem value="Open">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  class="size-4 shrink-0"
                  aria-hidden="true"
                >
                  <path
                    d="m6 14 1.5-2.9A2 2 0 0 1 9.24 10H20a2 2 0 0 1 1.94 2.5l-1.54 6a2 2 0 0 1-1.95 1.5H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h3.9a2 2 0 0 1 1.69.9l.81 1.2a2 2 0 0 0 1.67.9H18a2 2 0 0 1 2 2v2"
                  />
                </svg>
                <span class="flex-1">Open</span>
                <span
                  class="ml-auto text-xs tracking-widest text-muted-foreground"
                >
                  &#8984;O
                </span>
              </div>
              <div scMenuItem value="Make a copy">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  class="size-4 shrink-0"
                  aria-hidden="true"
                >
                  <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
                  <path
                    d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"
                  />
                </svg>
                <span class="flex-1">Make a copy</span>
              </div>
              <div scMenuSeparator></div>
              <div scMenuItem value="Share">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  class="size-4 shrink-0"
                  aria-hidden="true"
                >
                  <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                  <circle cx="9" cy="7" r="4" />
                  <line x1="19" x2="19" y1="8" y2="14" />
                  <line x1="22" x2="16" y1="11" y2="11" />
                </svg>
                <span class="flex-1">Share</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  class="ml-auto size-4 shrink-0"
                  aria-hidden="true"
                >
                  <path d="m9 18 6-6-6-6" />
                </svg>
                <ng-template scMenuPortal>
                  <div scMenu>
                    <ng-template scMenuContent>
                      <div scMenuItem value="Share with others">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          class="size-4 shrink-0"
                          aria-hidden="true"
                        >
                          <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                          <circle cx="9" cy="7" r="4" />
                          <line x1="19" x2="19" y1="8" y2="14" />
                          <line x1="22" x2="16" y1="11" y2="11" />
                        </svg>
                        <span class="flex-1">Share with others</span>
                      </div>
                      <div scMenuItem value="Publish to web">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          class="size-4 shrink-0"
                          aria-hidden="true"
                        >
                          <circle cx="12" cy="12" r="10" />
                          <path
                            d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"
                          />
                          <path d="M2 12h20" />
                        </svg>
                        <span class="flex-1">Publish to web</span>
                      </div>
                    </ng-template>
                  </div>
                </ng-template>
              </div>
              <div scMenuItem value="Download">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  class="size-4 shrink-0"
                  aria-hidden="true"
                >
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <polyline points="7 10 12 15 17 10" />
                  <line x1="12" x2="12" y1="15" y2="3" />
                </svg>
                <span class="flex-1">Download</span>
              </div>
              <div scMenuItem value="Print">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  class="size-4 shrink-0"
                  aria-hidden="true"
                >
                  <polyline points="6 9 6 2 18 2 18 9" />
                  <path
                    d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"
                  />
                  <rect width="12" height="8" x="6" y="14" />
                </svg>
                <span class="flex-1">Print</span>
              </div>
              <div scMenuSeparator></div>
              <div scMenuItem value="Rename">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  class="size-4 shrink-0"
                  aria-hidden="true"
                >
                  <path
                    d="M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z"
                  />
                </svg>
                <span class="flex-1">Rename</span>
              </div>
              <div scMenuItem value="Delete">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  class="size-4 shrink-0"
                  aria-hidden="true"
                >
                  <path d="M3 6h18" />
                  <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
                  <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
                  <line x1="10" x2="10" y1="11" y2="17" />
                  <line x1="14" x2="14" y1="11" y2="17" />
                </svg>
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
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  class="size-4 shrink-0"
                  aria-hidden="true"
                >
                  <path d="M3 7v6h6" />
                  <path d="M21 17a9 9 0 0 0-9-9 9 9 0 0 0-6 2.3L3 13" />
                </svg>
                <span class="flex-1">Undo</span>
                <span
                  class="ml-auto text-xs tracking-widest text-muted-foreground"
                >
                  &#8984;Z
                </span>
              </div>
              <div scMenuItem value="Redo">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  class="size-4 shrink-0"
                  aria-hidden="true"
                >
                  <path d="M21 7v6h-6" />
                  <path d="M3 17a9 9 0 0 1 9-9 9 9 0 0 1 6 2.3L21 13" />
                </svg>
                <span class="flex-1">Redo</span>
                <span
                  class="ml-auto text-xs tracking-widest text-muted-foreground"
                >
                  &#8984;Y
                </span>
              </div>
              <div scMenuSeparator></div>
              <div scMenuItem value="Cut">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  class="size-4 shrink-0"
                  aria-hidden="true"
                >
                  <circle cx="6" cy="6" r="3" />
                  <path d="M8.12 8.12 12 12" />
                  <path d="M20 4 8.12 15.88" />
                  <circle cx="6" cy="18" r="3" />
                  <path d="M14.8 14.8 20 20" />
                </svg>
                <span class="flex-1">Cut</span>
                <span
                  class="ml-auto text-xs tracking-widest text-muted-foreground"
                >
                  &#8984;X
                </span>
              </div>
              <div scMenuItem value="Copy">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  class="size-4 shrink-0"
                  aria-hidden="true"
                >
                  <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
                  <path
                    d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"
                  />
                </svg>
                <span class="flex-1">Copy</span>
                <span
                  class="ml-auto text-xs tracking-widest text-muted-foreground"
                >
                  &#8984;C
                </span>
              </div>
              <div scMenuItem value="Paste">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  class="size-4 shrink-0"
                  aria-hidden="true"
                >
                  <rect width="8" height="4" x="8" y="2" rx="1" ry="1" />
                  <path
                    d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"
                  />
                </svg>
                <span class="flex-1">Paste</span>
                <span
                  class="ml-auto text-xs tracking-widest text-muted-foreground"
                >
                  &#8984;V
                </span>
              </div>
              <div scMenuSeparator></div>
              <div scMenuItem value="Find and replace">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  class="size-4 shrink-0"
                  aria-hidden="true"
                >
                  <circle cx="11" cy="11" r="8" />
                  <path d="m21 21-4.3-4.3" />
                </svg>
                <span class="flex-1">Find and replace</span>
                <span
                  class="ml-auto text-xs tracking-widest text-muted-foreground"
                >
                  &#8679;&#8984;H
                </span>
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
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  class="size-4 shrink-0"
                  aria-hidden="true"
                >
                  <path d="M20 6 9 17l-5-5" />
                </svg>
                <span class="flex-1">Show print layout</span>
              </div>
              <div scMenuItem value="Show ruler" [disabled]="true">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  class="size-4 shrink-0"
                  aria-hidden="true"
                >
                  <path d="M20 6 9 17l-5-5" />
                </svg>
                <span class="flex-1">Show ruler</span>
              </div>
              <div scMenuSeparator></div>
              <div scMenuItem value="Zoom in">
                <span class="flex-1">Zoom in</span>
                <span
                  class="ml-auto text-xs tracking-widest text-muted-foreground"
                >
                  &#8984;+
                </span>
              </div>
              <div scMenuItem value="Zoom out">
                <span class="flex-1">Zoom out</span>
                <span
                  class="ml-auto text-xs tracking-widest text-muted-foreground"
                >
                  &#8984;-
                </span>
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
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  class="size-4 shrink-0"
                  aria-hidden="true"
                >
                  <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
                  <circle cx="9" cy="9" r="2" />
                  <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
                </svg>
                <span class="flex-1">Image</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  class="ml-auto size-4 shrink-0"
                  aria-hidden="true"
                >
                  <path d="m9 18 6-6-6-6" />
                </svg>
                <ng-template scMenuPortal>
                  <div scMenu>
                    <ng-template scMenuContent>
                      <div scMenuItem value="Upload from computer">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          class="size-4 shrink-0"
                          aria-hidden="true"
                        >
                          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                          <polyline points="17 8 12 3 7 8" />
                          <line x1="12" x2="12" y1="3" y2="15" />
                        </svg>
                        <span class="flex-1">Upload from computer</span>
                      </div>
                      <div scMenuItem value="Search the web">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          class="size-4 shrink-0"
                          aria-hidden="true"
                        >
                          <circle cx="11" cy="11" r="8" />
                          <path d="m21 21-4.3-4.3" />
                        </svg>
                        <span class="flex-1">Search the web</span>
                      </div>
                      <div scMenuItem value="By URL">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          class="size-4 shrink-0"
                          aria-hidden="true"
                        >
                          <path
                            d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"
                          />
                          <path
                            d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"
                          />
                        </svg>
                        <span class="flex-1">By URL</span>
                      </div>
                    </ng-template>
                  </div>
                </ng-template>
              </div>
              <div scMenuItem value="Table">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  class="size-4 shrink-0"
                  aria-hidden="true"
                >
                  <path d="M12 3v18" />
                  <rect width="18" height="18" x="3" y="3" rx="2" />
                  <path d="M3 9h18" />
                  <path d="M3 15h18" />
                </svg>
                <span class="flex-1">Table</span>
              </div>
              <div scMenuItem value="Chart">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  class="size-4 shrink-0"
                  aria-hidden="true"
                >
                  <line x1="12" x2="12" y1="20" y2="10" />
                  <line x1="18" x2="18" y1="20" y2="4" />
                  <line x1="6" x2="6" y1="20" y2="16" />
                </svg>
                <span class="flex-1">Chart</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  class="ml-auto size-4 shrink-0"
                  aria-hidden="true"
                >
                  <path d="m9 18 6-6-6-6" />
                </svg>
                <ng-template scMenuPortal>
                  <div scMenu>
                    <ng-template scMenuContent>
                      <div scMenuItem value="Bar">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          class="size-4 shrink-0"
                          aria-hidden="true"
                        >
                          <rect width="4" height="14" x="4" y="8" rx="1" />
                          <rect width="4" height="8" x="10" y="14" rx="1" />
                          <rect width="4" height="18" x="16" y="4" rx="1" />
                        </svg>
                        <span class="flex-1">Bar</span>
                      </div>
                      <div scMenuItem value="Column">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          class="size-4 shrink-0"
                          aria-hidden="true"
                        >
                          <line x1="12" x2="12" y1="20" y2="10" />
                          <line x1="18" x2="18" y1="20" y2="4" />
                          <line x1="6" x2="6" y1="20" y2="16" />
                        </svg>
                        <span class="flex-1">Column</span>
                      </div>
                      <div scMenuItem value="Line">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          class="size-4 shrink-0"
                          aria-hidden="true"
                        >
                          <path d="M3 3v18h18" />
                          <path d="m19 9-5 5-4-4-3 3" />
                        </svg>
                        <span class="flex-1">Line</span>
                      </div>
                      <div scMenuItem value="Pie">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          class="size-4 shrink-0"
                          aria-hidden="true"
                        >
                          <path d="M21.21 15.89A10 10 0 1 1 8 2.83" />
                          <path d="M22 12A10 10 0 0 0 12 2v10z" />
                        </svg>
                        <span class="flex-1">Pie</span>
                      </div>
                    </ng-template>
                  </div>
                </ng-template>
              </div>
              <div scMenuItem value="Horizontal line">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  class="size-4 shrink-0"
                  aria-hidden="true"
                >
                  <path d="M5 12h14" />
                </svg>
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
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  class="size-4 shrink-0"
                  aria-hidden="true"
                >
                  <path d="M6 4h8a4 4 0 0 1 4 4 4 4 0 0 1-4 4H6z" />
                  <path d="M6 12h9a4 4 0 0 1 4 4 4 4 0 0 1-4 4H6z" />
                </svg>
                <span class="flex-1">Text</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  class="ml-auto size-4 shrink-0"
                  aria-hidden="true"
                >
                  <path d="m9 18 6-6-6-6" />
                </svg>
                <ng-template scMenuPortal>
                  <div scMenu>
                    <ng-template scMenuContent>
                      <div scMenuItem value="Bold">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          class="size-4 shrink-0"
                          aria-hidden="true"
                        >
                          <path d="M6 4h8a4 4 0 0 1 4 4 4 4 0 0 1-4 4H6z" />
                          <path d="M6 12h9a4 4 0 0 1 4 4 4 4 0 0 1-4 4H6z" />
                        </svg>
                        <span class="flex-1">Bold</span>
                        <span
                          class="ml-auto text-xs tracking-widest text-muted-foreground"
                        >
                          &#8984;B
                        </span>
                      </div>
                      <div scMenuItem value="Italic">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          class="size-4 shrink-0"
                          aria-hidden="true"
                        >
                          <line x1="19" x2="10" y1="4" y2="4" />
                          <line x1="14" x2="5" y1="20" y2="20" />
                          <line x1="15" x2="9" y1="4" y2="20" />
                        </svg>
                        <span class="flex-1">Italic</span>
                        <span
                          class="ml-auto text-xs tracking-widest text-muted-foreground"
                        >
                          &#8984;I
                        </span>
                      </div>
                      <div scMenuItem value="Underline">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          class="size-4 shrink-0"
                          aria-hidden="true"
                        >
                          <path d="M6 4v6a6 6 0 0 0 12 0V4" />
                          <line x1="4" x2="20" y1="20" y2="20" />
                        </svg>
                        <span class="flex-1">Underline</span>
                        <span
                          class="ml-auto text-xs tracking-widest text-muted-foreground"
                        >
                          &#8984;U
                        </span>
                      </div>
                      <div scMenuItem value="Strikethrough">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          class="size-4 shrink-0"
                          aria-hidden="true"
                        >
                          <path d="M16 4H9a3 3 0 0 0-2.83 4" />
                          <path d="M14 12a4 4 0 0 1 0 8H6" />
                          <line x1="4" x2="20" y1="12" y2="12" />
                        </svg>
                        <span class="flex-1">Strikethrough</span>
                        <span
                          class="ml-auto text-xs tracking-widest text-muted-foreground"
                        >
                          &#8679;&#8984;X
                        </span>
                      </div>
                      <div scMenuSeparator></div>
                      <div scMenuItem value="Size">
                        <span class="flex-1">Size</span>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          class="ml-auto size-4 shrink-0"
                          aria-hidden="true"
                        >
                          <path d="m9 18 6-6-6-6" />
                        </svg>
                        <ng-template scMenuPortal>
                          <div scMenu>
                            <ng-template scMenuContent>
                              <div scMenuItem value="Increase font size">
                                <span class="flex-1">Increase font size</span>
                                <span
                                  class="ml-auto text-xs tracking-widest text-muted-foreground"
                                >
                                  &#8679;&#8984;.
                                </span>
                              </div>
                              <div scMenuItem value="Decrease font size">
                                <span class="flex-1">Decrease font size</span>
                                <span
                                  class="ml-auto text-xs tracking-widest text-muted-foreground"
                                >
                                  &#8679;&#8984;,
                                </span>
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
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  class="size-4 shrink-0"
                  aria-hidden="true"
                >
                  <line x1="3" x2="21" y1="6" y2="6" />
                  <line x1="3" x2="21" y1="12" y2="12" />
                  <line x1="3" x2="21" y1="18" y2="18" />
                </svg>
                <span class="flex-1">Paragraph styles</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  class="ml-auto size-4 shrink-0"
                  aria-hidden="true"
                >
                  <path d="m9 18 6-6-6-6" />
                </svg>
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
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  class="size-4 shrink-0"
                  aria-hidden="true"
                >
                  <polyline points="3 8 7 12 3 16" />
                  <line x1="21" x2="11" y1="12" y2="12" />
                  <line x1="21" x2="11" y1="6" y2="6" />
                  <line x1="21" x2="11" y1="18" y2="18" />
                </svg>
                <span class="flex-1">Align & indent</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  class="ml-auto size-4 shrink-0"
                  aria-hidden="true"
                >
                  <path d="m9 18 6-6-6-6" />
                </svg>
                <ng-template scMenuPortal>
                  <div scMenu>
                    <ng-template scMenuContent>
                      <div scMenuItem value="Align left">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          class="size-4 shrink-0"
                          aria-hidden="true"
                        >
                          <line x1="21" x2="3" y1="6" y2="6" />
                          <line x1="15" x2="3" y1="12" y2="12" />
                          <line x1="17" x2="3" y1="18" y2="18" />
                        </svg>
                        <span class="flex-1">Align left</span>
                      </div>
                      <div scMenuItem value="Align center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          class="size-4 shrink-0"
                          aria-hidden="true"
                        >
                          <line x1="21" x2="3" y1="6" y2="6" />
                          <line x1="17" x2="7" y1="12" y2="12" />
                          <line x1="19" x2="5" y1="18" y2="18" />
                        </svg>
                        <span class="flex-1">Align center</span>
                      </div>
                      <div scMenuItem value="Align right">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          class="size-4 shrink-0"
                          aria-hidden="true"
                        >
                          <line x1="21" x2="3" y1="6" y2="6" />
                          <line x1="21" x2="9" y1="12" y2="12" />
                          <line x1="21" x2="7" y1="18" y2="18" />
                        </svg>
                        <span class="flex-1">Align right</span>
                      </div>
                      <div scMenuItem value="Justify">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          class="size-4 shrink-0"
                          aria-hidden="true"
                        >
                          <line x1="3" x2="21" y1="6" y2="6" />
                          <line x1="3" x2="21" y1="12" y2="12" />
                          <line x1="3" x2="21" y1="18" y2="18" />
                        </svg>
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
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MenuBarDemo {}
