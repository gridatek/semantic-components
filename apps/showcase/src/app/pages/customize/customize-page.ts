import {
  Component,
  ViewEncapsulation,
  computed,
  effect,
  inject,
  signal,
} from '@angular/core';
import {
  ScBadge,
  ScButton,
  ScCard,
  ScCardBody,
  ScCardDescription,
  ScCardHeader,
  ScCardTitle,
  ScCopyToClipboard,
  ScInput,
  ScLabel,
  ScSeparator,
  ScSwitch,
  ScSwitchField,
  ScThemeManager,
  cn,
} from '@semantic-components/ui';
import { COLOR_SCHEMES, RADIUS_OPTIONS } from './color-schemes';

@Component({
  selector: 'app-customize-page',
  imports: [
    ScBadge,
    ScButton,
    ScCard,
    ScCardBody,
    ScCardDescription,
    ScCardHeader,
    ScCardTitle,
    ScCopyToClipboard,
    ScInput,
    ScLabel,
    ScSeparator,
    ScSwitch,
    ScSwitchField,
  ],
  template: `
    <div class="mx-auto w-full max-w-7xl px-6 py-10">
      <header class="mb-8 space-y-2">
        <h1 class="text-3xl font-semibold tracking-tight">Customize</h1>
        <p class="text-muted-foreground">
          Pick your base color, radius and theme to generate your own version of
          semantic-components.
        </p>
      </header>

      <div class="grid gap-8 lg:grid-cols-[18rem_1fr]">
        <!-- Customizer panel -->
        <aside
          class="bg-card text-card-foreground ring-foreground/10 h-fit space-y-6 rounded-xl p-5 ring-1"
        >
          <section class="space-y-3">
            <div class="flex items-center justify-between">
              <h2 class="text-sm font-medium">Color</h2>
              <span class="text-muted-foreground text-xs">
                {{ activeScheme().label }}
              </span>
            </div>
            <div class="grid grid-cols-4 gap-2">
              @for (scheme of schemes; track scheme.id) {
                <button
                  type="button"
                  [attr.aria-pressed]="colorScheme() === scheme.id"
                  [attr.aria-label]="scheme.label"
                  [title]="scheme.label"
                  [class]="swatchClass(colorScheme() === scheme.id)"
                  (click)="setScheme(scheme.id)"
                >
                  <span
                    class="ring-foreground/15 block size-5 rounded-full ring-1"
                    [style.background]="scheme.swatch"
                  ></span>
                </button>
              }
            </div>
          </section>

          <div scSeparator></div>

          <section class="space-y-3">
            <div class="flex items-center justify-between">
              <h2 class="text-sm font-medium">Radius</h2>
              <span class="text-muted-foreground text-xs">
                {{ radius() }}
              </span>
            </div>
            <div class="grid grid-cols-5 gap-2">
              @for (option of radii; track option.value) {
                <button
                  type="button"
                  scButton
                  [variant]="radius() === option.value ? 'default' : 'outline'"
                  size="sm"
                  (click)="setRadius(option.value)"
                >
                  {{ option.label }}
                </button>
              }
            </div>
          </section>

          <div scSeparator></div>

          <section class="space-y-3">
            <h2 class="text-sm font-medium">Mode</h2>
            <div class="grid grid-cols-2 gap-2">
              <button
                type="button"
                scButton
                [variant]="mode() === 'light' ? 'default' : 'outline'"
                size="sm"
                (click)="setMode('light')"
              >
                Light
              </button>
              <button
                type="button"
                scButton
                [variant]="mode() === 'dark' ? 'default' : 'outline'"
                size="sm"
                (click)="setMode('dark')"
              >
                Dark
              </button>
            </div>
          </section>

          <div scSeparator></div>

          <button
            type="button"
            scButton
            variant="outline"
            size="sm"
            class="w-full"
            (click)="reset()"
          >
            Reset
          </button>
        </aside>

        <!-- Preview + output -->
        <section class="space-y-8">
          <div>
            <h2 class="mb-3 text-sm font-medium">Preview</h2>
            <div class="grid gap-4 md:grid-cols-2">
              <div scCard>
                <div scCardHeader>
                  <h3 scCardTitle>Create an account</h3>
                  <p scCardDescription>
                    Enter your email below to create a new account.
                  </p>
                </div>
                <div scCardBody class="space-y-3">
                  <div class="space-y-1.5">
                    <label scLabel for="customize-preview-email">Email</label>
                    <input
                      scInput
                      id="customize-preview-email"
                      type="email"
                      placeholder="m@example.com"
                    />
                  </div>
                  <div class="space-y-1.5">
                    <label scLabel for="customize-preview-password">
                      Password
                    </label>
                    <input
                      scInput
                      id="customize-preview-password"
                      type="password"
                    />
                  </div>
                  <label scSwitchField>
                    <input type="checkbox" scSwitch [checked]="true" />
                    Email me about new features
                  </label>
                  <button scButton class="w-full">Create account</button>
                </div>
              </div>

              <div scCard>
                <div scCardHeader>
                  <h3 scCardTitle>Buttons & badges</h3>
                  <p scCardDescription>
                    How interactive elements look with your theme.
                  </p>
                </div>
                <div scCardBody class="space-y-3">
                  <div class="flex flex-wrap gap-2">
                    <button scButton>Default</button>
                    <button scButton variant="secondary">Secondary</button>
                    <button scButton variant="outline">Outline</button>
                    <button scButton variant="ghost">Ghost</button>
                    <button scButton variant="destructive">Destructive</button>
                  </div>
                  <div class="flex flex-wrap gap-2">
                    <span scBadge>Default</span>
                    <span scBadge variant="secondary">Secondary</span>
                    <span scBadge variant="outline">Outline</span>
                    <span scBadge variant="destructive">Destructive</span>
                  </div>
                  <div class="flex items-center gap-2">
                    <button scButton size="sm">Small</button>
                    <button scButton>Medium</button>
                    <button scButton size="lg">Large</button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div>
            <div class="mb-3 flex items-center justify-between">
              <h2 class="text-sm font-medium">
                Copy & paste the following code
              </h2>
              <button
                type="button"
                scButton
                variant="outline"
                size="sm"
                [scCopyToClipboard]="cssSnippet()"
                #copier="scCopyToClipboard"
              >
                {{ copier.copied() ? 'Copied' : 'Copy' }}
              </button>
            </div>
            <pre
              class="bg-muted text-muted-foreground ring-foreground/10 max-h-96 overflow-auto rounded-lg p-4 text-xs leading-relaxed ring-1"
            ><code>{{ cssSnippet() }}</code></pre>
          </div>
        </section>
      </div>
    </div>
  `,
  host: { class: 'block' },
  encapsulation: ViewEncapsulation.None,
})
export default class CustomizePage {
  private readonly themeManager = inject(ScThemeManager);

