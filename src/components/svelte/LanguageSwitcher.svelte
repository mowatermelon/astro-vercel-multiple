<script lang="ts">
  import { onMount } from 'svelte';
  import { supportedLanguages } from '../../i18n/config';
  import { t, getCurrentLang, switchLanguage } from '../../i18n/utils';

  let currentLang = getCurrentLang();

  // 更新按钮状态的函数
  function updateButtonStates(lang: string) {
    currentLang = lang;
  }

  onMount(() => {
    // 监听语言变化事件
    window.addEventListener('languageChanged', (e: CustomEvent) => {
      updateButtonStates(e.detail.lang);
    });
  });

  // 处理语言切换
  function handleLanguageChange(lang: string) {
    switchLanguage(lang);
  }
</script>

<div class="language-switcher flex space-x-2 justify-center my-2">
  {#each supportedLanguages as lang}
    <button
      class="px-2 py-1 rounded text-sm {currentLang === lang ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}"
      data-lang={lang}
      on:click={() => handleLanguageChange(lang)}
    >
      {t(`language.${lang}`)}
    </button>
  {/each}
</div>