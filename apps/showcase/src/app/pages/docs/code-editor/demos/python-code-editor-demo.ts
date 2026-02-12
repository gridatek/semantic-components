import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import {
  ScCodeEditor,
  ScCodeEditorContent,
  ScCodeEditorHeader,
  ScCodeEditorLabel,
  ScCodeEditorCopyButton,
} from '@semantic-components/ui-lab';

@Component({
  selector: 'app-python-code-editor-demo',
  imports: [
    ScCodeEditor,
    ScCodeEditorHeader,
    ScCodeEditorLabel,
    ScCodeEditorContent,
    ScCodeEditorCopyButton,
  ],
  template: `
    <div sc-code-editor>
      <div sc-code-editor-header>
        <div class="flex items-center gap-2">
          <span class="text-sm text-muted-foreground">script.py</span>
          <span sc-code-editor-label>python</span>
        </div>
        <button sc-code-editor-copy-button [code]="pythonCode"></button>
      </div>
      <div
        sc-code-editor-content
        [(value)]="pythonCode"
        language="python"
        filename="script.py"
      ></div>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PythonCodeEditorDemo {
  pythonCode = `# Python Example
from typing import List, Optional
import asyncio

class DataProcessor:
    """Process data with various transformations."""

    def __init__(self, data: List[dict]):
        self.data = data
        self._cache = {}

    async def process(self) -> List[dict]:
        results = []
        for item in self.data:
            processed = await self._transform(item)
            results.append(processed)
        return results

    async def _transform(self, item: dict) -> dict:
        # Simulate async processing
        await asyncio.sleep(0.1)
        return {**item, 'processed': True}

# Usage
if __name__ == '__main__':
    data = [{'id': 1}, {'id': 2}, {'id': 3}]
    processor = DataProcessor(data)
    result = asyncio.run(processor.process())
    print(result)`;
}
