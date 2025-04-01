import { defineConfig } from 'vitepress';
import path from 'path';
import fs from 'fs';
// import analyzer from 'vite-bundle-analyzer';

// 获取 lodash 的版本号
const packageJsonPath = path.resolve(__dirname, '../../node_modules/vue-echarts-linkage/package.json');
// 读取 package.json 文件
const { version } = JSON.parse(fs.readFileSync(packageJsonPath, 'utf-8'));

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "vue-echarts-linkage",
  description: "基于Vue3的Echarts联动组件",
  head: [['link', { rel: 'icon', href: '/vue-echarts-linkage-docs/linkage.svg' }]],
  base: "/vue-echarts-linkage-docs/",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    logo: "/linkage.svg",
    nav: [
      { text: '首页', link: '/' },
      // { text: '介绍', link: '/demo/guide/readme.md' },
      { text: `当前版本: ${version}`, link: `https://github.com/jiangtao1212/vue-echarts-linkage/tree/${version}` },
    ],

    sidebar: [
      {
        text: '介绍',
        items: [
          { text: '使用说明', link: '/demo/guide/readme.md' },
        ]
      },
      {
        text: '示例',
        items: [
          // { text: 'Markdown Examples', link: '/markdown-examples' },
          // { text: 'Runtime API Examples', link: '/api-examples' },
          { text: '基础示例', items: [ 
            { text: '拖拽新增', link: '/demo/base/demo1' },
            { text: '新增实例', link: '/demo/base/demo2' },
            { text: '批量更新', link: '/demo/base/demo3' },
            { text: '批量清除', link: '/demo/base/demo4' },
            { text: '模版更新', link: '/demo/base/demo5' },
            { text: '主题切换', link: '/demo/base/demo6' },
            { text: '基础联动', link: '/demo/base/demo7' },
            { text: '高度自适应', link: '/demo/base/demo8' },
            { text: '多列显示', collapsed: true, items: [
              { text: '固定高度', link: '/demo/base/demo9/demo9_1' },
              { text: '自适应高度', link: '/demo/base/demo9/demo9_2' },
            ]},
          ]},
          { text: '拓展示例', items: [ 
            { text: '基线比较', link: '/demo/extend/demo1' },
            { text: '图片下载', link: '/demo/extend/demo2' },
            { text: '图形定位', link: '/demo/extend/demo3' },
            { text: '开关量', link: '/demo/extend/demo4' },
            { text: '合并图例', link: '/demo/extend/demo5' },
            { text: '拓展属性', link: '/demo/extend/demo6' },
            { text: '分组联动', link: '/demo/extend/demo7' },
            { text: '首尾连接', link: '/demo/extend/demo8' },
            { text: '额外提示', link: '/demo/extend/demo9' },
          ]},
        ]
      }, 
      {
        text: 'API说明',
        link: '/demo/summary/api.md'
      },
      {
        text: '视频演示',
        link: '/demo/summary/video.md'
      },
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
    plugins: [
      // ...your plugin
      // analyzer()
    ],
    build: {
      rollupOptions: {
        output: {
          manualChunks(id) {
            if (id.includes('node_modules/.pnpm/')) {
              // 将来自 node_modules 的大库分割成独立的 chunk
              const split = id.split('node_modules/.pnpm/')[1].split('/')[0];
              return split;
            } else if (id.includes('node_modules/')) {
              const split = id.split('node_modules/')[1].split('/')[0];
              return split;
            }
          },
        },
      },
    },
  },
  vue: {
    // @vitejs/plugin-vue 选项
  }
})
