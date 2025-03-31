/** @jsxImportSource solid-js */
import { createSignal, createEffect, For, Show } from 'solid-js';
import './BattleArena.css';
import { selectedAttractions, battleState as globalBattleState, type DialogueMessage } from '../../utils/state';
import type { Attraction } from '../../data/attractions';
import { getLocalizedText, getLocalizedArray, getCurrentLang } from '../../i18n/utils';

// 获取各主题的特色内容
type ThemeLocalization = {
  [key in 'features' | 'cuisine' | 'medical' | 'culture' | 'heritage']: {
    zh: string;
    en: string;
    ja: string;
    ko: string;
  };
};

type DialogueTemplate = {
  [key: string]: {
    left: {
      intro: (name: string) => string;
      details: (features: string[]) => string;
      strengths: (title: string) => string;
    };
    right: {
      intro: (name: string) => string;
      details: (features: string[]) => string;
      strengths: (title: string) => string;
    };
    compare: (title: string) => string;
    compareFeatures: (leftName: string, leftFeatures: string, rightName: string, rightFeatures: string) => string;
    rhetoricalQuestion: (title: string) => string;
  };
};

const themeLocalizations: ThemeLocalization = {
  features: {
    zh: '特色篇',
    en: 'Features',
    ja: '特色編',
    ko: '특색편'
  },
  cuisine: {
    zh: '美食篇',
    en: 'Cuisine',
    ja: 'グルメ編',
    ko: '미식편'
  },
  medical: {
    zh: '医疗篇',
    en: 'Medical Facilities',
    ja: '医療編',
    ko: '의료편'
  },
  culture: {
    zh: '文化篇',
    en: 'Culture',
    ja: '文化編',
    ko: '문화편'
  },
  heritage: {
    zh: '非遗篇',
    en: 'Intangible Heritage',
    ja: '無形文化遺産編',
    ko: '무形문화유산편'
  }
};

