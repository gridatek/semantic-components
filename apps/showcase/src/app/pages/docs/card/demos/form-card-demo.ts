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
} from '@semantic-components/ui';
import {
  ScField,
  ScFieldGroup,
  ScInput,
  ScLabel,
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
      <div sc-card class="w-[350px]">
        <div sc-card-header>
          <h3 sc-card-title>Create project</h3>
          <p sc-card-description>Deploy your new project in one-click.</p>
        </div>
        <div sc-card-body>
          <div sc-field-group>
            <div sc-field>
              <label sc-label>Name</label>
              <input sc-input placeholder="Name of your project" />
            </div>
            <div sc-field>
              <label sc-label>Framework</label>
              <div sc-native-select-container>
                <select sc-native-select>
                  <option value="">Select a framework</option>
                  <option value="next">Next.js</option>
                  <option value="angular">Angular</option>
                  <option value="vue">Vue</option>
                  <option value="svelte">Svelte</option>
                </select>
                <svg
                  si-chevron-down-icon
                  sc-native-select-icon
                  aria-hidden="true"
                ></svg>
              </div>
            </div>
          </div>
        </div>
        <div sc-card-footer class="flex justify-between">
          <button sc-button variant="outline">Cancel</button>
          <button sc-button>Deploy</button>
        </div>
      </div>
    </form>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormCardDemo {}
