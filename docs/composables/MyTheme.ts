/*
 * @Author: jiangtao 1106950092@qq.com
 * @Date: 2025-02-10 14:56:18
 * @LastEditors: jiangtao 1106950092@qq.com
 * @LastEditTime: 2025-03-06 15:26:29
 * @FilePath: \vue-echarts-linkage-docs\docs\composables\useTheme.ts
 * @Description: 主题
 */

import { ref, watch, Ref, WatchOptions} from 'vue';

export type ThemeType = 'light' | 'dark';

const LOCALSTORY_THEME_KEY = 'vitepress-theme-appearance';

export class MyTheme {
  theme = ref<ThemeType>('light');
  constructor(themeValue?: ThemeType) {
    this.setTheme(themeValue);
    this.listenerTheme();
  }

  // 设置主题值
  setTheme(themeValue?: ThemeType) {
    if (themeValue) {
      // 传入了主题值，则直接设置主题值
      this.theme.value = themeValue;
    } else {
      // 没有传入主题值，则从localStorage中获取
      const localStorageTheme = localStorage.getItem(LOCALSTORY_THEME_KEY) as ThemeType;
      if (localStorageTheme) {
        const isDark = localStorageTheme === 'dark';
        this.theme.value = isDark ? 'dark' : 'light';
      }
    }
  }

  // 监听主题变化 -- vitepress-theme-appearance值修改时触发
  listenerTheme() {
    // 监听 localStorage 变化
    const handleStorageChange = (event) => {
      if (event.key === LOCALSTORY_THEME_KEY) {
        const isDark = event.newValue === 'dark';
        console.log('当前模式:', isDark ? '深色模式' : '浅色模式');
        const themeValue = isDark ? 'dark' : 'light';
        this.setTheme(themeValue);
      }
    };
    window.addEventListener('storage', handleStorageChange);

    // 在应用销毁时移除监听
    window.addEventListener('beforeunload', () => {
      window.removeEventListener('storage', handleStorageChange);
    });
  }

  themeListenerHandler(theme: Ref<ThemeType, ThemeType>, callBackFun: (themeValue: ThemeType) => void, options: WatchOptions = {}) {
    watch(theme, (newVal) => {
      console.log("theme change", newVal);
      const themeValue = newVal;
      callBackFun(themeValue);
    }, options);
  }
}



