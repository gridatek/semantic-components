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
  selector: 'app-python-code-editor-demo',
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
          <span class="text-muted-foreground text-sm">script.py</span>
          <span scCodeEditorLabel>python</span>
        </div>
        <button
          scCodeEditorCopyButton
          #copy="scCodeEditorCopyButton"
          [code]="pythonCode"
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
        [(value)]="pythonCode"
        language="python"
        filename="script.py"
      ></div>
    </div>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
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
