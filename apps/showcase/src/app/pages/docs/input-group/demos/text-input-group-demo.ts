import { Component, ViewEncapsulation } from '@angular/core';
import {
  ScInput,
  ScInputGroup,
  ScInputGroupAddon,
  ScInputGroupText,
  ScTextarea,
} from '@semantic-components/ui';

@Component({
  selector: 'app-text-input-group-demo',
  imports: [
    ScInput,
    ScInputGroup,
    ScInputGroupAddon,
    ScInputGroupText,
    ScTextarea,
  ],
  template: `
    <div class="grid w-full max-w-sm gap-6">
      <div scInputGroup>
        <input
          scInput
          placeholder="0.00"
          aria-label="Amount"
          inputmode="decimal"
        />
        <div scInputGroupAddon>
          <span scInputGroupText>$</span>
        </div>
        <div scInputGroupAddon align="inline-end">
          <span scInputGroupText>USD</span>
        </div>
      </div>
      <div scInputGroup>
        <input
          scInput
          placeholder="example.com"
          aria-label="Website"
          class="ps-0.5!"
        />
        <div scInputGroupAddon>
          <span scInputGroupText>https://</span>
        </div>
        <div scInputGroupAddon align="inline-end">
          <span scInputGroupText>.com</span>
        </div>
      </div>
      <div scInputGroup>
        <input
          scInput
          placeholder="Enter your username"
          aria-label="Username"
        />
        <div scInputGroupAddon align="inline-end">
          <span scInputGroupText>&#64;company.com</span>
        </div>
      </div>
      <div scInputGroup>
        <textarea
          scTextarea
          placeholder="Enter your message"
          aria-label="Message"
        ></textarea>
        <div scInputGroupAddon align="block-end">
          <span scInputGroupText class="text-muted-foreground text-xs">
            120 characters left
          </span>
        </div>
      </div>
    </div>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class TextInputGroupDemo {}
