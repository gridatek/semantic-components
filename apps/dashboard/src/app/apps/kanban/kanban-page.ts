import { NgOptimizedImage } from '@angular/common';
import { Component, ViewEncapsulation, inject, signal } from '@angular/core';
import { FormField, form, required } from '@angular/forms/signals';
import {
  ScAvatar,
  ScAvatarFallback,
  ScAvatarGroup,
  ScAvatarImage,
  ScBadge,
  ScButton,
  ScDialog,
  ScDialogClose,
  ScDialogFooter,
  ScDialogHeader,
  ScDialogPortal,
  ScDialogProvider,
  ScDialogTitle,
  ScField,
  ScFieldGroup,
  ScInput,
  ScLabel,
  ScNativeSelect,
  ScNativeSelectContainer,
  ScNativeSelectIcon,
  ScNativeSelectOption,
  ScSortableGroup,
  type ScSortableGroupAnnouncement,
  type ScSortableGroupValue,
  ScSortableList,
  ScSortableListItem,
  ScToaster,
} from '@semantic-components/ui';
import {
  SiCalendarIcon,
  SiChevronDownIcon,
  SiPlusIcon,
  SiTrash2Icon,
  SiXIcon,
} from '@semantic-icons/lucide-icons';
import { PEOPLE, type Person } from '../../data/people';
import { PageHeader } from '../../layout/page-header';
import { day, initials } from '../../shared/format';
import { label } from '../../shared/labels';

type ColumnId = 'todo' | 'progress' | 'review' | 'done';
type Tag = 'Design' | 'Development' | 'Research' | 'Marketing';

interface Task {
  readonly id: number;
  readonly title: string;
  readonly tag: Tag;
  readonly due: string;
  readonly people: readonly Person[];
  readonly image?: string;
}

const COLUMNS: readonly { id: ColumnId; title: string }[] = [
  { id: 'todo', title: $localize`:@@kanban.toDo:To do` },
  { id: 'progress', title: $localize`:@@kanban.inProgress:In progress` },
  { id: 'review', title: $localize`:@@kanban.review:Review` },
  { id: 'done', title: $localize`:@@kanban.done:Done` },
];

const TAGS: readonly Tag[] = ['Design', 'Development', 'Research', 'Marketing'];

const who = (...ids: number[]) =>
  ids.map((id) => PEOPLE.find((p) => p.id === id) as Person);

const BOARD: ScSortableGroupValue<Task> = {
  todo: [
    {
      id: 1,
      title: $localize`:@@kanban.pricingPageAnnualToggle:Pricing page: annual toggle`,
      tag: 'Design',
      due: '2026-05-06',
      people: who(2, 6),
    },
    {
      id: 2,
      title: $localize`:@@kanban.exportADashboardAsPdf:Export a dashboard as PDF`,
      tag: 'Research',
      due: '2026-05-09',
      people: who(6),
      image: 'images/backgrounds/kanban-img-1.jpg',
    },
    {
      id: 3,
      title: $localize`:@@kanban.mayNewsletter:May newsletter`,
      tag: 'Marketing',
      due: '2026-05-12',
      people: who(4),
    },
  ],
  progress: [
    {
      id: 4,
      title: $localize`:@@kanban.chartsFollowTheStyle:Charts follow the style`,
      tag: 'Development',
      due: '2026-05-03',
      people: who(3, 7),
    },
    {
      id: 5,
      title: $localize`:@@kanban.onboardingChecklist:Onboarding checklist`,
      tag: 'Design',
      due: '2026-05-05',
      people: who(2),
      image: 'images/backgrounds/kanban-img-2.jpg',
    },
  ],
  review: [
    {
      id: 6,
      title: $localize`:@@kanban.invoicePdfLayout:Invoice PDF layout`,
      tag: 'Development',
      due: '2026-04-30',
      people: who(9),
    },
    {
      id: 7,
      title: $localize`:@@kanban.interviewSynthesis:Interview synthesis`,
      tag: 'Research',
      due: '2026-04-29',
      people: who(6, 5),
    },
  ],
  done: [
    {
      id: 8,
      title: $localize`:@@kanban.ticketFilters:Ticket filters`,
      tag: 'Development',
      due: '2026-04-24',
      people: who(7),
    },
    {
      id: 9,
      title: $localize`:@@kanban.springCampaignVisuals:Spring campaign visuals`,
      tag: 'Marketing',
      due: '2026-04-21',
      people: who(4, 8),
      image: 'images/backgrounds/kanban-img-3.jpg',
    },
  ],
};

