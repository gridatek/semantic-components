import { Component, ViewEncapsulation } from '@angular/core';
import {
  ScButton,
  ScCard,
  ScCardBody,
  ScEmpty,
  ScEmptyBody,
  ScEmptyDescription,
  ScEmptyHeader,
  ScEmptyTitle,
} from '@semantic-components/ui';

/** An upsell as an empty state: no icon, a title and a button. */
@Component({
  selector: 'app-preview-anomaly-alert',
  imports: [
    ScButton,
    ScCard,
    ScCardBody,
    ScEmpty,
    ScEmptyBody,
    ScEmptyDescription,
    ScEmptyHeader,
    ScEmptyTitle,
  ],
  template: `
    <div scCard>
      <div scCardBody>
        <div scEmpty class="h-48">
          <div scEmptyHeader>
            <h2 scEmptyTitle>Get alerted for anomalies</h2>
            <div scEmptyDescription>
              Automatically monitor your projects for anomalies and get
              notified.
            </div>
          </div>
          <div scEmptyBody>
            <button scButton>Upgrade to Observability Plus</button>
          </div>
        </div>
      </div>
    </div>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class PreviewAnomalyAlert {}
