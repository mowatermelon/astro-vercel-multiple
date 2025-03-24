// i18n工具函数
import { ui, defaultLang, supportedLanguages } from './config';
import type { LocalizedText, LocalizedArray } from '../data/attractions';

// 获取当前语言
export function getCurrentLang(): string {
  if (typeof window !== 'undefined') {
    // 从URL获取语言参数
    const url = new URL(window.location.href);
    const langParam = url.searchParams.get('lang');
    
    // 检查是否是支持的语言
    if (langParam && supportedLanguages.includes(langParam)) {
      // 保存到localStorage以便后续访问
      localStorage.setItem('preferredLanguage', langParam);
      return langParam;
    }
    
    // 从localStorage获取之前保存的语言偏好
    const savedLang = localStorage.getItem('preferredLanguage');
    if (savedLang && supportedLanguages.includes(savedLang)) {
      return savedLang;
    }
    
    // 从浏览器语言设置获取
    const browserLang = navigator.language.split('-')[0];
    if (supportedLanguages.includes(browserLang)) {
      return browserLang;
    }
  }
  
  // 默认语言
  return defaultLang;
}

// 翻译函数
export function t(key: string, lang?: string): string {
  const currentLang = lang || getCurrentLang();
  return ui[currentLang]?.[key] || ui[defaultLang][key] || key;
}

// 切换语言
export function switchLanguage(lang: string): void {
  if (supportedLanguages.includes(lang)) {
    // 保存到localStorage
    localStorage.setItem('preferredLanguage', lang);
    
    // 更新URL参数并刷新页面以确保所有内容都能正确更新
    const url = new URL(window.location.href);
    url.searchParams.set('lang', lang);
    window.location.href = url.toString(); // 使用location.href刷新页面而不是pushState
  }
}

// 获取本地化文本
export function getLocalizedText(localizedText: LocalizedText, lang?: string): string {
  const currentLang = lang || getCurrentLang();
  return localizedText[currentLang] || localizedText[defaultLang] || '';
}

// 获取本地化数组
export function getLocalizedArray(localizedArray: LocalizedArray, lang?: string): string[] {
  const currentLang = lang || getCurrentLang();
  return localizedArray[currentLang] || localizedArray[defaultLang] || [];
}