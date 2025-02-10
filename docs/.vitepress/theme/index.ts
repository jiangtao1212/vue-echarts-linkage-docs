// https://vitepress.dev/guide/custom-theme
import { h } from 'vue';
import type { Theme } from 'vitepress';
import DefaultTheme from 'vitepress/theme';
import './style.css';
import { useTheme } from '../../composables/useTheme';

export default {
  extends: DefaultTheme,
  Layout: () => {
    return h(DefaultTheme.Layout, null, {
      // https://vitepress.dev/guide/extending-default-theme#layout-slots
    })
  },
  enhanceApp({ app, router, siteData }) {
    // app.component('HideShow', HideShow);

    const { listenerTheme } = useTheme();
    listenerTheme();
  }
  // 没起作用，原因未知，最后使用了defineClientComponent解决了打包document环境问题
  // async enhanceApp({ app }) {
  //   // @ts-ignore
  //   if (!import.meta.env.SSR) {
  //     // const plugin = await import('vue-echarts-linkage')
  //     const plugin = await import('../../components/echarts-linkage/demo1/index.vue')
  //     // @ts-ignore
  //     app.use(plugin.default)
  //   }
  // }
} satisfies Theme
