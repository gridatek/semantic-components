import {
  Directive,
  ElementRef,
  Injector,
  afterNextRender,
  computed,
  effect,
  inject,
  input,
  untracked,
} from '@angular/core';
import { cn } from '../../utils/cn/cn';
import { ScImageAnnotator } from './image-annotator';
import { fontSize } from './image-annotator-geometry';

/**
 * Where a text annotation is written: your `input`, in the stage — shown
 * over the text being written, named by you ("Annotation text"). Enter or
 * leaving it ends the text (an empty one goes); one undo step.
 */
@Directive({
  selector: 'input[scImageAnnotatorTextInput]',
  host: {
    'data-slot': 'image-annotator-text-input',
    type: 'text',
    '[hidden]': '!annotation()',
    '[value]': 'annotation()?.text ?? ""',
    '[style.left.%]': 'place().left',
    '[style.top.%]': 'place().top',
    '[style.font-size.px]': 'place().size',
    '[style.color]': 'annotation()?.color',
    '[class]': 'class()',
    '(input)': 'onInput()',
    '(keydown.enter)': 'finish()',
    '(keydown.escape)': 'finish()',
    '(blur)': 'finish()',
  },
})
export class ScImageAnnotatorTextInput {
  private readonly annotator = inject(ScImageAnnotator);
  private readonly element =
    inject<ElementRef<HTMLInputElement>>(ElementRef).nativeElement;
  private readonly injector = inject(Injector);

  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly annotation = computed(() => {
    const id = this.annotator.editing();
    return id
      ? (this.annotator.annotations().find((a) => a.id === id) ?? null)
      : null;
  });

  protected readonly place = computed(() => {
    const annotation = this.annotation();
    const { width, height } = this.annotator.ɵnatural();
    if (!annotation || !width) return { left: 0, top: 0, size: 16 };
    const [at] = annotation.points;
    return {
      left: (at.x / width) * 100,
      top: (at.y / height) * 100,
      size: fontSize(annotation) * this.annotator.ɵscale(),
    };
  });

  protected readonly class = computed(() =>
    cn(
      'absolute z-10 min-w-24 rounded-sm border border-dashed border-sky-500 bg-white/80 px-0.5 font-semibold leading-tight outline-none dark:bg-black/60',
      this.classInput(),
    ),
  );

  constructor() {
    // A text to write: the field focused, its changes one undo step.
    effect(() => {
      const id = this.annotator.editing();
      if (!id) return;
      untracked(() => {
        this.annotator.ɵbegin();
        afterNextRender(() => this.element.focus(), {
          injector: this.injector,
        });
      });
    });
  }

  protected onInput(): void {
    const id = this.annotator.editing();
    const text = this.element.value;
    if (id) this.annotator.change(id, (a) => ({ ...a, text }));
  }

  protected finish(): void {
    const annotation = this.annotation();
    if (!annotation) return;
    this.annotator.editing.set(null);
    if (!annotation.text?.trim()) this.annotator.remove(annotation.id);
    this.annotator.ɵend();
  }
}
