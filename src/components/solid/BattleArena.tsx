/** @jsxImportSource solid-js */
import { createSignal, createEffect, For, Show } from 'solid-js';
import { selectedAttractions, battleState as globalBattleState, type DialogueMessage } from '../../utils/state';
import type { Attraction } from '../../data/attractions';
import { getLocalizedText, getLocalizedArray, getCurrentLang} from '../../i18n/utils';

export const BattleArena = () => {
  const [leftAttraction, setLeftAttraction] = createSignal<Attraction | null>(null);
  const [rightAttraction, setRightAttraction] = createSignal<Attraction | null>(null);
  const [messages, setMessages] = createSignal<DialogueMessage[]>([]);
  const [isTyping, setIsTyping] = createSignal(false);
  const [battleActive, setBattleActive] = createSignal(false);
  const [showVoteButtons, setShowVoteButtons] = createSignal(false);
  const [winner, setWinner] = createSignal<Attraction | null>(null);

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
    const leftFeatures = getLocalizedArray(left.features);
    const rightFeatures = getLocalizedArray(right.features);
    const currentLang = getCurrentLang();
    
    // 根据当前语言生成对话内容
    let dialogue: DialogueMessage[] = [];
    
    if (currentLang === 'zh') {
      dialogue = [
        {
          text: `你知道吗？${leftFeatures[0]}是${getLocalizedText(left.name)}最著名的特色之一，这是我们引以为傲的特色之一！`,
          typing: false,
          side: 'left'
        },
        {
          text: `你知道吗？${rightFeatures[0]}是${getLocalizedText(right.name)}最重要的特色，这是我们引以为傲的特色之一！`,
          typing: false,
          side: 'right'
        },
        {
          text: `${getLocalizedText(left.name)}的独特之处在于完美结合了${leftFeatures.join('、')}，给游客带来难忘的体验。`,
          typing: false,
          side: 'left'
        },
        {
          text: `我最特别强调，${getLocalizedText(right.name)}周边自然环境优美，植被茂密，空气清新，这是来${getLocalizedText(right.name)}不可错过的体验！`,
          typing: false,
          side: 'right'
        }
      ];
    } else if (currentLang === 'en') {
      dialogue = [
        {
          text: `Did you know? ${leftFeatures[0]} is one of the most famous features of ${getLocalizedText(left.name)}, which is one of our proud features!`,
          typing: false,
          side: 'left'
        },
        {
          text: `Did you know? ${rightFeatures[0]} is the most important feature of ${getLocalizedText(right.name)}, which is one of our proud features!`,
          typing: false,
          side: 'right'
        },
        {
          text: `The uniqueness of ${getLocalizedText(left.name)} lies in the perfect combination of ${leftFeatures.join(', ')}, bringing an unforgettable experience to tourists.`,
          typing: false,
          side: 'left'
        },
        {
          text: `I especially emphasize that the natural environment around ${getLocalizedText(right.name)} is beautiful, with lush vegetation and fresh air, which is an experience not to be missed when visiting ${getLocalizedText(right.name)}!`,
          typing: false,
          side: 'right'
        }
      ];
    } else if (currentLang === 'ja') {
      dialogue = [
        {
          text: `ご存知ですか？${leftFeatures[0]}は${getLocalizedText(left.name)}の最も有名な特徴の一つで、私たちが誇りに思っている特徴の一つです！`,
          typing: false,
          side: 'left'
        },
        {
          text: `ご存知ですか？${rightFeatures[0]}は${getLocalizedText(right.name)}の最も重要な特徴で、私たちが誇りに思っている特徴の一つです！`,
          typing: false,
          side: 'right'
        },
        {
          text: `${getLocalizedText(left.name)}のユニークさは、${leftFeatures.join('、')}を完璧に組み合わせ、観光客に忘れられない体験をもたらすことにあります。`,
          typing: false,
          side: 'left'
        },
        {
          text: `特に強調したいのは、${getLocalizedText(right.name)}周辺の自然環境の美しさ、豊かな植生、新鮮な空気です。これは${getLocalizedText(right.name)}を訪れる際に見逃せない体験です！`,
          typing: false,
          side: 'right'
        }
      ];
    } else if (currentLang === 'ko') {
      dialogue = [
        {
          text: `알고 계셨나요? ${leftFeatures[0]}은(는) ${getLocalizedText(left.name)}의 가장 유명한 특징 중 하나로, 우리가 자랑스럽게 생각하는 특징 중 하나입니다!`,
          typing: false,
          side: 'left'
        },
        {
          text: `알고 계셨나요? ${rightFeatures[0]}은(는) ${getLocalizedText(right.name)}의 가장 중요한 특징으로, 우리가 자랑스럽게 생각하는 특징 중 하나입니다!`,
          typing: false,
          side: 'right'
        },
        {
          text: `${getLocalizedText(left.name)}의 독특함은 ${leftFeatures.join(', ')}을(를) 완벽하게 결합하여 관광객에게 잊을 수 없는 경험을 선사하는 데 있습니다.`,
          typing: false,
          side: 'left'
        },
        {
          text: `특히 강조하고 싶은 것은 ${getLocalizedText(right.name)} 주변의 아름다운 자연환경, 풍부한 식생, 신선한 공기입니다. 이는 ${getLocalizedText(right.name)}을(를) 방문할 때 놓치지 말아야 할 경험입니다!`,
          typing: false,
          side: 'right'
        }
      ];
    } else {
      // 默认使用中文
      dialogue = [
        {
          text: `你知道吗？${leftFeatures[0]}是${getLocalizedText(left.name)}最著名的特色之一，这是我们引以为傲的特色之一！`,
          typing: false,
          side: 'left'
        },
        {
          text: `你知道吗？${rightFeatures[0]}是${getLocalizedText(right.name)}最重要的特色，这是我们引以为傲的特色之一！`,
          typing: false,
          side: 'right'
        },
        {
          text: `${getLocalizedText(left.name)}的独特之处在于完美结合了${leftFeatures.join('、')}，给游客带来难忘的体验。`,
          typing: false,
          side: 'left'
        },
        {
          text: `我最特别强调，${getLocalizedText(right.name)}周边自然环境优美，植被茂密，空气清新，这是来${getLocalizedText(right.name)}不可错过的体验！`,
          typing: false,
          side: 'right'
        }
      ];
    }

    return dialogue;
  };

  // 处理投票
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
        <div class="battle-container bg-white rounded-xl shadow-lg p-6 mb-8">
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
          <div class="messages-container bg-gray-50 rounded-lg p-4 mb-6">
            <For each={messages()}>
              {(message, index) => (
                <div
                  class={`message mb-4 flex ${message.side === 'left' ? 'justify-start' : 'justify-end'}`}
                >
                  <div
                    class={`max-w-[80%] rounded-lg p-3 ${message.typing ? 'typing' : ''} ${message.side === 'left'
                      ? 'bg-blue-100 text-blue-800'
                      : 'bg-purple-100 text-purple-800'
                      }`}
                  >
                    {message.text}
                    {/* {message.typing && <span class="typing-indicator">|</span>} */}
                  </div>
                </div>
              )}
            </For>

            {isTyping() && messages().length === 0 && (
              <div class="text-center text-gray-500 py-4">
                {getCurrentLang() === 'zh' ? '正在生成对话...' : 
                 getCurrentLang() === 'en' ? 'Generating dialogue...' : 
                 getCurrentLang() === 'ja' ? '会話を生成中...' : 
                 getCurrentLang() === 'ko' ? '대화 생성 중...' : '正在生成对话...'}
              </div>
            )}
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