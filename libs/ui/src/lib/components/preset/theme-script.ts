/** What the script needs: the choices' full names (prefixed) and the preset's defaults. */
export interface ScThemeScriptOptions {
  readonly modeKey: string;
  readonly themeKey: string;
  readonly mode: string;
  readonly theme: string;
}

/**
 * A value written into the script: a JSON string, with `<` escaped so a
 * value can't close the `<script>`.
 */
function literal(value: string): string {
  return JSON.stringify(value).replace(/</g, '\\u003c');
}

/**
 * The script the server puts at the top of `<head>`: before the first paint,
 * it reads the user's mode and theme (the cookie, else its `localStorage`
 * copy; else the preset's) and sets `dark`, `color-scheme` and
 * `data-theme` on the page's root — "system" from `prefers-color-scheme`,
 * which only the browser knows. `color-scheme` as `ScPresetManager` sets
 * it (inline, so no stylesheet overrides it): the browser's own parts —
 * scrollbars, native controls — are in the page's mode from the first paint.
 * A page rendered on the server is then drawn in the right mode from the
 * first paint, prerendered pages and "system" included. Plain ES5, no
 * module: it runs before the app.
 */
export function themeScript(options: ScThemeScriptOptions): string {
  return `(function () {
  function read(name) {
    var parts = document.cookie.split(';');
    for (var i = 0; i < parts.length; i++) {
      var at = parts[i].indexOf('=');
      if (at > 0 && parts[i].slice(0, at).trim() === name)
        return decodeURIComponent(parts[i].slice(at + 1).trim());
    }
    try {
      return localStorage.getItem(name);
    } catch (e) {
      return null;
    }
  }
  try {
    var root = document.documentElement;
    var mode = read(${literal(options.modeKey)});
    if (mode !== 'light' && mode !== 'dark' && mode !== 'system')
      mode = ${literal(options.mode)};
    var dark =
      mode === 'dark' ||
      (mode === 'system' &&
        !!window.matchMedia &&
        window.matchMedia('(prefers-color-scheme: dark)').matches);
    if (dark) root.classList.add('dark');
    else root.classList.remove('dark');
    root.style.colorScheme = dark ? 'dark' : 'light';
    var theme = read(${literal(options.themeKey)}) || ${literal(options.theme)};
    if (theme === 'default') root.removeAttribute('data-theme');
    else root.setAttribute('data-theme', theme);
  } catch (e) {}
})();`;
}
