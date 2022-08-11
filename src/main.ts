import { createApp } from 'vue';
import App from './App.vue';

import 'normalize.css/normalize.css';
import '@/styles/index.scss';

// eslint-disable-next-line import/no-unresolved
import 'virtual:svg-icons-register';

createApp(App).mount('#app');
