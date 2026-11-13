import { Dir } from '@angular/cdk/bidi';
import { Component, ViewEncapsulation } from '@angular/core';
import {
  ScAttachment,
  ScAttachmentAction,
  ScAttachmentActions,
  ScAttachmentContent,
  ScAttachmentMedia,
  ScAttachmentTitle,
  ScInputGroup,
  ScInputGroupAddon,
  ScInputGroupButton,
  ScTextarea,
} from '@semantic-components/ui';
import {
  SiArrowUpIcon,
  SiFileTextIcon,
  SiPlusIcon,
  SiXIcon,
} from '@semantic-icons/lucide-icons';

/** Right to left: the attachment from the right, Attach on the right, Send on the left. */
@Component({
  selector: 'app-rtl-prompt-input-demo',
  imports: [
    Dir,
    ScAttachment,
    ScAttachmentAction,
    ScAttachmentActions,
    ScAttachmentContent,
    ScAttachmentMedia,
    ScAttachmentTitle,
    ScInputGroup,
    ScInputGroupAddon,
    ScInputGroupButton,
    ScTextarea,
    SiArrowUpIcon,
    SiFileTextIcon,
    SiPlusIcon,
    SiXIcon,
  ],
  template: `
    <div dir="rtl" lang="ar" class="mx-auto w-full max-w-lg py-6">
      <div scInputGroup>
        <div scInputGroupAddon side="top" class="flex-wrap">
          <div scAttachment size="sm">
            <div scAttachmentMedia><svg siFileTextIcon></svg></div>
            <div scAttachmentContent>
              <div scAttachmentTitle>التقرير.pdf</div>
            </div>
            <div scAttachmentActions>
              <button scAttachmentAction>
                <svg siXIcon></svg>
                <span class="sr-only">إزالة التقرير.pdf</span>
              </button>
            </div>
          </div>
        </div>
        <textarea
          scTextarea
          class="p-3"
          placeholder="اطلب من الوكيل تعديل الشيفرة..."
          aria-label="الرسالة"
        ></textarea>
        <div scInputGroupAddon side="bottom">
          <button
            scInputGroupButton
            type="button"
            size="icon-sm"
            variant="outline"
            class="rounded-full"
          >
            <svg siPlusIcon></svg>
            <span class="sr-only">إرفاق ملفات</span>
          </button>
          <button
            scInputGroupButton
            type="button"
            size="icon-sm"
            variant="default"
            class="ms-auto rounded-full"
          >
            <svg siArrowUpIcon></svg>
            <span class="sr-only">إرسال</span>
          </button>
        </div>
      </div>
    </div>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class RtlPromptInputDemo {}
