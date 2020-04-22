import { defineConfig } from 'umi';

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  // locale:{ antd: true},
  routes: [
    { path: '/', component: '@/layouts/index' },
    { path: '/products', component: '@/layouts/baseLayout' },

  ],
});