export const BattleArena = () => {
  const currentLang = getCurrentLang();
  const [leftAttraction, setLeftAttraction] = createSignal<Attraction | null>(null);
  const [rightAttraction, setRightAttraction] = createSignal<Attraction | null>(null);
  const [messages, setMessages] = createSignal<DialogueMessage[]>([]);
  const [isTyping, setIsTyping] = createSignal(false);
  const [battleActive, setBattleActive] = createSignal(false);
  const [showVoteButtons, setShowVoteButtons] = createSignal(false);
  const [winner, setWinner] = createSignal<Attraction | null>(null);
  const [currentTheme, setCurrentTheme] = createSignal<string>('');
  const [themeWinners, setThemeWinners] = createSignal<Record<string, Attraction>>({});

  // 监听选中的景点
  const [battleVersion, setBattleVersion] = createSignal(0);

  // 创建一个订阅函数来监听selectedAttractions的变化
  const unsubscribe = selectedAttractions.subscribe(() => {
    // 每当selectedAttractions变化时，增加版本号
    setBattleVersion(prev => prev + 1);

    // 重置对话状态
    setMessages([]);
    setIsTyping(false);
    setShowVoteButtons(false);
    setWinner(null);
  });

  createEffect(() => {
    // 使用battleVersion作为依赖，强制在selectedAttractions变化时重新执行
    battleVersion();

    const selected = selectedAttractions.get();
    // 重置状态
    setMessages([]);
    setIsTyping(false);
    setShowVoteButtons(false);
    setWinner(null);

    // 重置全局对话状态
    globalBattleState.setKey('messages', []);
    globalBattleState.setKey('winner', null);
    globalBattleState.setKey('loser', null);
    globalBattleState.setKey('winnerFeature', '');
    globalBattleState.setKey('loserFeature', '');

    if (selected.length === 2) {
      // 设置对战景点
      setLeftAttraction(selected[0]);
      setRightAttraction(selected[1]);
      setBattleActive(true);

      // 更新全局状态
      globalBattleState.setKey('isActive', true);
      globalBattleState.setKey('leftAttraction', selected[0]);
      globalBattleState.setKey('rightAttraction', selected[1]);

      // 开始对战
      startBattle(selected[0], selected[1]);
    } else {
      setBattleActive(false);
      setLeftAttraction(null);
      setRightAttraction(null);

      // 重置全局状态
      globalBattleState.setKey('isActive', false);
      globalBattleState.setKey('leftAttraction', null);
      globalBattleState.setKey('rightAttraction', null);
    }
  });

  // 开始对战
  const startBattle = (left: Attraction, right: Attraction) => {
    // 完全重置所有状态
    setMessages([]);
    setIsTyping(true);
    setShowVoteButtons(false);
    setWinner(null);
    setCurrentTheme('features'); // 默认设置为特色篇

    // 重置全局对话状态
    globalBattleState.setKey('messages', []);

    // 生成对话内容
    const dialogue = generateDialogue(left, right);

    // 模拟打字机效果显示对话
    let index = 0;
    const timer = setInterval(() => {
      if (index < dialogue.length) {
        setMessages(prev => [...prev, {
          text: dialogue[index].text,
          typing: true,
          side: dialogue[index].side
        }]);

        // 短暂延迟后停止打字动画
        setTimeout(() => {
          setMessages(msgs => {
            const newMsgs = [...msgs];
            if (newMsgs[index]) {
              newMsgs[index] = { ...newMsgs[index], typing: false };
            }
            return newMsgs;
          });
        }, 1000);

        index++;
      } else {
        clearInterval(timer);
        setIsTyping(false);
        setShowVoteButtons(true);
      }
    }, 2000);
  };

  // 生成对话内容
  const generateDialogue = (left: Attraction, right: Attraction): DialogueMessage[] => {
    const currentLang = getCurrentLang();
    let dialogue: DialogueMessage[] = [];

    const getThemeTitle = (themeKey: 'features' | 'cuisine' | 'medical' | 'culture' | 'heritage') => themeLocalizations[themeKey][currentLang as 'zh' | 'en' | 'ja' | 'ko'];

    const themes = {
      features: {
        left: getLocalizedArray(left.features),
        right: getLocalizedArray(right.features),
        title: getThemeTitle('features')
      },
      cuisine: {
        left: left.cuisine ? getLocalizedArray(left.cuisine) : [],
        right: right.cuisine ? getLocalizedArray(right.cuisine) : [],
        title: getThemeTitle('cuisine')
      },
      medical: {
        left: left.medicalFacilities ? getLocalizedArray(left.medicalFacilities) : [],
        right: right.medicalFacilities ? getLocalizedArray(right.medicalFacilities) : [],
        title: getThemeTitle('medical')
      },
      culture: {
        left: left.culture ? getLocalizedArray(left.culture) : [],
        right: right.culture ? getLocalizedArray(right.culture) : [],
        title: getThemeTitle('culture')
      },
      heritage: {
        left: left.intangibleHeritage ? getLocalizedArray(left.intangibleHeritage) : [],
        right: right.intangibleHeritage ? getLocalizedArray(right.intangibleHeritage) : [],
        title: getThemeTitle('heritage')
      }
    };

    // 定义各语言的对话模板
    const dialogueTemplates: DialogueTemplate = {
      zh: {
        left: {
          intro: (name: string) => `欢迎来到${name}，这里汇聚了独具魅力的文旅特色！`,
          details: (features: string[]) => `我们的核心特色包含：${features.slice(0, 3).join('、')}等多维度体验。`,
          strengths: () => '无论是文化底蕴还是服务设施，都号称行业标杆！'
        },
        right: {
          intro: (name: string) => `${name}诚邀您感受非凡旅程！`,
          details: (features: string[]) => `特色项目涵盖${features.slice(0, 3).join('、')}等创新体验。`,
          strengths: () => '在游客满意度和专业评审中始终名列前茅！'
        },
        compare: (title: string) => `让我们来看看谁在${title}方面更胜一筹！`,
        compareFeatures: (leftName: string, leftFeatures: string, rightName: string, rightFeatures: string) =>
          `${leftName}的${leftFeatures} VS ${rightName}的${rightFeatures}，可谓各有千秋！`,
        rhetoricalQuestion: (title: string) => {
          const questions = {
            features: '您觉得哪边的景观更让人流连忘返呢？',
            cuisine: '哪边的美食更让您食指大动呢？',
            medical: '哪边的医疗服务更让您安心呢？',
            culture: '哪边的文化底蕴更吸引您呢？',
            heritage: '哪边的非遗传承更打动您呢？'
          };
          return questions[title as keyof typeof questions] || '您觉得哪边更胜一筹呢？';
        }
      },
      en: {
        left: {
          intro: (name: string) => `Welcome to ${name}, where unique cultural experiences await!`,
          details: (features: string[]) => `Our core features include: ${features.slice(0, 3).join(', ')} and more multidimensional experiences.`,
          strengths: () => 'Both cultural heritage and service facilities are industry benchmarks!'
        },
        right: {
          intro: (name: string) => `${name} invites you to an extraordinary journey!`,
          details: (features: string[]) => `Featured programs cover innovative experiences like ${features.slice(0, 3).join(', ')}.`,
          strengths: () => 'Consistently top-rated by visitors and professional reviewers!'
        },
        compare: (title: string) => `Let\'s see who excels in ${title}!`,
        compareFeatures: (leftName: string, leftFeatures: string, rightName: string, rightFeatures: string) =>
          `${leftName}'s ${leftFeatures} vs ${rightName}'s ${rightFeatures}, each has its merits!`,
        rhetoricalQuestion: (title: string) => {
          const questions = {
            features: 'Which landscape makes you linger?',
            cuisine: 'Which cuisine makes your mouth water?',
            medical: 'Which medical services make you feel more secure?',
            culture: 'Which cultural heritage attracts you more?',
            heritage: 'Which intangible heritage moves you more?'
          };
          return questions[title as keyof typeof questions] || 'Which side do you think is better?';
        }
      },
      ja: {
        left: {
          intro: (name: string) => `${name}の${getThemeTitle('features')}へようこそ！`, 
          details: (features: string[]) => `当施設の特徴は${features.join('、')}など多角的な体験を提供します。`,
          strengths: () => '文化遺産と施設設備の両面で業界の模範となっております！'
        },
        right: {
          intro: (name: string) => `${name}が特別な旅をご提供します！`,
          details: (features: string[]) => `${features.slice(0,3).join('、')}などユニークな体験が可能です。`,
          strengths: () => '訪問者満足度調査で常に最高評価を獲得しております！'
        },
        compare: (title: string) => `${title}における優劣を見極めましょう！`,
        compareFeatures: (leftName: string, leftFeatures: string, rightName: string, rightFeatures: string) =>
          `${leftName}の${leftFeatures} VS ${rightName}の${rightFeatures}、それぞれ特色があります！`,
        rhetoricalQuestion: (title: string) => {
          const questions = {
            features: 'どちらの景観がより印象的でしたか？',
            cuisine: 'どちらの料理がより食欲をそそりますか？',
            medical: 'どちらの医療サービスがより安心できますか？',
            culture: 'どちらの文化がより魅力的ですか？',
            heritage: 'どちらの無形文化遺産が心に響きましたか？'
          };
          return questions[title as keyof typeof questions] || 'どちらが優れていると思いますか？';
        }
      },
      ko: {
        left: {
          intro: (name: string) => `${name}에 오신 것을 환영합니다! ${getThemeTitle('features')}를 소개합니다!`,
          details: (features: string[]) => `주요 특징으로는 ${features.slice(0,3).join(', ')} 등 다양한 경험을 제공합니다.`,
          strengths: () => '문화 유산과 시설 모두 업계 표준을 자랑합니다!'
        },
        right: {
          intro: (name: string) => `${name}에서 특별한 여행을 경험해보세요!`,
          details: (features: string[]) => `차별화된 ${features.slice(0,3).join(', ')} 프로그램을 운영하고 있습니다.`,
          strengths: () => '방문객 만족도 조사에서 항상 최고 순위를 기록하고 있습니다!'
        },
        compare: (title: string) => `${title} 분야에서 어떤 곳이 더 뛰어난지 비교해보겠습니다!`,
        compareFeatures: (leftName: string, leftFeatures: string, rightName: string, rightFeatures: string) =>
          `${leftName}의 ${leftFeatures} VS ${rightName}의 ${rightFeatures}，각각의 장점이 있습니다!`,
        rhetoricalQuestion: (title: string) => {
          const questions = {
            features: '어느 쪽 경관이 더 마음에 남으셨나요?',
            cuisine: '어느 쪽 음식이 더 맛있어 보이나요?',
            medical: '어느 쪽 의료 서비스가 더 안전하다고 느끼셨나요?',
            culture: '어느 쪽 문화 유산이 더 매력적이었나요?',
            heritage: '어느 쪽 무형 유산이 더 감동적이었나요?'
          };
          return questions[title as keyof typeof questions] || '어느 쪽이 더 낫다고 생각하시나요?';
        }
      }
    };

    // 为每个主题生成对话
    Object.entries(themes).forEach(([themeKey, theme]) => {
      if (theme.left.length > 0 || theme.right.length > 0) {
        // 生成对话时不改变currentTheme，它已在startBattle中设置
        // 添加主题标题
        dialogue.push({
          text: `「 ${theme.title} 」`,
          typing: false,
          side: 'system'
        });

        const template = dialogueTemplates[currentLang];

        // 生成左边景点的对话
        if (theme.left.length > 0) {
          dialogue.push({
            text: template.left.intro(getLocalizedText(left.name)) + ' ' + template.left.details(theme.left) + ' ' + template.left.strengths(theme.title),
            typing: false,
            side: 'left'
          });
        }

        // 生成右边景点的对话
        if (theme.right.length > 0) {
          dialogue.push({
            text: template.right.intro(getLocalizedText(right.name)) + ' ' + template.right.details(theme.right) + ' ' + template.right.strengths(theme.title),
            typing: false,
            side: 'right'
          });
        }

      }
    });

    return dialogue;
  };

  // 处理主题投票
  const handleThemeVote = (winner: Attraction, theme: string) => {
    setThemeWinners(prev => ({ ...prev, [theme]: winner }));
    setShowVoteButtons(false);
    const loser = winner === leftAttraction() ? rightAttraction() : leftAttraction();

    // 更新全局状态
    if (theme === 'features') {
      globalBattleState.setKey('winner', winner);
      globalBattleState.setKey('loser', loser);
    }
  };
  // 处理最后投票
  const handleVote = (winner: Attraction, loser: Attraction, winnerFeature: string, loserFeature: string) => {
    setWinner(winner);
    setShowVoteButtons(false);

    // 更新全局状态
    globalBattleState.set({
      ...globalBattleState.get(),
      winner,
      loser,
      winnerFeature,
      loserFeature
    });
  };

  // 返回选择界面
  const handleBackToSelect = () => {
    setBattleActive(false);
    setMessages([]);
    setLeftAttraction(null);
    setRightAttraction(null);
    setWinner(null);

    // 清空选择
    selectedAttractions.set([]);

    // 更新全局状态
    globalBattleState.setKey('isActive', false);
  };

  return (
    <div class="solid-container">
      <Show when={battleActive()}>
        <div class="battle-container bg-white rounded-xl shadow-lg p-6 mb-8 mt-8">
          <div class="flex justify-between items-center mb-6">
            <h2 class="text-2xl font-bold text-gray-800">
              {getCurrentLang() === 'zh' ? '景点对战竞技场' :
                getCurrentLang() === 'en' ? 'Attraction Battle Arena' :
                  getCurrentLang() === 'ja' ? 'アトラクション対戦アリーナ' :
                    getCurrentLang() === 'ko' ? '명소 대결 경기장' : '景点对战竞技场'}
            </h2>
            <button
              onClick={handleBackToSelect}
              class="px-3 py-1 text-sm bg-gray-200 hover:bg-gray-300 rounded-md transition-colors"
            >
              {getCurrentLang() === 'zh' ? '返回选择' :
                getCurrentLang() === 'en' ? 'Back to Selection' :
                  getCurrentLang() === 'ja' ? '選択に戻る' :
                    getCurrentLang() === 'ko' ? '선택으로 돌아가기' : '返回选择'}
            </button>
          </div>

          <div class="flex justify-between items-start mb-8">
            <div class="w-1/3 text-center">
              <Show when={leftAttraction()}>
                <div class="bg-blue-50 rounded-lg p-4">
                  <div class="w-24 h-24 mx-auto rounded-full overflow-hidden mb-3">
                    <img
                      src={leftAttraction()?.image}
                      alt={leftAttraction() ? getLocalizedText(leftAttraction()!.name) : ''}
                      class="w-full h-full object-cover"
                    />
                  </div>
                  <h3 class="text-lg font-semibold text-blue-700">
                    {leftAttraction() ? getLocalizedText(leftAttraction()!.name) : ''}
                  </h3>
                  <div class="flex flex-wrap gap-1 mt-2">
                    <For each={leftAttraction() ? getLocalizedArray(leftAttraction()!.features) : []}>
                      {(feature) => (
                        <span class="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                          {feature}
                        </span>
                      )}
                    </For>
                  </div>
                </div>
              </Show>
            </div>
            <div class="w-1/3 text-center flex items-center justify-center">
              <div class="text-2xl font-bold text-gray-600">VS</div>
            </div>
            <div class="w-1/3 text-center">
              <Show when={rightAttraction()}>
                <div class="bg-purple-50 rounded-lg p-4">
                  <div class="w-24 h-24 mx-auto rounded-full overflow-hidden mb-3">
                    <img
                      src={rightAttraction()?.image}
                      alt={rightAttraction() ? getLocalizedText(rightAttraction()!.name) : ''}
                      class="w-full h-full object-cover"
                    />
                  </div>
                  <h3 class="text-lg font-semibold text-blue-700">
                    {rightAttraction() ? getLocalizedText(rightAttraction()!.name) : ''}
                  </h3>
                  <div class="flex flex-wrap gap-1 mt-2">
                    <For each={rightAttraction() ? getLocalizedArray(rightAttraction()!.features) : []}>
                      {(feature) => (
                        <span class="text-xs bg-purple-100 text-purple-800 px-2 py-1 rounded-full">
                          {feature}
                        </span>
                      )}
                    </For>
                  </div>
                </div>
              </Show>
            </div>
          </div>

          <div class={`messages ${currentTheme()}`}>
            <For each={messages()}>
              {(message) => (
                <div class={`message ${message.side} ${message.typing ? 'typing' : ''}`}>
                  {message.text}
                </div>
              )}
            </For>
          </div>

          <Show when={showVoteButtons()}>
            <div class="voting-section">
              <h3 class="text-xl font-semibold text-gray-800 mb-4">
                {getCurrentLang() === 'zh' ? '请评判胜负' :
                  getCurrentLang() === 'en' ? 'Please Judge the Winner' :
                    getCurrentLang() === 'ja' ? '勝敗を判定してください' :
                      getCurrentLang() === 'ko' ? '승패를 판정해주세요' : '请评判胜负'}
              </h3>
              <div class="flex justify-center gap-4">
                <button
                  onClick={() => handleVote(
                    leftAttraction()!,
                    rightAttraction()!,
                    leftAttraction() ? getLocalizedArray(leftAttraction()!.features)[0] || '' : '',
                    rightAttraction() ? getLocalizedArray(rightAttraction()!.features)[0] || '' : ''
                  )}
                  class="px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors"
                >
                  {leftAttraction() ? getLocalizedText(leftAttraction()!.name) : ''}
                  {getCurrentLang() === 'zh' ? '胜出' :
                    getCurrentLang() === 'en' ? 'Wins' :
                      getCurrentLang() === 'ja' ? '勝利' :
                        getCurrentLang() === 'ko' ? '승리' : '胜出'}
                </button>
                <button
                  onClick={() => handleVote(
                    rightAttraction()!,
                    leftAttraction()!,
                    rightAttraction() ? getLocalizedArray(rightAttraction()!.features)[0] || '' : '',
                    leftAttraction() ? getLocalizedArray(leftAttraction()!.features)[0] || '' : ''
                  )}
                  class="px-6 py-3 bg-purple-500 hover:bg-purple-600 text-white rounded-lg transition-colors"
                >
                  {rightAttraction() ? getLocalizedText(rightAttraction()!.name) : ''}
                  {getCurrentLang() === 'zh' ? '胜出' :
                    getCurrentLang() === 'en' ? 'Wins' :
                      getCurrentLang() === 'ja' ? '勝利' :
                        getCurrentLang() === 'ko' ? '승리' : '胜出'}
                </button>
              </div>
            </div>
          </Show>

          <Show when={winner()}>
            <div class="text-center mt-8">
              <h3 class="text-2xl font-bold text-green-600 mb-2">
                {getCurrentLang() === 'zh' ? '对战结束！' :
                  getCurrentLang() === 'en' ? 'Battle Ended!' :
                    getCurrentLang() === 'ja' ? 'バトル終了！' :
                      getCurrentLang() === 'ko' ? '대결 종료!' : '对战结束！'}
              </h3>
              <p class="text-lg">
                {winner() ? getLocalizedText(winner()!.name) : ''}
                {getCurrentLang() === 'zh' ? '胜出！' :
                  getCurrentLang() === 'en' ? 'Wins!' :
                    getCurrentLang() === 'ja' ? '勝利！' :
                      getCurrentLang() === 'ko' ? '승리!' : '胜出！'}
              </p>
            </div>
          </Show>
        </div>
      </Show>
    </div>
  );
};