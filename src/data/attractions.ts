// 景点数据
export type LocalizedText = Record<string, string>;
export type LocalizedArray = Record<string, string[]>;

export interface Attraction {
  id: string;
  name: LocalizedText;
  description: LocalizedText;
  image: string;
  rating: number;
  features: LocalizedArray;
  location: LocalizedText;
}

// 辅助函数，用于创建多语言文本对象
function createLocalizedText(zh: string, en?: string, ja?: string, ko?: string): LocalizedText {
  return {
    zh,
    en: en || zh,
    ja: ja || zh,
    ko: ko || zh
  };
}

// 辅助函数，用于创建多语言数组对象
function createLocalizedArray(zh: string[], en?: string[], ja?: string[], ko?: string[]): LocalizedArray {
  return {
    zh,
    en: en || zh,
    ja: ja || zh,
    ko: ko || zh
  };
}

export const attractions: Attraction[] = [
  // 杭州景点
  {
    id: '1',
    name: {
      zh: '西湖',
      en: 'West Lake',
      ja: '西湖',
      ko: '서호'
    },
    description: {
      zh: '中国最著名的风景名胜区，被誉为"人间天堂"',
      en: 'The most famous scenic spot in China, known as "Paradise on Earth"',
      ja: '中国で最も有名な景勝地、「地上の楽園」と称される',
      ko: '중국에서 가장 유명한 명승지, "인간 천당"이라 불림'
    },
    image: 'https://picsum.photos/id/1018/300/200.jpg',
    rating: 4.9,
    features: {
      zh: ['自然风光', '历史文化', '园林艺术'],
      en: ['Natural Scenery', 'Historical Culture', 'Garden Art'],
      ja: ['自然の風景', '歴史文化', '庭園芸術'],
      ko: ['자연 경관', '역사 문화', '정원 예술']
    },
    location: {
      zh: '杭州',
      en: 'Hangzhou',
      ja: '杭州',
      ko: '항저우'
    }
  },
  {
    id: '2',
    name: {
      zh: '灵隐寺',
      en: 'Lingyin Temple',
      ja: '霊隠寺',
      ko: '링인사'
    },
    description: {
      zh: '中国佛教名刹，创建于东晋，是杭州最早的名刹古寺',
      en: 'A famous Buddhist temple in China, founded in the Eastern Jin Dynasty, the earliest famous temple in Hangzhou',
      ja: '中国の有名な仏教寺院、東晋時代に創建され、杭州最古の名刹',
      ko: '중국 불교 명찰, 동진 시대에 창건되었으며, 항저우에서 가장 오래된 사찰'
    },
    image: 'https://picsum.photos/id/1019/300/200.jpg',
    rating: 4.7,
    features: {
      zh: ['佛教文化', '古建筑', '历史遗迹'],
      en: ['Buddhist Culture', 'Ancient Architecture', 'Historical Relics'],
      ja: ['仏教文化', '古代建築', '歴史的遺跡'],
      ko: ['불교 문화', '고대 건축', '역사 유적']
    },
    location: {
      zh: '杭州',
      en: 'Hangzhou',
      ja: '杭州',
      ko: '항저우'
    }
  },
  {
    id: '3',
    name: {
      zh: '千岛湖',
      en: 'Thousand Island Lake',
      ja: '千島湖',
      ko: '천도호'
    },
    description: {
      zh: '因湖中拥有1078个岛屿而得名，水质优良，风景秀丽',
      en: 'Named after its 1078 islands, known for excellent water quality and beautiful scenery',
      ja: '1078の島があることから名付けられ、水質が良く、景色が美しい',
      ko: '1078개의 섬이 있어 이름 붙여졌으며, 수질이 좋고 경치가 아름다움'
    },
    image: 'https://picsum.photos/id/1015/300/200.jpg',
    rating: 4.8,
    features: {
      zh: ['自然风光', '水上活动', '生态旅游'],
      en: ['Natural Scenery', 'Water Activities', 'Eco Tourism'],
      ja: ['自然の風景', '水上アクティビティ', 'エコツーリズム'],
      ko: ['자연 경관', '수상 활동', '생태 관광']
    },
    location: {
      zh: '杭州',
      en: 'Hangzhou',
      ja: '杭州',
      ko: '항저우'
    }
  },
  {
    id: '4',
    name: {
      zh: '雷峰塔',
      en: 'Leifeng Pagoda',
      ja: '雷峰塔',
      ko: '뇌봉탑'
    },
    description: {
      zh: '始建于五代吴越国，与保俶塔隔湖相望，是西湖十景之一',
      en: 'Built during the Five Dynasties period, facing Baochu Pagoda across the lake, one of the Ten Scenes of West Lake',
      ja: '五代呉越国時代に建てられ、保俶塔と湖を挟んで向かい合い、西湖十景の一つ',
      ko: '오대 오월국 시대에 건립되었으며, 보추탑과 호수를 사이에 두고 마주보고 있으며, 서호 십경 중 하나'
    },
    image: 'https://picsum.photos/id/1016/300/200.jpg',
    rating: 4.5,
    features: {
      zh: ['历史文化', '古建筑', '传说故事'],
      en: ['Historical Culture', 'Ancient Architecture', 'Legendary Stories'],
      ja: ['歴史文化', '古代建築', '伝説物語'],
      ko: ['역사 문화', '고대 건축', '전설 이야기']
    },
    location: {
      zh: '杭州',
      en: 'Hangzhou',
      ja: '杭州',
      ko: '항저우'
    }
  },
  {
    id: '5',
    name: {
      zh: '宋城景区',
      en: 'Songcheng Scenic Area',
      ja: '宋城景区',
      ko: '송성 경구'
    },
    description: {
      zh: '以宋文化为主题的大型景区，包含各类表演和互动体验',
      en: 'A large-scale scenic area themed on Song Dynasty culture, featuring various performances and interactive experiences',
      ja: '宋の文化をテーマにした大規模な景勝地で、様々なパフォーマンスやインタラクティブな体験を提供',
      ko: '송나라 문화를 주제로 한 대형 경구로, 다양한 공연과 상호작용 체험을 포함'
    },
    image: 'https://picsum.photos/id/1020/300/200.jpg',
    rating: 4.6,
    features: {
      zh: ['文化体验', '主题乐园', '演艺表演'],
      en: ['Cultural Experience', 'Theme Park', 'Theatrical Performances'],
      ja: ['文化体験', 'テーマパーク', 'エンターテイメントショー'],
      ko: ['문화 체험', '테마 파크', '공연 예술']
    },
    location: {
      zh: '杭州',
      en: 'Hangzhou',
      ja: '杭州',
      ko: '항저우'
    }
  },
  {
    id: '6',
    name: createLocalizedText(
      '西溪湿地',
      'Xixi Wetland',
      '西渓湿地',
      '서계 습지'
    ),
    description: createLocalizedText(
      '江南最大的城市湿地，自然生态与人文景观完美结合',
      'The largest urban wetland in Jiangnan, perfectly combining natural ecology and cultural landscape',
      '江南最大の都市湿地、自然生態と人文景観が完璧に融合',
      '강남 최대의 도시 습지, 자연 생태와 인문 경관이 완벽하게 결합'
    ),
    image: 'https://picsum.photos/id/1021/300/200.jpg',
    rating: 4.7,
    features: createLocalizedArray(
      ['自然生态', '湿地公园', '文化遗产'],
      ['Natural Ecology', 'Wetland Park', 'Cultural Heritage'],
      ['自然生態', '湿地公園', '文化遺産'],
      ['자연 생태', '습지 공원', '문화 유산']
    ),
    location: createLocalizedText('杭州', 'Hangzhou', '杭州', '항저우')
  },
  {
    id: '7',
    name: createLocalizedText(
      '龙井村',
      'Longjing Village',
      '龍井村',
      '용정촌'
    ),
    description: createLocalizedText(
      '中国十大名茶龙井茶的原产地，风景优美的茶文化胜地',
      'The origin of Longjing tea, one of China\'s top ten famous teas, a scenic tea culture destination',
      '中国十大名茶の龍井茶の原産地、風景が美しいお茶文化の聖地',
      '중국 10대 명차 용정차의 원산지, 경치가 아름다운 차 문화 명소'
    ),
    image: 'https://picsum.photos/id/1022/300/200.jpg',
    rating: 4.5,
    features: createLocalizedArray(
      ['茶文化', '乡村风光', '文化体验'],
      ['Tea Culture', 'Rural Scenery', 'Cultural Experience'],
      ['お茶文化', '田舎の風景', '文化体験'],
      ['차 문화', '시골 풍경', '문화 체험']
    ),
    location: createLocalizedText('杭州', 'Hangzhou', '杭州', '항저우')},
  {
    id: '8',
    name: createLocalizedText(
      '河坊街',
      'Hefang Street',
      '河坊街',
      '허팡 거리'
    ),
    description: createLocalizedText(
      '保存完好的明清古街，展现杭州传统商业文化',
      'A well-preserved Ming and Qing dynasty ancient street, showcasing Hangzhou\'s traditional commercial culture',
      '明清時代の古い通りが保存され、杭州の伝統的な商業文化を示す',
      '명청 시대의 고대 거리가 잘 보존되어 항저우의 전통 상업 문화를 보여줌'
    ),
    image: 'https://picsum.photos/id/1023/300/200.jpg',
    rating: 4.3,
    features: createLocalizedArray(
      ['古街文化', '传统商业', '小吃美食'],
      ['Ancient Street Culture', 'Traditional Commerce', 'Local Snacks'],
      ['古い通りの文化', '伝統的な商業', '地元の軽食'],
      ['고대 거리 문화', '전통 상업', '현지 간식']
    ),
    location: createLocalizedText('杭州', 'Hangzhou', '杭州', '항저우')
  },
  {
    id: '9',
    name: createLocalizedText(
      '湘湖',
      'Xianghu Lake',
      '湘湖',
      '샹후 호수'
    ),
    description: createLocalizedText(
      '国家级旅游度假区，集自然景观和文化遗产于一体',
      'National tourist resort, combining natural landscapes and cultural heritage',
      '国家レベルの観光リゾート、自然景観と文化遺産を一体化',
      '국가급 관광 리조트, 자연 경관과 문화 유산을 통합'
    ),
    image: 'https://picsum.photos/id/1024/300/200.jpg',
    rating: 4.4,
    features: createLocalizedArray(
      ['自然风光', '文化遗产', '休闲度假'],
      ['Natural Scenery', 'Cultural Heritage', 'Leisure Resort'],
      ['自然風景', '文化遺産', 'レジャーリゾート'],
      ['자연 경관', '문화 유산', '레저 리조트']
    ),
    location: createLocalizedText('杭州', 'Hangzhou', '杭州', '항저우')
  },
  {
    id: '10',
    name: createLocalizedText(
      '良渚古城遗址',
      'Liangzhu Ancient City Ruins',
      '良渚古城遺跡',
      '량주 고대 도시 유적'
    ),
    description: createLocalizedText(
      '世界文化遗产，展现五千年前中华文明的璀璨',
      'World Cultural Heritage, showcasing the brilliance of Chinese civilization 5,000 years ago',
      '世界文化遺産、5000年前の中華文明の輝きを示す',
      '세계 문화 유산, 5,000년 전 중화 문명의 찬란함을 보여줌'
    ),
    image: 'https://picsum.photos/id/1025/300/200.jpg',
    rating: 4.8,
    features: createLocalizedArray(
      ['考古遗址', '文化遗产', '历史文化'],
      ['Archaeological Site', 'Cultural Heritage', 'Historical Culture'],
      ['考古学的遺跡', '文化遺産', '歴史文化'],
      ['고고학 유적', '문화 유산', '역사 문화']
    ),
    location: createLocalizedText('杭州', 'Hangzhou', '杭州', '항저우')
  },
  // 北京景点
  {
    id: '11',
    name: createLocalizedText(
      '故宫',
      'Forbidden City',
      '紫禁城',
      '자금성'
    ),
    description: createLocalizedText(
      '中国最大的古代宫殿建筑群，世界文化遗产',
      'China\'s largest ancient palace complex, a World Cultural Heritage site',
      '中国最大の古代宮殿建築群、世界文化遺産',
      '중국 최대의 고대 궁전 건축군, 세계 문화 유산'
    ),
    image: 'https://picsum.photos/id/1026/300/200.jpg',
    rating: 4.9,
    features: createLocalizedArray(
      ['古建筑', '历史文化', '皇家文化'],
      ['Ancient Architecture', 'Historical Culture', 'Imperial Culture'],
      ['古代建築', '歴史文化', '皇室文化'],
      ['고대 건축', '역사 문화', '황실 문화']
    ),
    location: createLocalizedText('北京', 'Beijing', '北京', '베이징')
  },
  {
    id: '12',
    name: createLocalizedText(
      '长城',
      'Great Wall',
      '万里の長城',
      '만리장성'
    ),
    description: createLocalizedText(
      '世界七大奇迹之一，中华文明的象征',
      'One of the Seven Wonders of the World, a symbol of Chinese civilization',
      '世界七大不思議の一つ、中華文明の象徴',
      '세계 7대 불가사의 중 하나, 중화 문명의 상징'
    ),
    image: 'https://picsum.photos/id/1027/300/200.jpg',
    rating: 4.9,
    features: createLocalizedArray(
      ['历史文化', '自然风光', '军事建筑'],
      ['Historical Culture', 'Natural Scenery', 'Military Architecture'],
      ['歴史文化', '自然風景', '軍事建築'],
      ['역사 문화', '자연 경관', '군사 건축']
    ),
    location: createLocalizedText('北京', 'Beijing', '北京', '베이징')
  },
  {
    id: '13',
    name: createLocalizedText(
      '天坛',
      'Temple of Heaven',
      '天壇',
      '천단'
    ),
    description: createLocalizedText(
      '明清两代帝王祭天的场所，中国现存规模最大的祭祀建筑群',
      'The place where emperors of the Ming and Qing dynasties offered sacrifices to heaven, the largest existing sacrificial building complex in China',
      '明清時代の皇帝が天を祭る場所、中国に現存する最大の祭祀建築群',
      '명청 시대 황제가 하늘에 제사를 지내던 장소, 중국에 현존하는 최대 규모의 제사 건축군'
    ),
    image: 'https://picsum.photos/id/1028/300/200.jpg',
    rating: 4.8,
    features: createLocalizedArray(
      ['古建筑', '祭祀文化', '园林艺术'],
      ['Ancient Architecture', 'Sacrificial Culture', 'Garden Art'],
      ['古代建築', '祭祀文化', '庭園芸術'],
      ['고대 건축', '제사 문화', '정원 예술']
    ),
    location: createLocalizedText('北京', 'Beijing', '北京', '베이징')
  },
  {
    id: '14',
    name: createLocalizedText(
      '颐和园',
      'Summer Palace',
      '頤和園',
      '이화원'
    ),
    description: createLocalizedText(
      '中国最大的皇家园林，世界文化遗产',
      'The largest royal garden in China, a World Cultural Heritage site',
      '中国最大の皇家庭園、世界文化遺産',
      '중국 최대의 황실 정원, 세계 문화 유산'
    ),
    image: 'https://picsum.photos/id/1029/300/200.jpg',
    rating: 4.8,
    features: createLocalizedArray(
      ['皇家园林', '历史文化', '自然风光'],
      ['Royal Garden', 'Historical Culture', 'Natural Scenery'],
      ['皇家庭園', '歴史文化', '自然風景'],
      ['황실 정원', '역사 문화', '자연 경관']
    ),
    location: createLocalizedText('北京', 'Beijing', '北京', '베이징')
  },
  {
    id: '15',
    name: createLocalizedText(
      '圆明园',
      'Old Summer Palace',
      '円明園',
      '원명원'
    ),
    description: createLocalizedText(
      '清代皇家园林，被誉为"万园之园"',
      'A royal garden of the Qing Dynasty, known as the "Garden of Gardens"',
      '清朝の皇家庭園、「万園の園」と称される',
      '청나라 황실 정원, "만원지원"이라 불림'
    ),
    image: 'https://picsum.photos/id/1030/300/200.jpg',
    rating: 4.6,
    features: createLocalizedArray(
      ['历史遗迹', '园林艺术', '文化教育'],
      ['Historical Ruins', 'Garden Art', 'Cultural Education'],
      ['歴史的遺跡', '庭園芸術', '文化教育'],
      ['역사 유적', '정원 예술', '문화 교육']
    ),
    location: createLocalizedText('北京', 'Beijing', '北京', '베이징')
  },
  {
    id: '16',
    name: createLocalizedText(
      '南锣鼓巷',
      'Nanluoguxiang',
      '南鑼鼓巷',
      '난뤄구샹'
    ),
    description: createLocalizedText(
      '北京最具代表性的胡同之一，展现老北京文化',
      'One of the most representative hutongs in Beijing, showcasing old Beijing culture',
      '北京を代表する胡同の一つ、古い北京の文化を示す',
      '베이징에서 가장 대표적인 후통 중 하나로, 옛 베이징 문화를 보여줌'
    ),
    image: 'https://picsum.photos/id/1031/300/200.jpg',
    rating: 4.5,
    features: createLocalizedArray(
      ['胡同文化', '美食街区', '文创艺术'],
      ['Hutong Culture', 'Food Street', 'Creative Arts'],
      ['胡同文化', 'グルメストリート', 'クリエイティブアート'],
      ['후통 문화', '음식 거리', '창의적 예술']
    ),
    location: createLocalizedText('北京', 'Beijing', '北京', '베이징')
  },
  {
    id: '17',
    name: createLocalizedText(
      '798艺术区',
      '798 Art District',
      '798芸術区',
      '798 예술구'
    ),
    description: createLocalizedText(
      '前身为工厂，现为当代艺术展示和文创产业集中地',
      'Formerly a factory, now a hub for contemporary art exhibitions and creative industries',
      '元々は工場だったが、現在は現代アート展示とクリエイティブ産業の集中地',
      '과거 공장이었으나, 현재는 현대 예술 전시와 창의적 산업의 중심지'
    ),
    image: 'https://picsum.photos/id/1032/300/200.jpg',
    rating: 4.4,
    features: createLocalizedArray(
      ['现代艺术', '文创园区', '工业遗存'],
      ['Modern Art', 'Creative Park', 'Industrial Heritage'],
      ['現代アート', 'クリエイティブパーク', '産業遺産'],
      ['현대 예술', '창의 공원', '산업 유산']
    ),
    location: createLocalizedText('北京', 'Beijing', '北京', '베이징')
  },
  {
    id: '18',
    name: createLocalizedText(
      '什刹海',
      'Shichahai',
      '什刹海',
      '스차하이'
    ),
    description: createLocalizedText(
      '北京著名的历史文化旅游景区，荷花盛开时节景色绝美',
      'A famous historical and cultural tourist area in Beijing, with beautiful scenery when lotus flowers bloom',
      '北京の有名な歴史文化観光地区、蓮の花が咲く季節の景色は絶景',
      '베이징의 유명한 역사 문화 관광지구, 연꽃이 피는 계절에 경치가 절경'
    ),
    image: 'https://picsum.photos/id/1033/300/200.jpg',
    rating: 4.6,
    features: createLocalizedArray(
      ['历史街区', '水域风光', '休闲娱乐'],
      ['Historical District', 'Water Scenery', 'Leisure Entertainment'],
      ['歴史地区', '水域の風景', 'レジャーエンターテイメント'],
      ['역사 지구', '수역 풍경', '레저 엔터테인먼트']
    ),
    location: createLocalizedText('北京', 'Beijing', '北京', '베이징')
  },
  {
    id: '19',
    name: createLocalizedText(
      '北海公园',
      'Beihai Park',
      '北海公園',
      '북해공원'
    ),
    description: createLocalizedText(
      '中国现存最古老的皇家园林之一，园内白塔庄严',
      'One of the oldest existing royal gardens in China, with a solemn white pagoda inside',
      '中国に現存する最古の皇家庭園の一つ、園内の白塔は荘厳',
      '중국에 현존하는 가장 오래된 황실 정원 중 하나로, 정원 내 백탑이 장엄함'
    ),
    image: 'https://picsum.photos/id/1034/300/200.jpg',
    rating: 4.7,
    features: createLocalizedArray(
      ['皇家园林', '历史文化', '自然风光'],
      ['Royal Garden', 'Historical Culture', 'Natural Scenery'],
      ['皇家庭園', '歴史文化', '自然風景'],
      ['황실 정원', '역사 문화', '자연 경관']
    ),
    location: createLocalizedText('北京', 'Beijing', '北京', '베이징')
  },
  {
    id: '20',
    name: createLocalizedText(
      '鸟巢',
      'Bird\'s Nest',
      'バードネスト',
      '버드 네스트'
    ),
    description: createLocalizedText(
      '2008年北京奥运会主场馆，现代建筑艺术的典范',
      'The main stadium of the 2008 Beijing Olympics, a model of modern architectural art',
      '2008年北京オリンピックのメインスタジアム、現代建築芸術の模範',
      '2008년 베이징 올림픽의 메인 스타디움, 현대 건축 예술의 모범'
    ),
    image: 'https://picsum.photos/id/1035/300/200.jpg',
    rating: 4.7,
    features: createLocalizedArray(
      ['现代建筑', '体育场馆', '奥运遗产'],
      ['Modern Architecture', 'Stadium', 'Olympic Heritage'],
      ['現代建築', 'スタジアム', 'オリンピック遺産'],
      ['현대 건축', '경기장', '올림픽 유산']
    ),
    location: createLocalizedText('北京', 'Beijing', '北京', '베이징')
  },
  // 上海景点
  {
    id: '21',
    name: createLocalizedText(
      '外滩',
      'The Bund',
      '外灘',
      '와이탄'
    ),
    description: createLocalizedText(
      '上海地标，汇集各种风格建筑，江边景色迷人',
      'Shanghai landmark, gathering buildings of various styles, with charming riverside scenery',
      '上海のランドマーク、様々なスタイルの建物が集まり、川辺の景色が魅力的',
      '상하이 랜드마크, 다양한 스타일의 건물이 모여 있으며, 강변 경치가 매력적'
    ),
    image: 'https://picsum.photos/id/1036/300/200.jpg',
    rating: 4.8,
    features: createLocalizedArray(
      ['历史建筑', '江滨风光', '夜景观光'],
      ['Historical Buildings', 'Riverside Scenery', 'Night View'],
      ['歴史的建築物', '川辺の風景', '夜景観光'],
      ['역사적 건물', '강변 풍경', '야경 관광']
    ),
    location: createLocalizedText('上海', 'Shanghai', '上海', '상하이')
  },
  {
    id: '22',
    name: createLocalizedText(
      '东方明珠',
      'Oriental Pearl Tower',
      '東方明珠塔',
      '동방명주'
    ),
    description: createLocalizedText(
      '上海城市新景观的象征，亚洲最高的电视塔之一',
      'A symbol of Shanghai\'s new urban landscape, one of the tallest TV towers in Asia',
      '上海の都市新景観の象徴、アジア最高のテレビ塔の一つ',
      '상하이 도시 새 경관의 상징, 아시아에서 가장 높은 TV 타워 중 하나'
    ),
    image: 'https://picsum.photos/id/1037/300/200.jpg',
    rating: 4.7,
    features: createLocalizedArray(
      ['现代建筑', '城市地标', '观光旅游'],
      ['Modern Architecture', 'City Landmark', 'Sightseeing'],
      ['現代建築', '都市ランドマーク', '観光'],
      ['현대 건축', '도시 랜드마크', '관광']
    ),
    location: createLocalizedText('上海', 'Shanghai', '上海', '상하이')
  },
  {
    id: '23',
    name: createLocalizedText('豫园', 'Yu Garden', '豫園', '예원'),
    description: createLocalizedText('明代私家园林，上海著名的古典园林', 'Ming Dynasty private garden, a famous classical garden in Shanghai', '明時代の個人庭園、上海の有名な古典庭園', '명대 개인 정원, 상하이의 유명한 고전 정원'),
    image: 'https://picsum.photos/id/1038/300/200.jpg',
    rating: 4.6,
    features: createLocalizedArray(['古典园林', '传统文化', '商业街区'], ['Classical Garden', 'Traditional Culture', 'Commercial District'], ['古典庭園', '伝統文化', '商業地区'], ['고전 정원', '전통 문화', '상업 지구']),
    location: createLocalizedText('上海', 'Shanghai', '上海', '상하이')
  },
  {
    id: '24',
    name: createLocalizedText('南京路步行街', 'Nanjing Road Pedestrian Street', '南京路歩行街', '난징로 보행자 거리'),
    description: createLocalizedText('中国第一商业大街，购物娱乐的天堂', 'China\'s first commercial street, a paradise for shopping and entertainment', '中国第一の商業大通り、ショッピングとエンターテイメントの天国', '중국 제일의 상업 거리, 쇼핑과 엔터테인먼트의 천국'),
    image: 'https://picsum.photos/id/1039/300/200.jpg',
    rating: 4.5,
    features: createLocalizedArray(['商业街区', '购物天堂', '都市文化'], ['Commercial District', 'Shopping Paradise', 'Urban Culture'], ['商業地区', 'ショッピングパラダイス', '都市文化'], ['상업 지구', '쇼핑 천국', '도시 문화']),
    location: createLocalizedText('上海', 'Shanghai', '上海', '상하이')
  },
  {
    id: '25',
    name: createLocalizedText('迪士尼乐园', 'Disneyland', 'ディズニーランド', '디즈니랜드'),
    description: createLocalizedText('中国大陆首个迪士尼主题乐园，梦幻王国', 'The first Disney theme park in mainland China, a fantasy kingdom', '中国本土初のディズニーテーマパーク、夢の王国', '중국 본토 최초의 디즈니 테마파크, 환상의 왕국'),
    image: 'https://picsum.photos/id/1040/300/200.jpg',
    rating: 4.8,
    features: createLocalizedArray(['主题乐园', '娱乐设施', '亲子游玩'], ['Theme Park', 'Entertainment Facilities', 'Family Fun'], ['テーマパーク', 'エンターテイメント施設', '家族向け'], ['테마 파크', '엔터테인먼트 시설', '가족 놀이']),
    location: createLocalizedText('上海', 'Shanghai', '上海', '상하이')
  },
  {
    id: '26',
    name: createLocalizedText('田子坊', 'Tianzifang', '田子坊', '톈쯔팡'),
    description: createLocalizedText('上海创意产业园区，汇集艺术家和文创店铺', 'Shanghai creative industry park, gathering artists and cultural creative shops', '上海のクリエイティブ産業パーク、アーティストと文化創造ショップが集まる', '상하이 창의 산업 단지, 예술가와 문화 창의 상점이 모인 곳'),
    image: 'https://picsum.photos/id/1041/300/200.jpg',
    rating: 4.5,
    features: createLocalizedArray(['文创园区', '艺术街区', '特色小店'], ['Creative Park', 'Art District', 'Specialty Shops'], ['文化創造パーク', 'アート地区', '特色ショップ'], ['문화 창의 단지', '예술 지구', '특색 상점']),
    location: createLocalizedText('上海', 'Shanghai', '上海', '상하이')
  },
  {
    id: '27',
    name: createLocalizedText('世博园', 'Expo Park', '世博園', '세계박람회 공원'),
    description: createLocalizedText('2010年上海世博会举办地，现为滨江休闲公园', 'The venue of Shanghai World Expo 2010, now a riverside leisure park', '2010年上海万博の開催地、現在は川沿いのレジャーパーク', '2010년 상하이 세계박람회 개최지, 현재는 강변 레저 공원'),
    image: 'https://picsum.photos/id/1042/300/200.jpg',
    rating: 4.4,
    features: createLocalizedArray(['现代建筑', '滨江公园', '文化展览'], ['Modern Architecture', 'Riverside Park', 'Cultural Exhibition'], ['現代建築', '川沿い公園', '文化展示'], ['현대 건축', '강변 공원', '문화 전시']),
    location: createLocalizedText('上海', 'Shanghai', '上海', '상하이')
  },
  {
    id: '28',
    name: createLocalizedText('新天地', 'Xintiandi', '新天地', '신톈디'),
    description: createLocalizedText('石库门建筑改造的时尚休闲地标', 'A fashionable leisure landmark transformed from Shikumen buildings', '石庫門建築を改造したファッショナブルなレジャーランドマーク', '스쿠먼 건축을 개조한 패션 레저 랜드마크'),
    image: 'https://picsum.photos/id/1043/300/200.jpg',
    rating: 4.6,
    features: createLocalizedArray(['历史建筑', '时尚休闲', '美食娱乐'], ['Historical Buildings', 'Fashion Leisure', 'Food and Entertainment'], ['歴史的建物', 'ファッションレジャー', '飲食とエンターテイメント'], ['역사 건물', '패션 레저', '음식과 엔터테인먼트']),
    location: createLocalizedText('上海', 'Shanghai', '上海', '상하이')
  },
  {
    id: '29',
    name: createLocalizedText('静安寺', 'Jing\'an Temple', '静安寺', '징안사'),
    description: createLocalizedText('上海市中心的著名佛教寺院，千年古刹', 'A famous Buddhist temple in the center of Shanghai, a thousand-year-old ancient temple', '上海の中心部にある有名な仏教寺院、千年の古刹', '상하이 중심부의 유명한 불교 사원, 천년 고찰'),
    image: 'https://picsum.photos/id/1044/300/200.jpg',
    rating: 4.5,
    features: createLocalizedArray(['佛教文化', '古建筑', '都市信仰'], ['Buddhist Culture', 'Ancient Architecture', 'Urban Faith'], ['仏教文化', '古代建築', '都市信仰'], ['불교 문화', '고대 건축', '도시 신앙']),
    location: createLocalizedText('上海', 'Shanghai', '上海', '상하이')
  },
  {
    id: '30',
    name: createLocalizedText('陆家嘴', 'Lujiazui', '陸家嘴', '루자쭈이'),
    description: createLocalizedText('上海金融贸易区，现代化建筑群的代表', 'Shanghai\'s financial and trade zone, representative of modern building complexes', '上海の金融貿易区、現代的な建築群の代表', '상하이 금융 무역구, 현대적 건축군의 대표'),
    image: 'https://picsum.photos/id/1045/300/200.jpg',
    rating: 4.7,
    features: createLocalizedArray(['现代建筑', '金融中心', '城市地标'], ['Modern Architecture', 'Financial Center', 'City Landmark'], ['現代建築', '金融センター', '都市のランドマーク'], ['현대 건축', '금융 센터', '도시 랜드마크']),
    location: createLocalizedText('上海', 'Shanghai', '上海', '상하이')
  },
  // 广州景点
  {
    id: '31',
    name: createLocalizedText(
      '陈家祠',
      'Chen Clan Ancestral Hall',
      '陳家祠',
      '천가사'
    ),
    description: createLocalizedText(
      '岭南建筑艺术的杰出代表，古代民居建筑群',
      'Outstanding representative of Lingnan architecture, ancient residential building complex',
      '嶺南建築芸術の傑出した代表、古代の民家建築群',
      '링난 건축 예술의 뛰어난 대표, 고대 민가 건축군'
    ),
    image: 'https://picsum.photos/id/1046/300/200.jpg',
    rating: 4.6,
    features: createLocalizedArray(
      ['岭南建筑', '历史文化', '民俗展示'],
      ['Lingnan Architecture', 'Historical Culture', 'Folk Display'],
      ['嶺南建築', '歴史文化', '民俗展示'],
      ['링난 건축', '역사 문화', '민속 전시']
    ),
    location: createLocalizedText('广州', 'Guangzhou', '広州', '광저우')
  },
  {
    id: '32',
    name: createLocalizedText('沙面岛', 'Shamian Island', '沙面島', '사면도'),
    description: createLocalizedText('欧陆风情建筑群，见证广州近代史的历史街区', 'European-style building complex, a historical district witnessing Guangzhou\'s modern history', '欧州風の建築群、広州の近代史を物語る歴史的な街区', '유럽풍 건축군, 광저우 근대사를 증명하는 역사 지구'),
    image: 'https://picsum.photos/id/1047/300/200.jpg',
    rating: 4.5,
    features: createLocalizedArray(['欧式建筑', '历史街区', '文化休闲'], ['European Architecture', 'Historical District', 'Cultural Leisure'], ['欧式建築', '歴史的な街区', '文化的なレジャー'], ['유럽식 건축', '역사 지구', '문화 레저']),
    location: createLocalizedText('广州', 'Guangzhou', '広州', '광저우')
  },
  {
    id: '33',
    name: createLocalizedText('广州塔', 'Canton Tower', '広州タワー', '광저우 타워'),
    description: createLocalizedText('广州新地标，世界第三高塔，又称小蛮腰', 'Guangzhou\'s new landmark, the world\'s third tallest tower, also known as the Slim Waist', '広州の新しいランドマーク、世界で3番目に高いタワー、別名「小さな細いウエスト」', '광저우의 새로운 랜드마크, 세계에서 세 번째로 높은 타워, 일명 슬림 웨이스트'),
    image: 'https://picsum.photos/id/1048/300/200.jpg',
    rating: 4.8,
    features: createLocalizedArray(['现代建筑', '城市地标', '观光旅游'], ['Modern Architecture', 'City Landmark', 'Sightseeing'], ['現代建築', '都市のランドマーク', '観光'], ['현대 건축', '도시 랜드마크', '관광']),
    location: createLocalizedText('广州', 'Guangzhou', '広州', '광저우')
  },
  {
    id: '34',
    name: createLocalizedText('广州塔', 'Canton Tower', '広州タワー', '광저우 타워'),
    description: createLocalizedText('广州新地标，世界第三高塔，又称小蛮腰', 'Guangzhou\'s new landmark, the world\'s third tallest tower, also known as the Slim Waist', '広州の新しいランドマーク、世界で3番目に高いタワー、別名「小さな細いウエスト」', '광저우의 새로운 랜드마크, 세계에서 세 번째로 높은 타워, 일명 슬림 웨이스트'),
    image: 'https://picsum.photos/id/1049/300/200.jpg',
    rating: 4.8,
    features: createLocalizedArray(['现代建筑', '城市地标', '观光旅游'], ['Modern Architecture', 'City Landmark', 'Sightseeing'], ['現代建築', '都市のランドマーク', '観光'], ['현대 건축', '도시 랜드마크', '관광']),
    location: createLocalizedText('广州', 'Guangzhou', '広州', '광저우')
  },
  {
    id: '35',
    name: createLocalizedText(
      '上下九步行街',
      'Shangxiajiu Pedestrian Street',
      '上下九歩行街',
      '상하구 보행가'
    ),
    description: createLocalizedText(
      '广州最著名的商业步行街，展现老广州风貌',
      'The most famous commercial pedestrian street in Guangzhou, showing the old Guangzhou style',
      '広州で最も有名な商業歩行街、古い広州の風貌を示す',
      '광저우에서 가장 유명한 상업 보행가, 옛 광저우의 모습을 보여줌'
    ),
    image: 'https://picsum.photos/id/1050/300/200.jpg',
    rating: 4.4,
    features: createLocalizedArray(
      ['商业街区', '美食天堂', '岭南文化'],
      ['Commercial District', 'Food Paradise', 'Lingnan Culture'],
      ['商業地区', 'グルメ天国', '嶺南文化'],
      ['상업 지구', '미식 천국', '링난 문화']
    ),
    location: createLocalizedText('广州', 'Guangzhou', '広州', '광저우')
  },
  {
    id: '36',
    name: createLocalizedText(
      '长隆旅游度假区',
      'Chimelong Tourist Resort',
      '長隆旅行リゾート',
      '창룽 관광 리조트'
    ),
    description: createLocalizedText(
      '大型主题乐园群，包含野生动物园和游乐园',
      'Large theme park group, including wildlife park and amusement park',
      '大型テーマパーク群、野生動物園と遊園地を含む',
      '대형 테마파크 그룹, 야생동물원과 놀이공원 포함'
    ),
    image: 'https://picsum.photos/id/1051/300/200.jpg',
    rating: 4.8,
    features: createLocalizedArray(
      ['主题乐园', '亲子游玩', '休闲度假'],
      ['Theme Park', 'Family Fun', 'Leisure Resort'],
      ['テーマパーク', '家族向け', 'レジャーリゾート'],
      ['테마 파크', '가족 놀이', '레저 리조트']
    ),
    location: createLocalizedText('广州', 'Guangzhou', '広州', '광저우')
  },
  {
    id: '37',
    name: createLocalizedText(
      '越秀公园',
      'Yuexiu Park',
      '越秀公園',
      '웨슈 공원'
    ),
    description: createLocalizedText(
      '广州最大的综合性公园，五羊雕像所在地',
      'The largest comprehensive park in Guangzhou, home to the Five Rams Sculpture',
      '広州最大の総合公園、五羊彫刻がある場所',
      '광저우 최대의 종합 공원, 오양 조각상이 있는 곳'
    ),
    image: 'https://picsum.photos/id/1052/300/200.jpg',
    rating: 4.5,
    features: createLocalizedArray(
      ['城市公园', '历史遗迹', '休闲娱乐'],
      ['City Park', 'Historical Relics', 'Leisure Entertainment'],
      ['都市公園', '歴史的遺跡', 'レジャー'],
      ['도시 공원', '역사 유적', '레저 엔터테인먼트']
    ),
    location: createLocalizedText('广州', 'Guangzhou', '広州', '광저우')
  },
  {
    id: '38',
    name: createLocalizedText(
      '广东省博物馆',
      'Guangdong Museum',
      '広東省博物館',
      '광둥성 박물관'
    ),
    description: createLocalizedText(
      '岭南文化与历史的重要展示基地',
      'An important exhibition base for Lingnan culture and history',
      '嶺南文化と歴史の重要な展示拠点',
      '링난 문화와 역사의 중요한 전시 기지'
    ),
    image: 'https://picsum.photos/id/1053/300/200.jpg',
    rating: 4.6,
    features: createLocalizedArray(
      ['文化展览', '历史博物', '科普教育'],
      ['Cultural Exhibition', 'Historical Museum', 'Science Education'],
      ['文化展示', '歴史博物', '科学教育'],
      ['문화 전시', '역사 박물', '과학 교육']
    ),
    location: createLocalizedText('广州', 'Guangzhou', '広州', '광저우')
  },
  {
    id: '39',
    name: createLocalizedText(
      '荔枝湾',
      'Lizhiwan',
      '荔枝湾',
      '리즈완'
    ),
    description: createLocalizedText(
      '岭南水乡特色的历史文化街区',
      'A historical and cultural district with Lingnan water town features',
      '嶺南の水郷の特色がある歴史文化街区',
      '링난 수향 특색의 역사 문화 거리'
    ),
    image: 'https://picsum.photos/id/1054/300/200.jpg',
    rating: 4.4,
    features: createLocalizedArray(
      ['水乡风情', '历史街区', '传统文化'],
      ['Water Town Style', 'Historical District', 'Traditional Culture'],
      ['水郷の風情', '歴史的な街区', '伝統文化'],
      ['수향 풍정', '역사 거리', '전통 문화']
    ),
    location: createLocalizedText('广州', 'Guangzhou', '広州', '광저우')
  },
  {
    id: '40',
    name: createLocalizedText(
      '广州大剧院',
      'Guangzhou Opera House',
      '広州大劇院',
      '광저우 오페라 하우스'
    ),
    description: createLocalizedText(
      '现代建筑艺术精品，珠江新城文化地标',
      'A masterpiece of modern architectural art, a cultural landmark in Zhujiang New Town',
      '現代建築芸術の傑作、珠江新城の文化的ランドマーク',
      '현대 건축 예술 걸작, 주강 신도시 문화 랜드마크'
    ),
    image: 'https://picsum.photos/id/1055/300/200.jpg',
    rating: 4.7,
    features: createLocalizedArray(
      ['现代建筑', '文化艺术', '演出场所'],
      ['Modern Architecture', 'Cultural Art', 'Performance Venue'],
      ['現代建築', '文化芸術', '公演会場'],
      ['현대 건축', '문화 예술', '공연 장소']
    ),
    location: createLocalizedText('广州', 'Guangzhou', '広州', '광저우')
  },
  // 武汉景点
  {
    id: '41',
    name: createLocalizedText(
      '黄鹤楼',
      'Yellow Crane Tower',
      '黄鶴楼',
      '황학루'
    ),
    description: createLocalizedText(
      '国家5A级旅游景区，楚天第一楼',
      'National 5A tourist attraction, the first tower of Chu',
      '国家5A級観光地、楚の第一楼',
      '국가 5A급 관광지, 초천 제일루'
    ),
    image: 'https://picsum.photos/id/1056/300/200.jpg',
    rating: 4.8,
    features: createLocalizedArray(
      ['历史古迹', '文化地标', '诗词文化'],
      ['Historical Site', 'Cultural Landmark', 'Poetry Culture'],
      ['歴史的遺跡', '文化的ランドマーク', '詩歌文化'],
      ['역사 유적', '문화 랜드마크', '시가 문화']
    ),
    location: createLocalizedText('武汉', 'Wuhan', '武漢', '우한')
  },
  {
    id: '42',
    name: createLocalizedText(
      '东湖',
      'East Lake',
      '東湖',
      '동호'
    ),
    description: createLocalizedText(
      '中国最大的城中湖，风景优美',
      'The largest urban lake in China with beautiful scenery',
      '中国最大の都市湖、美しい景色',
      '중국 최대의 도심 호수, 아름다운 경치'
    ),
    image: 'https://picsum.photos/id/1057/300/200.jpg',
    rating: 4.7,
    features: createLocalizedArray(
      ['自然风光', '生态公园', '休闲娱乐'],
      ['Natural Scenery', 'Ecological Park', 'Leisure Entertainment'],
      ['自然風景', '生態公園', 'レジャー'],
      ['자연 경관', '생태 공원', '레저 엔터테인먼트']
    ),
    location: createLocalizedText('武汉', 'Wuhan', '武漢', '우한')
  },
  {
    id: '43',
    name: createLocalizedText(
      '户部巷',
      'Hubu Lane',
      '戸部巷',
      '호부항'
    ),
    description: createLocalizedText(
      '武汉最著名的美食街，汇集各类特色小吃',
      'The most famous food street in Wuhan, gathering various special snacks',
      '武漢で最も有名なグルメストリート、様々な特色ある軽食が集まる',
      '우한에서 가장 유명한 음식 거리, 다양한 특색 있는 간식이 모여 있음'
    ),
    image: 'https://picsum.photos/id/1058/300/200.jpg',
    rating: 4.5,
    features: createLocalizedArray(
      ['美食街区', '传统小吃', '地方文化'],
      ['Food District', 'Traditional Snacks', 'Local Culture'],
      ['グルメ街', '伝統的な軽食', '地方文化'],
      ['미식 거리', '전통 간식', '지방 문화']
    ),
    location: createLocalizedText('武汉', 'Wuhan', '武漢', '우한')
  },
  {
    id: '44',
    name: createLocalizedText(
      '汉口江滩',
      'Hankou Riverside',
      '漢口江灘',
      '한커우 강변'
    ),
    description: createLocalizedText(
      '长江沿岸最美的滨江公园，观赏长江风光',
      'The most beautiful riverside park along the Yangtze River, offering views of the Yangtze River scenery',
      '長江沿岸で最も美しい川辺の公園、長江の景色を眺める',
      '양쯔강 연안에서 가장 아름다운 강변 공원, 양쯔강 풍경을 감상'
    ),
    image: 'https://picsum.photos/id/1059/300/200.jpg',
    rating: 4.6,
    features: createLocalizedArray(
      ['滨江风光', '休闲公园', '城市景观'],
      ['Riverside Scenery', 'Leisure Park', 'Urban Landscape'],
      ['川辺の風景', 'レジャーパーク', '都市景観'],
      ['강변 풍경', '레저 공원', '도시 경관']
    ),
    location: createLocalizedText('武汉', 'Wuhan', '武漢', '우한')
  },
  {
    id: '45',
    name: createLocalizedText(
      '武汉大学',
      'Wuhan University',
      '武漢大学',
      '우한 대학교'
    ),
    description: createLocalizedText(
      '中国最美大学之一，樱花盛开时节尤为壮观',
      'One of the most beautiful universities in China, especially spectacular during cherry blossom season',
      '中国で最も美しい大学の一つ、桜の咲く季節は特に壮観',
      '중국에서 가장 아름다운 대학 중 하나, 벚꽃이 만발할 때 특히 장관'
    ),
    image: 'https://picsum.photos/id/1060/300/200.jpg',
    rating: 4.8,
    features: createLocalizedArray(
      ['校园风光', '樱花胜地', '人文景观'],
      ['Campus Scenery', 'Cherry Blossom Spot', 'Cultural Landscape'],
      ['キャンパスの風景', '桜の名所', '人文景観'],
      ['캠퍼스 풍경', '벚꽃 명소', '인문 경관']
    ),
    location: createLocalizedText('武汉', 'Wuhan', '武漢', '우한')
  },
  {
    id: '46',
    name: createLocalizedText('汉口租界', 'Hankow Concession', '漢口租界', '한커우 조계지'),
    description: createLocalizedText('保存完好的近代租界建筑群，见证武汉近代史', 'Well-preserved modern concession building complex, witnessing Wuhan\'s modern history', '保存状態の良い近代租界の建築群、武漢の近代史を物語る', '잘 보존된 근대 조계지 건축군, 우한 근대사를 증명'),
    image: 'https://picsum.photos/id/1061/300/200.jpg',
    rating: 4.5,
    features: createLocalizedArray(['历史建筑', '文化遗产', '都市风情'], ['Historical Buildings', 'Cultural Heritage', 'Urban Style'], ['歴史的建物', '文化遺産', '都市の風情'], ['역사 건물', '문화 유산', '도시 풍정']),
    location: createLocalizedText('武汉', 'Wuhan', '武漢', '우한')
  },
  {
    id: '47',
    name: createLocalizedText('归元寺', 'Guiyuan Temple', '帰元寺', '귀원사'),
    description: createLocalizedText('武汉历史最悠久的寺院，佛教文化圣地', 'The oldest temple in Wuhan, a sacred place of Buddhist culture', '武漢で最も歴史の長い寺院、仏教文化の聖地', '우한에서 가장 오래된 사원, 불교 문화 성지'),
    image: 'https://picsum.photos/id/1062/300/200.jpg',
    rating: 4.4,
    features: createLocalizedArray(['佛教文化', '古建筑', '宗教圣地'], ['Buddhist Culture', 'Ancient Architecture', 'Religious Sacred Site'], ['仏教文化', '古代建築', '宗教聖地'], ['불교 문화', '고대 건축', '종교 성지']),
    location: createLocalizedText('武汉', 'Wuhan', '武漢', '우한')
  },
  {
    id: '48',
    name: createLocalizedText('武汉长江大桥', 'Wuhan Yangtze River Bridge', '武漢長江大橋', '우한 양쯔강 대교'),
    description: createLocalizedText('第一座跨越长江的大桥，双层铁路公路两用桥', 'The first bridge across the Yangtze River, a double-deck rail and road bridge', '長江を渡る最初の橋、二層式の鉄道と道路の両用橋', '양쯔강을 가로지르는 첫 번째 다리, 이층 철도 도로 겸용 다리'),
    image: 'https://picsum.photos/id/1063/300/200.jpg',
    rating: 4.6,
    features: createLocalizedArray(['桥梁建筑', '历史地标', '工业遗产'], ['Bridge Architecture', 'Historical Landmark', 'Industrial Heritage'], ['橋梁建築', '歴史的ランドマーク', '産業遺産'], ['교량 건축', '역사적 랜드마크', '산업 유산']),
    location: createLocalizedText('武汉', 'Wuhan', '武漢', '우한')
  },
  {
    id: '49',
    name: createLocalizedText('昙华林', 'Tan Hua Lin', '曇華林', '담화림'),
    description: createLocalizedText('武汉最有文艺气息的历史街区，文创艺术聚集地', 'The most artistic historical district in Wuhan, a gathering place for cultural and creative arts', '武漢で最も芸術的な雰囲気を持つ歴史的な地区、文化創造芸術の集まる場所', '우한에서 가장 예술적인 분위기의 역사 지구, 문화 창의 예술 집결지'),
    image: 'https://picsum.photos/id/1064/300/200.jpg',
    rating: 4.5,
    features: createLocalizedArray(['历史街区', '文创艺术', '休闲文化'], ['Historical District', 'Cultural and Creative Arts', 'Leisure Culture'], ['歴史的な地区', '文化創造芸術', 'レジャー文化'], ['역사 지구', '문화 창의 예술', '레저 문화']),
    location: createLocalizedText('武汉', 'Wuhan', '武漢', '우한')
  },
  {
    id: '50',
    name: createLocalizedText('木兰天池', 'Mulan Tianchi', '木蘭天池', '목란 천지'),
    description: createLocalizedText('武汉郊区著名风景区，集山水与人文景观于一体', 'A famous scenic spot in the suburbs of Wuhan, integrating natural and cultural landscapes', '武漢郊外の有名な景勝地、自然と文化の景観が一体となっている', '우한 교외의 유명한 경승지, 자연과 인문 경관이 하나로 통합된 곳'),
    image: 'https://picsum.photos/id/1065/300/200.jpg',
    rating: 4.4,
    features: createLocalizedArray(['自然风光', '登山健行', '生态旅游'], ['Natural Scenery', 'Hiking', 'Eco Tourism'], ['自然の風景', 'ハイキング', 'エコツーリズム'], ['자연 경관', '등산 하이킹', '생태 관광']),
    location: createLocalizedText('武汉', 'Wuhan', '武漢', '우한')
  },
  // 东北景点
  {
    id: '51',
    name: createLocalizedText(
      '哈尔滨冰雪大世界',
      'Harbin Ice and Snow World',
      'ハルビン氷雪大世界',
      '하얼빈 빙설 대세계'
    ),
    description: createLocalizedText(
      '世界最大的冰雪主题乐园，冬季旅游胜地',
      'The world\'s largest ice and snow theme park, a winter tourism destination',
      '世界最大の氷と雪のテーマパーク、冬の観光地',
      '세계 최대의 얼음과 눈 테마 파크, 겨울 관광지'
    ),
    image: 'https://picsum.photos/id/1066/300/200.jpg',
    rating: 4.9,
    features: createLocalizedArray(
      ['冰雪艺术', '主题乐园', '冬季旅游'],
      ['Ice and Snow Art', 'Theme Park', 'Winter Tourism'],
      ['氷と雪の芸術', 'テーマパーク', '冬の観光'],
      ['빙설 예술', '테마 파크', '겨울 관광']
    ),
    location: createLocalizedText('东北', 'Northeast China', '中国東北部', '중국 동북부')
  },
  {
    id: '52',
    name: createLocalizedText(
      '长白山',
      'Changbai Mountain',
      '長白山',
      '장백산'
    ),
    description: createLocalizedText(
      '东北第一山，天池景观壮丽，温泉资源丰富',
      'The first mountain in Northeast China, with magnificent Tianchi scenery and rich hot spring resources',
      '中国東北部の第一の山、天池の景観が壮大で、温泉資源が豊富',
      '중국 동북부 제일의 산, 천지 경관이 장엄하고 온천 자원이 풍부함'
    ),
    image: 'https://picsum.photos/id/1067/300/200.jpg',
    rating: 4.9,
    features: createLocalizedArray(
      ['自然风光', '火山地貌', '温泉胜地'],
      ['Natural Scenery', 'Volcanic Landform', 'Hot Spring Resort'],
      ['自然風景', '火山地形', '温泉リゾート'],
      ['자연 경관', '화산 지형', '온천 리조트']
    ),
    location: createLocalizedText('东北', 'Northeast China', '中国東北部', '중국 동북부')
  },
  {
    id: '53',
    name: createLocalizedText(
      '沈阳故宫',
      'Shenyang Imperial Palace',
      '瀋陽故宮',
      '선양 고궁'
    ),
    description: createLocalizedText(
      '清朝初期皇宫，见证满清入主中原的历史',
      'The early Qing Dynasty palace, witnessing the history of Manchu rule in Central China',
      '清朝初期の宮殿、満州族が中原を支配した歴史を証明する',
      '청나라 초기 궁전, 만주족이 중원을 지배한 역사를 증명'
    ),
    image: 'https://picsum.photos/id/1068/300/200.jpg',
    rating: 4.7,
    features: createLocalizedArray(
      ['古建筑', '历史遗迹', '满清文化'],
      ['Ancient Architecture', 'Historical Relics', 'Manchu Culture'],
      ['古代建築', '歴史的遺跡', '満州文化'],
      ['고대 건축', '역사 유적', '만주 문화']
    ),
    location: createLocalizedText('东北', 'Northeast China', '中国東北部', '중국 동북부')
  },
  {
    id: '54',
    name: createLocalizedText('中央大街', 'Central Street', '中央大街', '중앙 대가'),
    description: createLocalizedText('哈尔滨最著名的商业街，欧式建筑群保存完好', 'The most famous commercial street in Harbin, with well-preserved European-style buildings', 'ハルビンで最も有名な商業通り、ヨーロッパ風の建物がよく保存されている', '하얼빈에서 가장 유명한 상업 거리, 유럽식 건물군이 잘 보존됨'),
    image: 'https://picsum.photos/id/1069/300/200.jpg',
    rating: 4.6,
    features: createLocalizedArray(['欧式建筑', '商业街区', '历史文化'], ['European Architecture', 'Commercial District', 'Historical Culture'], ['ヨーロッパ風建築', '商業地区', '歴史文化'], ['유럽식 건축', '상업 지구', '역사 문화']),
    location: createLocalizedText('东北', 'Northeast China', '中国東北部', '중국 동북부')
  },
  {
    id: '55',
    name: createLocalizedText('五大连池', 'Wudalianchi', '五大連池', '오대련지'),
    description: createLocalizedText('世界地质公园，火山地貌和矿泉资源丰富', 'World Geopark, rich in volcanic landforms and mineral spring resources', '世界地質公園、火山地形と鉱泉資源が豊富', '세계 지질공원, 화산 지형과 광천 자원이 풍부'),
    image: 'https://picsum.photos/id/1070/300/200.jpg',
    rating: 4.5,
    features: createLocalizedArray(['火山地貌', '地质公园', '自然景观'], ['Volcanic Landform', 'Geopark', 'Natural Landscape'], ['火山地形', '地質公園', '自然景観'], ['화산 지형', '지질 공원', '자연 경관']),
    location: createLocalizedText('东北', 'Northeast China', '中国東北部', '중국 동북부')
  },
  {
    id: '56',
    name: createLocalizedText('圣索菲亚教堂', 'Saint Sophia Cathedral', '聖ソフィア大聖堂', '성 소피아 성당'),
    description: createLocalizedText('哈尔滨标志性建筑，俄罗斯建筑艺术精品', 'Harbin\'s iconic building, a masterpiece of Russian architectural art', 'ハルビンのランドマーク的建物、ロシア建築芸術の傑作', '하얼빈의 상징적 건물, 러시아 건축 예술의 걸작'),
    image: 'https://picsum.photos/id/1071/300/200.jpg',
    rating: 4.7,
    features: createLocalizedArray(['俄式建筑', '宗教文化', '城市地标'], ['Russian Architecture', 'Religious Culture', 'City Landmark'], ['ロシア風建築', '宗教文化', '都市のランドマーク'], ['러시아식 건축', '종교 문화', '도시 랜드마크']),
    location: createLocalizedText('东北', 'Northeast China', '中国東北部', '중국 동북부')
  },
  {
    id: '57',
    name: createLocalizedText('镜泊湖', 'Mirror Lake', '鏡泊湖', '경박호'),
    description: createLocalizedText('中国最大的火山堰塞湖，吊水楼瀑布壮观', 'China\'s largest volcanic barrier lake, with the spectacular Diaoshuilou Waterfall', '中国最大の火山堰止湖、吊水楼の滝が壮観', '중국 최대의 화산 댐 호수, 장관인 디아오수이루 폭포'),
    image: 'https://picsum.photos/id/1072/300/200.jpg',
    rating: 4.6,
    features: createLocalizedArray(['自然风光', '地质奇观', '生态旅游'], ['Natural Scenery', 'Geological Wonder', 'Eco Tourism'], ['自然の風景', '地質学的な奇観', 'エコツーリズム'], ['자연 경관', '지질 기관', '생태 관광']),
    location: createLocalizedText('东北', 'Northeast China', '中国東北部', '중국 동북부')
  },
  {
    id: '58',
    name: createLocalizedText('伪满皇宫', 'Puppet Manchurian Palace', '偽満皇宮', '위만황궁'),
    description: createLocalizedText('见证东北沦陷历史的重要遗址，爱国主义教育基地', 'An important site witnessing the history of Northeast China\'s occupation, a patriotic education base', '東北部占領の歴史を物語る重要な遺跡、愛国主義教育の基地', '동북 함락 역사를 증명하는 중요 유적지, 애국주의 교육 기지'),
    image: 'https://picsum.photos/id/1073/300/200.jpg',
    rating: 4.5,
    features: createLocalizedArray(['历史遗迹', '爱国教育', '博物馆'], ['Historical Site', 'Patriotic Education', 'Museum'], ['歴史的遺跡', '愛国教育', '博物館'], ['역사 유적', '애국 교육', '박물관']),
    location: createLocalizedText('东北', 'Northeast China', '中国東北部', '중국 동북부')
  },
  {
    id: '59',
    name: createLocalizedText('雪乡', 'Snow Village', '雪郷', '설향'),
    description: createLocalizedText('中国最美雪乡，冬季观光旅游胜地', 'China\'s most beautiful snow village, a winter tourism destination', '中国で最も美しい雪の村、冬の観光地', '중국에서 가장 아름다운 눈 마을, 겨울 관광 명소'),
    image: 'https://picsum.photos/id/1074/300/200.jpg',
    rating: 4.8,
    features: createLocalizedArray(['冰雪景观', '民俗文化', '乡村旅游'], ['Snow Landscape', 'Folk Culture', 'Rural Tourism'], ['雪景色', '民俗文化', '田舎観光'], ['설경', '민속 문화', '농촌 관광']),
    location: createLocalizedText('东北', 'Northeast China', '中国東北部', '중국 동북부')
  },
  {
    id: '60',
    name: createLocalizedText('北陵公园', 'Beiling Park', '北陵公園', '북릉 공원'),
    description: createLocalizedText('沈阳最大的皇家园林，清朝努尔哈赤陵墓所在地', 'The largest royal garden in Shenyang, the location of Nurhaci\'s tomb of the Qing Dynasty', '瀋陽最大の皇家庭園、清朝ヌルハチの墓所', '선양 최대의 황실 정원, 청나라 누르하치 능묘 소재지'),
    image: 'https://picsum.photos/id/1075/300/200.jpg',
    rating: 4.6,
    features: createLocalizedArray(['皇家陵园', '历史遗迹', '城市公园'], ['Royal Mausoleum', 'Historical Site', 'City Park'], ['皇家墓地', '歴史的遺跡', '都市公園'], ['황실 능원', '역사 유적', '도시 공원']),
    location: createLocalizedText('东北', 'Northeast China', '中国東北部', '중국 동북부')
  }
];