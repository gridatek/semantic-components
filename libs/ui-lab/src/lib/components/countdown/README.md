# Countdown

Countdown timer with multiple variants, customizable labels, and completion events.

## Components

- `ScCountdown` - Full countdown display with days, hours, minutes, seconds
- `ScCountdownSimple` - Inline countdown text

## Usage

### Basic Countdown

```html
<sc-countdown [targetDate]="futureDate" (complete)="onComplete()" />
```

### Simple Countdown

```html
<sc-countdown-simple [targetDate]="futureDate" format="hh:mm:ss" />
```

### Cards Variant

```html
<sc-countdown [targetDate]="futureDate" variant="cards" />
```

## API

### ScCountdown

| Input            | Type                                | Default     | Description            |
| ---------------- | ----------------------------------- | ----------- | ---------------------- |
| `class`          | `string`                            | `''`        | Additional CSS classes |
| `targetDate`     | `Date`                              | -           | **Required.** End date |
| `autoStart`      | `boolean`                           | `true`      | Start automatically    |
| `showDays`       | `boolean`                           | `true`      | Show days unit         |
| `showHours`      | `boolean`                           | `true`      | Show hours unit        |
| `showMinutes`    | `boolean`                           | `true`      | Show minutes unit      |
| `showSeconds`    | `boolean`                           | `true`      | Show seconds unit      |
| `alwaysShowDays` | `boolean`                           | `false`     | Show days even if 0    |
| `showSeparator`  | `boolean`                           | `true`      | Show separators        |
| `separator`      | `string`                            | `':'`       | Separator character    |
| `daysLabel`      | `string`                            | `'Days'`    | Days label text        |
| `hoursLabel`     | `string`                            | `'Hours'`   | Hours label text       |
| `minutesLabel`   | `string`                            | `'Minutes'` | Minutes label text     |
| `secondsLabel`   | `string`                            | `'Seconds'` | Seconds label text     |
| `variant`        | `'default' \| 'compact' \| 'cards'` | `'default'` | Visual variant         |

| Output     | Type            | Description               |
| ---------- | --------------- | ------------------------- |
| `tick`     | `CountdownTime` | Emits every second        |
| `complete` | `void`          | Emits when countdown ends |

| Method        | Returns         | Description             |
| ------------- | --------------- | ----------------------- |
| `start()`     | `void`          | Start the countdown     |
| `stop()`      | `void`          | Stop the countdown      |
| `reset()`     | `void`          | Reset to initial time   |
| `getTime()`   | `CountdownTime` | Get current time values |
| `isRunning()` | `boolean`       | Check if running        |

### ScCountdownSimple

| Input        | Type                              | Default      | Description            |
| ------------ | --------------------------------- | ------------ | ---------------------- |
| `class`      | `string`                          | `''`         | Additional CSS classes |
| `targetDate` | `Date`                            | -            | **Required.** End date |
| `format`     | `'hh:mm:ss' \| 'mm:ss' \| 'full'` | `'hh:mm:ss'` | Display format         |
| `autoStart`  | `boolean`                         | `true`       | Start automatically    |

| Output     | Type     | Description               |
| ---------- | -------- | ------------------------- |
| `tick`     | `number` | Emits remaining ms        |
| `complete` | `void`   | Emits when countdown ends |

| Method           | Returns  | Description         |
| ---------------- | -------- | ------------------- |
| `start()`        | `void`   | Start the countdown |
| `stop()`         | `void`   | Stop the countdown  |
| `getRemaining()` | `number` | Get remaining ms    |

## CountdownTime Interface

```typescript
interface CountdownTime {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  total: number; // Total milliseconds remaining
}
```

## Variants

| Variant   | Description                   |
| --------- | ----------------------------- |
| `default` | Large numbers with labels     |
| `compact` | Smaller, space-efficient      |
| `cards`   | Each unit in a card container |

## Format Options (Simple)

| Format     | Example Output | Description               |
| ---------- | -------------- | ------------------------- |
| `hh:mm:ss` | `02:30:45`     | Hours, minutes, seconds   |
| `mm:ss`    | `150:45`       | Total minutes and seconds |
| `full`     | `2d 02:30:45`  | Days prefix when > 0      |

## Examples

### Product Launch

```html
<div class="text-center">
  <h2>Coming Soon</h2>
  <sc-countdown [targetDate]="launchDate" variant="cards" daysLabel="DAYS" hoursLabel="HRS" minutesLabel="MIN" secondsLabel="SEC" (complete)="showLaunch()" />
</div>
```

### Flash Sale

```html
<div class="sale-banner">
  <span>Sale ends in:</span>
  <sc-countdown-simple [targetDate]="saleEndDate" format="hh:mm:ss" class="font-bold" />
</div>
```

### Event Timer

```typescript
@Component({
  template: `
    <sc-countdown #timer [targetDate]="eventDate" [autoStart]="false" (complete)="onEventStart()" />
    <button (click)="timer.start()">Start</button>
    <button (click)="timer.stop()">Pause</button>
  `,
})
export class EventTimer {
  eventDate = new Date('2024-12-31T23:59:59');

  onEventStart() {
    console.log('Happy New Year!');
  }
}
```

### Quiz Timer

```html
<sc-countdown-simple [targetDate]="quizEndTime" format="mm:ss" class="text-xl" (complete)="submitQuiz()" />
```

### Custom Labels

```html
<sc-countdown [targetDate]="date" daysLabel="D" hoursLabel="H" minutesLabel="M" secondsLabel="S" />
```

## Accessibility

- Container has `role="timer"` for screen readers
- Dynamic `aria-label` with human-readable time remaining
- Updates announce remaining time contextually
