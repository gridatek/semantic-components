import { Component, ViewEncapsulation, inject, signal } from '@angular/core';
import { FormField, form, required } from '@angular/forms/signals';
import {
  ScButton,
  ScCard,
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
  ScScheduler,
  ScSchedulerEvent,
  type ScSchedulerEventData,
  ScSchedulerEventTemplate,
  ScSchedulerEventTime,
  ScSchedulerMonth,
  ScSchedulerMore,
  ScSchedulerMoreTemplate,
  ScSchedulerNext,
  ScSchedulerPrevious,
  ScSchedulerTimeGrid,
  ScSchedulerTitle,
  ScSchedulerToday,
  type ScSchedulerView,
  ScSchedulerViewButton,
  ScToaster,
} from '@semantic-components/ui';
import {
  SiChevronDownIcon,
  SiChevronLeftIcon,
  SiChevronRightIcon,
  SiPlusIcon,
  SiXIcon,
} from '@semantic-icons/lucide-icons';
import { PageHeader } from '../../layout/page-header';

type Category = 'work' | 'personal' | 'important' | 'travel';

interface CalendarEvent extends ScSchedulerEventData {
  readonly title: string;
  readonly category: Category;
}

const CATEGORIES: readonly { value: Category; label: string; dot: string }[] = [
  { value: 'work', label: 'Work', dot: 'bg-chart-2' },
  { value: 'personal', label: 'Personal', dot: 'bg-chart-4' },
  { value: 'important', label: 'Important', dot: 'bg-destructive' },
  { value: 'travel', label: 'Travel', dot: 'bg-chart-5' },
];

interface Draft {
  title: string;
  date: string;
  start: string;
  end: string;
  category: Category;
}

const zone = Temporal.Now.timeZoneId();

function at(date: string, time: string): Temporal.ZonedDateTime {
  return Temporal.PlainDate.from(date).toZonedDateTime({
    timeZone: zone,
    plainTime: Temporal.PlainTime.from(time),
  });
}

/** The month's events, around today. */
function seed(): CalendarEvent[] {
  const today = Temporal.Now.plainDateISO();
  const make = (
    id: string,
    title: string,
    category: Category,
    days: number,
    time: string,
    duration: Temporal.DurationLike,
    allDay = false,
  ): CalendarEvent => {
    const start = at(today.add({ days }).toString(), time);
    return { id, title, category, start, end: start.add(duration), allDay };
  };
  return [
    make('e1', 'Team stand-up', 'work', 0, '09:00', { minutes: 15 }),
    make('e2', 'Design review', 'work', 0, '11:00', { hours: 1 }),
    make('e3', 'Dentist', 'personal', 1, '16:30', { minutes: 45 }),
    make('e4', 'Quarterly planning', 'important', 2, '10:00', { hours: 3 }),
    make('e5', 'Lunch with Emily', 'personal', -1, '12:30', { hours: 1 }),
    make('e6', 'Flight to Berlin', 'travel', 5, '07:40', { hours: 2 }),
    make('e7', 'Conference', 'travel', 6, '00:00', { days: 2 }, true),
    make('e8', 'Release v2.4', 'important', -3, '15:00', { minutes: 30 }),
    make('e9', 'Customer call', 'work', 3, '14:00', { minutes: 45 }),
    make('e10', 'Yoga', 'personal', 4, '18:00', { hours: 1 }),
    make('e11', 'Board meeting', 'important', 9, '09:30', { hours: 2 }),
    make('e12', 'Hiring sync', 'work', -6, '13:00', { minutes: 30 }),
  ];
}

