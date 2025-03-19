<!-- @component
动画包装器组件，为内容添加过渡动画效果
-->

<script>
  import { fly, fade, scale, slide } from 'svelte/transition';
  import { elasticOut, cubicOut } from 'svelte/easing';
  
  // 动画类型
  export let animation = 'fly'; // 'fly', 'fade', 'scale', 'slide'
  // 动画方向 (仅用于fly和slide)
  export let direction = 'up'; // 'up', 'down', 'left', 'right'
  // 动画持续时间
  export let duration = 400;
  // 动画延迟
  export let delay = 0;
  // 自定义CSS类
  export let customClass = '';
  // 是否启用动画
  export let enabled = true;
  
  // 根据方向设置动画参数
  const getAnimationParams = () => {
    const params = { duration, delay };
    
    if (animation === 'fly') {
      if (direction === 'up') params.y = 20;
      if (direction === 'down') params.y = -20;
      if (direction === 'left') params.x = 20;
      if (direction === 'right') params.x = -20;
      params.easing = cubicOut;
    } else if (animation === 'scale') {
      params.start = 0.95;
      params.easing = elasticOut;
    } else if (animation === 'slide') {
      if (direction === 'up') params.y = 20;
      if (direction === 'down') params.y = -20;
      if (direction === 'left') params.x = 20;
      if (direction === 'right') params.x = -20;
    }
    
    return params;
  };
  
  // 选择动画类型
  const getTransition = () => {
    switch (animation) {
      case 'fade': return fade(getAnimationParams());
      case 'scale': return scale(getAnimationParams());
      case 'slide': return slide(getAnimationParams());
      case 'fly':
      default: return fly(getAnimationParams());
    }
  };
</script>

{#if enabled}
  <div 
    in:getTransition() 
    class={`animation-wrapper ${customClass}`}
  >
    <slot />
  </div>
{:else}
  <div class={customClass}>
    <slot />
  </div>
{/if}

<style>
  .animation-wrapper {
    display: contents;
  }
</style>