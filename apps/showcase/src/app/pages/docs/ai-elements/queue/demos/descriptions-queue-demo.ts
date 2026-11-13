import { NgTemplateOutlet } from '@angular/common';
import { Component, ViewEncapsulation } from '@angular/core';
import {
  ScCollapsible,
  ScCollapsiblePanel,
  ScCollapsibleTrigger,
  ScTrace,
  ScTraceCollapsible,
  ScTraceCollapsiblePanelContent,
  ScTraceCollapsibleTrigger,
  ScTraceIcon,
  ScTraceLine,
  ScTraceTitle,
} from '@semantic-components/ui';
import {
  SiCircleCheckIcon,
  SiCircleIcon,
  SiListChecksIcon,
  SiListTodoIcon,
} from '@semantic-icons/lucide-icons';

interface Todo {
  title: string;
  description?: string;
  done: boolean;
}

/** A todo with a description opens to show it; one without stays a line. */
@Component({
  selector: 'app-descriptions-queue-demo',
  imports: [
    NgTemplateOutlet,
    ScCollapsible,
    ScCollapsiblePanel,
    ScCollapsibleTrigger,
    ScTrace,
    ScTraceCollapsible,
    ScTraceCollapsiblePanelContent,
    ScTraceCollapsibleTrigger,
    ScTraceIcon,
    ScTraceLine,
    ScTraceTitle,
    SiCircleCheckIcon,
    SiCircleIcon,
    SiListChecksIcon,
    SiListTodoIcon,
  ],
  template: `
    <div scTrace class="w-full max-w-sm">
      <div scCollapsible scTraceCollapsible [open]="true">
        <button scCollapsibleTrigger scTraceCollapsibleTrigger>
          <span scTraceLine>
            <span scTraceIcon><svg siListTodoIcon></svg></span>
            <span scTraceTitle>{{ pending.length }} to do</span>
          </span>
        </button>
        <div scCollapsiblePanel>
          <div scTraceCollapsiblePanelContent>
            <div scTrace>
              @for (todo of pending; track todo.title) {
                <ng-container
                  [ngTemplateOutlet]="row"
                  [ngTemplateOutletContext]="{ $implicit: todo }"
                />
              }
            </div>
          </div>
        </div>
      </div>
      <div scCollapsible scTraceCollapsible>
        <button scCollapsibleTrigger scTraceCollapsibleTrigger>
          <span scTraceLine>
            <span scTraceIcon><svg siListChecksIcon></svg></span>
            <span scTraceTitle>{{ completed.length }} completed</span>
          </span>
        </button>
        <div scCollapsiblePanel>
          <div scTraceCollapsiblePanelContent>
            <div scTrace>
              @for (todo of completed; track todo.title) {
                <ng-container
                  [ngTemplateOutlet]="row"
                  [ngTemplateOutletContext]="{ $implicit: todo }"
                />
              }
            </div>
          </div>
        </div>
      </div>
    </div>

    <ng-template #line let-todo>
      <span scTraceLine>
        <span scTraceIcon>
          @if (todo.done) {
            <svg siCircleCheckIcon></svg>
          } @else {
            <svg siCircleIcon></svg>
          }
        </span>
        <span scTraceTitle>{{ todo.title }}</span>
      </span>
    </ng-template>

    <ng-template #row let-todo>
      @if (todo.description) {
        <div scCollapsible scTraceCollapsible>
          <button scCollapsibleTrigger scTraceCollapsibleTrigger>
            <ng-container
              [ngTemplateOutlet]="line"
              [ngTemplateOutletContext]="{ $implicit: todo }"
            />
          </button>
          <div scCollapsiblePanel>
            <div scTraceCollapsiblePanelContent>{{ todo.description }}</div>
          </div>
        </div>
      } @else {
        <ng-container
          [ngTemplateOutlet]="line"
          [ngTemplateOutletContext]="{ $implicit: todo }"
        />
      }
    </ng-template>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class DescriptionsQueueDemo {
  private readonly todos: Todo[] = [
    {
      title: 'Write the migration guide',
      description: 'Cover the renamed props and the new data attributes.',
      done: true,
    },
    { title: 'Add a changeset', done: true },
    {
      title: 'Fix the focus ring on the select trigger',
      description: 'It is clipped by overflow-hidden on the field.',
      done: false,
    },
    { title: 'Update the registry snapshots', done: false },
    {
      title: 'Add tests for the combobox',
      description: 'Typing, clearing and keyboard selection.',
      done: false,
    },
  ];
  protected readonly pending = this.todos.filter((todo) => !todo.done);
  protected readonly completed = this.todos.filter((todo) => todo.done);
}
