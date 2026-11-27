import { NgOptimizedImage } from '@angular/common';
import {
  Component,
  DestroyRef,
  ViewEncapsulation,
  computed,
  inject,
  signal,
} from '@angular/core';
import { FormField, form, required } from '@angular/forms/signals';
import {
  ScBadge,
  ScButton,
  ScCard,
  ScCardBody,
  ScCardDescription,
  ScCardHeader,
  ScCardTitle,
  ScField,
  ScFieldGroup,
  ScLabel,
  ScLegend,
  ScLink,
  ScSelect,
  ScSelectGroup,
  ScSelectIcon,
  ScSelectItem,
  ScSelectItemIndicator,
  ScSelectItemText,
  ScSelectList,
  ScSelectPopup,
  ScSelectPortal,
  ScSelectTrigger,
  ScSelectValue,
  ScSkeleton,
  ScSpinner,
  ScTextarea,
  ScToaster,
  ScToggleGroup,
  ScToggleGroupItem,
} from '@semantic-components/ui';
import {
  SiCheckIcon,
  SiChevronDownIcon,
  SiDownloadIcon,
  SiLoaderCircleIcon,
  SiSparklesIcon,
} from '@semantic-icons/lucide-icons';
import { PageHeader } from '../../layout/page-header';
import { injectFormats } from '../../shared/formats';
import { label } from '../../shared/labels';

type Ratio = 'square' | 'portrait' | 'landscape';

interface Generation {
  readonly id: number;
  readonly prompt: string;
  readonly style: string;
  readonly ratio: Ratio;
  readonly images: readonly string[];
}

const STYLES = [
  $localize`:@@ai.image.photographic:Photographic`,
  $localize`:@@ai.image.digitalArt:Digital art`,
  $localize`:@@ai.image.watercolour:Watercolour`,
  $localize`:@@ai.image.n3dRender:3D render`,
];

const SETS: readonly (readonly string[])[] = [
  [1, 2, 3, 4].map((n) => `images/image-ai/leptop${n}.jpg`),
  [1, 2, 3, 4].map((n) => `images/image-ai/masonry-${n}.jpg`),
  [5, 6, 7, 8].map((n) => `images/image-ai/masonry-${n}.jpg`),
  [9, 10, 11, 12].map((n) => `images/image-ai/masonry-${n}.jpg`),
];

/** AI Image (Pro): a prompt and its settings, the pictures, the earlier ones. */
@Component({
  selector: 'app-ai-image-page',
  imports: [
    FormField,
    NgOptimizedImage,
    ScBadge,
    ScButton,
    ScCard,
    ScCardBody,
    ScCardDescription,
    ScCardHeader,
    ScCardTitle,
    ScField,
    ScFieldGroup,
    ScLabel,
    ScLegend,
    ScLink,
    ScSelect,
    ScSelectGroup,
    ScSelectIcon,
    ScSelectItem,
    ScSelectItemIndicator,
    ScSelectItemText,
    ScSelectList,
    ScSelectPopup,
    ScSelectPortal,
    ScSelectTrigger,
    ScSelectValue,
    ScSkeleton,
    ScSpinner,
    ScTextarea,
    ScToggleGroup,
    ScToggleGroupItem,
    SiCheckIcon,
    SiChevronDownIcon,
    SiDownloadIcon,
    SiLoaderCircleIcon,
    SiSparklesIcon,
    PageHeader,
  ],
  template: `
    <app-page-header
      i18n-title="@@ai.image.aiImage"
      title="AI Image"
      [trail]="[{ label: t.apps }, { label: t.aiImage }]"
    />

    <div class="grid gap-4 lg:grid-cols-[22rem_1fr]">
      <div scCard class="self-start">
        <div scCardHeader>
          <h2 i18n="@@ai.image.describeAPicture" scCardTitle>
            Describe a picture
          </h2>
          <p i18n="@@ai.image.fourVersionsEachTime" scCardDescription>
            Four versions each time
          </p>
        </div>
        <div scCardBody>
          <form (submit)="generate($event)">
            <div scFieldGroup>
              <div scField>
                <label i18n="@@ai.image.prompt" scLabel>Prompt</label>
                <textarea
                  i18n-placeholder="@@ai.image.aLaptopOnADesk"
                  scTextarea
                  rows="4"
                  placeholder="A laptop on a desk by a window, morning light"
                  [formField]="promptForm.prompt"
                ></textarea>
              </div>
              <div scField>
                <label i18n="@@ai.image.style" scLabel>Style</label>
                <div
                  scSelect
                  [value]="style()"
                  (valueChange)="style.set($any($event))"
                  [items]="styles"
                >
                  <div scSelectTrigger class="w-full">
                    <span scSelectValue></span>
                    <svg scSelectIcon siChevronDownIcon></svg>
                  </div>
                  <ng-template scSelectPortal>
                    <div scSelectPopup>
                      <div scSelectList>
                        <div scSelectGroup>
                          @for (item of styles; track item.value) {
                            <div scSelectItem [value]="item.value">
                              <span scSelectItemText>{{ item.label }}</span>
                              <span scSelectItemIndicator
                                ><svg siCheckIcon></svg
                              ></span>
                            </div>
                          }
                        </div>
                      </div>
                    </div>
                  </ng-template>
                </div>
              </div>
              <fieldset class="flex flex-col gap-3">
                <legend i18n="@@ai.image.shape" scLegend variant="label">
                  Shape
                </legend>
                <div
                  i18n-aria-label="@@ai.image.shape"
                  scToggleGroup
                  variant="outline"
                  aria-label="Shape"
                  [value]="[ratio()]"
                  (valueChange)="chooseRatio($event)"
                >
                  <button
                    i18n="@@ai.image.square"
                    scToggleGroupItem
                    value="square"
                  >
                    Square
                  </button>
                  <button
                    i18n="@@ai.image.portrait"
                    scToggleGroupItem
                    value="portrait"
                  >
                    Portrait
                  </button>
                  <button
                    i18n="@@ai.image.landscape"
                    scToggleGroupItem
                    value="landscape"
                  >
                    Landscape
                  </button>
                </div>
              </fieldset>
              <button scButton type="submit" [disabled]="working()">
                @if (working()) {
                  <svg
                    i18n-aria-label="@@ai.image.loading"
                    scSpinner
                    siLoaderCircleIcon
                    aria-label="Loading"
                  ></svg>
                  <ng-container i18n="@@ai.image.generating"
                    >Generating…</ng-container
                  >
                } @else {
                  <svg siSparklesIcon></svg>
                  <ng-container i18n="@@ai.image.generate"
                    >Generate</ng-container
                  >
                }
              </button>
            </div>
          </form>
        </div>
      </div>

      <div class="flex flex-col gap-6">
        @if (working()) {
          <section class="flex flex-col gap-3" aria-busy="true">
            <h2 i18n="@@ai.image.generating" class="font-medium">
              Generating…
            </h2>
            <div class="grid grid-cols-2 gap-3 xl:grid-cols-4">
              @for (n of [1, 2, 3, 4]; track n) {
                <div scSkeleton [class]="shapeClass(ratio())"></div>
              }
            </div>
          </section>
        }
        @for (generation of generations(); track generation.id) {
          <section class="flex flex-col gap-3">
            <div class="flex flex-wrap items-center gap-2">
              <h2 class="font-medium">{{ generation.prompt }}</h2>
              <span scBadge variant="secondary">{{ generation.style }}</span>
              <span scBadge variant="outline">{{
                labelOf(generation.ratio)
              }}</span>
            </div>
            <ul class="grid grid-cols-2 gap-3 xl:grid-cols-4">
              @for (image of generation.images; track image; let i = $index) {
                <li
                  class="group relative overflow-hidden rounded-lg"
                  [class]="shapeClass(generation.ratio)"
                >
                  <img
                    [ngSrc]="image"
                    fill
                    sizes="(min-width: 1280px) 20vw, 45vw"
                    [alt]="generation.prompt + t.version + (i + 1)"
                    class="object-cover"
                  />
                  <a
                    scLink="image"
                    download
                    variant="secondary"
                    size="icon-sm"
                    class="absolute end-2 bottom-2 opacity-0 group-focus-within:opacity-100 group-hover:opacity-100"
                  >
                    <svg siDownloadIcon></svg>
                    <span i18n="@@ai.image.downloadVersion" class="sr-only"
                      >Download version {{ f.count(i + 1) }}</span
                    >
                  </a>
                </li>
              }
            </ul>
          </section>
        }
      </div>
    </div>
  `,
  host: { class: 'flex flex-col gap-4' },
  encapsulation: ViewEncapsulation.None,
})
export class AiImagePage {
  /** Figures as the library writes them (the dashboard's choices). */
  private readonly f = injectFormats();
  /** In the user's numbering system. */

