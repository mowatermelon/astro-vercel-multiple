// 景点数据
export interface Attraction {
  id: string;
  name: string;
  description: string;
  image: string;
  rating: number;
  features: string[];
  location: string;
}

export const attractions: Attraction[] = [
  // 杭州景点
  {
    id: '1',
    name: '西湖',
    description: '中国最著名的风景名胜区，被誉为"人间天堂"',
    image: 'https://picsum.photos/id/1018/300/200',
    rating: 4.9,
    features: ['自然风光', '历史文化', '园林艺术'],
    location: '杭州'
  },
  {
    id: '2',
    name: '灵隐寺',
    description: '中国佛教名刹，创建于东晋，是杭州最早的名刹古寺',
    image: 'https://picsum.photos/id/1019/300/200',
    rating: 4.7,
    features: ['佛教文化', '古建筑', '历史遗迹'],
    location: '杭州'
  },
  {
    id: '3',
    name: '千岛湖',
    description: '因湖中拥有1078个岛屿而得名，水质优良，风景秀丽',
    image: 'https://picsum.photos/id/1015/300/200',
    rating: 4.8,
    features: ['自然风光', '水上活动', '生态旅游'],
    location: '杭州'
  },
  {
    id: '4',
    name: '雷峰塔',
    description: '始建于五代吴越国，与保俶塔隔湖相望，是西湖十景之一',
    image: 'https://picsum.photos/id/1016/300/200',
    rating: 4.5,
    features: ['历史文化', '古建筑', '传说故事'],
    location: '杭州'
  },
  {
    id: '5',
    name: '宋城景区',
    description: '以宋文化为主题的大型景区，包含各类表演和互动体验',
    image: 'https://picsum.photos/id/1020/300/200',
    rating: 4.6,
    features: ['文化体验', '主题乐园', '演艺表演'],
    location: '杭州'
  },
  {
    id: '6',
    name: '西溪湿地',
    description: '江南最大的城市湿地，自然生态与人文景观完美结合',
    image: 'https://picsum.photos/id/1021/300/200',
    rating: 4.7,
    features: ['自然生态', '湿地公园', '文化遗产'],
    location: '杭州'
  },
  {
    id: '7',
    name: '龙井村',
    description: '中国十大名茶龙井茶的原产地，风景优美的茶文化胜地',
    image: 'https://picsum.photos/id/1022/300/200',
    rating: 4.5,
    features: ['茶文化', '乡村风光', '文化体验'],
    location: '杭州'
  },
  {
    id: '8',
    name: '河坊街',
    description: '保存完好的明清古街，展现杭州传统商业文化',
    image: 'https://picsum.photos/id/1023/300/200',
    rating: 4.3,
    features: ['古街文化', '传统商业', '小吃美食'],
    location: '杭州'
  },
  {
    id: '9',
    name: '湘湖',
    description: '国家级旅游度假区，集自然景观和文化遗产于一体',
    image: 'https://picsum.photos/id/1024/300/200',
    rating: 4.4,
    features: ['自然风光', '文化遗产', '休闲度假'],
    location: '杭州'
  },
  {
    id: '10',
    name: '良渚古城遗址',
    description: '世界文化遗产，展现五千年前中华文明的璀璨',
    image: 'https://picsum.photos/id/1025/300/200',
    rating: 4.8,
    features: ['考古遗址', '文化遗产', '历史文化'],
    location: '杭州'
  },
  // 北京景点
  {
    id: '11',
    name: '故宫',
    description: '中国最大的古代宫殿建筑群，世界文化遗产',
    image: 'https://picsum.photos/id/1026/300/200',
    rating: 4.9,
    features: ['古建筑', '历史文化', '皇家文化'],
    location: '北京'
  },
  {
    id: '12',
    name: '长城',
    description: '世界七大奇迹之一，中华文明的象征',
    image: 'https://picsum.photos/id/1027/300/200',
    rating: 4.9,
    features: ['历史文化', '自然风光', '军事建筑'],
    location: '北京'
  },
  {
    id: '13',
    name: '天坛',
    description: '明清两代帝王祭天的场所，中国现存规模最大的祭祀建筑群',
    image: 'https://picsum.photos/id/1028/300/200',
    rating: 4.8,
    features: ['古建筑', '祭祀文化', '园林艺术'],
    location: '北京'
  },
  {
    id: '14',
    name: '颐和园',
    description: '中国最大的皇家园林，世界文化遗产',
    image: 'https://picsum.photos/id/1029/300/200',
    rating: 4.8,
    features: ['皇家园林', '历史文化', '自然风光'],
    location: '北京'
  },
  {
    id: '15',
    name: '圆明园',
    description: '清代皇家园林，被誉为"万园之园"',
    image: 'https://picsum.photos/id/1030/300/200',
    rating: 4.6,
    features: ['历史遗迹', '园林艺术', '文化教育'],
    location: '北京'
  },
  {
    id: '16',
    name: '南锣鼓巷',
    description: '北京最具代表性的胡同之一，展现老北京文化',
    image: 'https://picsum.photos/id/1031/300/200',
    rating: 4.5,
    features: ['胡同文化', '美食街区', '文创艺术'],
    location: '北京'
  },
  {
    id: '17',
    name: '798艺术区',
    description: '前身为工厂，现为当代艺术展示和文创产业集中地',
    image: 'https://picsum.photos/id/1032/300/200',
    rating: 4.4,
    features: ['现代艺术', '文创园区', '工业遗存'],
    location: '北京'
  },
  {
    id: '18',
    name: '什刹海',
    description: '北京著名的历史文化旅游景区，荷花盛开时节景色绝美',
    image: 'https://picsum.photos/id/1033/300/200',
    rating: 4.6,
    features: ['历史街区', '水域风光', '休闲娱乐'],
    location: '北京'
  },
  {
    id: '19',
    name: '北海公园',
    description: '中国现存最古老的皇家园林之一，园内白塔庄严',
    image: 'https://picsum.photos/id/1034/300/200',
    rating: 4.7,
    features: ['皇家园林', '历史文化', '自然风光'],
    location: '北京'
  },
  {
    id: '20',
    name: '鸟巢',
    description: '2008年北京奥运会主场馆，现代建筑艺术的典范',
    image: 'https://picsum.photos/id/1035/300/200',
    rating: 4.7,
    features: ['现代建筑', '体育场馆', '奥运遗产'],
    location: '北京'
  },
  // 上海景点
  {
    id: '21',
    name: '外滩',
    description: '上海地标，汇集各种风格建筑，江边景色迷人',
    image: 'https://picsum.photos/id/1036/300/200',
    rating: 4.8,
    features: ['历史建筑', '江滨风光', '夜景观光'],
    location: '上海'
  },
  {
    id: '22',
    name: '东方明珠',
    description: '上海城市新景观的象征，亚洲最高的电视塔之一',
    image: 'https://picsum.photos/id/1037/300/200',
    rating: 4.7,
    features: ['现代建筑', '城市地标', '观光旅游'],
    location: '上海'
  },
  {
    id: '23',
    name: '豫园',
    description: '明代私家园林，上海著名的古典园林',
    image: 'https://picsum.photos/id/1038/300/200',
    rating: 4.6,
    features: ['古典园林', '传统文化', '商业街区'],
    location: '上海'
  },
  {
    id: '24',
    name: '南京路步行街',
    description: '中国第一商业大街，购物娱乐的天堂',
    image: 'https://picsum.photos/id/1039/300/200',
    rating: 4.5,
    features: ['商业街区', '购物天堂', '都市文化'],
    location: '上海'
  },
  {
    id: '25',
    name: '迪士尼乐园',
    description: '中国大陆首个迪士尼主题乐园，梦幻王国',
    image: 'https://picsum.photos/id/1040/300/200',
    rating: 4.8,
    features: ['主题乐园', '娱乐设施', '亲子游玩'],
    location: '上海'
  },
  {
    id: '26',
    name: '田子坊',
    description: '上海创意产业园区，汇集艺术家和文创店铺',
    image: 'https://picsum.photos/id/1041/300/200',
    rating: 4.5,
    features: ['文创园区', '艺术街区', '特色小店'],
    location: '上海'
  },
  {
    id: '27',
    name: '世博园',
    description: '2010年上海世博会举办地，现为滨江休闲公园',
    image: 'https://picsum.photos/id/1042/300/200',
    rating: 4.4,
    features: ['现代建筑', '滨江公园', '文化展览'],
    location: '上海'
  },
  {
    id: '28',
    name: '新天地',
    description: '石库门建筑改造的时尚休闲地标',
    image: 'https://picsum.photos/id/1043/300/200',
    rating: 4.6,
    features: ['历史建筑', '时尚休闲', '美食娱乐'],
    location: '上海'
  },
  {
    id: '29',
    name: '静安寺',
    description: '上海市中心的著名佛教寺院，千年古刹',
    image: 'https://picsum.photos/id/1044/300/200',
    rating: 4.5,
    features: ['佛教文化', '古建筑', '都市信仰'],
    location: '上海'
  },
  {
    id: '30',
    name: '陆家嘴',
    description: '上海金融贸易区，现代化建筑群的代表',
    image: 'https://picsum.photos/id/1045/300/200',
    rating: 4.7,
    features: ['现代建筑', '金融中心', '城市地标'],
    location: '上海'
  },
  // 广州景点
  {
    id: '31',
    name: '白云山',
    description: '广州第一名山，集自然风光与人文景观于一体',
    image: 'https://picsum.photos/id/1046/300/200',
    rating: 4.7,
    features: ['自然风光', '登山健行', '城市公园'],
    location: '广州'
  },
  {
    id: '32',
    name: '陈家祠',
    description: '岭南建筑艺术的杰出代表，古代民居建筑群',
    image: 'https://picsum.photos/id/1047/300/200',
    rating: 4.6,
    features: ['岭南建筑', '历史文化', '民俗展示'],
    location: '广州'
  },
  {
    id: '33',
    name: '沙面岛',
    description: '欧陆风情建筑群，见证广州近代史的历史街区',
    image: 'https://picsum.photos/id/1048/300/200',
    rating: 4.5,
    features: ['欧式建筑', '历史街区', '文化休闲'],
    location: '广州'
  },
  {
    id: '34',
    name: '广州塔',
    description: '广州新地标，世界第三高塔，又称小蛮腰',
    image: 'https://picsum.photos/id/1049/300/200',
    rating: 4.8,
    features: ['现代建筑', '城市地标', '观光旅游'],
    location: '广州'
  },
  {
    id: '35',
    name: '上下九步行街',
    description: '广州最著名的商业步行街，展现老广州风貌',
    image: 'https://picsum.photos/id/1050/300/200',
    rating: 4.4,
    features: ['商业街区', '美食天堂', '岭南文化'],
    location: '广州'
  },
  {
    id: '36',
    name: '长隆旅游度假区',
    description: '大型主题乐园群，包含野生动物园和游乐园',
    image: 'https://picsum.photos/id/1051/300/200',
    rating: 4.8,
    features: ['主题乐园', '亲子游玩', '休闲度假'],
    location: '广州'
  },
  {
    id: '37',
    name: '越秀公园',
    description: '广州最大的综合性公园，五羊雕像所在地',
    image: 'https://picsum.photos/id/1052/300/200',
    rating: 4.5,
    features: ['城市公园', '历史遗迹', '休闲娱乐'],
    location: '广州'
  },
  {
    id: '38',
    name: '广东省博物馆',
    description: '岭南文化与历史的重要展示基地',
    image: 'https://picsum.photos/id/1053/300/200',
    rating: 4.6,
    features: ['文化展览', '历史博物', '科普教育'],
    location: '广州'
  },
  {
    id: '39',
    name: '荔枝湾',
    description: '岭南水乡特色的历史文化街区',
    image: 'https://picsum.photos/id/1054/300/200',
    rating: 4.4,
    features: ['水乡风情', '历史街区', '传统文化'],
    location: '广州'
  },
  {
    id: '40',
    name: '广州大剧院',
    description: '现代建筑艺术精品，珠江新城文化地标',
    image: 'https://picsum.photos/id/1055/300/200',
    rating: 4.7,
    features: ['现代建筑', '文化艺术', '演出场所'],
    location: '广州'
  },
  // 武汉景点
  {
    id: '41',
    name: '黄鹤楼',
    description: '国家5A级旅游景区，楚天第一楼',
    image: 'https://picsum.photos/id/1056/300/200',
    rating: 4.8,
    features: ['历史古迹', '文化地标', '诗词文化'],
    location: '武汉'
  },
  {
    id: '42',
    name: '东湖',
    description: '中国最大的城中湖，风景优美',
    image: 'https://picsum.photos/id/1057/300/200',
    rating: 4.7,
    features: ['自然风光', '生态公园', '休闲娱乐'],
    location: '武汉'
  },
  {
    id: '43',
    name: '户部巷',
    description: '武汉最著名的美食街，汇集各类特色小吃',
    image: 'https://picsum.photos/id/1058/300/200',
    rating: 4.5,
    features: ['美食街区', '传统小吃', '地方文化'],
    location: '武汉'
  },
  {
    id: '44',
    name: '汉口江滩',
    description: '长江沿岸最美的滨江公园，观赏长江风光',
    image: 'https://picsum.photos/id/1059/300/200',
    rating: 4.6,
    features: ['滨江风光', '休闲公园', '城市景观'],
    location: '武汉'
  },
  {
    id: '45',
    name: '武汉大学',
    description: '中国最美大学之一，樱花盛开时节尤为壮观',
    image: 'https://picsum.photos/id/1060/300/200',
    rating: 4.8,
    features: ['校园风光', '樱花胜地', '人文景观'],
    location: '武汉'
  },
  {
    id: '46',
    name: '汉口租界',
    description: '保存完好的近代租界建筑群，见证武汉近代史',
    image: 'https://picsum.photos/id/1061/300/200',
    rating: 4.5,
    features: ['历史建筑', '文化遗产', '都市风情'],
    location: '武汉'
  },
  {
    id: '47',
    name: '归元寺',
    description: '武汉历史最悠久的寺院，佛教文化圣地',
    image: 'https://picsum.photos/id/1062/300/200',
    rating: 4.4,
    features: ['佛教文化', '古建筑', '宗教圣地'],
    location: '武汉'
  },
  {
    id: '48',
    name: '武汉长江大桥',
    description: '第一座跨越长江的大桥，双层铁路公路两用桥',
    image: 'https://picsum.photos/id/1063/300/200',
    rating: 4.6,
    features: ['桥梁建筑', '历史地标', '工业遗产'],
    location: '武汉'
  },
  {
    id: '49',
    name: '昙华林',
    description: '武汉最有文艺气息的历史街区，文创艺术聚集地',
    image: 'https://picsum.photos/id/1064/300/200',
    rating: 4.5,
    features: ['历史街区', '文创艺术', '休闲文化'],
    location: '武汉'
  },
  {
    id: '50',
    name: '木兰天池',
    description: '武汉郊区著名风景区，集山水与人文景观于一体',
    image: 'https://picsum.photos/id/1065/300/200',
    rating: 4.4,
    features: ['自然风光', '登山健行', '生态旅游'],
    location: '武汉'
  },
  // 东北景点
  {
    id: '51',
    name: '哈尔滨冰雪大世界',
    description: '世界最大的冰雪主题乐园，冬季旅游胜地',
    image: 'https://picsum.photos/id/1066/300/200',
    rating: 4.9,
    features: ['冰雪艺术', '主题乐园', '冬季旅游'],
    location: '东北'
  },
  {
    id: '52',
    name: '长白山',
    description: '东北第一山，天池景观壮丽，温泉资源丰富',
    image: 'https://picsum.photos/id/1067/300/200',
    rating: 4.9,
    features: ['自然风光', '火山地貌', '温泉胜地'],
    location: '东北'
  },
  {
    id: '53',
    name: '沈阳故宫',
    description: '清朝初期皇宫，见证满清入主中原的历史',
    image: 'https://picsum.photos/id/1068/300/200',
    rating: 4.7,
    features: ['古建筑', '历史遗迹', '满清文化'],
    location: '东北'
  },
  {
    id: '54',
    name: '中央大街',
    description: '哈尔滨最著名的商业街，欧式建筑群保存完好',
    image: 'https://picsum.photos/id/1069/300/200',
    rating: 4.6,
    features: ['欧式建筑', '商业街区', '历史文化'],
    location: '东北'
  },
  {
    id: '55',
    name: '五大连池',
    description: '世界地质公园，火山地貌和矿泉资源丰富',
    image: 'https://picsum.photos/id/1070/300/200',
    rating: 4.5,
    features: ['火山地貌', '地质公园', '自然景观'],
    location: '东北'
  },
  {
    id: '56',
    name: '圣索菲亚教堂',
    description: '哈尔滨标志性建筑，俄罗斯建筑艺术精品',
    image: 'https://picsum.photos/id/1071/300/200',
    rating: 4.7,
    features: ['俄式建筑', '宗教文化', '城市地标'],
    location: '东北'
  },
  {
    id: '57',
    name: '镜泊湖',
    description: '中国最大的火山堰塞湖，吊水楼瀑布壮观',
    image: 'https://picsum.photos/id/1072/300/200',
    rating: 4.6,
    features: ['自然风光', '地质奇观', '生态旅游'],
    location: '东北'
  },
  {
    id: '58',
    name: '伪满皇宫',
    description: '见证东北沦陷历史的重要遗址，爱国主义教育基地',
    image: 'https://picsum.photos/id/1073/300/200',
    rating: 4.5,
    features: ['历史遗迹', '爱国教育', '博物馆'],
    location: '东北'
  },
  {
    id: '59',
    name: '雪乡',
    description: '中国最美雪乡，冬季观光旅游胜地',
    image: 'https://picsum.photos/id/1074/300/200',
    rating: 4.8,
    features: ['冰雪景观', '民俗文化', '乡村旅游'],
    location: '东北'
  },
  {
    id: '60',
    name: '北陵公园',
    description: '沈阳最大的皇家园林，清朝努尔哈赤陵墓所在地',
    image: 'https://picsum.photos/id/1075/300/200',
    rating: 4.6,
    features: ['皇家陵园', '历史遗迹', '城市公园'],
    location: '东北'
  }
];