import { createApp } from "vue";
import App from "./App.vue";
import mitt from "mitt";
import VueClickAway from "vue3-click-away";
const emitter = mitt();
const app = createApp(App);
app.use(VueClickAway);
app.config.globalProperties.emitter = emitter;
app.mount("#app");
