import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { createHead } from "@vueuse/head"

import App from './App.vue'
import router from './router'

import './assets/main.css'

import { VueQueryPlugin } from "@tanstack/vue-query";
import { Icon } from '@iconify/vue';

//prime ui
import PrimeVue from 'primevue/config';
import './assets/theme.css'    
import "primevue/resources/primevue.min.css";
import "primeicons/primeicons.css";

// prime
import InputText from 'primevue/inputtext'
import Button from 'primevue/button'
import Avatar from 'primevue/avatar'
import Skeleton from 'primevue/skeleton';

const app = createApp(App)
const head = createHead()

// eslint-disable-next-line vue/multi-word-component-names
app.component("Iconify", Icon);

// prime use
app.component('PButton', Button);
app.component('PInputText', InputText);
app.component('PAvatar', Avatar);
app.component('PSkeleton', Skeleton);

app.use(createPinia())
app.use(router)
app.use(head)
app.use(VueQueryPlugin)
app.use(PrimeVue);

app.mount('#app')
