/** @jsxImportSource preact */
import { signal, effect } from "@preact/signals";
import { searchTerm, searchLocation, recentLocations } from "../../utils/state";
import { getCurrentLang, t } from "../../i18n/utils";

declare global {
  interface WindowEventMap {
    languageChanged: CustomEvent<{lang: string}>;
  }
}

export function SearchSection() {
  const localSearchTerm = signal<string | null>(null);
  const localSearchLocation = signal('');
  const showRecentLocations = signal(false);
  const recentLocationsList = signal<{ [key: string]: string }[]>([]);
  const currentLang = signal(getCurrentLang());
  
  // 监听语言变化事件
  if (typeof window !== 'undefined') {
    window.addEventListener('languageChanged', (e: CustomEvent<{lang: string}>) => {
      currentLang.value = e.detail.lang;
    });
  }

  // 初始化本地状态从全局状态
  effect(() => {
    // 只在组件初始化时从全局状态同步一次
    if (localSearchTerm.value === null) {
      localSearchTerm.value = searchTerm.get();
    }
  });

  effect(() => {
    // 只在组件初始化时从全局状态同步一次
    if (localSearchLocation.value === '') {
      localSearchLocation.value = searchLocation.get();
    }
  });

  // 单向数据流：本地状态变化时更新全局状态
  const updateGlobalState = () => {
    searchTerm.set(localSearchTerm.value as string);
    searchLocation.set(localSearchLocation.value);
  };

  effect(() => {
    recentLocationsList.value = recentLocations.get();
  });

  const handleTermInput = (e: Event) => {
    const target = e.target as HTMLInputElement;
    localSearchTerm.value = target.value;
    updateGlobalState();
  };

  const handleLocationInput = (e: Event) => {
    const target = e.target as HTMLInputElement;
    localSearchLocation.value = target.value;
    showRecentLocations.value = true;
    updateGlobalState();
  };

  const handleLocationBlur = () => {
    // 延迟隐藏，以便点击生效
    setTimeout(() => {
      showRecentLocations.value = false;
    }, 200);
  };

  const selectLocation = (location: string) => {
    localSearchLocation.value = location;
    showRecentLocations.value = false;
    updateGlobalState();
  };

  return (
    <div className="preact-container bg-white responsive-p rounded-lg shadow-md mb-8">
      <h2 className="responsive-text-2xl font-bold text-gray-800 mb-4">{t('search.title')}</h2>
      <div className="flex flex-col md:flex-row gap-4 mobile-stack responsive-gap">
        <div className="relative flex-1 mobile-full-width">
          <label htmlFor="location" className="block responsive-text-sm font-medium text-gray-700 mb-1">{t('search.region')}</label>
          <input
            id="location"
            type="text"
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder={t('search.region.placeholder')}
            value={localSearchLocation.value}
            onInput={handleLocationInput}
            onBlur={handleLocationBlur}
            onFocus={() => showRecentLocations.value = true}
          />
          {showRecentLocations.value && recentLocationsList.value.length > 0 && (
            <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg">
              {recentLocationsList.value.map((location) => (
                <div
                  key={location[currentLang.value]}
                  className="p-2 hover:bg-blue-50 cursor-pointer"
                  onClick={() => selectLocation(location[currentLang.value])}
                >
                  {location[currentLang.value]}
                </div>
              ))}
            </div>
          )}
        </div>
        <div className="flex-1 mobile-full-width">
          <label htmlFor="keyword" className="block responsive-text-sm font-medium text-gray-700 mb-1">{t('search.keyword')}</label>
          <input
            id="keyword"
            type="text"
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder={t('search.keyword.placeholder')}
            value={localSearchTerm.value || ''}
            onInput={handleTermInput}
          />
        </div>
      </div>
      <div className="mt-4">
        <div className="responsive-text-sm text-gray-600">{t('search.popular')}</div>
        <div className="flex flex-wrap gap-2 mt-1 responsive-gap">
          {recentLocationsList.value.map((location) => (
            <button
              key={location[currentLang.value]}
              className="px-3 py-1 responsive-text-sm bg-gray-100 hover:bg-gray-200 rounded-full"
              onClick={() => selectLocation(location[currentLang.value])}
            >
              {location[currentLang.value]}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}