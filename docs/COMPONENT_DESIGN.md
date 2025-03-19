# 文旅竞技场跨框架组件设计规范

## 1. 组件架构概述

「文旅竞技场」采用Astro多框架集成能力，利用不同前端框架的优势实现各个功能模块，形成完整的景点对战体验。

## 2. 核心组件设计

### 2.1 Preact组件 - SearchSection.tsx

**功能职责**：
- 实现地区搜索输入与过滤功能
- 处理搜索结果状态管理
- 触发景点列表更新

**状态管理**：
- 使用Preact信号（Signal）管理搜索状态
- 实时响应用户输入变化

**接口定义**：
```tsx
interface SearchProps {
  onSearch: (term: string, location?: string) => void;
  recentLocations?: string[];
}
```

**组件特性**：
- 支持模糊搜索和热门地区快速选择
- 搜索历史记录展示
- 轻量级渲染，快速响应

### 2.2 React组件 - AttractionList.tsx

**功能职责**：
- 展示搜索结果中的景点卡片列表
- 管理景点选择状态
- 提供景点对比功能

**状态管理**：
- 使用React Context实现主题切换
- useState管理选中状态

**接口定义**：
```tsx
type Attraction = {
  id: string;
  name: string;
  description: string;
  image: string;
  rating: number;
  features: string[];
};

interface AttractionListProps {
  attractions: Attraction[];
  onSelect?: (selected: Attraction[]) => void;
}
```

**组件特性**：
- 响应式网格布局
- 景点卡片选择/取消选择交互
- 限制最多选择两个景点
- 选择完成后显示"开始对战"

### 2.3 Solid组件 - BattleArena.tsx

**功能职责**：
- 管理对战界面状态
- 控制对话生成流程
- 处理胜负评判逻辑

**状态管理**：
- 利用Solid的细粒度响应性系统
- 使用createSignal和createStore管理复杂状态

**接口定义**：
```tsx
interface BattleArenaProps {
  leftAttraction: Attraction;
  rightAttraction: Attraction;
  onBattleComplete?: (winner: Attraction, loser: Attraction) => void;
  onBackToSearch?: () => void;
}

interface DialogueMessage {
  text: string;
  typing: boolean;
  side: 'left' | 'right';
}
```

**组件特性**：
- 自动生成景点对话内容
- 打字机效果展示对话
- 支持用户评判胜负
- 结果展示与分享功能

### 2.4 Svelte组件 - ChatMessage.svelte

**功能职责**：
- 展示单条对话消息
- 实现打字机动画效果
- 提供消息样式定制

**状态管理**：
- 利用Svelte的反应式声明
- 内置动画转换系统

**接口定义**：
```svelte
<script lang="ts">
  export let message: string;
  export let typing: boolean = false;
  export let side: 'left' | 'right' = 'left';
  export let delay: number = 0;
</script>
```

**组件特性**：
- 流畅的打字机动画效果
- 根据对话方向调整样式
- 支持延迟显示
- 高性能渲染优化

### 2.5 Vue组件 - ResultDisplay.vue

**功能职责**：
- 展示对战结果
- 提供结果分享功能
- 引导用户进行新的对战

**状态管理**：
- 使用Vue的组合式API
- 响应式数据处理

**接口定义**：
```vue
<script setup lang="ts">
interface ResultProps {
  winner: Attraction;
  loser: Attraction;
  location: string;
  winnerFeature: string;
  loserFeature: string;
}

const props = defineProps<ResultProps>();
const emit = defineEmits<{
  'new-battle': [];
}>();
</script>
```

**组件特性**：
- 动态生成结果总结
- 胜出景点突出显示
- 分享按钮与功能
- 新对战入口

## 3. 跨框架通信机制

### 3.1 Astro Islands通信

各框架组件通过Astro页面作为中间层进行通信，利用props传递和自定义事件实现组件间数据流动。

### 3.2 共享状态管理

使用Astro提供的共享状态机制，确保不同框架组件能够访问相同的数据源：

```astro
---
// 在Astro页面中定义共享状态
import { createSharedState } from '../utils/state';
const sharedState = createSharedState();
---

<!-- 将状态传递给各框架组件 -->
<SearchSection client:load state={sharedState} />
<AttractionList client:visible state={sharedState} />
```

### 3.3 事件委托模式

通过Astro页面作为事件代理，实现不同框架组件间的事件通信：

```astro
---
let selectedAttractions = [];

function handleAttractionSelect(attractions) {
  selectedAttractions = attractions;
}
---

<AttractionList 
  client:visible 
  onSelect={handleAttractionSelect} 
/>

<BattleArena 
  client:visible 
  attractions={selectedAttractions}
/>
```

## 4. 性能优化策略

### 4.1 按需加载

利用Astro的客户端指令，实现组件按需加载：

- `client:load` - 页面加载后立即加载（用于关键交互组件）
- `client:visible` - 组件进入视口时加载（用于非首屏组件）
- `client:idle` - 浏览器空闲时加载（用于非关键组件）

### 4.2 框架选择原则

- **Preact** - 用于轻量级UI组件，如搜索框
- **React** - 用于复杂状态管理的列表组件
- **Solid** - 用于高性能的状态驱动组件
- **Svelte** - 用于动画和过渡效果
- **Vue** - 用于响应式数据展示组件