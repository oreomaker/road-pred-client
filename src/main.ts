import { createApp } from "vue";
import App from "./App.vue";
import { createPinia } from "pinia";
import router from "./router";
import * as ElementPlusIconVue from "@element-plus/icons-vue";
// import "~/styles/element/index.scss";

// import ElementPlus from "element-plus";
// import all element css, uncommented next line
// import "element-plus/dist/index.css";

// or use cdn, uncomment cdn link in `index.html`

import "~/styles/index.scss";
import 'uno.css'

// If you want to use ElMessage, import it.
import "element-plus/theme-chalk/src/message.scss"

const app = createApp(App);
// app.use(ElementPlus);
for(const [key, component] of Object.entries(ElementPlusIconVue)){
    app.component(key, component);
}

app.use(createPinia());
app.use(router);
app.mount("#app");
