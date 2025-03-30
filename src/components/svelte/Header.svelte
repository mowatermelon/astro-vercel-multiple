<script lang="ts">
  import { t, getCurrentLang } from '../../i18n/utils';
  console.log('Header', t('site.title'), t('site.subtitle'));
</script>

<div>
  <div class="relative aspect-[21/10] bg-cover bg-center" style="background-image: url('/banner.jpg')">
    <div class="absolute inset-0  bg-opacity-40"></div>
  </div>
  <div class="container mx-auto px-4 py-8">
    <h1 class="text-4xl font-bold text-center text-gray-800">{t('site.title')}</h1>
    <p class="text-center mt-4 text-gray-600 text-xl">{t('site.subtitle')}-{(getCurrentLang())}</p>
  </div>
</div>