/** Calendar (Pro): month, week and day; events added, changed, removed. */
@Component({
  selector: 'app-calendar-page',
  imports: [
    FormField,
    ScButton,
    ScCard,
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
    ScScheduler,
    ScSchedulerEvent,
    ScSchedulerEventTemplate,
    ScSchedulerEventTime,
    ScSchedulerMonth,
    ScSchedulerMore,
    ScSchedulerMoreTemplate,
    ScSchedulerNext,
    ScSchedulerPrevious,
    ScSchedulerTimeGrid,
    ScSchedulerTitle,
    ScSchedulerToday,
    ScSchedulerViewButton,
    SiChevronDownIcon,
    SiChevronLeftIcon,
    SiChevronRightIcon,
    SiPlusIcon,
    SiXIcon,
    PageHeader,
  ],
  template: `
    <app-page-header
      title="Calendar"
      [trail]="[{ label: 'Apps' }, { label: 'Calendar' }]"
    >
      <button scButton (click)="startAdding()">
        <svg siPlusIcon></svg>
        Add Event
      </button>
    </app-page-header>

    <div scCard class="p-4">
      <div
        scScheduler
        #scheduler="scScheduler"
        [events]="events()"
        [(view)]="view"
        [(date)]="date"
        class="h-[44rem]"
      >
        <div class="flex flex-wrap items-center gap-2">
          <button scSchedulerToday>Today</button>
          <button scSchedulerPrevious>
            <svg siChevronLeftIcon></svg>
            <span class="sr-only">Previous</span>
          </button>
          <button scSchedulerNext>
            <svg siChevronRightIcon></svg>
            <span class="sr-only">Next</span>
          </button>
          <h2 scSchedulerTitle class="ms-2">{{ scheduler.label() }}</h2>
          <div role="group" aria-label="View" class="ms-auto flex gap-1">
            <button scSchedulerViewButton="month">Month</button>
            <button scSchedulerViewButton="week">Week</button>
            <button scSchedulerViewButton="day">Day</button>
          </div>
        </div>

        @if (scheduler.view() === 'month') {
          <div scSchedulerMonth class="flex-1"></div>
        } @else {
          <div scSchedulerTimeGrid class="flex-1"></div>
        }

        <ng-template [scSchedulerEventTemplate]="events()" let-event>
          <button scSchedulerEvent (click)="startEditing(event)">
            <span class="flex min-w-0 items-center gap-1.5 font-medium">
              <span
                class="size-2 shrink-0 rounded-full"
                [class]="dotOf(event.category)"
              ></span>
              <span class="truncate">{{ event.title }}</span>
            </span>
            <time scSchedulerEventTime></time>
          </button>
        </ng-template>
        <ng-template scSchedulerMoreTemplate let-count let-day="day">
          <button [scSchedulerMore]="day">{{ count }} more</button>
        </ng-template>
      </div>
      <ul class="text-muted-foreground flex flex-wrap gap-4 pt-4 text-sm">
        @for (category of categories; track category.value) {
          <li class="flex items-center gap-2">
            <span class="size-2 rounded-full" [class]="category.dot"></span>
            {{ category.label }}
          </li>
        }
      </ul>
    </div>

    <div scDialogProvider [(open)]="editing">
      <ng-template scDialogPortal>
        <div scDialog class="sm:max-w-md">
          <button scDialogClose>
            <svg siXIcon></svg>
            <span class="sr-only">Close</span>
          </button>
          <div scDialogHeader>
            <h2 scDialogTitle>
              {{ editingId() ? 'Edit Event' : 'Add Event' }}
            </h2>
          </div>
          <form id="event-form" (submit)="save($event)">
            <div scFieldGroup>
              <div scField>
                <label scLabel>Title</label>
                <input scInput cdkFocusInitial [formField]="draftForm.title" />
              </div>
              <div scField>
                <label scLabel>Date</label>
                <input scInput type="date" [formField]="draftForm.date" />
              </div>
              <div class="grid grid-cols-2 gap-4">
                <div scField>
                  <label scLabel>Starts</label>
                  <input scInput type="time" [formField]="draftForm.start" />
                </div>
                <div scField>
                  <label scLabel>Ends</label>
                  <input scInput type="time" [formField]="draftForm.end" />
                </div>
              </div>
              <div scField>
                <label scLabel>Category</label>
                <div scNativeSelectContainer class="w-full">
                  <select scNativeSelect [formField]="draftForm.category">
                    @for (category of categories; track category.value) {
                      <option scNativeSelectOption [value]="category.value">
                        {{ category.label }}
                      </option>
                    }
                  </select>
                  <svg siChevronDownIcon scNativeSelectIcon></svg>
                </div>
              </div>
            </div>
          </form>
          <div scDialogFooter>
            @if (editingId()) {
              <button
                scButton
                variant="destructive"
                class="sm:me-auto"
                (click)="remove()"
              >
                Delete
              </button>
            }
            <button scDialogClose variant="outline" size="default">
              Cancel
            </button>
            <button scButton type="submit" form="event-form">Save</button>
          </div>
        </div>
      </ng-template>
    </div>
  `,
  host: { class: 'flex flex-col gap-4' },
  encapsulation: ViewEncapsulation.None,
})
export class CalendarPage {
  private readonly toaster = inject(ScToaster);
  private readonly categories = CATEGORIES;
  private readonly events = signal<readonly CalendarEvent[]>(seed());
  private readonly view = signal<ScSchedulerView>('month');
  private readonly date = signal(Temporal.Now.plainDateISO());

  private readonly editing = signal(false);
  private readonly editingId = signal<string | null>(null);
  private readonly draft = signal<Draft>(this.blank());
  private readonly draftForm = form(this.draft, (path) => {
    required(path.title);
    required(path.date);
    required(path.start);
    required(path.end);
  });

  private dotOf(category: Category): string {
    return CATEGORIES.find((c) => c.value === category)?.dot ?? '';
  }

  private blank(): Draft {
    return {
      title: '',
      date: Temporal.Now.plainDateISO().toString(),
      start: '09:00',
      end: '10:00',
      category: 'work',
    };
  }

  private startAdding(): void {
    this.editingId.set(null);
    this.draft.set({ ...this.blank(), date: this.date().toString() });
    this.editing.set(true);
  }

  private startEditing(event: CalendarEvent): void {
    this.editingId.set(event.id);
    this.draft.set({
      title: event.title,
      date: event.start.toPlainDate().toString(),
      start: event.start.toPlainTime().toString().slice(0, 5),
      end: event.end.toPlainTime().toString().slice(0, 5),
      category: event.category,
    });
    this.editing.set(true);
  }

  private save(submit: Event): void {
    submit.preventDefault();
    if (this.draftForm().invalid()) return;
    const { title, date, start, end, category } = this.draft();
    const begins = at(date, start);
    let ends = at(date, end);
    if (Temporal.ZonedDateTime.compare(ends, begins) <= 0)
      ends = begins.add({ hours: 1 });
    const id =
      this.editingId() ?? `e${Temporal.Now.instant().epochMilliseconds}`;
    const event: CalendarEvent = {
      id,
      title,
      category,
      start: begins,
      end: ends,
    };
    this.events.update((events) =>
      this.editingId()
        ? events.map((e) => (e.id === id ? event : e))
        : [...events, event],
    );
    this.date.set(begins.toPlainDate());
    this.editing.set(false);
    this.toaster.show({
      variant: 'success',
      title: this.editingId() ? 'Event updated' : 'Event added',
    });
  }

  private remove(): void {
    const id = this.editingId();
    this.events.update((events) => events.filter((e) => e.id !== id));
    this.editing.set(false);
    this.toaster.show({ variant: 'success', title: 'Event deleted' });
  }
}
