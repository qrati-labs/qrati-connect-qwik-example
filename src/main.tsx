import '@builder.io/qwik/qwikloader.js';
import 'vanilla-cookieconsent/dist/cookieconsent.css';
import './index.css';
import { render } from '@builder.io/qwik';
import { App } from './app.tsx';

render(document.getElementById('app') as HTMLElement, <App />);
