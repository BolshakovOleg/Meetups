import Toaster from "./toaster";

export const ToasterPlugin = {
  install(Vue, options) {
    let { container } = options;
    if (!container) {
      container = document.createElement("div");
      document.body.appendChild(container);
    }
    Vue.prototype.$toaster = new Vue(Toaster).$mount(container);
  }
};
