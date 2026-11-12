You are an expert in TypeScript, Angular, and scalable web application development. You write functional, maintainable, performant, and accessible code following Angular and TypeScript best practices.

## TypeScript Best Practices

- Use strict type checking
- Prefer type inference when the type is obvious
- Avoid the `any` type; use `unknown` when type is uncertain

## Angular Best Practices

- Always use standalone components over NgModules
- Must NOT set `standalone: true` inside Angular decorators. It's the default in Angular v20+.
- Use signals for state management
- Implement lazy loading for feature routes
- Do NOT use the `@HostBinding` and `@HostListener` decorators. Put host bindings inside the `host` object of the `@Component` or `@Directive` decorator instead
- No lifecycle hooks — no `OnInit`/`ngOnInit`, `OnChanges`, `AfterViewInit`, `AfterContentInit`, `OnDestroy`, nor their `implements`. Use the modern equivalents:
  - setup → the constructor (`inject()` works, the host element and its static attributes exist; an input's bound value doesn't yet — read inputs in `computed()`/`effect()`)
  - reacting to inputs → `computed()`, `linkedSignal()` or `effect()`
  - DOM work after render → `afterNextRender()` / `afterRenderEffect()`
  - queries → signal queries (`viewChild()`, `contentChild()`, `contentChildren()`), read in `computed()`/`effect()`
  - cleanup → `inject(DestroyRef).onDestroy()`
- Use `NgOptimizedImage` for all static images.
  - `NgOptimizedImage` does not work for inline base64 images.

## Styling

- Component styling tracks shadcn/ui, in all eight of its styles. The reference is the app generated with shadcn's CLI (`D:/Workspace/Projects/shadcn-reference`, one per style in `presets/<style>/`): classes written out in full, RTL-ready, in `src/components/ui/*.tsx`. What differs between styles lives in our presets (`libs/presets/<style>/src/*.ts`, read by the parts with `injectPreset()`); what is the same stays in the part. See [docs/shadcn-style-reference.md](../docs/shadcn-style-reference.md) for how to compare, and for the divergences that are deliberate.
- Animate with Angular's `animate.enter` and `animate.leave` whenever possible (with tw-animate's `animate-in` / `animate-out` classes; a direction from the preset, e.g. `data-[side=right]:slide-in-from-right-10`). shadcn's `data-open:` / `data-closed:` and `data-starting-style:` / `data-ending-style:` classes map to those — not to CSS transitions, `starting:` or a made-up class.

## Accessibility Requirements

- It MUST pass all AXE checks.
- It MUST follow all WCAG AA minimums, including focus management, color contrast, and ARIA attributes.

### Components

- Components used as element selectors (e.g. `<app-navbar>`) MUST use the `classInput` pattern to ensure `display: block` and allow class merging from consumers. Custom elements default to `display: inline`, which breaks layout features like sticky positioning. The pattern:

  ```typescript
  // host: { '[class]': 'class()' }
  readonly classInput = input<string>('', { alias: 'class' });
  protected readonly class = computed(() => cn('block', this.classInput()));
  ```

  - Import `cn` from `@semantic-components/ui`.
  - Simple demo components can use static `host: { class: 'block' }` instead.

- A part on a `button` styles itself: the preset's button, `private readonly buttonStyles = injectPreset().button;` then `this.buttonStyles({ variant, size })` (a toggle: `injectPreset().toggle`), `variant` and `size` inputs whose defaults suit its place, plus only the classes that are its own (position, visibility). No class list that copies a button look, and consumers add no `scButton`. Model: `pagination-last.ts`. Exceptions, which only add behaviour: triggers that go on any button (`scDialogTrigger`, `scDrawerTrigger`, `scSheetTrigger`…), controls over media (the lightbox's), and items in lists or grids. See [docs/button-parts-styling.md](../docs/button-parts-styling.md)
- A part's own classes that depend on its state (orientation, side, axis…) are plain classes chosen in its `computed()` — `this.orientation() === 'vertical' ? 'w-px self-stretch' : 'h-px w-full'` — never `data-[orientation=vertical]:…` variants on itself. A `data-[…]:` class outranks the consumer's plain class in specificity (class + attribute), and `cn` doesn't see them as conflicting, so the consumer's `h-4 self-center` silently loses. Data variants stay for styling by state from elsewhere (`group-data-…`, `in-data-…`, a parent's `*:data-…`) and in the preset strings taken from shadcn.
- Keep components small and focused on a single responsibility
- Use `input()` and `output()` functions instead of decorators
- Use `computed()` for derived state
- Do NOT set `changeDetection` in `@Component` — `OnPush` is the default in Angular v22+. Never use `ChangeDetectionStrategy.Eager` (or its deprecated alias `Default`)
- Set `encapsulation: ViewEncapsulation.None` in `@Component` decorator
- Prefer inline templates for small components
- Use Signal forms (`@angular/forms/signals`) exclusively. Do NOT import from `@angular/forms` — no `FormsModule`/`ngModel`, no `ReactiveFormsModule`/`FormControl`/`FormGroup`. See [docs/signal-forms-migration.md](../docs/signal-forms-migration.md)
- Constraints owned by Signal forms (`min`, `max`, `minlength`, `maxlength`, `pattern`, `required`, `disabled`, `name`) must be declared in the `form()` schema, not as static attributes on a `[formField]` element
- Do NOT use `ngClass`, use `class` bindings instead
- Do NOT use `ngStyle`, use `style` bindings instead
- When using external templates/styles, use paths relative to the component TS file.

## State Management

- Use signals for local component state
- Use `computed()` for derived state
- Keep state transformations pure and predictable
- Do NOT use `mutate` on signals, use `update` or `set` instead

## Templates

- Keep templates simple and avoid complex logic
- Use native control flow (`@if`, `@for`, `@switch`) instead of `*ngIf`, `*ngFor`, `*ngSwitch`
- Use the async pipe to handle observables
- Do not assume globals like (`new Date()`) are available.
- Do not write arrow functions in templates (they are not supported).

## Development Workflow

- Do NOT run builds (`nx build`). The user runs the project in dev mode — changes are reflected live.
- In demo container files (`*-container.ts`), do NOT edit the `readonly code = '';` property — it is auto-generated by `scripts/sync-demo-code.mjs`. Everything else (template, `demoUrl`, imports, routes in `demos-routes.ts`) is managed manually.

## Services

- Design services around a single responsibility
- Use `@Service()` (Angular v22+) instead of `@Injectable({ providedIn: 'root' })` for singleton services
- Use `@Service({ autoProvided: false })` instead of bare `@Injectable()` for services provided in a component's `providers` array
- Use the `inject()` function instead of constructor injection. `@Service` classes MUST NOT use constructor DI — the compiler rejects it (`@Service class cannot use constructor dependency injection. Use the inject function instead.`)
