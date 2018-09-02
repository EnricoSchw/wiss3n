import { Wiss3NStoreModule } from './store.module';

describe('StoreModule', () => {
  let storeModule: Wiss3NStoreModule;

  beforeEach(() => {
    storeModule = new Wiss3NStoreModule();
  });

  it('should create an instance', () => {
    expect(storeModule).toBeTruthy();
  });
});
