// i18n配置文件
export const defaultLang = 'zh';
export const supportedLanguages = ['zh', 'en', 'ja', 'ko'];

// 添加索引签名类型声明
type UITranslations = {
  [key: string]: string;
};

type UIConfig = {
  [lang: string]: UITranslations;
};

export const ui: UIConfig = {
  zh: {
    'site.title': '文旅竞技场',
    'site.subtitle': '景点拟人化对战，体验不一样的旅游推荐',
    'site.footer': '文旅竞技场 © 2025 - 让旅游选择更有趣',
    'meta.description': '景点拟人化对战，体验不一样的旅游推荐',
    'framework.preact': 'Preact',
    'framework.react': 'React',
    'framework.solid': 'Solid',
    'framework.vue': 'Vue',
    'language.zh': '中文',
    'language.en': 'English',
    'language.ja': '日本語',
    'language.ko': '한국어',
    'search.title': '选择地区和景点',
    'search.region': '地区',
    'search.keyword': '关键词',
    'search.region.placeholder': '输入地区名称...',
    'search.keyword.placeholder': '搜索景点名称、特色...',
    'search.popular': '热门地区：'
  },
  en: {
    'site.title': 'Culture Tourism Arena',
    'site.subtitle': 'Attraction personification battles, experience different travel recommendations',
    'site.footer': 'Culture Tourism Arena © 2025 - Making travel choices more fun',
    'meta.description': 'Attraction personification battles, experience different travel recommendations',
    'framework.preact': 'Preact',
    'framework.react': 'React',
    'framework.solid': 'Solid',
    'framework.vue': 'Vue',
    'language.zh': '中文',
    'language.en': 'English',
    'language.ja': '日本語',
    'language.ko': '한국어',
    'search.title': 'Select Region and Attractions',
    'search.region': 'Region',
    'search.keyword': 'Keyword',
    'search.region.placeholder': 'Enter region name...',
    'search.keyword.placeholder': 'Search attraction names, features...',
    'search.popular': 'Popular Regions:'
  },
  ja: {
    'site.title': 'カルチャーツーリズムアリーナ',
    'site.subtitle': 'アトラクションの擬人化バトル、異なる旅行の推薦を体験',
    'site.footer': 'カルチャーツーリズムアリーナ © 2025 - 旅行の選択をより楽しく',
    'meta.description': 'アトラクションの擬人化バトル、異なる旅行の推薦を体験',
    'framework.preact': 'Preact',
    'framework.react': 'React',
    'framework.solid': 'Solid',
    'framework.vue': 'Vue',
    'language.zh': '中文',
    'language.en': 'English',
    'language.ja': '日本語',
    'language.ko': '한국어',
    'search.title': '地域と観光スポットを選択',
    'search.region': '地域',
    'search.keyword': 'キーワード',
    'search.region.placeholder': '地域名を入力...',
    'search.keyword.placeholder': '観光スポット名、特徴を検索...',
    'search.popular': '人気の地域：'
  },
  ko: {
    'site.title': '문화관광 아레나',
    'site.subtitle': '명소 의인화 대결, 색다른 여행 추천 경험',
    'site.footer': '문화관광 아레나 © 2025 - 여행 선택을 더 재미있게',
    'meta.description': '명소 의인화 대결, 색다른 여행 추천 경험',
    'framework.preact': 'Preact',
    'framework.react': 'React',
    'framework.solid': 'Solid',
    'framework.vue': 'Vue',
    'language.zh': '중국어',
    'language.en': '영어',
    'language.ja': '일본어',
    'language.ko': '한국어',
    'search.title': '지역 및 명소 선택',
    'search.region': '지역',
    'search.keyword': '키워드',
    'search.region.placeholder': '지역 이름 입력...',
    'search.keyword.placeholder': '명소 이름, 특징 검색...',
    'search.popular': '인기 지역:'
  }
};