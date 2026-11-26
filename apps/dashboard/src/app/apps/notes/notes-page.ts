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

/** Notes: the list, a search, the chosen note to edit, its colour. */
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
    <app-page-header
      i18n-title="@@notes.notes"
      title="Notes"
      [trail]="[{ label: t.notes }]"
    >
      <div scDialogProvider [(open)]="adding">
        <button scButton (click)="startAdding()">
          <svg siPlusIcon></svg>
          <ng-container i18n="@@notes.addNote">Add Note</ng-container>
        </button>
        <ng-template scDialogPortal>
          <div scDialog class="sm:max-w-md">
            <button scDialogClose>
              <svg siXIcon></svg>
              <span i18n="@@notes.close" class="sr-only">Close</span>
            </button>
            <div scDialogHeader>
              <h2 i18n="@@notes.addNote" scDialogTitle>Add Note</h2>
            </div>
            <form id="add-note" (submit)="add($event)">
              <div scFieldGroup>
                <div scField>
                  <label i18n="@@notes.note" scLabel>Note</label>
                  <textarea
                    scTextarea
                    cdkFocusInitial
                    rows="5"
                    [formField]="draftForm.text"
                  ></textarea>
                </div>
                <fieldset class="flex flex-col gap-3">
                  <legend i18n="@@notes.colour" scLegend variant="label">
                    Colour
                  </legend>
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
              <button
                i18n="@@notes.cancel"
                scDialogClose
                variant="outline"
                size="default"
              >
                Cancel
              </button>
              <button i18n="@@notes.add" scButton type="submit" form="add-note">
                Add
              </button>
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
              i18n-aria-label="@@notes.searchNotes"
              i18n-placeholder="@@notes.searchNotes"
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
        <ul
          i18n-aria-label="@@notes.notes"
          class="flex flex-col gap-1 px-2"
          aria-label="Notes"
        >
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
              i18n="@@notes.noNotesMatch"
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
                <ng-container i18n="@@notes.delete">Delete</ng-container>
              </button>
            </div>
            <div scField class="flex-1">
              <label i18n="@@notes.editNote" scLabel>Edit Note</label>
              <textarea
                scTextarea
                class="min-h-64 flex-1"
                [value]="note.text"
                (input)="edit(note.id, $any($event.target).value)"
              ></textarea>
            </div>
            <fieldset class="flex flex-col gap-3">
              <legend i18n="@@notes.changeNoteColour" scLegend variant="label">
                Change Note Colour
              </legend>
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
              <h2 i18n="@@notes.noNoteSelected" scEmptyTitle>
                No note selected
              </h2>
              <div i18n="@@notes.chooseANoteOrAdd" scEmptyDescription>
                Choose a note, or add one.
              </div>
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
    notes: $localize`:@@notes.notes:Notes`,
  };

  private readonly store = inject(NotesStore);
  private readonly toaster = inject(ScToaster);

  private readonly colors = NOTE_COLORS;
  private readonly query = signal('');
  private readonly shown = computed(() => {
    const query = this.query().trim().toLowerCase();
    return this.store
      .notes()
      .filter((note) => note.text.toLowerCase().includes(query));
  });
  /** The chosen note: the first shown until one is clicked (or it's gone). */
  private readonly selectedId = linkedSignal<
    readonly { id: number }[],
    number | null
  >({
    source: () => this.shown(),
    computation: (notes, previous) =>
      previous && notes.some((note) => note.id === previous.value)
        ? previous.value
        : (notes[0]?.id ?? null),
  });
  private readonly selected = computed(
    () =>
      this.store.notes().find((note) => note.id === this.selectedId()) ?? null,
  );

  private readonly adding = signal(false);
  private readonly draft = signal({ text: '' });
  private readonly draftForm = form(this.draft, (path) => {
    required(path.text);
  });
  private readonly draftColor = signal<NoteColor>('primary');

  private readonly when = dayTime;

  private startAdding(): void {
    this.draft.set({ text: '' });
    this.draftColor.set('primary');
    this.adding.set(true);
  }

  private add(event: Event): void {
    event.preventDefault();
    if (this.draftForm().invalid()) return;
    const note = this.store.add(this.draft().text, this.draftColor());
    this.query.set('');
    this.selectedId.set(note.id);
    this.adding.set(false);
    this.toaster.show({
      variant: 'success',
      title: $localize`:@@notes.noteAdded:Note added`,
    });
  }

  private edit(id: number, text: string): void {
    this.store.update(id, { text });
  }

  private recolor(id: number, color: NoteColor): void {
    this.store.update(id, { color });
  }

  private remove(id: number): void {
    this.store.remove(id);
    this.toaster.show({
      variant: 'success',
      title: $localize`:@@notes.noteDeleted:Note deleted`,
    });
  }
}
