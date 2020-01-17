import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import InputText from 'primevue/inputtext';
import Password from 'primevue/password';
import Menubar from 'primevue/menubar';
import Button from 'primevue/button'


import 'primevue/resources/themes/nova-light/theme.css';
import 'primevue/resources/primevue.min.css';
import 'primeicons/primeicons.css';

Vue.config.productionTip = false;

Vue.component("InputText", InputText)
Vue.component("Password", Password)
Vue.component("Menubar", Menubar)
Vue.component("Button", Button)
new Vue({
  router,
  render: h => h(App)
}).$mount("#app");
