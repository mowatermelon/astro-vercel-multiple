/** @jsxImportSource solid-js */
import { t, getCurrentLang } from '../../i18n/utils';

export default function SolidHeader() {
  console.log('Header', t('site.title'), t('site.subtitle'));
  return (
    <div class="container mx-auto px-4">
      <h1 class="text-3xl font-bold text-center">{t('site.title')}-{(getCurrentLang())}</h1>
      <p class="text-center mt-2">{t('site.subtitle')}-{(getCurrentLang())}</p>
    </div>
  );
}