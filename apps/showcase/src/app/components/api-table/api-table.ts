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

/** An input of a part: its name, its type, its default and what it does. */
export interface ApiInput {
  readonly name: string;
  readonly type: string;
  readonly default: string;
  readonly description?: string;
}

/** A part's inputs, as a table in a named region (it scrolls on a phone). */
@Component({
  selector: 'app-api-table',
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
            <th scTableHeaderCell>Input</th>
            <th scTableHeaderCell>Type</th>
            <th scTableHeaderCell>Default</th>
            <th scTableHeaderCell>Description</th>
          </tr>
        </thead>
        <tbody scTableBody>
          @for (row of inputs(); track row.name) {
            <tr scTableRow>
              <td scTableCell>
                <code class="font-mono text-sm">{{ row.name }}</code>
              </td>
              <td scTableCell class="whitespace-normal">
                <code class="font-mono text-sm">{{ row.type }}</code>
              </td>
              <td scTableCell>
                <code class="font-mono text-sm">{{ row.default }}</code>
              </td>
              <td scTableCell class="text-muted-foreground whitespace-normal">
                {{ row.description }}
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
export class ApiTable {
  readonly classInput = input<string>('', { alias: 'class' });
  /** The region's name: "ScChartBar inputs". */
  readonly label = input.required<string>();
  readonly inputs = input.required<readonly ApiInput[]>();

  protected readonly class = computed(() => cn('block', this.classInput()));
}
