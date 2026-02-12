import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { TypescriptCodeEditorDemo } from './typescript-code-editor-demo';

@Component({
  selector: 'app-typescript-code-editor-demo-container',
  imports: [DemoContainer, TypescriptCodeEditorDemo],
  template: `
    <app-demo-container
      title="TypeScript"
      demoUrl="/demos/code-editor/typescript-code-editor-demo"
      [code]="code"
    >
      <app-typescript-code-editor-demo />
    </app-demo-container>
  `,
  host: { class: 'block' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TypescriptCodeEditorDemoContainer {
  readonly code = `import {
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
  selector: 'app-typescript-code-editor-demo',
  imports: [
    ScCodeEditor,
    ScCodeEditorHeader,
    ScCodeEditorLabel,
    ScCodeEditorContent,
    ScCodeEditorCopyButton,
  ],
  template: \`
    <div sc-code-editor>
      <div sc-code-editor-header>
        <div class="flex items-center gap-2">
          <span class="text-sm text-muted-foreground">component.ts</span>
          <span sc-code-editor-label>typescript</span>
        </div>
        <button sc-code-editor-copy-button [code]="typescriptCode"></button>
      </div>
      <div
        sc-code-editor-content
        [(value)]="typescriptCode"
        language="typescript"
        filename="component.ts"
      ></div>
    </div>
  \`,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TypescriptCodeEditorDemo {
  typescriptCode = \`// TypeScript Example
interface User {
  id: number;
  name: string;
  email: string;
  isActive: boolean;
}

class UserService {
  private users: User[] = [];

  async getUser(id: number): Promise<User | undefined> {
    return this.users.find(user => user.id === id);
  }

  addUser(user: Omit<User, 'id'>): User {
    const newUser: User = {
      ...user,
      id: this.users.length + 1,
    };
    this.users.push(newUser);
    return newUser;
  }
}

const service = new UserService();\`;
}`;
}
