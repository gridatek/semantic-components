import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { NestedParentCheckboxGroupDemo } from './nested-parent-checkbox-group-demo';

@Component({
  selector: 'app-nested-parent-checkbox-group-demo-container',
  imports: [DemoContainer, NestedParentCheckboxGroupDemo],
  template: `
    <app-demo-container
      title="Nested parent"
      demoUrl="/demos/checkbox-group/nested-parent-checkbox-group-demo"
      [code]="code"
    >
      <app-nested-parent-checkbox-group-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class NestedParentCheckboxGroupDemoContainer {
  readonly code = `import { Component, ViewEncapsulation, computed, signal } from '@angular/core';
import { ScCheckbox, ScCheckboxGroup, ScField } from '@semantic-components/ui';

/** A parent inside a group: Manage Users heads its own group; the top parent is mixed while it is partly ticked. */
@Component({
  selector: 'app-nested-parent-checkbox-group-demo',
  imports: [ScCheckbox, ScCheckboxGroup, ScField],
  template: \`
    <div
      scCheckboxGroup
      aria-label="User permissions"
      [allValues]="mainPermissions"
      [value]="main()"
      (valueChange)="setMain($event)"
    >
      <label scField orientation="horizontal">
        <input scCheckbox parent [indeterminate]="managementPartly()" />
        User Permissions
      </label>
      <div class="flex flex-col gap-3 ps-6">
        <label scField orientation="horizontal">
          <input scCheckbox value="view-dashboard" />
          View Dashboard
        </label>
        <label scField orientation="horizontal">
          <input scCheckbox value="access-reports" />
          Access Reports
        </label>
        <div
          scCheckboxGroup
          aria-label="Manage users"
          [allValues]="managementPermissions"
          [value]="management()"
          (valueChange)="setManagement($event)"
        >
          <label scField orientation="horizontal">
            <input scCheckbox parent />
            Manage Users
          </label>
          <div class="flex flex-col gap-3 ps-6">
            <label scField orientation="horizontal">
              <input scCheckbox value="create-user" />
              Create User
            </label>
            <label scField orientation="horizontal">
              <input scCheckbox value="edit-user" />
              Edit User
            </label>
            <label scField orientation="horizontal">
              <input scCheckbox value="delete-user" />
              Delete User
            </label>
            <label scField orientation="horizontal">
              <input scCheckbox value="assign-roles" />
              Assign Roles
            </label>
          </div>
        </div>
      </div>
    </div>
  \`,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class NestedParentCheckboxGroupDemo {
  protected readonly mainPermissions = [
    'view-dashboard',
    'manage-users',
    'access-reports',
  ];
  protected readonly managementPermissions = [
    'create-user',
    'edit-user',
    'delete-user',
    'assign-roles',
  ];
  protected readonly main = signal<string[]>([]);
  protected readonly management = signal<string[]>([]);
  protected readonly managementPartly = computed(
    () =>
      this.management().length > 0 &&
      this.management().length < this.managementPermissions.length,
  );

  // The top group's "manage-users" follows the nested group: all of it ticked.
  protected setMain(value: string[]): void {
    if (value.includes('manage-users')) {
      this.management.set([...this.managementPermissions]);
    } else if (this.management().length === this.managementPermissions.length) {
      this.management.set([]);
    }
    this.main.set(value);
  }

  protected setManagement(value: string[]): void {
    const all = value.length === this.managementPermissions.length;
    this.main.update((main) =>
      all
        ? [...new Set([...main, 'manage-users'])]
        : main.filter((permission) => permission !== 'manage-users'),
    );
    this.management.set(value);
  }
}`;
}
