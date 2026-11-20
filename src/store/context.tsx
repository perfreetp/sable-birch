import { createContext, useContext } from 'solid-js';
import { AppStore } from './AppStore';

const StoreContext = createContext<AppStore>(null as unknown as AppStore);

export function StoreProvider(props: { store: AppStore; children: unknown }) {
  return (
    <StoreContext.Provider value={props.store}>{props.children as never}</StoreContext.Provider>
  );
}

export function useStore(): AppStore {
  return useContext(StoreContext);
}
