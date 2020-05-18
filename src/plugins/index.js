const context = require.context('./', true, /index\.js$/);

const plugins = context.keys().reduce((plugin, key) => {
  if (key !== './index.js') {
    plugin.push(context(key).default);
  }
  return plugin;
}, []);

export default (Vue) => {
  plugins.forEach(plugin => Vue.use(plugin));
};
