import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { RtlMediaPlayerDemo } from './rtl-media-player-demo';

@Component({
  selector: 'app-rtl-media-player-demo-container',
  imports: [DemoContainer, RtlMediaPlayerDemo],
  template: `
    <app-demo-container
      title="RTL"
      [code]="code"
      demoUrl="/demos/media-player/rtl-media-player-demo"
    >
      <app-rtl-media-player-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class RtlMediaPlayerDemoContainer {
  private readonly code = `import { Dir } from '@angular/cdk/bidi';
import { Component, LOCALE_ID, ViewEncapsulation } from '@angular/core';
import {
  ScMediaPlayer,
  ScMediaPlayerCaptions,
  ScMediaPlayerCaptionsDisplay,
  ScMediaPlayerControls,
  ScMediaPlayerFullscreen,
  ScMediaPlayerLoop,
  ScMediaPlayerMedia,
  ScMediaPlayerMute,
  ScMediaPlayerPictureInPicture,
  ScMediaPlayerPlay,
  ScMediaPlayerPreview,
  ScMediaPlayerRate,
  ScMediaPlayerSeek,
  ScMediaPlayerSkip,
  ScMediaPlayerTime,
  ScMediaPlayerVolume,
} from '@semantic-components/ui';
import {
  SiCaptionsIcon,
  SiLoaderCircleIcon,
  SiMaximizeIcon,
  SiMinimizeIcon,
  SiPauseIcon,
  SiPictureInPicture2Icon,
  SiPlayIcon,
  SiRepeatIcon,
  SiRotateCcwIcon,
  SiRotateCwIcon,
  SiVolume2Icon,
  SiVolumeXIcon,
} from '@semantic-icons/lucide-icons';

/** In a right-to-left page: the seek bar and its preview run as the text reads, the times in the locale’s digits. */
@Component({
  selector: 'app-rtl-media-player-demo',
  imports: [
    Dir,
    ScMediaPlayer,
    ScMediaPlayerCaptions,
    ScMediaPlayerCaptionsDisplay,
    ScMediaPlayerControls,
    ScMediaPlayerFullscreen,
    ScMediaPlayerLoop,
    ScMediaPlayerMedia,
    ScMediaPlayerMute,
    ScMediaPlayerPictureInPicture,
    ScMediaPlayerPlay,
    ScMediaPlayerPreview,
    ScMediaPlayerRate,
    ScMediaPlayerSeek,
    ScMediaPlayerSkip,
    ScMediaPlayerTime,
    ScMediaPlayerVolume,
    SiCaptionsIcon,
    SiLoaderCircleIcon,
    SiMaximizeIcon,
    SiMinimizeIcon,
    SiPauseIcon,
    SiPictureInPicture2Icon,
    SiPlayIcon,
    SiRepeatIcon,
    SiRotateCcwIcon,
    SiRotateCwIcon,
    SiVolume2Icon,
    SiVolumeXIcon,
  ],
  providers: [{ provide: LOCALE_ID, useValue: 'ar' }],
  template: \`
    <div dir="rtl" lang="ar" class="w-full max-w-2xl">
      <div
        scMediaPlayer
        #player="scMediaPlayer"
        aria-label="فيديو: سينتل، الإعلان"
        class="aspect-video w-full"
      >
        <video
          scMediaPlayerMedia
          src="/media/sintel-trailer.mp4"
          poster="/media/sintel-trailer.jpg"
          preload="metadata"
        >
          <track
            kind="captions"
            src="/media/sintel-trailer-en.vtt"
            srclang="en"
            label="English"
          />
          <track
            kind="captions"
            src="/media/sintel-trailer-fr.vtt"
            srclang="fr"
            label="Français"
          />
          <track
            kind="chapters"
            src="/media/sintel-trailer-chapters.vtt"
            srclang="en"
          />
        </video>
        <div scMediaPlayerCaptionsDisplay></div>
        @if (player.waiting()) {
          <svg
            siLoaderCircleIcon
            class="pointer-events-none absolute inset-0 z-20 m-auto size-10 animate-spin"
          ></svg>
        }
        <!-- Over the video: in the middle. -->
        <button scMediaPlayerPlay>
          @if (player.ended()) {
            <svg siRotateCcwIcon></svg>
            <span class="sr-only">إعادة التشغيل</span>
          } @else if (player.paused()) {
            <svg siPlayIcon></svg>
            <span class="sr-only">تشغيل</span>
          } @else {
            <svg siPauseIcon></svg>
            <span class="sr-only">إيقاف مؤقت</span>
          }
        </button>
        @if (!player.started()) {
          <time
            scMediaPlayerTime="duration"
            class="absolute end-3 bottom-3 rounded-md bg-black/70 px-1.5 py-0.5"
          ></time>
        }

        <div scMediaPlayerControls>
          <input scMediaPlayerSeek aria-label="موضع التشغيل" />
          @if (player.preview(); as preview) {
            <div scMediaPlayerPreview>
              {{ player.chapterAt(preview.time)?.title }}
              <div class="font-medium">
                {{ player.formatTime(preview.time) }}
              </div>
            </div>
          }
          <button scMediaPlayerPlay>
            @if (player.ended()) {
              <svg siRotateCcwIcon></svg>
              <span class="sr-only">إعادة التشغيل</span>
            } @else if (player.paused()) {
              <svg siPlayIcon></svg>
              <span class="sr-only">تشغيل</span>
            } @else {
              <svg siPauseIcon></svg>
              <span class="sr-only">إيقاف مؤقت</span>
            }
          </button>
          <button [scMediaPlayerSkip]="-10">
            <svg siRotateCcwIcon></svg>
            <span class="sr-only">رجوع 10 ثوانٍ</span>
          </button>
          <button [scMediaPlayerSkip]="10">
            <svg siRotateCwIcon></svg>
            <span class="sr-only">تقديم 10 ثوانٍ</span>
          </button>
          <button scMediaPlayerMute>
            @if (player.muted()) {
              <svg siVolumeXIcon></svg>
            } @else {
              <svg siVolume2Icon></svg>
            }
            <span class="sr-only">كتم الصوت</span>
          </button>
          <input scMediaPlayerVolume aria-label="مستوى الصوت" />
          <span class="flex items-center gap-1 px-1 text-xs">
            <time scMediaPlayerTime></time> /
            <time scMediaPlayerTime="duration"></time>
          </span>
          <!-- Grows: what follows sits at the end. -->
          <span class="min-w-0 flex-1 truncate text-xs text-white/80">{{
            player.chapter()?.title
          }}</span>
          <div role="group" aria-label="السرعة" class="flex">
            @for (rate of rates; track rate) {
              <button
                [scMediaPlayerRate]="rate"
                size="sm"
                class="px-1.5 text-xs"
              >
                {{ rate }}×
              </button>
            }
          </div>
          <button scMediaPlayerLoop>
            <svg siRepeatIcon></svg>
            <span class="sr-only">تكرار</span>
          </button>
          <button scMediaPlayerCaptions>
            <svg siCaptionsIcon></svg>
            <span class="sr-only">الترجمة</span>
          </button>
          <button scMediaPlayerPictureInPicture>
            <svg siPictureInPicture2Icon></svg>
            <span class="sr-only">صورة داخل صورة</span>
          </button>
          <button scMediaPlayerFullscreen>
            @if (player.fullscreen()) {
              <svg siMinimizeIcon></svg>
            } @else {
              <svg siMaximizeIcon></svg>
            }
            <span class="sr-only">ملء الشاشة</span>
          </button>
        </div>
      </div>
    </div>
  \`,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class RtlMediaPlayerDemo {
  private readonly rates = [1, 1.5, 2];
}`;
}
