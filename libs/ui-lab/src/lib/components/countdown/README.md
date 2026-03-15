# Countdown

A directive-based countdown timer. The directive provides timer logic and exposes time values — consumers own the template.

## Directive

- `ScCountdown` — attribute directive (`[scCountdown]`) providing countdown behavior

## Usage

### Basic Countdown

```html
<div scCountdown #cd="scCountdown" [targetDate]="futureDate" class="gap-4">
  <div class="flex flex-col items-center">
    <span class="text-4xl font-bold">{{ cd.padNumber(cd.time().hours) }}</span>
    <span class="text-sm">Hours</span>
  </div>
  <span class="text-4xl font-bold">:</span>
  <div class="flex flex-col items-center">
    <span class="text-4xl font-bold">{{ cd.padNumber(cd.time().minutes) }}</span>
    <span class="text-sm">Minutes</span>
  </div>
  <span class="text-4xl font-bold">:</span>
  <div class="flex flex-col items-center">
    <span class="text-4xl font-bold">{{ cd.padNumber(cd.time().seconds) }}</span>
    <span class="text-sm">Seconds</span>
  </div>
</div>
```

### Inline Format

```html
<span scCountdown #cd="scCountdown" [targetDate]="futureDate" class="font-mono text-lg">{{ cd.padNumber(cd.time().hours) }}:{{ cd.padNumber(cd.time().minutes) }}:{{ cd.padNumber(cd.time().seconds) }}</span>
```

### With Days

```html
<div scCountdown #cd="scCountdown" [targetDate]="futureDate" class="gap-4">
  @if (cd.time().days > 0) {
  <div class="flex flex-col items-center">
    <span class="text-4xl font-bold">{{ cd.padNumber(cd.time().days) }}</span>
    <span class="text-sm">Days</span>
  </div>
  <span class="text-4xl font-bold">:</span>
  }
  <!-- hours, minutes, seconds... -->
</div>
```

### Cards Variant

```html
<div scCountdown #cd="scCountdown" [targetDate]="futureDate" class="gap-3">
  <div class="bg-muted flex min-w-[70px] flex-col items-center rounded-lg p-3">
    <span class="text-3xl font-bold">{{ cd.padNumber(cd.time().hours) }}</span>
    <span class="text-xs tracking-wider uppercase">HRS</span>
  </div>
  <!-- more units... -->
</div>
```

### Event Timer with Controls

```typescript
@Component({
  template: `
    <div scCountdown #cd="scCountdown" [targetDate]="eventDate" [autoStart]="false" (complete)="onComplete()">{{ cd.padNumber(cd.time().hours) }}:{{ cd.padNumber(cd.time().minutes) }}:{{ cd.padNumber(cd.time().seconds) }}</div>
    <button (click)="cd.start()">Start</button>
    <button (click)="cd.stop()">Pause</button>
  `,
})
export class EventTimer {
  eventDate = new Date('2024-12-31T23:59:59');

  onComplete() {
    console.log('Happy New Year!');
  }
}
```

## API

### ScCountdown

| Input        | Type      | Default | Description            |
| ------------ | --------- | ------- | ---------------------- |
| `class`      | `string`  | `''`    | Additional CSS classes |
| `targetDate` | `Date`    | -       | **Required.** End date |
| `autoStart`  | `boolean` | `true`  | Start automatically    |

| Output     | Type            | Description               |
| ---------- | --------------- | ------------------------- |
| `tick`     | `CountdownTime` | Emits every second        |
| `complete` | `void`          | Emits when countdown ends |

| Property/Method | Type                    | Description                          |
| --------------- | ----------------------- | ------------------------------------ |
| `time()`        | `Signal<CountdownTime>` | Current time values                  |
| `padNumber(n)`  | `string`                | Zero-pad a number to 2 digits        |
| `ariaLabel()`   | `Signal<string>`        | Human-readable time remaining string |
| `start()`       | `void`                  | Start the countdown                  |
| `stop()`        | `void`                  | Stop the countdown                   |
| `reset()`       | `void`                  | Reset to initial time                |
| `getTime()`     | `CountdownTime`         | Get current time values              |
| `isRunning()`   | `boolean`               | Check if running                     |

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

## Accessibility

- Host has `role="timer"` for screen readers
- Dynamic `aria-label` with human-readable time remaining
