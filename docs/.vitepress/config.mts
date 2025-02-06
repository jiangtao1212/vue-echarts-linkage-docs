import { defineConfig } from 'vitepress';
import path from 'path';

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
          { text: '基础示例', items: [ 
            { text: '拖拽新增', link: '/demo/base/demo1' },
            { text: '新增实例', link: '/demo/base/demo2' },
            { text: '批量更新', link: '/demo/base/demo3' },
            { text: '批量替换', link: '/demo/base/demo4' },
            { text: '批量清除', link: '/demo/base/demo5' },
          ]},
          { text: '拓展示例', items: [ 
            { text: '自定义配置', link: '/demo/extend/demo1' },
            { text: '自定义主题', link: '/demo/extend/demo2' },
            { text: '自定义组件', link: '/demo/extend/demo3' },
          ]},
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
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '../'), // 根据项目结构调整路径
      },
    },
  },
  vue: {
    // @vitejs/plugin-vue 选项
  }
})
