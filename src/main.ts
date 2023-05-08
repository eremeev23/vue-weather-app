import { createApp } from "vue";
import { createPinia } from "pinia";
import "./assets/styles/index.scss";
// @ts-ignore
import App from "@/App.vue";
import router from "./router";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import {
  faMagnifyingGlass,
  faLocationCrosshairs,
  faXmark,
  faArrowLeftLong,
  faArrowRightLong
} from "@fortawesome/free-solid-svg-icons";

// ICONS
library.add(faMagnifyingGlass, faLocationCrosshairs, faXmark, faArrowLeftLong, faArrowRightLong);

// APP
const app = createApp(App);
const store = createPinia();
app.component('font-awesome-icon', FontAwesomeIcon)
app.use(createPinia());
app.use(router);
app.use(store);

app.mount('#app');
