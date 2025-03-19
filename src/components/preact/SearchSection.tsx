/** @jsxImportSource preact */
import { signal, effect } from "@preact/signals";
import { searchTerm, searchLocation, recentLocations } from "../../utils/state";

export function SearchSection() {
  const localSearchTerm = signal('');
  const localSearchLocation = signal('');
  const showRecentLocations = signal(false);
  const recentLocationsList = signal<string[]>([]);

  // 初始化本地状态从全局状态
  effect(() => {
    // 只在组件初始化时从全局状态同步一次
    if (localSearchTerm.value === '') {
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
    searchTerm.set(localSearchTerm.value);
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
    <div className="preact-container bg-white p-6 rounded-lg shadow-md mb-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">选择地区和景点</h2>
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">地区</label>
          <input
            id="location"
            type="text"
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="输入地区名称..."
            value={localSearchLocation.value}
            onInput={handleLocationInput}
            onBlur={handleLocationBlur}
            onFocus={() => showRecentLocations.value = true}
          />
          {showRecentLocations.value && recentLocationsList.value.length > 0 && (
            <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg">
              {recentLocationsList.value.map((location) => (
                <div 
                  key={location}
                  className="p-2 hover:bg-blue-50 cursor-pointer"
                  onClick={() => selectLocation(location)}
                >
                  {location}
                </div>
              ))}
            </div>
          )}
        </div>
        <div className="flex-1">
          <label htmlFor="keyword" className="block text-sm font-medium text-gray-700 mb-1">关键词</label>
          <input
            id="keyword"
            type="text"
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="搜索景点名称、特色..."
            value={localSearchTerm.value}
            onInput={handleTermInput}
          />
        </div>
      </div>
      <div className="mt-4">
        <div className="text-sm text-gray-600">热门地区：</div>
        <div className="flex flex-wrap gap-2 mt-1">
          {recentLocationsList.value.map((location) => (
            <button
              key={location}
              className="px-3 py-1 text-sm bg-gray-100 hover:bg-gray-200 rounded-full"
              onClick={() => selectLocation(location)}
            >
              {location}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}