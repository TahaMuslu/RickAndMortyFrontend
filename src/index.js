import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import store from './store/index';
import LoadingAnimation from './components/LoadingAnimation';

const root = ReactDOM.createRoot(document.getElementById('root'));
document.getElementById('root').classList.add('min-h-screen');
document.getElementById('root').classList.add('flex');
document.getElementById('root').classList.add('flex-col');
root.render(
  <Provider store={store}>
    <Suspense fallback={<LoadingAnimation />}>
      <App />
    </Suspense>
  </Provider>
);
