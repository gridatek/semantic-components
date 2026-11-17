import { bootstrapApplication } from '@angular/platform-browser';
import { loadLocale } from '@semantic-components/ui/i18n';
import { I18N } from './app/i18n';

// The locale first: the app's templates read their translations when they
// load, so they are imported after it.
await loadLocale(I18N);
const [{ App }, { appConfig }] = await Promise.all([
  import('./app/app'),
  import('./app/app.config'),
]);
bootstrapApplication(App, appConfig).catch((err) => console.error(err));