/** Kanban (Pro): tasks in columns, moved by drag or keyboard; added, removed. */
@Component({
  selector: 'app-kanban-page',
  imports: [
    FormField,
    NgOptimizedImage,
    ScAvatar,
    ScAvatarFallback,
    ScAvatarGroup,
    ScAvatarImage,
    ScBadge,
    ScButton,
    ScDialog,
    ScDialogClose,
    ScDialogFooter,
    ScDialogHeader,
    ScDialogPortal,
    ScDialogProvider,
    ScDialogTitle,
    ScField,
    ScFieldGroup,
    ScInput,
    ScSortableGroup,
    ScSortableListItem,
    ScSortableList,
    ScLabel,
    ScNativeSelect,
    ScNativeSelectContainer,
    ScNativeSelectIcon,
    ScNativeSelectOption,
    SiCalendarIcon,
    SiChevronDownIcon,
    SiPlusIcon,
    SiTrash2Icon,
    SiXIcon,
    PageHeader,
  ],
  template: `
    <app-page-header
      i18n-title="@@kanban.kanban"
      title="Kanban"
      [trail]="[{ label: t.apps }, { label: t.kanban }]"
    >
      <button scButton (click)="startAdding('todo')">
        <svg siPlusIcon></svg>
        <ng-container i18n="@@kanban.addTask">Add Task</ng-container>
      </button>
    </app-page-header>

    <p i18n="@@kanban.spaceLiftsATaskThe" id="kanban-help" class="sr-only">
      Space lifts a task, the arrow keys move it, Space drops it, Escape puts it
      back.
    </p>
    <div
      scSortableGroup
      #kanban="scSortableGroup"
      [(value)]="board"
      [announce]="announce"
      class="flex gap-4 overflow-x-auto pb-2"
    >
      @for (column of columns; track column.id) {
        <section
          class="bg-muted/50 flex min-w-64 flex-1 flex-col gap-3 rounded-xl p-3"
        >
          <div class="flex items-center gap-2 px-1">
            <h2 [id]="'col-' + column.id" class="text-sm font-medium">
              {{ column.title }}
            </h2>
            <span class="text-muted-foreground text-xs tabular-nums">{{
              kanban.items(column.id).length
            }}</span>
            <button
              scButton
              variant="ghost"
              size="icon-sm"
              class="ms-auto"
              (click)="startAdding(column.id)"
            >
              <svg siPlusIcon></svg>
              <span i18n="@@kanban.addATaskTo" class="sr-only"
                >Add a task to {{ column.title }}</span
              >
            </button>
          </div>
          <ul
            [scSortableList]="column.id"
            [attr.aria-labelledby]="'col-' + column.id"
            class="flex min-h-24 flex-col gap-3"
          >
            @for (task of kanban.items(column.id); track task.id) {
              <li
                [scSortableListItem]="task"
                aria-describedby="kanban-help"
                class="bg-card text-card-foreground ring-foreground/10 data-lifted:ring-ring flex flex-col gap-3 rounded-lg p-3 text-sm ring-1 data-dragging:shadow-lg data-lifted:ring-2"
              >
                @if (task.image) {
                  <div class="relative aspect-video overflow-hidden rounded-md">
                    <img
                      [ngSrc]="task.image"
                      fill
                      sizes="18rem"
                      alt=""
                      class="object-cover"
                    />
                  </div>
                }
                <div class="flex items-start gap-2">
                  <span class="font-medium">{{ task.title }}</span>
                  <button
                    scButton
                    variant="ghost"
                    size="icon-xs"
                    class="ms-auto shrink-0"
                    (click)="remove(column.id, task)"
                  >
                    <svg siTrash2Icon></svg>
                    <span i18n="@@kanban.delete" class="sr-only"
                      >Delete {{ task.title }}</span
                    >
                  </button>
                </div>
                <div class="flex items-center gap-2">
                  <span scBadge variant="secondary">{{
                    labelOf(task.tag)
                  }}</span>
                  <span
                    class="text-muted-foreground flex items-center gap-1 text-xs"
                  >
                    <svg siCalendarIcon class="size-3.5"></svg>
                    {{ dayOf(task.due) }}
                  </span>
                  <div scAvatarGroup class="ms-auto">
                    @for (person of task.people; track person.id) {
                      <span scAvatar size="sm">
                        <img
                          scAvatarImage
                          [src]="person.avatar"
                          [alt]="person.name"
                        />
                        <span scAvatarFallback>{{
                          initialsOf(person.name)
                        }}</span>
                      </span>
                    }
                  </div>
                </div>
              </li>
            }
          </ul>
        </section>
      }
    </div>

    <div scDialogProvider [(open)]="adding">
      <ng-template scDialogPortal>
        <div scDialog class="sm:max-w-md">
          <button scDialogClose>
            <svg siXIcon></svg>
            <span i18n="@@kanban.close" class="sr-only">Close</span>
          </button>
          <div scDialogHeader>
            <h2 i18n="@@kanban.addTask" scDialogTitle>Add Task</h2>
          </div>
          <form id="task-form" (submit)="add($event)">
            <div scFieldGroup>
              <div scField>
                <label i18n="@@kanban.title" scLabel>Title</label>
                <input scInput cdkFocusInitial [formField]="draftForm.title" />
              </div>
              <div class="grid grid-cols-2 gap-4">
                <div scField>
                  <label i18n="@@kanban.column" scLabel>Column</label>
                  <div scNativeSelectContainer class="w-full">
                    <select scNativeSelect [formField]="draftForm.column">
                      @for (column of columns; track column.id) {
                        <option scNativeSelectOption [value]="column.id">
                          {{ column.title }}
                        </option>
                      }
                    </select>
                    <svg siChevronDownIcon scNativeSelectIcon></svg>
                  </div>
                </div>
                <div scField>
                  <label i18n="@@kanban.tag" scLabel>Tag</label>
                  <div scNativeSelectContainer class="w-full">
                    <select scNativeSelect [formField]="draftForm.tag">
                      @for (tag of tags; track tag) {
                        <option scNativeSelectOption [value]="tag">
                          {{ labelOf(tag) }}
                        </option>
                      }
                    </select>
                    <svg siChevronDownIcon scNativeSelectIcon></svg>
                  </div>
                </div>
              </div>
              <div scField>
                <label i18n="@@kanban.due" scLabel>Due</label>
                <input scInput type="date" [formField]="draftForm.due" />
              </div>
            </div>
          </form>
          <div scDialogFooter>
            <button
              i18n="@@kanban.cancel"
              scDialogClose
              variant="outline"
              size="default"
            >
              Cancel
            </button>
            <button i18n="@@kanban.add" scButton type="submit" form="task-form">
              Add
            </button>
          </div>
        </div>
      </ng-template>
    </div>
  `,
  host: { class: 'flex min-w-0 flex-col gap-4' },
  encapsulation: ViewEncapsulation.None,
})
export class KanbanPage {
  private readonly labelOf = label;
  /** The template's words that sit in bindings, translated. */
  private readonly t = {
    apps: $localize`:@@kanban.apps:Apps`,
    kanban: $localize`:@@kanban.kanban:Kanban`,
  };

