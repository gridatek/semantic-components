import { Component, ViewEncapsulation, signal } from '@angular/core';
import {
  ScField,
  ScFrame,
  ScLabel,
  ScSwitch,
  ScTreeNext,
  ScTreeNextGroup,
  ScTreeNextGroupContent,
  ScTreeNextItem,
  ScTreeNextItemIndicator,
  ScTreeNextItemLabel,
} from '@semantic-components/ui';
import { SiChevronRightIcon } from '@semantic-icons/lucide-icons';

/** Disabled items: an item, or a whole branch. They stay focusable — found and read — unless focusableWhenDisabled is off: then the keys skip them. */
@Component({
  selector: 'app-disabled-tree-next-demo',
  imports: [
    ScField,
    ScFrame,
    ScLabel,
    ScSwitch,
    ScTreeNext,
    ScTreeNextGroup,
    ScTreeNextGroupContent,
    ScTreeNextItem,
    ScTreeNextItemIndicator,
    ScTreeNextItemLabel,
    SiChevronRightIcon,
  ],
  template: `
    <div class="flex flex-col items-center gap-4">
      <div scField orientation="horizontal">
        <input scSwitch id="tree-next-focusable" [(checked)]="focusable" />
        <label scLabel for="tree-next-focusable">
          Disabled items take the focus
        </label>
      </div>
      <div scFrame class="w-64 p-2">
        <ul
          scTreeNext
          aria-label="Plans"
          [focusableWhenDisabled]="focusable()"
          [(expanded)]="expanded"
        >
          <li scTreeNextItem value="current">
            <div scTreeNextItemLabel>
              <span scTreeNextItemIndicator>
                <svg siChevronRightIcon></svg>
              </span>
              Current plans
            </div>
            <ul scTreeNextGroup>
              <ng-template scTreeNextGroupContent>
                <li scTreeNextItem value="free">
                  <div scTreeNextItemLabel>
                    <span scTreeNextItemIndicator>
                      <svg siChevronRightIcon></svg>
                    </span>
                    Free
                  </div>
                </li>
                <li scTreeNextItem value="pro">
                  <div scTreeNextItemLabel>
                    <span scTreeNextItemIndicator>
                      <svg siChevronRightIcon></svg>
                    </span>
                    Pro
                  </div>
                </li>
                <li scTreeNextItem value="enterprise" disabled>
                  <div scTreeNextItemLabel>
                    <span scTreeNextItemIndicator>
                      <svg siChevronRightIcon></svg>
                    </span>
                    Enterprise
                  </div>
                </li>
              </ng-template>
            </ul>
          </li>
          <li scTreeNextItem value="legacy" disabled>
            <div scTreeNextItemLabel>
              <span scTreeNextItemIndicator>
                <svg siChevronRightIcon></svg>
              </span>
              Legacy plans
            </div>
            <ul scTreeNextGroup>
              <ng-template scTreeNextGroupContent>
                <li scTreeNextItem value="basic">
                  <div scTreeNextItemLabel>Basic</div>
                </li>
              </ng-template>
            </ul>
          </li>
        </ul>
      </div>
    </div>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class DisabledTreeNextDemo {
  private readonly focusable = signal(true);
  private readonly expanded = signal(['current']);
}
