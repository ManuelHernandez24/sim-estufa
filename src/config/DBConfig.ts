import { IndexedDBProps } from 'react-indexed-db';

export const SIM_STORE = 'SIM';

const DBConfig: IndexedDBProps = {
  name: 'MyDB',
  version: 2,
  objectStoresMeta: [
    {
      store: SIM_STORE,
      storeConfig: { keyPath: 'id', autoIncrement: true },
      storeSchema: [
        { name: 'density', keypath: 'density', options: { unique: false } },
        { name: 'contamination', keypath: 'contamination', options: { unique: false } },
        { name: 'capital', keypath: 'capital', options: { unique: false } },
        { name: 'winLoss', keypath: 'winLoss', options: { unique: false } },
        { name: 'time', keypath: 'time', options: { unique: false } }
      ]
    }
  ]
};

export default DBConfig;
