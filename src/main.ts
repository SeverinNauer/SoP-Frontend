import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import InputText from "primevue/inputtext";
import Password from "primevue/password";
import Menubar from "primevue/menubar";
import Button from "primevue/button";
import Toolbar from "primevue/toolbar";
import Listbox from "primevue/listbox";
import Dialog from "primevue/dialog";
import Textarea from "primevue/textarea";
import ContextMenu from "primevue/contextmenu";
import ToastService from "primevue/toastservice";
import Toast from "primevue/toast";

import "primevue/resources/themes/nova-light/theme.css";
import "primevue/resources/primevue.min.css";
import "primeicons/primeicons.css";
import "primeflex/primeflex.css";

Vue.config.productionTip = false;

Vue.component("InputText", InputText);
Vue.component("Password", Password);
Vue.component("Menubar", Menubar);
Vue.component("Button", Button);
Vue.component("Toolbar", Toolbar);
Vue.component("Listbox", Listbox);
Vue.component("Dialog", Dialog);
Vue.component("Textarea", Textarea);
Vue.component("Toast", Toast);
Vue.component("ContextMenu", ContextMenu);
Vue.use(ToastService);

new Vue({
  router,
  render: h => h(App)
}).$mount("#app");
