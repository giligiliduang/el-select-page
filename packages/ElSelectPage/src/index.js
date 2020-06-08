import Vue from 'vue'
import {
  Select,
  Option,
  OptionGroup
} from 'element-ui'
import ElSelectPage from "./ElSelectPage.vue"
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(Select)
Vue.use(Option)
Vue.use(OptionGroup)
ElSelectPage.install = (Vue) => {
  Vue.component(ElSelectPage.name, ElSelectPage)
}

export default ElSelectPage