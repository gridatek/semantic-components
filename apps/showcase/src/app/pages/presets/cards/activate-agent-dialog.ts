import { Component, ViewEncapsulation } from '@angular/core';
import {
  ScAlert,
  ScAlertDescription,
  ScBadge,
  ScButton,
  ScCard,
  ScCardBody,
  ScCardDescription,
  ScCardFooter,
  ScCardHeader,
  ScCardTitle,
  ScItem,
  ScItemBody,
  ScItemGroup,
  ScItemMedia,
  ScItemTitle,
} from '@semantic-components/ui';
import { SiCircleCheckIcon } from '@semantic-icons/lucide-icons';

/** An offer: what it brings, each a checked item, and a note. */
@Component({
  selector: 'app-preview-activate-agent-dialog',
  imports: [
    ScAlert,
    ScAlertDescription,
    ScBadge,
    ScButton,
    ScCard,
    ScCardBody,
    ScCardDescription,
    ScCardFooter,
    ScCardHeader,
    ScCardTitle,
    ScItem,
    ScItemBody,
    ScItemGroup,
    ScItemMedia,
    ScItemTitle,
    SiCircleCheckIcon,
  ],
  template: `
    <div scCard>
      <div scCardHeader>
        <h2 scCardTitle>Ship faster &amp; safer with Vercel Agent</h2>
        <p scCardDescription>
          Your use is subject to Vercel's
          <a href="#" class="underline underline-offset-4"
            >Public Beta Agreement</a
          >
          and
          <a href="#" class="underline underline-offset-4">AI Product Terms</a>.
        </p>
      </div>
      <div scCardBody class="flex flex-col gap-4">
        <div scItemGroup class="gap-0" role="list">
          <div scItem size="xs" class="px-0" role="listitem">
            <div scItemMedia variant="icon" class="self-start">
              <svg
                siCircleCheckIcon
                class="fill-primary text-primary-foreground size-5"
              ></svg>
            </div>
            <div scItemBody>
              <div scItemTitle [class]="feature">
                <strong>Code reviews</strong> with full codebase context to
                catch <strong>hard-to-find</strong> bugs.
              </div>
            </div>
          </div>
          <div scItem size="xs" class="px-0" role="listitem">
            <div scItemMedia variant="icon" class="self-start">
              <svg
                siCircleCheckIcon
                class="fill-primary text-primary-foreground size-5"
              ></svg>
            </div>
            <div scItemBody>
              <div scItemTitle [class]="feature">
                <strong>Code suggestions</strong> validated in sandboxes before
                you merge.
              </div>
            </div>
          </div>
          <div scItem size="xs" class="px-0" role="listitem">
            <div scItemMedia variant="icon" class="self-start">
              <svg
                siCircleCheckIcon
                class="fill-primary text-primary-foreground size-5"
              ></svg>
            </div>
            <div scItemBody>
              <div scItemTitle [class]="feature">
                <strong>Root-cause analysis</strong> for production issues with
                deployment context.
                <span
                  scBadge
                  variant="secondary"
                  class="bg-chart-1 text-chart-5"
                >
                  Requires Observability Plus
                </span>
              </div>
            </div>
          </div>
        </div>
        <div scAlert>
          <div scAlertDescription>
            Pro teams get $100 in Vercel Agent trial credit for 2 weeks after
            activation.
          </div>
        </div>
      </div>
      <div scCardFooter class="justify-end gap-2">
        <button scButton variant="outline">Cancel</button>
        <button scButton>Enable with $100 credits</button>
      </div>
    </div>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class PreviewActivateAgentDialog {
  protected readonly feature =
    'text-muted-foreground inline leading-relaxed font-normal *:[strong]:text-foreground *:[strong]:font-medium';
}
