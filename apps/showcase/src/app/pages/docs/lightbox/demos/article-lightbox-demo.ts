import { Component, ViewEncapsulation } from '@angular/core';
import {
  ScLightbox,
  ScLightboxClose,
  ScLightboxDialog,
  ScLightboxImage,
  ScLightboxTrigger,
} from '@semantic-components/ui';
import { SiXIcon } from '@semantic-icons/lucide-icons';

/** One image in the text, opened in place — no thumbnails, no counter needed. */
@Component({
  selector: 'app-article-lightbox-demo',
  imports: [
    ScLightbox,
    ScLightboxTrigger,
    ScLightboxDialog,
    ScLightboxImage,
    ScLightboxClose,
    SiXIcon,
  ],
  template: `
    <article scLightbox class="max-w-prose space-y-3 text-sm leading-relaxed">
      <p>
        The café opens at eight. By nine the long table fills with people who
        came for one coffee and stay for three.
      </p>
      <a
        scLightboxTrigger
        href="/images/gallery/cafe.jpg"
        class="float-end ms-4 mb-2 w-48"
      >
        <img
          src="/images/gallery/cafe-thumb.jpg"
          alt="A wooden table in a quiet café"
          width="400"
          height="267"
          class="aspect-[3/2] w-full object-cover"
        />
      </a>
      <p>
        Light comes in from the street side, so the best seats are by the
        window, where the wood is warm by noon. Nobody hurries; the owner knows
        most people by their order.
      </p>
      <dialog scLightboxDialog aria-label="The café">
        <div class="flex justify-end p-2">
          <button scLightboxClose>
            <svg siXIcon></svg>
            <span class="sr-only">Close</span>
          </button>
        </div>
        <div class="grid min-h-0 flex-1 place-items-center overflow-hidden p-4">
          <img scLightboxImage alt="A wooden table in a quiet café" />
        </div>
      </dialog>
    </article>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class ArticleLightboxDemo {}
