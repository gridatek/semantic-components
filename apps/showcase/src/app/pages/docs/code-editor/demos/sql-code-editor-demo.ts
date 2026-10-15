import { Component, ViewEncapsulation } from '@angular/core';
import {
  ScCodeEditor,
  ScCodeEditorContent,
  ScCodeEditorCopyButton,
  ScCodeEditorHeader,
  ScCodeEditorLabel,
} from '@semantic-components/code';
import { SiCheckIcon, SiCopyIcon } from '@semantic-icons/lucide-icons';

@Component({
  selector: 'app-sql-code-editor-demo',
  imports: [
    ScCodeEditor,
    ScCodeEditorHeader,
    ScCodeEditorLabel,
    ScCodeEditorContent,
    ScCodeEditorCopyButton,
    SiCheckIcon,
    SiCopyIcon,
  ],
  template: `
    <div scCodeEditor>
      <div scCodeEditorHeader>
        <div class="flex items-center gap-2">
          <span class="text-muted-foreground text-sm">query.sql</span>
          <span scCodeEditorLabel>sql</span>
        </div>
        <button
          scCodeEditorCopyButton
          #copy="scCodeEditorCopyButton"
          [code]="sqlCode"
        >
          @if (copy.copied()) {
            <svg siCheckIcon></svg>
          } @else {
            <svg siCopyIcon></svg>
          }

          <span class="sr-only">{{
            copy.copied() ? 'Copied' : 'Copy code'
          }}</span>
        </button>
      </div>
      <div
        scCodeEditorContent
        ariaLabel="Code editor"
        [(value)]="sqlCode"
        language="sql"
        filename="query.sql"
        class="max-h-[200px]"
      ></div>
    </div>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class SqlCodeEditorDemo {
  sqlCode = `-- SQL Example
SELECT
    u.id,
    u.name,
    u.email,
    COUNT(o.id) AS order_count,
    SUM(o.total) AS total_spent
FROM users u
LEFT JOIN orders o ON u.id = o.user_id
WHERE u.created_at >= '2024-01-01'
    AND u.is_active = true
GROUP BY u.id, u.name, u.email
HAVING COUNT(o.id) > 0
ORDER BY total_spent DESC
LIMIT 10;`;
}
