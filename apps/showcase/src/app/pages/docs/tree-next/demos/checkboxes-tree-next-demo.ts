import { NgTemplateOutlet } from '@angular/common';
import { Component, ViewEncapsulation, signal } from '@angular/core';
import {
  ScCheckbox,
  ScFrame,
  ScTreeNext,
  ScTreeNextGroup,
  ScTreeNextGroupContent,
  ScTreeNextItem,
  ScTreeNextItemCheckbox,
  ScTreeNextItemIndicator,
  ScTreeNextItemLabel,
} from '@semantic-components/ui';
import { SiChevronRightIcon } from '@semantic-icons/lucide-icons';

interface Skill {
  id: string;
  name: string;
  children?: Skill[];
}

const SKILLS: Skill[] = [
  {
    id: 'frontend',
    name: 'Frontend',
    children: [
      { id: 'components', name: 'Components' },
      { id: 'styles', name: 'Styles' },
      { id: 'accessibility', name: 'Accessibility' },
    ],
  },
  {
    id: 'backend',
    name: 'Backend',
    children: [
      { id: 'api', name: 'API' },
      {
        id: 'data',
        name: 'Data',
        children: [
          { id: 'sql', name: 'SQL' },
          { id: 'caching', name: 'Caching' },
        ],
      },
    ],
  },
];

/** Checkboxes, apart from selection: Space or a click checks; a folder checks all it holds, half-ticked while only some is. Its value: the outermost fully checked items. */
@Component({
  selector: 'app-checkboxes-tree-next-demo',
  imports: [
    NgTemplateOutlet,
    ScCheckbox,
    ScFrame,
    ScTreeNext,
    ScTreeNextGroup,
    ScTreeNextGroupContent,
    ScTreeNextItem,
    ScTreeNextItemCheckbox,
    ScTreeNextItemIndicator,
    ScTreeNextItemLabel,
    SiChevronRightIcon,
  ],
  template: `
    <div class="flex flex-col items-center gap-3">
      <div scFrame class="w-64 p-2">
        <ul
          scTreeNext
          aria-label="Skills"
          mode="none"
          checkable
          [(expanded)]="expanded"
          [(checked)]="checked"
        >
          <ng-container
            [ngTemplateOutlet]="branch"
            [ngTemplateOutletContext]="{ $implicit: skills }"
            ngTemplateOutletInjector="outlet"
          />
        </ul>
      </div>
      <p class="text-muted-foreground text-sm">
        Checked: {{ checked().join(', ') || 'none' }}
      </p>
    </div>

    <ng-template #branch let-skills>
      @for (skill of skills; track skill.id) {
        <li scTreeNextItem [value]="skill.id">
          <div scTreeNextItemLabel>
            <span scTreeNextItemIndicator><svg siChevronRightIcon></svg></span>
            <input type="checkbox" scCheckbox scTreeNextItemCheckbox />
            {{ skill.name }}
          </div>
          @if (skill.children) {
            <ul scTreeNextGroup>
              <ng-template scTreeNextGroupContent>
                <ng-container
                  [ngTemplateOutlet]="branch"
                  [ngTemplateOutletContext]="{ $implicit: skill.children }"
                  ngTemplateOutletInjector="outlet"
                />
              </ng-template>
            </ul>
          }
        </li>
      }
    </ng-template>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class CheckboxesTreeNextDemo {
  private readonly skills = SKILLS;
  private readonly expanded = signal(['frontend', 'backend', 'data']);
  private readonly checked = signal(['styles']);
}
