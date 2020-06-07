import Vue from 'vue'
import { Select } from 'element-ui'
import ElSelectPage from "./ElSelectPage.vue"
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(Select)
ElSelectPage.install = (Vue) => {
  Vue.component(ElSelectPage.name, ElSelectPage)
}

export default ElSelectPage