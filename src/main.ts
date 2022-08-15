import { createApp } from 'vue';
import { createPinia } from 'pinia';
import router from '@/router';
import App from './App.vue';

import 'normalize.css/normalize.css';
import '@/style/index.scss';

// eslint-disable-next-line import/no-unresolved
import 'virtual:svg-icons-register';

const app = createApp(App);
const pinia = createPinia();
app.use(pinia);
app.use(router);
app.mount('#app');