  private readonly labelOf = label;
  /** The template's words that sit in bindings, translated. */
  private readonly t = {
    apps: $localize`:@@ai.image.apps:Apps`,
    aiImage: $localize`:@@ai.image.aiImage:AI Image`,
    version: $localize`:@@ai.image.version:, version `,
  };

  private readonly toaster = inject(ScToaster);
  private readonly styles = STYLES.map((value) => ({ value, label: value }));
  private readonly style = signal(STYLES[0]);
  private readonly ratio = signal<Ratio>('square');
  private readonly model = signal({ prompt: '' });
  private readonly promptForm = form(this.model, (path) => {
    required(path.prompt);
  });
  private readonly working = signal(false);
  private timer: ReturnType<typeof setTimeout> | undefined;
  private readonly generations = signal<readonly Generation[]>([
    {
      id: 2,
      prompt: $localize`:@@ai.image.flowersAndBirdsInSoft:Flowers and birds in soft spring light`,
      style: STYLES[0],
      ratio: 'portrait',
      images: SETS[1],
    },
    {
      id: 1,
      prompt: $localize`:@@ai.image.aLaptopOnAWooden:A laptop on a wooden desk, top view`,
      style: STYLES[0],
      ratio: 'square',
      images: SETS[0],
    },
  ]);
  private readonly next = computed(
    () => SETS[(this.generations().length + 1) % SETS.length],
  );

  constructor() {
    inject(DestroyRef).onDestroy(() => clearTimeout(this.timer));
  }

  private shapeClass(ratio: Ratio): string {
    return ratio === 'portrait'
      ? 'aspect-[3/4]'
      : ratio === 'landscape'
        ? 'aspect-video'
        : 'aspect-square';
  }

  private chooseRatio(value: readonly string[]): void {
    const next = value[0];
    if (next === 'square' || next === 'portrait' || next === 'landscape')
      this.ratio.set(next);
  }

  /** Waits a moment, as a model would, then shows the next set of pictures. */
  private generate(event: Event): void {
    event.preventDefault();
    if (this.promptForm().invalid() || this.working()) return;
    this.working.set(true);
    const generation: Omit<Generation, 'id'> = {
      prompt: this.model().prompt.trim(),
      style: this.style(),
      ratio: this.ratio(),
      images: this.next(),
    };
    this.timer = setTimeout(() => {
      this.generations.update((all) => [
        { ...generation, id: all.length + 1 },
        ...all,
      ]);
      this.working.set(false);
      this.model.set({ prompt: '' });
      this.toaster.show({
        variant: 'success',
        title: $localize`:@@ai.image.fourPicturesReady:Four pictures ready`,
      });
    }, 1600);
  }
}
