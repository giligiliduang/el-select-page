import locale from './utils/locale';

import ElSelectPage from "../packages/ElSelectPage/src";
// import { version } from "./package.json";
const components = [ElSelectPage];
const version = "0.0.1";

const install = function(Vue, opts = {}) {
  // 判断是否安装
  if (install.installed) return;
  locale.use(opts.locale);
  locale.i18n(opts.i18n);

  components.forEach((component) => {
    Vue.component(component.name, component);
  });
};

if (typeof window !== "undefined" && window.Vue) {
  install(window.Vue);
}

export default { version, install, ElSelectPage };
