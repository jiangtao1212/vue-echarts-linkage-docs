import { defineConfig } from 'vitepress';

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "My Awesome Project",
  description: "A VitePress Site",
  base: "/vue-echarts-linkage-docs/",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Examples', link: '/markdown-examples' }
    ],

    sidebar: [
      {
        text: 'Examples',
        items: [
          { text: 'Markdown Examples', link: '/markdown-examples' },
          { text: 'Runtime API Examples', link: '/api-examples' },
          { text: '基础示例1', link: '/demo/demo1' },
          { text: '基础示例2', link: '/demo/demo2' },
          { text: '基础示例3', link: '/demo/demo3' },
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/vuejs/vitepress' }
    ],
  },
  markdown: {
    lineNumbers: true, // 代码块显示行号
  },
  outDir: './.vitepress/vue-echarts-linkage-docs',
  vite: {
    // ssr: {
    //   noExternal: ['vue-echarts-linkage']
    // },
  },
  vue: {
    // @vitejs/plugin-vue 选项
  }
})
