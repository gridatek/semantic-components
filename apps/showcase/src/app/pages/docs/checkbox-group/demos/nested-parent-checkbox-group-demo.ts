import { Component, ViewEncapsulation, computed, signal } from '@angular/core';
import {
  ScCheckbox,
  ScCheckboxField,
  ScCheckboxGroup,
} from '@semantic-components/ui';

/** A parent inside a group: Manage Users heads its own group; the top parent is mixed while it is partly ticked. */
@Component({
  selector: 'app-nested-parent-checkbox-group-demo',
  imports: [ScCheckbox, ScCheckboxField, ScCheckboxGroup],
  template: `
    <div
      scCheckboxGroup
      aria-label="User permissions"
      [allValues]="mainPermissions"
      [value]="main()"
      (valueChange)="setMain($event)"
    >
      <label scCheckboxField>
        <input scCheckbox parent [indeterminate]="managementPartly()" />
        User Permissions
      </label>
      <div class="flex flex-col gap-3 ps-6">
        <label scCheckboxField>
          <input scCheckbox value="view-dashboard" />
          View Dashboard
        </label>
        <label scCheckboxField>
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
          <label scCheckboxField>
            <input scCheckbox parent />
            Manage Users
          </label>
          <div class="flex flex-col gap-3 ps-6">
            <label scCheckboxField>
              <input scCheckbox value="create-user" />
              Create User
            </label>
            <label scCheckboxField>
              <input scCheckbox value="edit-user" />
              Edit User
            </label>
            <label scCheckboxField>
              <input scCheckbox value="delete-user" />
              Delete User
            </label>
            <label scCheckboxField>
              <input scCheckbox value="assign-roles" />
              Assign Roles
            </label>
          </div>
        </div>
      </div>
    </div>
  `,
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
}
