<script setup>
import { computed, ref, onMounted, watch } from 'vue';
import { battleState } from '../../utils/state';

// 从全局状态获取对战结果
const winner = ref(null);
const loser = ref(null);
const winnerFeature = ref('');
const loserFeature = ref('');
const showResult = ref(false);

// 重置本地状态
const resetLocalState = () => {
  winner.value = null;
  loser.value = null;
  winnerFeature.value = '';
  loserFeature.value = '';
  showResult.value = false;
};

// 监听全局状态变化
onMounted(() => {
  // 初始化时重置本地状态
  resetLocalState();
  const unsubscribe = battleState.subscribe((state) => {
    if (state.winner && state.loser) {
      winner.value = state.winner;
      loser.value = state.loser;
      winnerFeature.value = state.winnerFeature;
      loserFeature.value = state.loserFeature;
      showResult.value = true;
    } else {
      showResult.value = false;
    }
  });

  // 组件卸载时取消订阅
  return () => unsubscribe();
});

// 生成结果摘要
const resultSummary = computed(() => {
  if (!winner.value || !loser.value) return '';
  
  return `在这场精彩的景点对决中，${winner.value.name}凭借其出色的${winnerFeature.value}特色战胜了${loser.value.name}。${winner.value.name}的${winner.value.features.join('、')}给游客留下了深刻印象，而${loser.value.name}的${loserFeature.value}特色也同样精彩。`;
});

// 分享功能
const shareToSocial = (platform) => {
  const text = `我在文旅竞技场中观看了${winner.value.name}与${loser.value.name}的对决，${winner.value.name}胜出！快来体验吧！`;
  let url = '';
  
  switch (platform) {
    case 'weibo':
      url = `https://service.weibo.com/share/share.php?title=${encodeURIComponent(text)}`;
      break;
    case 'wechat':
      // 显示二维码或提示复制链接
      alert('请复制链接分享到微信：' + window.location.href);
      return;
    case 'twitter':
      url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`;
      break;
  }
  
  if (url) window.open(url, '_blank');
};

// 开始新对战
const startNewBattle = () => {
  // 重置本地状态
  resetLocalState();
  
  // 重置全局状态
  battleState.set({
    isActive: false,
    winner: null,
    loser: null,
    winnerFeature: '',
    loserFeature: ''
  });
  
  // 触发事件
  emit('new-battle');
};

// 定义事件
const emit = defineEmits(['new-battle']);
</script>

<template>
  <div v-if="showResult" class="result-panel bg-white p-6 rounded-xl shadow-lg animate-fade-in-up mb-8">
    <div class="flex items-center justify-between mb-6">
      <h2 class="text-2xl font-bold text-gray-800">对战结果</h2>
      <button 
        @click="startNewBattle"
        class="px-3 py-1 text-sm bg-gray-200 hover:bg-gray-300 rounded-md transition-colors"
      >
        新对战
      </button>
    </div>
    
    <div class="winner-section bg-gradient-to-r from-yellow-400 to-yellow-600 text-white p-4 rounded-lg mb-6">
      <div class="flex items-center gap-4">
        <div class="w-16 h-16 rounded-full overflow-hidden border-2 border-white">
          <img 
            v-if="winner" 
            :src="winner.image" 
            :alt="winner.name" 
            class="w-full h-full object-cover"
          />
        </div>
        <div>
          <h3 class="text-xl font-bold mb-1">{{ winner?.name }} 胜出！</h3>
          <div class="flex flex-wrap gap-1">
            <span 
              v-for="feature in winner?.features" 
              :key="feature"
              class="text-xs bg-white/20 px-2 py-1 rounded-full"
            >
              {{ feature }}
            </span>
          </div>
        </div>
      </div>
    </div>
    
    <div class="summary-section bg-gray-50 p-4 rounded-lg mb-6">
      <h3 class="text-lg font-semibold text-gray-800 mb-2">对战总结</h3>
      <p class="text-gray-600">{{ resultSummary }}</p>
    </div>
    
    <div class="share-section">
      <h3 class="text-lg font-semibold text-gray-800 mb-2">分享结果</h3>
      <div class="flex gap-2">
        <button 
          @click="shareToSocial('weibo')"
          class="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-md"
        >
          微博
        </button>
        <button 
          @click="shareToSocial('wechat')"
          class="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-md"
        >
          微信
        </button>
        <button 
          @click="shareToSocial('twitter')"
          class="px-4 py-2 bg-blue-400 hover:bg-blue-500 text-white rounded-md"
        >
          Twitter
        </button>
      </div>
    </div>
  </div>
</template>