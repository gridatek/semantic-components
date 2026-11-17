import {
  Component,
  ViewEncapsulation,
  computed,
  inject,
  linkedSignal,
  signal,
} from '@angular/core';
import { FormField, form, required } from '@angular/forms/signals';
import {
  ScButton,
  ScCard,
  ScCardBody,
  ScDialog,
  ScDialogClose,
  ScDialogFooter,
  ScDialogHeader,
  ScDialogPortal,
  ScDialogProvider,
  ScDialogTitle,
  ScEmpty,
  ScEmptyDescription,
  ScEmptyHeader,
  ScEmptyTitle,
  ScField,
  ScFieldGroup,
  ScInput,
  ScInputGroup,
  ScInputGroupAddon,
  ScItem,
  ScLabel,
  ScLegend,
  ScTextarea,
  ScToaster,
} from '@semantic-components/ui';
import {
  SiPlusIcon,
  SiSearchIcon,
  SiTrash2Icon,
  SiXIcon,
} from '@semantic-icons/lucide-icons';
import { Swatch } from '../../components/swatch';
import { NOTE_COLORS, type NoteColor } from '../../data/notes';
import { PageHeader } from '../../layout/page-header';
import { dayTime } from '../../shared/format';
import { NotesStore } from '../../shared/stores';

/** Notes: the list, a search, the chosen note to edit, its colour (shadcndashboard's Notes app). */
@Component({
  selector: 'app-notes-page',
  imports: [
    FormField,
    ScButton,
    ScCard,
    ScCardBody,
    ScDialog,
    ScDialogClose,
    ScDialogFooter,
    ScDialogHeader,
    ScDialogPortal,
    ScDialogProvider,
    ScDialogTitle,
    ScEmpty,
    ScEmptyDescription,
    ScEmptyHeader,
    ScEmptyTitle,
    ScField,
    ScFieldGroup,
    ScInput,
    ScInputGroup,
    ScInputGroupAddon,
    ScItem,
    ScLabel,
    ScLegend,
    ScTextarea,
    SiPlusIcon,
    SiSearchIcon,
    SiTrash2Icon,
    SiXIcon,
    Swatch,
    PageHeader,
  ],
  template: `
    <app-page-header i18n-title title="Notes" [trail]="[{ label: t.notes }]">
      <div scDialogProvider [(open)]="adding">
        <button scButton (click)="startAdding()">
          <svg siPlusIcon></svg>
          <ng-container i18n>Add Note</ng-container>
        </button>
        <ng-template scDialogPortal>
          <div scDialog class="sm:max-w-md">
            <button scDialogClose>
              <svg siXIcon></svg>
              <span i18n class="sr-only">Close</span>
            </button>
            <div scDialogHeader>
              <h2 i18n scDialogTitle>Add Note</h2>
            </div>
            <form id="add-note" (submit)="add($event)">
              <div scFieldGroup>
                <div scField>
                  <label i18n scLabel>Note</label>
                  <textarea
                    scTextarea
                    cdkFocusInitial
                    rows="5"
                    [formField]="draftForm.text"
                  ></textarea>
                </div>
                <fieldset class="flex flex-col gap-3">
                  <legend i18n scLegend variant="label">Colour</legend>
                  <div class="flex gap-3">
                    @for (color of colors; track color.value) {
                      <input
                        name="new-note-color"
                        [appSwatch]="'var(--' + color.value + ')'"
                        [attr.aria-label]="color.label"
                        [checked]="draftColor() === color.value"
                        (change)="draftColor.set(color.value)"
                      />
                    }
                  </div>
                </fieldset>
              </div>
            </form>
            <div scDialogFooter>
              <button i18n scDialogClose variant="outline" size="default">
                Cancel
              </button>
              <button i18n scButton type="submit" form="add-note">Add</button>
            </div>
          </div>
        </ng-template>
      </div>
    </app-page-header>

    <div class="grid min-h-[32rem] grid-cols-1 gap-4 lg:grid-cols-[20rem_1fr]">
      <div scCard class="gap-3 py-4">
        <div class="px-4">
          <div scInputGroup>
            <input
              i18n-aria-label
              i18n-placeholder
              scInput
              type="search"
              placeholder="Search notes"
              aria-label="Search notes"
              [value]="query()"
              (input)="query.set($any($event.target).value)"
            />
            <div scInputGroupAddon><svg siSearchIcon></svg></div>
          </div>
        </div>
        <ul i18n-aria-label class="flex flex-col gap-1 px-2" aria-label="Notes">
          @for (note of shown(); track note.id) {
            <li>
              <button
                scItem
                size="sm"
                class="w-full text-start"
                [variant]="note.id === selectedId() ? 'muted' : 'default'"
                [attr.aria-pressed]="note.id === selectedId()"
                (click)="selectedId.set(note.id)"
              >
                <span class="flex w-full min-w-0 items-start gap-2">
                  <span
                    class="mt-1.5 size-2.5 shrink-0 rounded-full"
                    [style.background-color]="'var(--' + note.color + ')'"
                  ></span>
                  <span class="flex min-w-0 flex-col gap-0.5">
                    <span class="line-clamp-1 font-medium">{{
                      note.text
                    }}</span>
                    <span class="text-muted-foreground text-xs">{{
                      when(note.date)
                    }}</span>
                  </span>
                </span>
              </button>
            </li>
          } @empty {
            <li
              i18n
              class="text-muted-foreground px-3 py-6 text-center text-sm"
            >
              No notes match “{{ query() }}”.
            </li>
          }
        </ul>
      </div>

      <div scCard>
        @if (selected(); as note) {
          <div scCardBody class="flex h-full flex-col gap-4">
            <div class="flex flex-wrap items-center justify-between gap-3">
              <p class="text-muted-foreground text-sm">{{ when(note.date) }}</p>
              <button
                scButton
                variant="outline"
                size="sm"
                (click)="remove(note.id)"
              >
                <svg siTrash2Icon></svg>
                <ng-container i18n>Delete</ng-container>
              </button>
            </div>
            <div scField class="flex-1">
              <label i18n scLabel>Edit Note</label>
              <textarea
                scTextarea
                class="min-h-64 flex-1"
                [value]="note.text"
                (input)="edit(note.id, $any($event.target).value)"
              ></textarea>
            </div>
            <fieldset class="flex flex-col gap-3">
              <legend i18n scLegend variant="label">Change Note Colour</legend>
              <div class="flex gap-3">
                @for (color of colors; track color.value) {
                  <input
                    name="note-color"
                    [appSwatch]="'var(--' + color.value + ')'"
                    [attr.aria-label]="color.label"
                    [checked]="note.color === color.value"
                    (change)="recolor(note.id, color.value)"
                  />
                }
              </div>
            </fieldset>
          </div>
        } @else {
          <div scEmpty class="h-full">
            <div scEmptyHeader>
              <h2 i18n scEmptyTitle>No note selected</h2>
              <div i18n scEmptyDescription>Choose a note, or add one.</div>
            </div>
          </div>
        }
      </div>
    </div>
  `,
  host: { class: 'flex flex-col gap-4' },
  encapsulation: ViewEncapsulation.None,
})
export class NotesPage {
  /** The template's words that sit in bindings, translated. */
  private readonly t = {
    notes: $localize`Notes`,
  };

