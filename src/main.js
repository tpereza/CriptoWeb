import Vue from 'vue';
import { BootstrapVue, BootstrapVueIcons } from 'bootstrap-vue';
// eslint-disable-next-line import/no-extraneous-dependencies
import 'bootstrap/dist/css/bootstrap.min.css';
import 'primevue/resources/primevue.min.css';
import 'primevue/resources/themes/nova-light/theme.css';
import 'primeicons/primeicons.css';
import 'bulma';
import './assets/css/index.scss';
import Toast from 'primevue/toast';
import ToastService from 'primevue/toastservice';
import Listbox from 'primevue/listbox';
import FileUpload from 'primevue/fileupload';
import Button from 'primevue/button';
import MultiSelect from 'primevue/multiselect';
import TabMenu from 'primevue/tabmenu';
import App from './App.vue';
import router from './router';
import store from './store';
import { createProvider } from './vue-apollo';


Vue.config.productionTip = false;

Vue.use(BootstrapVue);
Vue.use(BootstrapVueIcons);
Vue.use(ToastService);
Vue.component('Toast', Toast);
Vue.component('Button', Button);
Vue.component('MultiSelect', MultiSelect);
Vue.component('Listbox', Listbox);
Vue.component('FileUpload', FileUpload);
Vue.component('TabMenu', TabMenu);


new Vue({
  router,
  store,
  apolloProvider: createProvider(),
  render: (h) => h(App),
}).$mount('#app');
