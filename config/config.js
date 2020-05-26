import { defineConfig } from 'umi';
import webpackPlugin from './plugin.config';

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  // locale:{ antd: true},
  routes: [
    {
      path: '/',
      component: '@/layouts/index',
      // Routes: ['src/pages'],
      routes: [
        {
          path: '/dashboard',
          name: 'dashborad',
          routes: [
            {
              name: 'analysis',
              path: '/dashboard/analysis',
              component: './dashboard/analysis',
            },
            {
              name: 'monitor',
              path: '/dashboard/monitor',
              component: './dashboard/monitor',
            },
            {
              name: 'workplace',
              path: '/dashboard/workplace',
              component: './dashboard/workplace',
            },
          ],
        },
        {
          path: 'form',
          name: 'form',
          routes: [
            {
              name: 'basic-form',
              path: '/form/basic-form',
              component: './form/basic-form',
            },
          ],
        },
      ],
    },
    { path: '/products', component: '@/layouts/baseLayout' },
  ],
  chainWebpack: webpackPlugin,
});
