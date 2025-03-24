/** @jsxImportSource react */
import { useState, useEffect } from 'react';
import { attractions as allAttractions } from '../../data/attractions';
import type { Attraction } from '../../data/attractions';
import { searchTerm, searchLocation, selectedAttractions as storeSelectedAttractions } from '../../utils/state';
import { getCurrentLang } from '../../i18n/utils';

interface AttractionSwiperProps {
  className?: string;
}

export function AttractionSwiper({ className = '' }: AttractionSwiperProps) {
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [filteredAttractions, setFilteredAttractions] = useState<Attraction[]>(allAttractions);
  const [currentSearchTerm, setCurrentSearchTerm] = useState('');
  const [currentLocation, setCurrentLocation] = useState('');
  const [showStartButton, setShowStartButton] = useState(false);
  const [categories, setCategories] = useState<string[]>([]);
  const [activeCategory, setActiveCategory] = useState<string>('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);

  // 获取"全部"分类的文本
  const getAllCategoryText = (): string => {
    const currentLang = getCurrentLang();
    return currentLang === 'zh' ? '全部' :
           currentLang === 'en' ? 'All' :
           currentLang === 'ja' ? 'すべて' :
           currentLang === 'ko' ? '전체' : '全部';
  };

  // 监听搜索状态变化
  useEffect(() => {
    const unsubscribeSearchTerm = searchTerm.subscribe(term => {
      setCurrentSearchTerm(term);
      filterAttractions(term, currentLocation, activeCategory);
    });

    const unsubscribeSearchLocation = searchLocation.subscribe(location => {
      setCurrentLocation(location);
      filterAttractions(currentSearchTerm, location, activeCategory);
    });

    return () => {
      unsubscribeSearchTerm();
      unsubscribeSearchLocation();
    };
  }, [currentSearchTerm, currentLocation, activeCategory]);

  // 监听语言变化事件
  useEffect(() => {
    const handleLanguageChange = () => {
      // 重新获取当前语言并更新分类
      const currentLang = getCurrentLang();
      const uniqueFeatures = new Set<string>();
      uniqueFeatures.add(getAllCategoryText());
      
      allAttractions.forEach(attraction => {
        const features = attraction.features[currentLang] || 
                        (Array.isArray(attraction.features) ? attraction.features : []);
        
        features.forEach(feature => {
          uniqueFeatures.add(feature);
        });
      });
      
      setCategories(Array.from(uniqueFeatures));
      // 使用当前的搜索条件重新过滤景点
      filterAttractions(currentSearchTerm, currentLocation, activeCategory);
    };

    window.addEventListener('languageChanged', handleLanguageChange);
    
    // 初始化分类
    const currentLang = getCurrentLang();
    const uniqueFeatures = new Set<string>();
    uniqueFeatures.add(getAllCategoryText());

    allAttractions.forEach(attraction => {
      const features = attraction.features[currentLang] || 
                      (Array.isArray(attraction.features) ? attraction.features : []);
      
      features.forEach(feature => {
        uniqueFeatures.add(feature);
      });
    });

    setCategories(Array.from(uniqueFeatures));

    // 清理函数
    return () => {
      window.removeEventListener('languageChanged', handleLanguageChange);
    };
  }, [currentSearchTerm, currentLocation, activeCategory]); // 依赖项包含会在语言切换时需要重新计算的状态

  // 提取所有可用的分类
  useEffect(() => {
    const uniqueFeatures = new Set<string>();
    uniqueFeatures.add(getAllCategoryText());
    const currentLang = getCurrentLang();

    allAttractions.forEach(attraction => {
      // 处理多语言特性数组
      const features = attraction.features[currentLang] || 
                      (Array.isArray(attraction.features) ? attraction.features : []);
      
      features.forEach(feature => {
        uniqueFeatures.add(feature);
      });
    });

    setCategories(Array.from(uniqueFeatures));
  }, []);

  // 过滤景点
  const filterAttractions = (term: string, location: string, category: string) => {
    let filtered = [...allAttractions];
    const currentLang = getCurrentLang();

    // 如果有location筛选条件，则进行过滤
    if (location) {
      filtered = filtered.filter(a =>
        a.location[currentLang]?.toLowerCase() === location.toLowerCase()
      );
    }

    if (term) {
      filtered = filtered.filter(a =>
        a.name[currentLang]?.toLowerCase().includes(term.toLowerCase()) ||
        a.description[currentLang]?.toLowerCase().includes(term.toLowerCase()) ||
        a.features[currentLang]?.some(f => f.toLowerCase().includes(term.toLowerCase()))
      );
    }

    // 按分类筛选
    if (category && category !== getAllCategoryText()) {
      filtered = filtered.filter(a => {
        const features = a.features[currentLang] || 
                        (Array.isArray(a.features) ? a.features : []);
        return features.some(f => f === category);
      });
    }
    
    // 确保没有重复的景点（通过id去重）
    const uniqueAttractions = Array.from(
      new Map(filtered.map(item => [item.id, item])).values()
    );

    setFilteredAttractions(uniqueAttractions);
    setCurrentIndex(0); // 重置当前索引
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

  // 处理分类点击
  const handleCategoryClick = (category: string) => {
    setActiveCategory(category);
    filterAttractions(currentSearchTerm, currentLocation, category);
  };

  // 处理触摸开始
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  // 处理触摸移动
  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  // 处理触摸结束
  const handleTouchEnd = () => {
    const totalPages = getTotalPages();
    if (touchStart - touchEnd > 75) {
      // 向左滑动
      if (currentIndex < totalPages - 1) {
        setCurrentIndex(currentIndex + 1);
      }
    }

    if (touchStart - touchEnd < -75) {
      // 向右滑动
      if (currentIndex > 0) {
        setCurrentIndex(currentIndex - 1);
      }
    }
  };

  // 每页显示的景点数量
  const getItemsPerPage = () => {
    // 统一设置为6个，以满足一屏显示6个景点的需求
    return 6; // 所有屏幕尺寸都显示6个
  };

  // 计算总页数
  const getTotalPages = () => {
    const itemsPerPage = getItemsPerPage();
    return Math.ceil(filteredAttractions.length / itemsPerPage);
  };

  // 获取当前页的景点
  const getCurrentPageAttractions = () => {
    const itemsPerPage = getItemsPerPage();
    const startIndex = currentIndex * itemsPerPage;
    // 使用Map直接去重，确保每个景点只显示一次
    const uniqueAttractions = new Map();
    filteredAttractions.forEach(attraction => {
      if (!uniqueAttractions.has(attraction.id)) {
        uniqueAttractions.set(attraction.id, attraction);
      }
    });
    // 从去重后的景点中截取当前页的数据
    return Array.from(uniqueAttractions.values())
      .slice(startIndex, startIndex + itemsPerPage);
  };

  // 处理点击导航按钮
  const handleNavClick = (direction: 'prev' | 'next') => {
    const totalPages = getTotalPages();
    if (direction === 'prev' && currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    } else if (direction === 'next' && currentIndex < totalPages - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  return (
    <div className={`react-container mb-8 ${className}`}>
      {/* 分类标签滚动条 - 优化视觉效果和移动端显示 */}
      <div className="overflow-x-auto pb-1 mb-2 sticky top-0 bg-white z-10 shadow-sm">
        <div className="flex space-x-1 min-w-max px-2 py-1">
          {categories.map(category => (
            <button
              key={category}
              className={`px-2 py-1 rounded-full text-xs whitespace-nowrap transition-colors ${activeCategory === category ? 'bg-blue-500 text-white shadow-md' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
              onClick={() => handleCategoryClick(category)}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {filteredAttractions.length > 0 ? (
        <>
          {/* 景点卡片滑动区域 - 优化内边距 */}
          <div
            className="relative overflow-hidden px-1 sm:px-2"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            <div className="flex justify-between items-center mb-1">
              <span className="text-gray-500 text-xs">
                {currentIndex + 1} / {getTotalPages()}
              </span>
              <div className="flex space-x-1">
                <button
                  onClick={() => handleNavClick('prev')}
                  disabled={currentIndex === 0}
                  className={`p-1 rounded-full ${currentIndex === 0 ? 'text-gray-300' : 'text-blue-500 hover:bg-blue-50'}`}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </button>
                <button
                  onClick={() => handleNavClick('next')}
                  disabled={currentIndex === getTotalPages() - 1}
                  className={`p-1 rounded-full ${currentIndex === getTotalPages() - 1 ? 'text-gray-300' : 'text-blue-500 hover:bg-blue-50'}`}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>
            </div>

            {filteredAttractions.length > 0 && (
              <div className="relative">
                {/* 滑动提示指示器 - 优化为更轻量的样式 */}
                <div className="absolute inset-x-0 top-1/2 transform -translate-y-1/2 flex justify-between pointer-events-none px-1 opacity-50">
                  <div className="bg-white/70 rounded-full p-1 shadow-sm">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                  </div>
                  <div className="bg-white/70 rounded-full p-1 shadow-sm">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
                
                {/* 网格布局显示多个景点 - 优化移动端布局 */}
                <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-1 sm:gap-2">
                  {getCurrentPageAttractions().map(attraction => (
                    <div key={attraction.id} className="bg-white rounded-lg shadow-sm p-1 transition-all duration-300 transform hover:scale-[1.01]">
                      <div className="mb-0.5 h-16 sm:h-20 overflow-hidden rounded-md relative">
                        <img
                          src={attraction.image}
                          alt={attraction.name[getCurrentLang()] || attraction.name.toString()}
                          className="w-full h-full object-cover transition-transform duration-500"
                        />
                        <div className="absolute bottom-0 right-0 bg-blue-500 text-white px-1 py-0.5 rounded-tl-md text-xs font-medium">
                          {attraction.location[getCurrentLang()] || (typeof attraction.location === 'string' ? attraction.location : '')}
                        </div>
                      </div>
                      <h3 className="text-sm font-semibold mb-0.5 text-gray-800 line-clamp-1">
                        {attraction.name[getCurrentLang()] || (typeof attraction.name === 'string' ? attraction.name : '')}
                      </h3>
                      <p className="text-xs text-gray-600 mb-0.5 line-clamp-1 sm:line-clamp-2">
                        {attraction.description[getCurrentLang()] || (typeof attraction.description === 'string' ? attraction.description : '')}
                      </p>
                      <div className="flex flex-wrap gap-0.5 mb-0.5">
                        {(() => {
                          const currentLang = getCurrentLang();
                          const features = attraction.features[currentLang] || 
                                          (Array.isArray(attraction.features) ? attraction.features : []);
                          
                          return (
                            <>
                              {features.slice(0, 2).map((feature: string) => (
                                <span key={feature} className="text-xs bg-blue-100 text-blue-800 px-1 py-0.5 rounded-full truncate max-w-[80px]">
                                  {feature}
                                </span>
                              ))}
                              {features.length > 2 && (
                                <span className="text-xs bg-gray-100 text-gray-800 px-1 py-0.5 rounded-full">+{features.length - 2}</span>
                              )}
                            </>
                          );
                        })()} 
                      </div>
                      <div className="flex items-center justify-between text-blue-600">
                        <span className="flex items-center bg-yellow-50 px-1 py-0.5 rounded-md">
                          <svg className="w-3 h-3 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                          </svg>
                          <span className="ml-0.5 text-xs font-medium">{attraction.rating}</span>
                        </span>
                        <button
                          onClick={() => handleSelect(attraction)}
                          className={`px-2 py-0.5 text-xs rounded-md transition-all duration-300 transform hover:scale-105 ${selectedIds.includes(attraction.id) ? 'bg-blue-500 text-white hover:bg-blue-600' : 'bg-blue-100 hover:bg-blue-200'} ${selectedIds.length >= 2 && !selectedIds.includes(attraction.id) ? 'opacity-50 cursor-not-allowed' : ''}`}
                          disabled={selectedIds.length >= 2 && !selectedIds.includes(attraction.id)}
                        >
                          {selectedIds.includes(attraction.id) ? 
                            (getCurrentLang() === 'zh' ? '取消' : 
                             getCurrentLang() === 'en' ? 'Cancel' : 
                             getCurrentLang() === 'ja' ? 'キャンセル' : 
                             getCurrentLang() === 'ko' ? '취소' : '取消') : 
                            (getCurrentLang() === 'zh' ? '选择' : 
                             getCurrentLang() === 'en' ? 'Select' : 
                             getCurrentLang() === 'ja' ? '選択' : 
                             getCurrentLang() === 'ko' ? '선택' : '选择')}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>)}
              {/* 开始对战按钮 - 放在网格布局外部 */}
              {showStartButton && (
                  <div className="flex justify-center my-4">
                    <button
                      onClick={startBattle}
                      className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-medium rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
                    >
                      {getCurrentLang() === 'zh' ? '开始对战' : 
                       getCurrentLang() === 'en' ? 'Start Battle' : 
                       getCurrentLang() === 'ja' ? 'バトル開始' : 
                       getCurrentLang() === 'ko' ? '대결 시작' : '开始对战'}
                    </button>
                  </div>
                )}

          </div>

          {/* 已选景点预览 - 优化为更紧凑的样式 */}
          {selectedIds.length > 0 && (
            <div className="mt-3 px-2">
              <div className="bg-blue-50 rounded-lg p-2 border border-blue-100 shadow-sm">
                <h4 className="text-xs font-medium text-blue-700 mb-1 flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  {getCurrentLang() === 'zh' ? '已选景点' : 
                   getCurrentLang() === 'en' ? 'Selected Attractions' : 
                   getCurrentLang() === 'ja' ? '選択したスポット' : 
                   getCurrentLang() === 'ko' ? '선택한 명소' : '已选景点'}（{selectedIds.length}/2）
                </h4>
                <div className="flex flex-wrap gap-1">
                  {selectedIds.map(id => {
                    const attraction = allAttractions.find(a => a.id === id);
                    return attraction ? (
                      <div key={id} className="flex items-center bg-white rounded-full pl-2 pr-1 py-0.5 shadow-sm border border-blue-200 transition-all duration-200 hover:shadow-md">
                        <span className="text-xs text-blue-800 mr-1 font-medium">
                          {attraction.name[getCurrentLang()] || (typeof attraction.name === 'string' ? attraction.name : '')}
                        </span>
                        <button
                          onClick={() => handleSelect(attraction)}
                          className="w-4 h-4 rounded-full bg-red-100 text-red-600 flex items-center justify-center hover:bg-red-200 transition-colors"
                          aria-label={`移除${attraction.name}`}
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-2 w-2" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path>
                          </svg>
                        </button>
                      </div>
                    ) : null;
                  })}
                  {selectedIds.length === 1 && (
                    <div className="text-xs text-blue-600 flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M12 2a10 10 0 110 20 10 10 0 010-20z" />
                      </svg>
                      {getCurrentLang() === 'zh' ? '请选择另一个景点' : 
                       getCurrentLang() === 'en' ? 'Please select another attraction' : 
                       getCurrentLang() === 'ja' ? '別のスポットを選択してください' : 
                       getCurrentLang() === 'ko' ? '다른 명소를 선택해주세요' : '请选择另一个景点'}
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </>
      ) : (
        <div className="text-center py-12">
          <p className="text-gray-600">
            {getCurrentLang() === 'zh' ? '未找到符合条件的景点，请尝试其他搜索条件。' : 
             getCurrentLang() === 'en' ? 'No attractions found matching your criteria. Please try different search terms.' : 
             getCurrentLang() === 'ja' ? '条件に一致する観光スポットが見つかりません。他の検索条件をお試しください。' : 
             getCurrentLang() === 'ko' ? '조건에 맞는 명소를 찾을 수 없습니다. 다른 검색 조건을 시도해보세요.' : 
             '未找到符合条件的景点，请尝试其他搜索条件。'}
          </p>
        </div>
      )}
    </div>
  );
}