  protected readonly schemes = COLOR_SCHEMES;
  protected readonly radii = RADIUS_OPTIONS;

  protected readonly colorScheme = this.themeManager.colorScheme;
  protected readonly mode = this.themeManager.resolvedMode;
  protected readonly radius = signal<string>('0.625rem');

  protected readonly activeScheme = computed(
    () =>
      this.schemes.find((s) => s.id === this.colorScheme()) ?? this.schemes[0],
  );

  protected readonly cssSnippet = computed(() => {
    const scheme = this.activeScheme();
    const radius = this.radius();
    const selector =
      scheme.id === 'default' ? ':root' : `[data-theme='${scheme.id}']`;
    return `${selector} {
  --radius: ${radius};
  --primary: ${scheme.swatch};
  --ring: ${scheme.swatch};
}`;
  });

  constructor() {
    effect(() => {
      const value = this.radius();
      if (typeof document === 'undefined') return;
      document.documentElement.style.setProperty('--radius', value);
    });
  }

  protected setScheme(id: string): void {
    this.themeManager.setColorScheme(id);
  }

  protected setRadius(value: string): void {
    this.radius.set(value);
  }

  protected setMode(mode: 'light' | 'dark'): void {
    this.themeManager.setMode(mode);
  }

  protected reset(): void {
    this.themeManager.setColorScheme('default');
    this.themeManager.setMode('light');
    this.radius.set('0.625rem');
  }

  protected swatchClass(active: boolean): string {
    return cn(
      'group relative flex size-9 items-center justify-center rounded-md border transition-colors',
      active
        ? 'border-ring ring-2 ring-ring/40'
        : 'border-border hover:bg-muted',
    );
  }
}
