import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  signal,
} from '@angular/core';
import {
  ScSpeedDial,
  ScSpeedDialAction,
  ScSpeedDialActionButton,
  ScSpeedDialActionLabel,
  ScSpeedDialActionList,
  ScSpeedDialTrigger,
} from '@semantic-components/ui-lab';
import {
  SiCopyIcon,
  SiPencilIcon,
  SiPlusIcon,
  SiShare2Icon,
  SiTrash2Icon,
  SiXIcon,
} from '@semantic-icons/lucide-icons';

@Component({
  selector: 'app-basic-speed-dial-demo',
  imports: [
    ScSpeedDial,
    ScSpeedDialAction,
    ScSpeedDialActionButton,
    ScSpeedDialActionLabel,
    ScSpeedDialActionList,
    ScSpeedDialTrigger,
    SiPencilIcon,
    SiCopyIcon,
    SiShare2Icon,
    SiTrash2Icon,
    SiPlusIcon,
    SiXIcon,
  ],
  template: `
    <div class="bg-muted/20 relative h-96 w-full rounded-lg border">
      <div class="absolute right-4 bottom-4">
        <div scSpeedDial #dial="scSpeedDial" direction="up">
          <div scSpeedDialActionList>
            <div scSpeedDialAction>
              <button
                scSpeedDialActionButton
                aria-label="Edit"
                (click)="onAction('Edit')"
              >
                <svg siPencilIcon class="size-5" />
              </button>
              @if (dial.open()) {
                <span scSpeedDialActionLabel>Edit</span>
              }
            </div>
            <div scSpeedDialAction>
              <button
                scSpeedDialActionButton
                aria-label="Copy"
                (click)="onAction('Copy')"
              >
                <svg siCopyIcon class="size-5" />
              </button>
              @if (dial.open()) {
                <span scSpeedDialActionLabel>Copy</span>
              }
            </div>
            <div scSpeedDialAction>
              <button
                scSpeedDialActionButton
                aria-label="Share"
                (click)="onAction('Share')"
              >
                <svg siShare2Icon class="size-5" />
              </button>
              @if (dial.open()) {
                <span scSpeedDialActionLabel>Share</span>
              }
            </div>
            <div scSpeedDialAction>
              <button
                scSpeedDialActionButton
                aria-label="Delete"
                (click)="onAction('Delete')"
              >
                <svg siTrash2Icon class="size-5" />
              </button>
              @if (dial.open()) {
                <span scSpeedDialActionLabel>Delete</span>
              }
            </div>
          </div>
          <button scSpeedDialTrigger aria-label="Speed dial">
            @if (dial.open()) {
              <svg siXIcon class="size-6" />
            } @else {
              <svg siPlusIcon class="size-6" />
            }
          </button>
        </div>
      </div>
    </div>
    @if (lastAction()) {
      <p class="text-muted-foreground mt-2 text-sm">
        Last action: {{ lastAction() }}
      </p>
    }
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BasicSpeedDialDemo {
  readonly lastAction = signal<string | null>(null);

  onAction(label: string): void {
    this.lastAction.set(label);
  }
}
