import { Component, ViewEncapsulation, computed, input } from '@angular/core';
import {
  ScTable,
  ScTableBody,
  ScTableCell,
  ScTableContainer,
  ScTableHeader,
  ScTableHeaderCell,
  ScTableRow,
} from '@semantic-components/ui';
import { cn } from 'cn';

/** A part of a component: its name, its selector and what it does. */
export interface ApiPart {
  readonly name: string;
  readonly selector: string;
  readonly description: string;
}

/**
 * A component's parts, as a table in a named region (it scrolls on a phone):
 * the API reference's list, beside `app-api-table` (a part's inputs).
 */
@Component({
  selector: 'app-parts-table',
  imports: [
    ScTable,
    ScTableBody,
    ScTableCell,
    ScTableContainer,
    ScTableHeader,
    ScTableHeaderCell,
    ScTableRow,
  ],
  template: `
    <div
      scTableContainer
      tabindex="0"
      role="region"
      [attr.aria-label]="label()"
    >
      <table scTable>
        <thead scTableHeader>
          <tr scTableRow>
            <th scTableHeaderCell>Part</th>
            <th scTableHeaderCell>Selector</th>
            <th scTableHeaderCell>Description</th>
          </tr>
        </thead>
        <tbody scTableBody>
          @for (part of parts(); track part.name) {
            <tr scTableRow>
              <td scTableCell>
                <code class="font-mono text-sm">{{ part.name }}</code>
              </td>
              <td scTableCell>
                <code class="font-mono text-sm">{{ part.selector }}</code>
              </td>
              <td scTableCell class="text-muted-foreground whitespace-normal">
                {{ part.description }}
              </td>
            </tr>
          }
        </tbody>
      </table>
    </div>
  `,
  host: { '[class]': 'class()' },
  encapsulation: ViewEncapsulation.None,
})
export class PartsTable {
  readonly classInput = input<string>('', { alias: 'class' });
  /** The region's name: "Accordion parts". */
  readonly label = input.required<string>();
  readonly parts = input.required<readonly ApiPart[]>();

  private readonly class = computed(() => cn('block', this.classInput()));
}
