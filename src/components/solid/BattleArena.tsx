/** @jsxImportSource solid-js */
import { createSignal, createEffect, For, Show } from 'solid-js';
import { selectedAttractions, battleState as globalBattleState, type DialogueMessage } from '../../utils/state';
import type { Attraction } from '../../data/attractions';

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
    setMessages([]);
    setIsTyping(true);
    setShowVoteButtons(false);
    setWinner(null);

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
    const leftFeatures = left.features;
    const rightFeatures = right.features;

    const dialogue: DialogueMessage[] = [
      {
        text: `你知道吗？${leftFeatures[0]}是${left.name}最著名的特色之一，这是我们引以为傲的特色之一！`,
        typing: false,
        side: 'left'
      },
      {
        text: `你知道吗？${rightFeatures[0]}是${right.name}最重要的特色，这是我们引以为傲的特色之一！`,
        typing: false,
        side: 'right'
      },
      {
        text: `${left.name}的独特之处在于完美结合了${leftFeatures.join('、')}，给游客带来难忘的体验。`,
        typing: false,
        side: 'left'
      },
      {
        text: `我最特别强调，${right.name}周边自然环境优美，植被茂密，空气清新，这是来${right.name}不可错过的体验！`,
        typing: false,
        side: 'right'
      }
    ];

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
    <div class="solid-container bg-white p-6 rounded-lg shadow-md mb-8 relative">
      <div class="absolute top-2 right-2 bg-blue-500 text-white px-2 py-1 rounded text-sm font-medium">Solid</div>
      <Show when={battleActive()}>
        <div class="battle-container bg-white rounded-xl shadow-lg p-6 mb-8">
          <div class="flex justify-between items-center mb-6">
            <h2 class="text-2xl font-bold text-gray-800">景点对战竞技场</h2>
            <button
              onClick={handleBackToSelect}
              class="px-3 py-1 text-sm bg-gray-200 hover:bg-gray-300 rounded-md transition-colors"
            >
              返回选择
            </button>
          </div>

          <div class="flex justify-between items-start mb-8">
            <div class="w-1/3 text-center">
              <Show when={leftAttraction()}>
                <div class="bg-blue-50 rounded-lg p-4">
                  <div class="w-24 h-24 mx-auto rounded-full overflow-hidden mb-3">
                    <img
                      src={leftAttraction()?.image}
                      alt={leftAttraction()?.name}
                      class="w-full h-full object-cover"
                    />
                  </div>
                  <h3 class="text-xl font-semibold text-blue-800">{leftAttraction()?.name}</h3>
                  <div class="flex flex-wrap justify-center gap-1 mt-2">
                    <For each={leftAttraction()?.features}>
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
                      alt={rightAttraction()?.name}
                      class="w-full h-full object-cover"
                    />
                  </div>
                  <h3 class="text-xl font-semibold text-purple-800">{rightAttraction()?.name}</h3>
                  <div class="flex flex-wrap justify-center gap-1 mt-2">
                    <For each={rightAttraction()?.features}>
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
                    {message.typing && <span class="typing-indicator">|</span>}
                  </div>
                </div>
              )}
            </For>

            {isTyping() && messages().length === 0 && (
              <div class="text-center text-gray-500 py-4">正在生成对话...</div>
            )}
          </div>

          <Show when={showVoteButtons()}>
            <div class="voting-section">
              <h3 class="text-xl font-semibold text-gray-800 mb-4">请评判胜负</h3>
              <div class="flex justify-center gap-4">
                <button
                  onClick={() => handleVote(
                    leftAttraction()!,
                    rightAttraction()!,
                    leftAttraction()?.features[0] || '',
                    rightAttraction()?.features[0] || ''
                  )}
                  class="px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors"
                >
                  {leftAttraction()?.name} 胜出
                </button>
                <button
                  onClick={() => handleVote(
                    rightAttraction()!,
                    leftAttraction()!,
                    rightAttraction()?.features[0] || '',
                    leftAttraction()?.features[0] || ''
                  )}
                  class="px-6 py-3 bg-purple-500 hover:bg-purple-600 text-white rounded-lg transition-colors"
                >
                  {rightAttraction()?.name} 胜出
                </button>
              </div>
            </div>
          </Show>

          <Show when={winner()}>
            <div class="winner-section bg-gradient-to-r from-yellow-400 to-yellow-600 text-white p-4 rounded-lg mt-6">
              <h3 class="text-xl font-bold mb-2">对战结果</h3>
              <p class="text-lg">{winner()?.name} 胜出！</p>
            </div>
          </Show>
        </div>
      </Show>
    </div>
  );
};