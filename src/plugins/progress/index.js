import ProgressBar from "./progress-bar";

export const ProgressBarPlugin = {
  install(Vue, options) {
    let { container } = options;
    if (!container) {
      container = document.createElement("div");
      document.body.appendChild(container);
    }
    Vue.prototype.$progress = new Vue(ProgressBar).$mount(container);
  }
};
