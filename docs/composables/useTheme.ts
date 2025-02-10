import { ref, watch } from 'vue';

export type ThemeType = 'light' | 'dark';

const LOCALSTORY_THEME_KEY = 'vitepress-theme-appearance';

// 响应式主题值
const theme = ref('light' as ThemeType);
// 初始化获取本地存储的主题
if (typeof window!== 'undefined') {
  const themeAppearance = localStorage.getItem(LOCALSTORY_THEME_KEY);
  if (themeAppearance === 'dark') {
    theme.value = 'dark';
  }
}
// 修改值的方法
const setTheme = (themeValue: ThemeType) => {
  theme.value = themeValue;
};

// 监听主题变化 -- vitepress-theme-appearance值修改时触发
const listenerTheme = () => {
  if (typeof window !== 'undefined') {
    // 监听 localStorage 变化
    const handleStorageChange = (event) => {
      if (event.key === LOCALSTORY_THEME_KEY) {
        const isDark = event.newValue === 'dark';
        console.log('当前模式:', isDark ? '深色模式' : '浅色模式');
        const themeValue = isDark ? 'dark' : 'light';
        setTheme(themeValue);
      }
    };

    window.addEventListener('storage', handleStorageChange);

    // 在应用销毁时移除监听
    window.addEventListener('beforeunload', () => {
      window.removeEventListener('storage', handleStorageChange);
    });
  }
}

// 监听到变化后执行回调函数处理
const themeListenerHandler = (callBackFun: (themeValue: ThemeType) => void) => {
  // const { theme } = useTheme(); // 获取实时主题
  watch(theme, (newVal) => {
    console.log("theme change", newVal);
    const themeValue = newVal;
    callBackFun(themeValue);
  });
}

// 导出方法和响应式值
export function useTheme() {
  return {
    theme,
    setTheme,
    listenerTheme,
    themeListenerHandler,
  };
}



