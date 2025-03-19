/** @jsxImportSource react */
import { useContext, useState, createContext, useEffect } from 'react';
import { attractions as allAttractions } from '../../data/attractions';
import type { Attraction } from '../../data/attractions';
import { searchTerm, searchLocation, selectedAttractions as storeSelectedAttractions } from '../../utils/state';

const ThemeContext = createContext('light');

export function AttractionList() {
  const [theme] = useState(useContext(ThemeContext));
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [filteredAttractions, setFilteredAttractions] = useState<Attraction[]>(allAttractions);
  const [currentSearchTerm, setCurrentSearchTerm] = useState('');
  const [currentLocation, setCurrentLocation] = useState('');
  const [showStartButton, setShowStartButton] = useState(false);

  // 监听搜索状态变化
  useEffect(() => {
    const unsubscribeSearchTerm = searchTerm.subscribe(term => {
      setCurrentSearchTerm(term);
      filterAttractions(term, currentLocation);
    });

    const unsubscribeSearchLocation = searchLocation.subscribe(location => {
      setCurrentLocation(location);
      filterAttractions(currentSearchTerm, location);
    });

    return () => {
      unsubscribeSearchTerm();
      unsubscribeSearchLocation();
    };
  }, [currentSearchTerm, currentLocation]);

  // 过滤景点
  const filterAttractions = (term: string, location: string) => {
    let filtered = [...allAttractions];

    // 如果有location筛选条件，则进行过滤
    if (location) {
      filtered = filtered.filter(a =>
        a.location.toLowerCase() === location.toLowerCase()
      );
    }

    if (term) {
      filtered = filtered.filter(a =>
        a.name.toLowerCase().includes(term.toLowerCase()) ||
        a.description.toLowerCase().includes(term.toLowerCase()) ||
        a.features.some(f => f.toLowerCase().includes(term.toLowerCase()))
      );
    }

    setFilteredAttractions(filtered);
    // 重置选择状态
    setSelectedIds([]);
    setShowStartButton(false);
    // 重置全局对战状态
    storeSelectedAttractions.set([]);
  };

  // 处理景点选择
  const handleSelect = (attraction: Attraction) => {
    let newSelected;
    if (selectedIds.includes(attraction.id)) {
      newSelected = selectedIds.filter(id => id !== attraction.id);
    } else {
      // 最多选择两个景点
      newSelected = [...selectedIds, attraction.id].slice(-2);
    }

    setSelectedIds(newSelected);
    setShowStartButton(newSelected.length === 2);
  };

  // 开始对战
  const startBattle = () => {
    const selected = allAttractions.filter(a => selectedIds.includes(a.id));
    if (selected.length === 2) {
      // 直接更新全局状态
      storeSelectedAttractions.set(selected);
    }
  };

  return (
    <div className="react-container mb-8 relative">
      <div className="absolute top-2 right-2 bg-blue-500 text-white px-2 py-1 rounded text-sm font-medium">React</div>
      {filteredAttractions.length > 0 ? (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
            {filteredAttractions.map(attraction => (
              <div
                key={attraction.id}
                className={`bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 p-6 ${selectedIds.includes(attraction.id) ? 'ring-2 ring-blue-500' : ''}`}
              >
                <div className="mb-3 h-40 overflow-hidden rounded-lg">
                  <img
                    src={attraction.image}
                    alt={attraction.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-gray-800">{attraction.name}</h3>
                <p className="text-gray-600 text-sm mb-3">{attraction.description}</p>
                <div className="flex flex-wrap gap-1 mb-3">
                  {attraction.features.map(feature => (
                    <span key={feature} className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                      {feature}
                    </span>
                  ))}
                </div>
                <div className="flex items-center justify-between text-blue-600">
                  <span className="flex items-center">
                    <svg className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                    </svg>
                    <span className="ml-1">{attraction.rating}</span>
                  </span>
                  <button
                    onClick={() => handleSelect(attraction)}
                    className={`px-4 py-2 rounded-md transition-colors ${selectedIds.includes(attraction.id) ? 'bg-blue-500 text-white hover:bg-blue-600' : 'bg-blue-100 hover:bg-blue-200'} ${selectedIds.length >= 2 && !selectedIds.includes(attraction.id) ? 'opacity-50 cursor-not-allowed' : ''}`}
                    disabled={selectedIds.length >= 2 && !selectedIds.includes(attraction.id)}
                  >
                    {selectedIds.includes(attraction.id) ? '取消选择' : '选择对战'}
                  </button>
                </div>
              </div>
            ))}
          </div>

          {showStartButton && (
            <div className="flex justify-center mt-6">
              <button
                onClick={startBattle}
                className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-medium rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
              >
                开始对战
              </button>
            </div>
          )}
        </>
      ) : (
        <div className="text-center py-12">
          <p className="text-gray-600">未找到符合条件的景点，请尝试其他搜索条件。</p>
        </div>
      )}
    </div>
  );
}