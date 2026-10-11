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

| Input         | Type              | Default                          | Description              |
| ------------- | ----------------- | -------------------------------- | ------------------------ |
| `class`       | `string`          | `''`                             | Additional CSS classes   |
| `placeholder` | `string`          | `'Type @ to mention someone...'` | Placeholder text         |
| `disabled`    | `boolean`         | `false`                          | Disable the input        |
| `rows`        | `number`          | `3`                              | Number of visible rows   |
| `users`       | `ScMentionUser[]` | `[]`                             | Available users/entities |
| `trigger`     | `string`          | `'@'`                            | Trigger character        |

| Output          | Type              | Description                      |
| --------------- | ----------------- | -------------------------------- |
| `value`         | `string`          | Two-way binding for text value   |
| `mentions`      | `ScMentionUser[]` | Two-way binding for mentions     |
| `mentionSelect` | `ScMentionUser`   | Emits when a mention is selected |

| Method            | Returns           | Description        |
| ----------------- | ----------------- | ------------------ |
| `focus()`         | `void`            | Focus the textarea |
| `getMentions()`   | `ScMentionUser[]` | Get all mentions   |
| `clearMentions()` | `void`            | Clear all mentions |

## MentionUser Interface

```typescript
interface ScMentionUser {
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
  mentions = signal<ScMentionUser[]>([]);
  teamMembers: ScMentionUser[] = [
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
const users: ScMentionUser[] = [
  { id: '1', name: 'Sarah', username: 'sarah', avatar: 'https://example.com/sarah.jpg' },
  { id: '2', name: 'Mike', username: 'mike', avatar: 'https://example.com/mike.jpg' },
];
```

### Channel Mentions

```html
<sc-mention-input [users]="channels" trigger="#" placeholder="Mention a channel with #..." />
```

```typescript
const channels: ScMentionUser[] = [
  { id: '1', name: 'General', username: 'general' },
  { id: '2', name: 'Engineering', username: 'engineering' },
  { id: '3', name: 'Design', username: 'design' },
];
```

## Accessibility

- Focus stays in the text field: it has `aria-autocomplete="list"`, and while suggestions are shown `aria-controls` (the listbox) and `aria-activedescendant` (the highlighted option).
- Suggestions are a `role="listbox"` named "Suggestions" of `role="option"`s with `aria-selected`.
- ↑/↓ move the highlight, Enter or Tab inserts the mention, Escape closes the list.
- Clicking a suggestion inserts it without moving focus out of the field.
