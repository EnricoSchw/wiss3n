import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { ProdConfig } from './blocks/config/prod.config';
import { WebWiss3NAppModule } from './app.module';

ProdConfig();

if (module['hot']) {
  module['hot'].accept();
}

platformBrowserDynamic()
  .bootstrapModule(WebWiss3NAppModule, { preserveWhitespaces: true })
  // eslint-disable-next-line no-console
  .then(success => console.log('Application started'))
  .catch(err => console.error(err));
