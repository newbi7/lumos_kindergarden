import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import { loadFonts } from './plugins/webfontloader'
import axios from 'axios'

loadFonts()

// JS SDK init
window.Kakao.init(process.env.VUE_APP_KAKAO_API_KEY);

const app = createApp(App)
  .use(router)
  .use(store)
  .use(vuetify)

app.config.globalProperties.$axios = axios; // axios

app.mount('#app')
