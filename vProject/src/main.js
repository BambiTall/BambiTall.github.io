import { createApp } from 'vue'
// import './style.css'
import App from './App.vue'
import router from './router'
import VuePapaParse from 'vue-papa-parse'
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/antd.less';

createApp(App)
.use(Antd)
.use(VuePapaParse)
.use(router)
.mount('#app')