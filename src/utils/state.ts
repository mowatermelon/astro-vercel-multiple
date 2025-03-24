// 共享状态管理
import { atom, map } from 'nanostores';
import type { Attraction } from '../data/attractions';

// 搜索相关状态
export const searchTerm = atom<string>('');
export const searchLocation = atom<string>('');
export const recentLocations = atom<{ [key: string]: string }[]>([
  {
    zh: '杭州',
    en: 'Hangzhou',
    ja: '杭州',
    ko: '항저우'
  },
  {
    zh: '北京',
    en: 'Beijing',
    ja: '北京',
    ko: '베이징'
  },
  {
    zh: '上海',
    en: 'Shanghai',
    ja: '上海',
    ko: '상하이'
  },
  {
    zh: '武汉',
    en: 'Wuhan',
    ja: '武漢',
    ko: '우한'
  }
]);

// 景点选择状态
export const selectedAttractions = atom<Attraction[]>([]);

// 对战状态
export interface DialogueMessage {
  text: string;
  typing: boolean;
  side: 'left' | 'right';
}

export const battleState = map({
  isActive: false,
  leftAttraction: null as Attraction | null,
  rightAttraction: null as Attraction | null,
  messages: [] as DialogueMessage[],
  winner: null as Attraction | null,
  loser: null as Attraction | null,
  winnerFeature: '',
  loserFeature: ''
});

// 创建共享状态
export function createSharedState() {
  return {
    searchTerm,
    searchLocation,
    recentLocations,
    selectedAttractions,
    battleState
  };
}