/* @refresh reload */
import { render } from 'solid-js/web';
import { createRoot } from 'solid-js';
import { App } from './ui/App';
import { AppStore } from './store/AppStore';
import { StoreProvider } from './store/context';
import './styles/app.css';

// AppStore 内部含响应式 memo，需在 root 内创建
const store = createRoot(() => new AppStore());

render(
  () => (
    <StoreProvider store={store}>
      <App />
    </StoreProvider>
  ),
  document.getElementById('root')!
);
