import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { ComboboxItem, ScCombobox, ScLabel } from '@semantic-components/ui';

@Component({
  selector: 'app-async-combobox-demo',
  imports: [FormsModule, ScCombobox, ScLabel],
  template: `
    <label class="mb-2" sc-label for="users-combobox">Search users</label>
    <sc-combobox
      [(ngModel)]="selectedUser"
      [async]="true"
      [asyncSearchFn]="searchUsers"
      [inputId]="'users-combobox'"
      (selectionChange)="onUserChange($event)"
      placeholder="Start typing to search..."
    />
    <p class="mt-4 text-sm text-gray-600">
      Selected user:
      <code class="bg-gray-100 px-2 py-1 rounded">{{ selectedUser || 'None' }}</code>
    </p>
  `,
  styles: ``,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AsyncComboboxDemo {
  selectedUser: string = '';

  // Async search function
  searchUsers = async (query: string): Promise<ComboboxItem[]> => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 800));

    const allUsers = [
      { label: 'John Doe', value: 'john_doe', subtitle: '@johndoe' },
      { label: 'Jane Smith', value: 'jane_smith', subtitle: '@janesmith' },
      { label: 'Bob Johnson', value: 'bob_johnson', subtitle: '@bobjohnson' },
      { label: 'Alice Williams', value: 'alice_williams', subtitle: '@alicew' },
      { label: 'Charlie Brown', value: 'charlie_brown', subtitle: '@charlieb' },
      { label: 'Diana Prince', value: 'diana_prince', subtitle: '@dianaprince' },
      { label: 'Eve Adams', value: 'eve_adams', subtitle: '@eveadams' },
      { label: 'Frank Miller', value: 'frank_miller', subtitle: '@frankmiller' },
      { label: 'Grace Lee', value: 'grace_lee', subtitle: '@gracelee' },
      { label: 'Henry Wilson', value: 'henry_wilson', subtitle: '@henryw' },
      { label: 'Iris Chen', value: 'iris_chen', subtitle: '@irischen' },
      { label: 'Jack Thompson', value: 'jack_thompson', subtitle: '@jackthompson' },
    ];

    return allUsers.filter(
      (user) =>
        user.label.toLowerCase().includes(query.toLowerCase()) ||
        user.subtitle.toLowerCase().includes(query.toLowerCase()),
    );
  };

  onUserChange(value: string) {
    console.log('User selected:', value);
  }
}
