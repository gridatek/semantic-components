import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import {
  ScButton,
  ScCard,
  ScCardBody,
  ScCardDescription,
  ScCardFooter,
  ScCardHeader,
  ScCardTitle,
  ScField,
  ScFieldGroup,
  ScInput,
  ScLabel,
} from '@semantic-components/ui';
import {
  ScNativeSelect,
  ScNativeSelectContainer,
  ScNativeSelectIcon,
} from '@semantic-components/ui-lab';
import { SiChevronDownIcon } from '@semantic-icons/lucide-icons';

@Component({
  selector: 'app-form-card-demo',
  imports: [
    ScButton,
    ScCard,
    ScCardBody,
    ScCardDescription,
    ScCardFooter,
    ScCardHeader,
    ScCardTitle,
    ScField,
    ScFieldGroup,
    ScInput,
    ScLabel,
    ScNativeSelect,
    ScNativeSelectContainer,
    ScNativeSelectIcon,
    SiChevronDownIcon,
  ],
  template: `
    <form>
      <div scCard class="w-[350px]">
        <div scCardHeader>
          <h3 scCardTitle>Create project</h3>
          <p scCardDescription>Deploy your new project in one-click.</p>
        </div>
        <div scCardBody>
          <div scFieldGroup>
            <div scField>
              <label scLabel>Name</label>
              <input scInput placeholder="Name of your project" />
            </div>
            <div scField>
              <label scLabel>Framework</label>
              <div scNativeSelectContainer>
                <select scNativeSelect>
                  <option value="">Select a framework</option>
                  <option value="next">Next.js</option>
                  <option value="angular">Angular</option>
                  <option value="vue">Vue</option>
                  <option value="svelte">Svelte</option>
                </select>
                <svg
                  siChevronDownIcon
                  scNativeSelectIcon
                  aria-hidden="true"
                ></svg>
              </div>
            </div>
          </div>
        </div>
        <div scCardFooter class="flex justify-between">
          <button scButton variant="outline">Cancel</button>
          <button scButton>Deploy</button>
        </div>
      </div>
    </form>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormCardDemo {}