  private readonly toaster = inject(ScToaster);
  private readonly columns = COLUMNS;
  private readonly tags = TAGS;
  private readonly board = signal<ScSortableGroupValue<Task>>(BOARD);
  private readonly titles = Object.fromEntries(
    COLUMNS.map((c) => [c.id, c.title]),
  );
  private readonly announce = ({
    type,
    item,
    list: column,
    position,
    count,
  }: ScSortableGroupAnnouncement<Task>) =>
    ({
      lift: `Lifted ${item.title}, in ${this.titles[column]}, ${position} of ${count}.`,
      move: `${item.title}: ${this.titles[column]}, ${position} of ${count}.`,
      drop: `Dropped ${item.title} in ${this.titles[column]}, ${position} of ${count}.`,
      cancel: `${item.title} back in ${this.titles[column]}, ${position} of ${count}.`,
    })[type];

  private readonly adding = signal(false);
  private readonly draft = signal<{
    title: string;
    column: ColumnId;
    tag: Tag;
    due: string;
  }>({
    title: '',
    column: 'todo',
    tag: 'Design',
    due: '',
  });
  private readonly draftForm = form(this.draft, (path) => {
    required(path.title);
    required(path.due);
  });
  private readonly dayOf = day;
  private readonly initialsOf = initials;

  private startAdding(column: ColumnId): void {
    this.draft.set({
      title: '',
      column,
      tag: 'Design',
      due: Temporal.Now.plainDateISO().add({ days: 7 }).toString(),
    });
    this.adding.set(true);
  }

  private add(event: Event): void {
    event.preventDefault();
    if (this.draftForm().invalid()) return;
    const { title, column, tag, due } = this.draft();
    const id =
      Math.max(
        0,
        ...Object.values(this.board()).flatMap((tasks) =>
          tasks.map((t) => t.id),
        ),
      ) + 1;
    this.board.update((board) => ({
      ...board,
      [column]: [
        ...(board[column] ?? []),
        { id, title, tag, due, people: [PEOPLE[0]] },
      ],
    }));
    this.adding.set(false);
    this.toaster.show({
      variant: 'success',
      title: $localize`:@@kanban.taskAdded:Task added`,
    });
  }

  private remove(column: string, task: Task): void {
    this.board.update((board) => ({
      ...board,
      [column]: (board[column] ?? []).filter((t) => t.id !== task.id),
    }));
    this.toaster.show({ title: `${task.title} deleted` });
  }
}
