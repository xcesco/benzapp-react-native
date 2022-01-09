// Instantiate the counter store.
import React from 'react';
import {CounterStore} from './counter-store';

const counterStore = new CounterStore();

// Create a React Context with the counter store instance.
export const StoreContext = React.createContext({counterStore: counterStore});
export const useCounterStore = () => React.useContext(StoreContext);

// Create a store hydration function.
// async function hydrateStores() {
//   const hydrate = create({ storage: AsyncStorage });
//   await hydrate('CounterStore', counterStore);
// }
