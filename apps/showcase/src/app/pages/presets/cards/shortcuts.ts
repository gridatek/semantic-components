import { Component, ViewEncapsulation } from '@angular/core';
import {
  ScCard,
  ScCardBody,
  ScItem,
  ScItemActions,
  ScItemGroup,
  ScItemHeader,
  ScItemSeparator,
  ScItemTitle,
  ScKbd,
} from '@semantic-components/ui';

/** Keyboard shortcuts: each a name and its keys, separated. */
@Component({
  selector: 'app-preview-shortcuts',
  imports: [
    ScCard,
    ScCardBody,
    ScItem,
    ScItemActions,
    ScItemGroup,
    ScItemHeader,
    ScItemSeparator,
    ScItemTitle,
    ScKbd,
  ],
  template: `
    <div scCard>
      <div scCardBody>
        <div class="flex flex-col gap-3">
          <h2 class="text-sm font-medium">Shortcuts</h2>
          <div scItemGroup class="text-muted-foreground gap-2" role="list">
            @for (
              shortcut of shortcuts;
              track shortcut.label;
              let first = $first
            ) {
              @if (!first) {
                <div scItemSeparator role="none"></div>
              }
              <div scItem size="xs" class="border-0 px-0 py-0" role="listitem">
                <div scItemHeader>
                  <div scItemTitle class="font-normal">
                    {{ shortcut.label }}
                  </div>
                  <div scItemActions>
                    <div class="flex gap-1">
                      @for (key of shortcut.keys; track key) {
                        <kbd scKbd>{{ key }}</kbd>
                      }
                    </div>
                  </div>
                </div>
              </div>
            }
          </div>
        </div>
      </div>
    </div>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class PreviewShortcuts {
  protected readonly shortcuts = [
    { label: 'Search', keys: ['⌘', 'K'] },
    { label: 'Quick Actions', keys: ['⌘', 'J'] },
    { label: 'New File', keys: ['⌘', 'N'] },
    { label: 'Save', keys: ['⌘', 'S'] },
    { label: 'Toggle Sidebar', keys: ['⌘', 'B'] },
  ];
}
