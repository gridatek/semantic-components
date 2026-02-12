# Mention Input

Text input with @mention support for users, channels, or custom entities.

## Components

- `ScMentionInput` - Textarea with mention autocomplete

## Usage

### Basic Usage

```html
<sc-mention-input [(value)]="message" [(mentions)]="mentionedUsers" [users]="availableUsers" placeholder="Type @ to mention someone..." />
```

### Custom Trigger Character

```html
<sc-mention-input [users]="channels" trigger="#" placeholder="Type # to mention a channel..." />
```

## API

### ScMentionInput

| Input         | Type            | Default                          | Description              |
| ------------- | --------------- | -------------------------------- | ------------------------ |
| `class`       | `string`        | `''`                             | Additional CSS classes   |
| `placeholder` | `string`        | `'Type @ to mention someone...'` | Placeholder text         |
| `disabled`    | `boolean`       | `false`                          | Disable the input        |
| `rows`        | `number`        | `3`                              | Number of visible rows   |
| `users`       | `MentionUser[]` | `[]`                             | Available users/entities |
| `trigger`     | `string`        | `'@'`                            | Trigger character        |

| Output          | Type            | Description                      |
| --------------- | --------------- | -------------------------------- |
| `value`         | `string`        | Two-way binding for text value   |
| `mentions`      | `MentionUser[]` | Two-way binding for mentions     |
| `mentionSelect` | `MentionUser`   | Emits when a mention is selected |

| Method            | Returns         | Description        |
| ----------------- | --------------- | ------------------ |
| `focus()`         | `void`          | Focus the textarea |
| `getMentions()`   | `MentionUser[]` | Get all mentions   |
| `clearMentions()` | `void`          | Clear all mentions |

## MentionUser Interface

```typescript
interface MentionUser {
  id: string;
  name: string;
  username: string;
  avatar?: string;
}
```

## Features

- **Trigger Detection**: Activates when typing the trigger character (default: @)
- **Search Filtering**: Filters users by name or username as you type
- **Keyboard Navigation**: Use Arrow keys to navigate, Enter/Tab to select, Escape to close
- **Avatar Support**: Display user avatars in the suggestion list
- **Duplicate Prevention**: Already mentioned users are filtered from suggestions
- **Custom Triggers**: Use any character as a trigger (e.g., # for channels)

## Examples

### Chat Application

```typescript
@Component({
  template: `
    <sc-mention-input [(value)]="message" [(mentions)]="mentions" [users]="teamMembers" placeholder="Type a message..." [rows]="2" />
    <button (click)="sendMessage()">Send</button>
  `,
})
export class ChatInput {
  message = signal('');
  mentions = signal<MentionUser[]>([]);
  teamMembers: MentionUser[] = [
    { id: '1', name: 'John Doe', username: 'johndoe' },
    { id: '2', name: 'Jane Smith', username: 'janesmith' },
  ];

  sendMessage() {
    console.log('Message:', this.message());
    console.log('Mentioned:', this.mentions());
  }
}
```

### With Avatars

```typescript
const users: MentionUser[] = [
  { id: '1', name: 'Sarah', username: 'sarah', avatar: 'https://example.com/sarah.jpg' },
  { id: '2', name: 'Mike', username: 'mike', avatar: 'https://example.com/mike.jpg' },
];
```

### Channel Mentions

```html
<sc-mention-input [users]="channels" trigger="#" placeholder="Mention a channel with #..." />
```

```typescript
const channels: MentionUser[] = [
  { id: '1', name: 'General', username: 'general' },
  { id: '2', name: 'Engineering', username: 'engineering' },
  { id: '3', name: 'Design', username: 'design' },
];
```

## Accessibility

- Dropdown has `role="listbox"` for screen readers
- Options have `role="option"` and `aria-selected`
- Keyboard navigation support (Arrow keys, Enter, Tab, Escape)
- Focus management when selecting mentions
