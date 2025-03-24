<script lang="ts">
  import { t, getCurrentLang } from '../../i18n/utils';
  console.log('Header', t('site.title'), t('site.subtitle'));
</script>

<div class="container mx-auto px-4">
  <h1 class="text-3xl font-bold text-center">{t('site.title')}</h1>
  <p class="text-center mt-2">{t('site.subtitle')}-{(getCurrentLang())}</p>
</div>