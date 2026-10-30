import { Component, ViewEncapsulation } from '@angular/core';
import {
  ScField,
  ScFieldDescription,
  ScFieldGroup,
  ScInput,
  ScInputGroup,
  ScInputGroupAddon,
  ScInputGroupButton,
  ScInputGroupText,
  ScLabel,
  ScTextarea,
} from '@semantic-components/ui';
import { SiCopyIcon, SiFileCodeIcon } from '@semantic-icons/lucide-icons';

@Component({
  selector: 'app-block-start-input-group-demo',
  imports: [
    ScField,
    ScFieldDescription,
    ScFieldGroup,
    ScInput,
    ScInputGroup,
    ScInputGroupAddon,
    ScInputGroupButton,
    ScInputGroupText,
    ScLabel,
    ScTextarea,
    SiCopyIcon,
    SiFileCodeIcon,
  ],
  template: `
    <div scFieldGroup class="max-w-sm">
      <div scField>
        <label scLabel>Name</label>
        <div scInputGroup class="h-auto">
          <input scInput placeholder="Enter your name" />
          <div scInputGroupAddon align="block-start">
            <span scInputGroupText>Full Name</span>
          </div>
        </div>
        <p scFieldDescription>Header positioned above the input.</p>
      </div>
      <div scField>
        <label scLabel>Script</label>
        <div scInputGroup>
          <textarea
            scTextarea
            placeholder="console.log('Hello, world!');"
            class="font-mono text-sm"
          ></textarea>
          <div scInputGroupAddon align="block-start">
            <svg siFileCodeIcon class="text-muted-foreground"></svg>
            <span scInputGroupText class="font-mono">script.js</span>
            <button scInputGroupButton size="icon-xs" class="ms-auto">
              <svg siCopyIcon></svg>
              <span class="sr-only">Copy</span>
            </button>
          </div>
        </div>
        <p scFieldDescription>Header positioned above the textarea.</p>
      </div>
    </div>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class BlockStartInputGroupDemo {}
