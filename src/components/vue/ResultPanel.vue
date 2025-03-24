<script setup>
import { computed, ref, onMounted, watch, onUnmounted } from 'vue';
import { battleState } from '../../utils/state';
import { getCurrentLang } from '../../i18n/utils';

// 从全局状态获取对战结果
const winner = ref(null);
const loser = ref(null);
const winnerFeature = ref('');
const loserFeature = ref('');
const showResult = ref(false);
const currentLang = ref(getCurrentLang());

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
  
  // 监听语言变化事件
  const handleLanguageChange = (event) => {
    currentLang.value = event.detail.lang;
  };
  window.addEventListener('languageChanged', handleLanguageChange);
  
  // 组件卸载时取消订阅和移除事件监听器
  return () => {
    unsubscribe();
    window.removeEventListener('languageChanged', handleLanguageChange);
  };
});

// 生成结果摘要
const resultSummary = computed(() => {
  if (!winner.value || !loser.value) return '';
  // 使用响应式的currentLang变量
  
  // 根据当前语言获取名称和特性
  const winnerName = winner.value.name[currentLang.value] || '';
  const loserName = loser.value.name[currentLang.value] || '';
  const winnerFeatures = (winner.value.features[currentLang.value] || []).join('、');
  
  // 根据语言返回不同的结果摘要
  if (currentLang.value === 'zh') {
    return `在这场精彩的景点对决中，${winnerName}凭借其出色的${winnerFeature.value}特色战胜了${loserName}。${winnerName}的${winnerFeatures}给游客留下了深刻印象，而${loserName}的${loserFeature.value}特色也同样精彩。`;
  } else if (currentLang.value === 'en') {
    return `In this exciting attraction battle, ${winnerName} defeated ${loserName} with its outstanding ${winnerFeature.value} feature. ${winnerName}'s ${winnerFeatures} left a deep impression on tourists, while ${loserName}'s ${loserFeature.value} feature was equally impressive.`;
  } else if (currentLang.value === 'ja') {
    return `この素晴らしいアトラクション対決で、${winnerName}は優れた${winnerFeature.value}特徴で${loserName}を打ち負かしました。${winnerName}の${winnerFeatures}は観光客に深い印象を残し、${loserName}の${loserFeature.value}特徴も同様に素晴らしいものでした。`;
  } else if (currentLang.value === 'ko') {
    return `이 흥미진진한 명소 대결에서 ${winnerName}은(는) 뛰어난 ${winnerFeature.value} 특징으로 ${loserName}을(를) 이겼습니다. ${winnerName}의 ${winnerFeatures}은(는) 관광객들에게 깊은 인상을 남겼으며, ${loserName}의 ${loserFeature.value} 특징도 마찬가지로 인상적이었습니다.`;
  }
  
  // 默认返回中文
  return `在这场精彩的景点对决中，${winnerName}凭借其出色的${winnerFeature.value}特色战胜了${loserName}。${winnerName}的${winnerFeatures}给游客留下了深刻印象，而${loserName}的${loserFeature.value}特色也同样精彩。`;
});

// 分享功能
const shareToSocial = (platform) => {
  // 使用响应式的currentLang变量
  const winnerName = winner.value.name[currentLang.value] || '';
  const loserName = loser.value.name[currentLang.value] || '';
  
  let text = '';
  if (currentLang.value === 'zh') {
    text = `我在文旅竞技场中观看了${winnerName}与${loserName}的对决，${winnerName}胜出！快来体验吧！`;
  } else if (currentLang.value === 'en') {
    text = `I watched an exciting battle between ${winnerName} and ${loserName} in the Cultural Tourism Arena. ${winnerName} won! Come and experience it!`;
  } else if (currentLang.value === 'ja') {
    text = `文化観光アリーナで${winnerName}と${loserName}の対決を観戦しました。${winnerName}が勝利しました！ぜひ体験してください！`;
  } else if (currentLang.value === 'ko') {
    text = `문화관광 경기장에서 ${winnerName}와(과) ${loserName}의 대결을 관람했습니다. ${winnerName}이(가) 승리했습니다! 함께 체험해보세요!`;
  }
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
      <h2 class="text-2xl font-bold text-gray-800">
        {{ currentLang === 'zh' ? '对战结果' : 
           currentLang === 'en' ? 'Battle Result' : 
           currentLang === 'ja' ? 'バトル結果' : 
           currentLang === 'ko' ? '대결 결과' : '对战结果' }}
      </h2>
      <button 
        @click="startNewBattle"
        class="px-3 py-1 text-sm bg-gray-200 hover:bg-gray-300 rounded-md transition-colors"
      >
        {{ currentLang === 'zh' ? '新对战' : 
           currentLang === 'en' ? 'New Battle' : 
           currentLang === 'ja' ? '新しいバトル' : 
           currentLang === 'ko' ? '새 대결' : '新对战' }}
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
          <h3 class="text-xl font-bold mb-1">
            {{ winner?.name[currentLang.value] }} 
            {{ currentLang === 'zh' ? '胜出！' : 
               currentLang === 'en' ? 'Wins!' : 
               currentLang === 'ja' ? '勝利！' : 
               currentLang === 'ko' ? '승리!' : '胜出！' }}
          </h3>
          <div class="flex flex-wrap gap-1">
            <span 
              v-for="feature in (winner?.features[currentLang.value] || [])" 
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
      <h3 class="text-lg font-semibold text-gray-800 mb-2">
        {{ currentLang === 'zh'? '结果摘要' :
           currentLang === 'en'? 'Result Summary' :
           currentLang === 'ja'? '結果のまとめ' :
           currentLang === 'ko'? '결과 요약' : '结果摘要' }}
      </h3>
      <p class="text-gray-600">
        {{ resultSummary }}
      </p>
    </div>

    <div class="share-section flex items-center gap-4">
      <button
        @click="shareToSocial('weibo')"
        class="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md transition-colors"
      >
        <i class="fab fa-weibo"></i>
        {{ currentLang === 'zh'? '分享到微博' :
           currentLang === 'en'? 'Share to Weibo' :
           currentLang === 'ja'? 'ツイートにシェア' :
           currentLang === 'ko'? '트윗에 공유' : '分享到微博' }}
      </button>
      <button
        @click="shareToSocial('wechat')"
        class="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md transition-colors"
      >
        <i class="fab fa-weixin"></i>
        {{ currentLang === 'zh'? '分享到微信' :
           currentLang === 'en'? 'Share to WeChat' :
           currentLang === 'ja'? 'チャットにシェア' :
           currentLang === 'ko'? '채팅에 공유' : '分享到微信' }}
      </button>
      <button
        @click="shareToSocial('twitter')"
        class="flex items-center gap-2 bg-blue-300 hover:bg-blue-400 text-white px-4 py-2 rounded-md transition-colors"
      >
        <i class="fab fa-twitter"></i>
        {{ currentLang === 'zh'? '分享到推特' :
           currentLang === 'en'? 'Share to Twitter' :
           currentLang === 'ja'? 'ツイートにシェア' :
           currentLang === 'ko'? '트윗에 공유' : '分享到推特' }}
      </button>
    </div>
  </div>
</template>