  private readonly store = inject(NotesStore);
  private readonly toaster = inject(ScToaster);

  protected readonly colors = NOTE_COLORS;
  protected readonly query = signal('');
  protected readonly shown = computed(() => {
    const query = this.query().trim().toLowerCase();
    return this.store
      .notes()
      .filter((note) => note.text.toLowerCase().includes(query));
  });
  /** The chosen note: the first shown until one is clicked (or it's gone). */
  protected readonly selectedId = linkedSignal<
    readonly { id: number }[],
    number | null
  >({
    source: () => this.shown(),
    computation: (notes, previous) =>
      previous && notes.some((note) => note.id === previous.value)
        ? previous.value
        : (notes[0]?.id ?? null),
  });
  protected readonly selected = computed(
    () =>
      this.store.notes().find((note) => note.id === this.selectedId()) ?? null,
  );

  protected readonly adding = signal(false);
  private readonly draft = signal({ text: '' });
  protected readonly draftForm = form(this.draft, (path) => {
    required(path.text);
  });
  protected readonly draftColor = signal<NoteColor>('primary');

  protected readonly when = dayTime;

  protected startAdding(): void {
    this.draft.set({ text: '' });
    this.draftColor.set('primary');
    this.adding.set(true);
  }

  protected add(event: Event): void {
    event.preventDefault();
    if (this.draftForm().invalid()) return;
    const note = this.store.add(this.draft().text, this.draftColor());
    this.query.set('');
    this.selectedId.set(note.id);
    this.adding.set(false);
    this.toaster.show({ variant: 'success', title: $localize`Note added` });
  }

  protected edit(id: number, text: string): void {
    this.store.update(id, { text });
  }

  protected recolor(id: number, color: NoteColor): void {
    this.store.update(id, { color });
  }

  protected remove(id: number): void {
    this.store.remove(id);
    this.toaster.show({ variant: 'success', title: $localize`Note deleted` });
  }
}
