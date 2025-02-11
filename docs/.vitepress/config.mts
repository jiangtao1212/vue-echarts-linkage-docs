import { defineConfig } from 'vitepress';
import path from 'path';
import fs from 'fs';
// 获取 lodash 的版本号
const packageJsonPath = path.resolve(__dirname, '../../node_modules/vue-echarts-linkage/package.json');
// 读取 package.json 文件
const { version } = JSON.parse(fs.readFileSync(packageJsonPath, 'utf-8'));

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "My Awesome Project",
  description: "A VitePress Site",
  base: "/vue-echarts-linkage-docs/",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Examples', link: '/markdown-examples' },
      { text: `当前版本: ${version}`, link: `https://github.com/jiangtao1212/vue-echarts-linkage/tree/${version}` },
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
            { text: '基线比较', link: '/demo/extend/demo1' },
            { text: '图片下载', link: '/demo/extend/demo2' },
            { text: '预留位', link: '/demo/extend/demo3' },
          ]},
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/jiangtao1212/vue-echarts-linkage' }
    ],

    lastUpdated: {
      text: 'Updated at',
      formatOptions: {
        dateStyle: 'full',
        timeStyle: 'medium'
      }
    }
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
