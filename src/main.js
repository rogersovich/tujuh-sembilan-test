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
import ToastService from 'primevue/toastservice';
import ConfirmationService from 'primevue/confirmationservice';

import InputText from 'primevue/inputtext'
import Button from 'primevue/button'
import Avatar from 'primevue/avatar'
import Skeleton from 'primevue/skeleton';
import Dialog from 'primevue/dialog';
import Toast from 'primevue/toast';
import ProgressSpinner from 'primevue/progressspinner';
import ConfirmDialog from 'primevue/confirmdialog';
import TabView from 'primevue/tabview';
import TabPanel from 'primevue/tabpanel';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';

const app = createApp(App)
const head = createHead()

// eslint-disable-next-line vue/multi-word-component-names
app.component("Iconify", Icon);

// prime use
app.component('PButton', Button);
app.component('PInputText', InputText);
app.component('PAvatar', Avatar);
app.component('PSkeleton', Skeleton);
app.component('PDialog', Dialog);
app.component('PToast', Toast);
app.component('PProgressSpinner', ProgressSpinner);
app.component('PConfirmDialog', ConfirmDialog);
app.component('PTabView', TabView);
app.component('PTabPanel', TabPanel);
app.component('PDataTable', DataTable);
app.component('PColumn', Column);

app.use(createPinia())
app.use(router)
app.use(head)
app.use(VueQueryPlugin)
app.use(PrimeVue);
app.use(ToastService);
app.use(ConfirmationService);

app.mount('#app')
