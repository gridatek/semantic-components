import { Component, ViewEncapsulation } from '@angular/core';
import {
  ScButton,
  ScCard,
  ScCardContent,
  ScCardDescription,
  ScCardFooter,
  ScCardHeader,
  ScCardTitle,
} from '@semantic-components/ui';

/**
 * Content to the card's edges: -mx-(--card-spacing) out of the inset, kept
 * aligned with px-(--card-spacing); -mb-(--card-spacing) on the content
 * removes the gap above the footer.
 */
@Component({
  selector: 'app-edge-to-edge-card-demo',
  imports: [
    ScButton,
    ScCard,
    ScCardContent,
    ScCardDescription,
    ScCardFooter,
    ScCardHeader,
    ScCardTitle,
  ],
  template: `
    <div scCard class="w-full max-w-sm">
      <div scCardHeader>
        <h4 scCardTitle>Terms of Service</h4>
        <p scCardDescription>
          Review the terms before accepting the agreement.
        </p>
      </div>
      <div scCardContent class="-mb-(--card-spacing)">
        <div
          tabindex="0"
          role="region"
          aria-label="Terms of Service"
          class="bg-muted/50 -mx-(--card-spacing) max-h-48 space-y-4 overflow-y-auto border-t px-(--card-spacing) py-4 text-sm leading-relaxed"
        >
          <p>
            These terms govern your use of the workspace, including access to
            shared documents, project files, and collaboration tools.
          </p>
          <p>
            You are responsible for the content you upload and for ensuring that
            your team has the appropriate permissions to view or edit it.
          </p>
          <p>
            We may update features or limits as the service evolves. When those
            changes materially affect your workflow, we will notify your
            workspace administrators.
          </p>
          <p>
            By continuing, you agree to keep your account credentials secure and
            to follow your organization&apos;s acceptable use policies.
          </p>
        </div>
      </div>
      <div scCardFooter class="justify-end gap-2">
        <button scButton variant="outline">Decline</button>
        <button scButton>Accept</button>
      </div>
    </div>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class EdgeToEdgeCardDemo {}
