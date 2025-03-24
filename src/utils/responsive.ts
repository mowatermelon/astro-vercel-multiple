// 响应式工具函数

/**
 * 根据设备宽度计算动态字体大小
 * 基于设计稿宽度375px的标准尺寸
 * @param baseFontSize 基础字体大小（默认16px）
 * @returns 计算后的字体大小CSS变量设置函数
 */
export function calculateResponsiveFontSize(baseFontSize: number = 14) {
  // 设计稿基准宽度
  const designWidth = 375;

  // 计算缩放比例
  const calculateScale = () => {
    const windowWidth = window.innerWidth;
    // 最小缩放比例为0.85，最大为1.2
    const scale = Math.min(Math.max(windowWidth / designWidth, 0.85), 1.2);
    return scale;
  };

  // 设置根元素字体大小
  const setRootFontSize = () => {
    const scale = calculateScale();
    const fontSize = baseFontSize * scale;
    document.documentElement.style.setProperty('--base-font-size', `${fontSize}px`);

    // 设置其他响应式变量
    document.documentElement.style.setProperty('--space-unit', `${scale * 4}px`);
    document.documentElement.style.setProperty('--responsive-scale', `${scale}`);
  };

  // 初始化并添加窗口大小变化监听
  const initialize = () => {
    setRootFontSize();
    window.addEventListener('resize', setRootFontSize);
    return () => window.removeEventListener('resize', setRootFontSize);
  };

  return { initialize };
}

/**
 * 获取设备类型
 * @returns 设备类型：'mobile', 'tablet', 或 'desktop'
 */
export function getDeviceType() {
  const width = window.innerWidth;
  if (width < 768) return 'mobile';
  if (width < 1024) return 'tablet';
  return 'desktop';
}