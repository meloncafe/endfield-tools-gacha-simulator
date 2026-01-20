// i18n - Internationalization support

export const LANGUAGES = {
  ko: { code: 'ko', name: '한국어', flag: '🇰🇷' },
  en: { code: 'en', name: 'English', flag: '🇺🇸' },
  ja: { code: 'ja', name: '日本語', flag: '🇯🇵' },
  zh: { code: 'zh', name: '中文', flag: '🇨🇳' },
};

export const translations = {
  ko: {
    // Header
    title: '엔드필드 가챠 시뮬레이터',
    version: 'v1.0 정식 출시 기준',
    
    // Critical warning
    criticalWarning: '⚠️ 엔드필드는 확천(픽뚫 후 다음 6성 픽업 확정)이 없습니다! 120뽑/240뽑 카운터도 배너 종료 시 리셋됩니다.',
    
    // Buttons
    reset: '전체 초기화',
    probabilityInfo: '확률 정보 & 시스템 설명',
    pull1: '1회 뽑기',
    pull10: '10회 뽑기',
    cancel: '취소',
    changeBanner: '배너 변경',
    
    // Gacha flow chart
    gachaFlow: '가챠 흐름도',
    gachaFlowDesc: '엔드필드 가챠가 어떻게 작동하는지 한눈에 보기',
    flowStep1Title: '뽑기 실행',
    flowStep1Desc: '65뽑부터 확률 상승, 80뽑에서 6성 확정',
    flowStep2Title: '6성 획득!',
    flowStep2Desc: '50/50 판정 시작',
    flowWin: '성공',
    flowLose: '실패 (픽뚫)',
    flowFeaturedGet: '픽업 획득',
    flowOffBanner: '다른 캐릭터',
    flowNoGuarantee: '확천 없음!',
    flowNoGuaranteeDesc: '픽뚫 후 다음 6성도 50/50입니다. 원신/명조와 다릅니다!',
    
    // Three step pity
    threeStepPity: '3단계 천장 시스템',
    threeStepPityDesc: '각 천장의 이월 여부를 꼭 확인하세요',
    pity80Title: '6성 확정',
    pity80Desc: '65뽑부터 확률↑, 80뽑 필수 6성 (50/50 적용)',
    pity120Title: '픽업 확정',
    pity120Desc: '120뽑 내 픽업 미획득 시 확정',
    pity240Title: '돌파 재화',
    pity240Desc: '240뽑마다 픽업 캐릭터 돌파 재화 1개',
    
    // Data source card
    dataSource: '데이터 출처',
    dataSourceDesc: '시뮬레이터에 적용된 확률 기준',
    gameVersion: '게임 버전',
    gameVersionValue: 'v1.0 정식 출시',
    source: '출처',
    sourceValue: '정식 출시 미리보기 방송',
    update: '업데이트',
    updateValue: '2026-01-19',
    
    // Pity system card
    pitySystem: '천장 시스템 상세',
    pitySystemDesc: '이월 여부에 주의하세요',
    sixStarPity: '6성 천장',
    pulls: '뽑',
    softPityDesc: '65뽑부터 확률 +5%/뽑 (소프트 천장)',
    featuredGuarantee: '픽업 확정',
    featuredResetDesc: '배너 종료 시 카운터 리셋 (이월 안됨)',
    dupeGuarantee: '돌파 재화',
    dupeResetDesc: '240뽑마다 돌파 재화 지급, 배너 종료 시 리셋',
    carryOver: '이월됨',
    noCarryOver: '이월안됨',
    
    // 6 star distribution card
    sixStarDistribution: '6성 획득 시 분배',
    sixStarDistributionDesc: '50/50 시스템 — 확천 없음 주의!',
    currentFeatured: '현재 픽업',
    nextLimited: '다음 한정 (2명 중 1명)',
    standardPool: '상시 풀 (5명 중 1명)',
    
    // Warning card
    warnings: '⚠️ 중요 주의사항',
    noGuarantee: '확천 없음',
    noGuaranteeDesc: '픽뚫 후에도 다음 6성이 50/50 (원신/명조와 다름!)',
    no120CarryOver: '120뽑 이월 없음',
    no120CarryOverDesc: '배너 종료 시 리셋됨',
    no240CarryOver: '240뽑 이월 없음',
    no240CarryOverDesc: '배너 종료 시 리셋됨',
    pityCarryOver: '80뽑만 이월',
    pityCarryOverDesc: '6성 카운터만 다음 배너로 유지',
    
    // Banner change card
    bannerChangeTitle: '배너 변경/종료 시',
    bannerChangeDesc: '무엇이 유지되고 리셋되는지',
    sixStarCounterKeep: '✅ 6성 카운터 유지 (0~79)',
    counter120Reset: '❌ 120뽑 카운터 리셋 → 0',
    counter240Reset: '❌ 240뽑 카운터 리셋 → 0',
    fiftyFiftyReset: '❌ 50/50 기록 없음 (매번 새로 50/50)',
    
    // Bonus card
    bonusTitle: '긴급모집 보너스',
    bonus30: '30뽑',
    bonus30Desc: '무료 10뽑권 (천장 미반영)',
    bonus60: '60뽑',
    bonus60Desc: '다음 배너 10뽑권',
    
    // Banner selection
    bannerSelection: '배너 선택',
    bannerSelectionDesc: '배너 변경 시 120뽑/240뽑 카운터가 리셋됩니다',
    
    // Counters
    sixStarCounter: '6성 카운터',
    sixStarCounterDesc: '65뽑부터 확률 증가, 80뽑 확정 (이월됨)',
    probability: '확률',
    soft: '(소프트)',
    featuredCounter: '픽업 확정 카운터',
    featuredCounterDesc: '배너 종료 시 리셋됩니다 (이월 안됨)',
    pullsRemaining: '뽑 남음',
    dupeCounter: '돌파 재화 카운터',
    dupeCounterDesc: '240뽑마다 픽업 캐릭터 돌파 재화 지급 (이월 안됨)',
    nextPullDupe: '다음 픽업에 돌파 재화!',
    dupeTokensEarned: '획득한 돌파 재화',
    dupeTokens: '돌파',
    
    // Stats
    stats: '통계',
    totalPulls: '총 뽑기',
    oroberyl: '합성옥',
    sixStar: '6성',
    featured: '픽업',
    
    // Results
    recentResults: '최근 결과',
    sixStarHistory: '6성 획득 기록',
    acquired: '회 획득',
    
    // Footer
    footerTitle: 'Endfield Tools',
    footerDisclaimer1: '본 시뮬레이터는 팬메이드 도구이며, Gryphline/Hypergryph와 무관합니다.',
    footerDisclaimer2: '게임 내 실제 확률과 다를 수 있습니다.',
    footerDisclaimer3: 'Arknights: Endfield™ 및 관련 상표는 각 소유자의 자산입니다.',
    
    // Dialog
    bannerChangeDialog: '배너를 변경하시겠습니까?',
    bannerChangeDialogDescPrefix: '현재 ',
    bannerChangeDialogDesc: '뽑 진행 중입니다. 배너 변경 시:',
    sixStarCounterKeepDialog: '6성 카운터',
    keepSuffix: '뽑 유지',
    resetSuffix: '뽑 → 0 리셋',
    almostGuarantee: '뽑만 더 하면 픽업 확정입니다!',
    
    // Additional
    nextPullGuaranteed: '다음 뽑기 6성 확정!',
    nextPullFeatured: '다음 뽑기 픽업 확정!',
    
    // Character names
    characters: {
      laevatain: '레바테인',
      gilberta: '질베르타',
      yvonne: '이본',
      ardelia: '아델리아',
      lastRite: '라스트 라이트',
      ember: '엠버',
      pogranichnik: '포그라니치니크',
      lifeng: '리펑',
    },
    
    // Rarity
    star5: '5성',
    star4: '4성',
  },
  
  en: {
    // Header
    title: 'Endfield Gacha Simulator',
    version: 'Based on v1.0 Official Release',
    
    // Critical warning
    criticalWarning: '⚠️ Endfield has NO guarantee after losing 50/50! 120/240 pull counters also reset when banner ends.',
    
    // Buttons
    reset: 'Reset All',
    probabilityInfo: 'Probability Info & System Guide',
    pull1: '1 Pull',
    pull10: '10 Pulls',
    cancel: 'Cancel',
    changeBanner: 'Change Banner',
    
    // Gacha flow chart
    gachaFlow: 'Gacha Flow Chart',
    gachaFlowDesc: 'See how Endfield gacha works at a glance',
    flowStep1Title: 'Pull',
    flowStep1Desc: 'Rate increases from 65 pulls, guaranteed at 80',
    flowStep2Title: '6★ Get!',
    flowStep2Desc: '50/50 check starts',
    flowWin: 'Win',
    flowLose: 'Lose (Off-banner)',
    flowFeaturedGet: 'Featured Get',
    flowOffBanner: 'Other Character',
    flowNoGuarantee: 'No Guarantee!',
    flowNoGuaranteeDesc: 'Next 6★ is still 50/50 after losing. Unlike Genshin/Wuthering Waves!',
    
    // Three step pity
    threeStepPity: '3-Step Pity System',
    threeStepPityDesc: 'Check carryover status for each pity',
    pity80Title: '6★ Guaranteed',
    pity80Desc: 'Rate↑ from 65 pulls, 6★ at 80 (50/50 applies)',
    pity120Title: 'Featured Guaranteed',
    pity120Desc: 'Featured guaranteed if not obtained within 120',
    pity240Title: 'Dupe Token',
    pity240Desc: '1 featured dupe token every 240 pulls',
    
    // Data source card
    dataSource: 'Data Source',
    dataSourceDesc: 'Probability standards applied to the simulator',
    gameVersion: 'Game Version',
    gameVersionValue: 'v1.0 Official Release',
    source: 'Source',
    sourceValue: 'Official Release Preview Stream',
    update: 'Updated',
    updateValue: '2026-01-19',
    
    // Pity system card
    pitySystem: 'Pity System Details',
    pitySystemDesc: 'Pay attention to carryover status',
    sixStarPity: '6★ Pity',
    pulls: ' pulls',
    softPityDesc: '+5% per pull starting from 65 pulls (soft pity)',
    featuredGuarantee: 'Featured Guarantee',
    featuredResetDesc: 'Resets when banner ends (no carryover)',
    dupeGuarantee: 'Dupe Token',
    dupeResetDesc: 'Dupe token every 240 pulls, resets when banner ends',
    carryOver: 'Carries Over',
    noCarryOver: 'No Carryover',
    
    // 6 star distribution card
    sixStarDistribution: '6★ Distribution',
    sixStarDistributionDesc: '50/50 System — No Guarantee After Loss!',
    currentFeatured: 'Current Featured',
    nextLimited: 'Next Limited (1 of 2)',
    standardPool: 'Standard Pool (1 of 5)',
    
    // Warning card
    warnings: '⚠️ Important Warnings',
    noGuarantee: 'No Guarantee After Loss',
    noGuaranteeDesc: 'Next 6★ is still 50/50 after losing (Unlike Genshin/WuWa!)',
    no120CarryOver: '120 Pull Counter No Carryover',
    no120CarryOverDesc: 'Resets when banner ends',
    no240CarryOver: '240 Pull Counter No Carryover',
    no240CarryOverDesc: 'Resets when banner ends',
    pityCarryOver: 'Only 80 Pull Pity Carries Over',
    pityCarryOverDesc: 'Only 6★ counter carries to next banner',
    
    // Banner change card
    bannerChangeTitle: 'On Banner Change/End',
    bannerChangeDesc: 'What carries over and what resets',
    sixStarCounterKeep: '✅ 6★ counter preserved (0~79)',
    counter120Reset: '❌ 120 pull counter resets → 0',
    counter240Reset: '❌ 240 pull counter resets → 0',
    fiftyFiftyReset: '❌ No 50/50 memory (fresh 50/50 each time)',
    
    // Bonus card
    bonusTitle: 'Emergency Recruitment Bonus',
    bonus30: '30 pulls',
    bonus30Desc: 'Free 10-pull ticket (no pity)',
    bonus60: '60 pulls',
    bonus60Desc: 'Next banner 10-pull ticket',
    
    // Banner selection
    bannerSelection: 'Banner Selection',
    bannerSelectionDesc: '120/240 pull counters reset when changing banners',
    
    // Counters
    sixStarCounter: '6★ Counter',
    sixStarCounterDesc: 'Rate increases from 65, guaranteed at 80 (carries over)',
    probability: 'Rate',
    soft: '(soft)',
    featuredCounter: 'Featured Guarantee Counter',
    featuredCounterDesc: 'Resets when banner ends (no carryover)',
    pullsRemaining: ' pulls left',
    dupeCounter: 'Dupe Token Counter',
    dupeCounterDesc: 'Featured dupe token every 240 pulls (no carryover)',
    nextPullDupe: 'Next featured gets dupe token!',
    dupeTokensEarned: 'Dupe tokens earned',
    dupeTokens: 'Dupe',
    
    // Stats
    stats: 'Statistics',
    totalPulls: 'Total Pulls',
    oroberyl: 'Oroberyl',
    sixStar: '6★',
    featured: 'Featured',
    
    // Results
    recentResults: 'Recent Results',
    sixStarHistory: '6★ History',
    acquired: ' acquired',
    
    // Footer
    footerTitle: 'Endfield Tools',
    footerDisclaimer1: 'This simulator is a fan-made tool and is not affiliated with Gryphline/Hypergryph.',
    footerDisclaimer2: 'Actual in-game rates may differ.',
    footerDisclaimer3: 'Arknights: Endfield™ and related trademarks are property of their respective owners.',
    
    // Dialog
    bannerChangeDialog: 'Change Banner?',
    bannerChangeDialogDescPrefix: 'Currently at ',
    bannerChangeDialogDesc: ' pulls in progress. On banner change:',
    sixStarCounterKeepDialog: '6★ counter',
    keepSuffix: ' pulls kept',
    resetSuffix: ' pulls → 0 reset',
    almostGuarantee: ' more pulls for guaranteed featured!',
    
    // Additional
    nextPullGuaranteed: 'Next pull 6★ guaranteed!',
    nextPullFeatured: 'Next pull featured guaranteed!',
    
    // Character names
    characters: {
      laevatain: 'Laevatain',
      gilberta: 'Gilberta',
      yvonne: 'Yvonne',
      ardelia: 'Ardelia',
      lastRite: 'Last Rite',
      ember: 'Ember',
      pogranichnik: 'Pogranichnik',
      lifeng: 'Lifeng',
    },
    
    // Rarity
    star5: '5★',
    star4: '4★',
  },
  
  ja: {
    // Header
    title: 'エンドフィールド ガチャシミュレーター',
    version: 'v1.0 正式リリース基準',
    
    // Critical warning
    criticalWarning: '⚠️ エンドフィールドはすり抜け後の確定がありません！120/240回カウンターもバナー終了時にリセットされます。',
    
    // Buttons
    reset: '全てリセット',
    probabilityInfo: '確率情報 & システム説明',
    pull1: '1回引く',
    pull10: '10回引く',
    cancel: 'キャンセル',
    changeBanner: 'バナー変更',
    
    // Gacha flow chart
    gachaFlow: 'ガチャフローチャート',
    gachaFlowDesc: 'エンドフィールドガチャの仕組みを一目で確認',
    flowStep1Title: 'ガチャを引く',
    flowStep1Desc: '65回から確率上昇、80回で★6確定',
    flowStep2Title: '★6獲得！',
    flowStep2Desc: '50/50判定開始',
    flowWin: '成功',
    flowLose: '失敗（すり抜け）',
    flowFeaturedGet: 'ピックアップ獲得',
    flowOffBanner: '他のキャラ',
    flowNoGuarantee: '確定なし！',
    flowNoGuaranteeDesc: 'すり抜け後も次の★6は50/50です。原神/鳴潮と異なります！',
    
    // Three step pity
    threeStepPity: '3段階天井システム',
    threeStepPityDesc: '各天井の引き継ぎ状況を必ず確認してください',
    pity80Title: '★6確定',
    pity80Desc: '65回から確率↑、80回で★6確定（50/50適用）',
    pity120Title: 'ピックアップ確定',
    pity120Desc: '120回以内に未獲得の場合確定',
    pity240Title: '突破素材',
    pity240Desc: '240回ごとにピックアップキャラ突破素材1個',
    
    // Data source card
    dataSource: 'データソース',
    dataSourceDesc: 'シミュレーターに適用された確率基準',
    gameVersion: 'ゲームバージョン',
    gameVersionValue: 'v1.0 正式リリース',
    source: '情報源',
    sourceValue: '正式リリースプレビュー配信',
    update: '更新日',
    updateValue: '2026-01-19',
    
    // Pity system card
    pitySystem: '天井システム詳細',
    pitySystemDesc: '引き継ぎ状況に注意',
    sixStarPity: '★6天井',
    pulls: '回',
    softPityDesc: '65回から確率+5%/回（ソフト天井）',
    featuredGuarantee: 'ピックアップ確定',
    featuredResetDesc: 'バナー終了時にリセット（引き継ぎなし）',
    dupeGuarantee: '突破素材',
    dupeResetDesc: '240回ごとに突破素材支給、バナー終了時リセット',
    carryOver: '引き継ぎ有',
    noCarryOver: '引き継ぎ無',
    
    // 6 star distribution card
    sixStarDistribution: '★6獲得時の配分',
    sixStarDistributionDesc: '50/50システム — すり抜け後の確定なし注意！',
    currentFeatured: '現在ピックアップ',
    nextLimited: '次の限定（2人中1人）',
    standardPool: '恒常プール（5人中1人）',
    
    // Warning card
    warnings: '⚠️ 重要注意事項',
    noGuarantee: 'すり抜け後の確定なし',
    noGuaranteeDesc: 'すり抜け後も次の★6は50/50（原神/鳴潮と異なります！）',
    no120CarryOver: '120回引き継ぎなし',
    no120CarryOverDesc: 'バナー終了時にリセット',
    no240CarryOver: '240回引き継ぎなし',
    no240CarryOverDesc: 'バナー終了時にリセット',
    pityCarryOver: '80回天井のみ引き継ぎ',
    pityCarryOverDesc: '★6カウンターのみ次のバナーに引き継ぎ',
    
    // Banner change card
    bannerChangeTitle: 'バナー変更/終了時',
    bannerChangeDesc: '何が維持され、リセットされるか',
    sixStarCounterKeep: '✅ ★6カウンター維持（0~79）',
    counter120Reset: '❌ 120回カウンターリセット → 0',
    counter240Reset: '❌ 240回カウンターリセット → 0',
    fiftyFiftyReset: '❌ 50/50記録なし（毎回新規50/50）',
    
    // Bonus card
    bonusTitle: '緊急募集ボーナス',
    bonus30: '30回',
    bonus30Desc: '無料10連チケット（天井カウントなし）',
    bonus60: '60回',
    bonus60Desc: '次バナー10連チケット',
    
    // Banner selection
    bannerSelection: 'バナー選択',
    bannerSelectionDesc: 'バナー変更時に120/240回カウンターがリセットされます',
    
    // Counters
    sixStarCounter: '★6カウンター',
    sixStarCounterDesc: '65回から確率上昇、80回で確定（引き継ぎあり）',
    probability: '確率',
    soft: '（ソフト）',
    featuredCounter: 'ピックアップ確定カウンター',
    featuredCounterDesc: 'バナー終了時にリセット（引き継ぎなし）',
    pullsRemaining: '回残り',
    dupeCounter: '突破素材カウンター',
    dupeCounterDesc: '240回ごとにピックアップキャラ突破素材支給（引き継ぎなし）',
    nextPullDupe: '次のピックアップで突破素材！',
    dupeTokensEarned: '獲得した突破素材',
    dupeTokens: '突破',
    
    // Stats
    stats: '統計',
    totalPulls: '総回数',
    oroberyl: 'オロベリル',
    sixStar: '★6',
    featured: 'ピックアップ',
    
    // Results
    recentResults: '最新結果',
    sixStarHistory: '★6獲得履歴',
    acquired: '回獲得',
    
    // Footer
    footerTitle: 'Endfield Tools',
    footerDisclaimer1: 'このシミュレーターはファンメイドツールであり、Gryphline/Hypergryphとは無関係です。',
    footerDisclaimer2: 'ゲーム内の実際の確率とは異なる場合があります。',
    footerDisclaimer3: 'Arknights: Endfield™および関連商標は各所有者の資産です。',
    
    // Dialog
    bannerChangeDialog: 'バナーを変更しますか？',
    bannerChangeDialogDescPrefix: '現在',
    bannerChangeDialogDesc: '回進行中です。バナー変更時：',
    sixStarCounterKeepDialog: '★6カウンター',
    keepSuffix: '回維持',
    resetSuffix: '回 → 0リセット',
    almostGuarantee: '回でピックアップ確定です！',
    
    // Additional
    nextPullGuaranteed: '次のガチャ★6確定！',
    nextPullFeatured: '次のガチャピックアップ確定！',
    
    // Character names
    characters: {
      laevatain: 'レヴァテイン',
      gilberta: 'ジルベルタ',
      yvonne: 'イヴォンヌ',
      ardelia: 'アーデリア',
      lastRite: 'ラストライト',
      ember: 'エンバー',
      pogranichnik: 'ポグラニチニク',
      lifeng: 'リーフェン',
    },
    
    // Rarity
    star5: '★5',
    star4: '★4',
  },
  
  zh: {
    // Header
    title: '终末地 抽卡模拟器',
    version: '基于v1.0正式版',
    
    // Critical warning
    criticalWarning: '⚠️ 终末地没有歪后大保底！120/240抽计数器也会在卡池结束时重置。',
    
    // Buttons
    reset: '全部重置',
    probabilityInfo: '概率信息 & 系统说明',
    pull1: '抽1次',
    pull10: '抽10次',
    cancel: '取消',
    changeBanner: '更换卡池',
    
    // Gacha flow chart
    gachaFlow: '抽卡流程图',
    gachaFlowDesc: '一目了然地了解终末地抽卡机制',
    flowStep1Title: '进行抽卡',
    flowStep1Desc: '65抽起概率提升，80抽必出六星',
    flowStep2Title: '获得六星！',
    flowStep2Desc: '50/50判定开始',
    flowWin: '成功',
    flowLose: '失败（歪了）',
    flowFeaturedGet: '获得UP',
    flowOffBanner: '其他角色',
    flowNoGuarantee: '没有大保底！',
    flowNoGuaranteeDesc: '歪了之后下个六星仍是50/50。与原神/鸣潮不同！',
    
    // Three step pity
    threeStepPity: '三级保底系统',
    threeStepPityDesc: '请务必确认各保底的继承情况',
    pity80Title: '六星保底',
    pity80Desc: '65抽起概率↑，80抽必出六星（适用50/50）',
    pity120Title: 'UP确定',
    pity120Desc: '120抽内未获得UP时确定获得',
    pity240Title: '突破材料',
    pity240Desc: '每240抽获得UP角色突破材料1个',
    
    // Data source card
    dataSource: '数据来源',
    dataSourceDesc: '模拟器采用的概率标准',
    gameVersion: '游戏版本',
    gameVersionValue: 'v1.0 正式版',
    source: '来源',
    sourceValue: '正式版预览直播',
    update: '更新日期',
    updateValue: '2026-01-19',
    
    // Pity system card
    pitySystem: '保底系统详情',
    pitySystemDesc: '请注意继承情况',
    sixStarPity: '六星保底',
    pulls: '抽',
    softPityDesc: '65抽起概率+5%/抽（软保底）',
    featuredGuarantee: 'UP确定',
    featuredResetDesc: '卡池结束时重置（不继承）',
    dupeGuarantee: '突破材料',
    dupeResetDesc: '每240抽发放突破材料，卡池结束时重置',
    carryOver: '可继承',
    noCarryOver: '不继承',
    
    // 6 star distribution card
    sixStarDistribution: '六星获取时分配',
    sixStarDistributionDesc: '50/50系统 — 注意歪后无大保底！',
    currentFeatured: '当前UP',
    nextLimited: '下期限定（2选1）',
    standardPool: '常驻池（5选1）',
    
    // Warning card
    warnings: '⚠️ 重要注意事项',
    noGuarantee: '歪后无大保底',
    noGuaranteeDesc: '歪了之后下个六星仍是50/50（与原神/鸣潮不同！）',
    no120CarryOver: '120抽不继承',
    no120CarryOverDesc: '卡池结束时重置',
    no240CarryOver: '240抽不继承',
    no240CarryOverDesc: '卡池结束时重置',
    pityCarryOver: '仅80抽保底继承',
    pityCarryOverDesc: '仅六星计数器继承到下个卡池',
    
    // Banner change card
    bannerChangeTitle: '更换/结束卡池时',
    bannerChangeDesc: '什么会保留，什么会重置',
    sixStarCounterKeep: '✅ 六星计数器保留（0~79）',
    counter120Reset: '❌ 120抽计数器重置 → 0',
    counter240Reset: '❌ 240抽计数器重置 → 0',
    fiftyFiftyReset: '❌ 无50/50记录（每次都是新的50/50）',
    
    // Bonus card
    bonusTitle: '紧急招募奖励',
    bonus30: '30抽',
    bonus30Desc: '免费10连券（不计入保底）',
    bonus60: '60抽',
    bonus60Desc: '下期卡池10连券',
    
    // Banner selection
    bannerSelection: '选择卡池',
    bannerSelectionDesc: '更换卡池时120/240抽计数器会重置',
    
    // Counters
    sixStarCounter: '六星计数器',
    sixStarCounterDesc: '65抽起概率提升，80抽必出（可继承）',
    probability: '概率',
    soft: '（软保底）',
    featuredCounter: 'UP确定计数器',
    featuredCounterDesc: '卡池结束时重置（不继承）',
    pullsRemaining: '抽剩余',
    dupeCounter: '突破材料计数器',
    dupeCounterDesc: '每240抽发放UP角色突破材料（不继承）',
    nextPullDupe: '下个UP获得突破材料！',
    dupeTokensEarned: '获得的突破材料',
    dupeTokens: '突破',
    
    // Stats
    stats: '统计',
    totalPulls: '总抽数',
    oroberyl: '合成玉',
    sixStar: '六星',
    featured: 'UP',
    
    // Results
    recentResults: '最近结果',
    sixStarHistory: '六星获取记录',
    acquired: '次获得',
    
    // Footer
    footerTitle: 'Endfield Tools',
    footerDisclaimer1: '本模拟器为粉丝制作工具，与Gryphline/Hypergryph无关。',
    footerDisclaimer2: '游戏内实际概率可能有所不同。',
    footerDisclaimer3: 'Arknights: Endfield™及相关商标为各自所有者的资产。',
    
    // Dialog
    bannerChangeDialog: '确定更换卡池？',
    bannerChangeDialogDescPrefix: '当前',
    bannerChangeDialogDesc: '抽进行中。更换卡池时：',
    sixStarCounterKeepDialog: '六星计数器',
    keepSuffix: '抽保留',
    resetSuffix: '抽 → 0重置',
    almostGuarantee: '抽就能UP确定了！',
    
    // Additional
    nextPullGuaranteed: '下一抽六星确定！',
    nextPullFeatured: '下一抽UP确定！',
    
    // Character names
    characters: {
      laevatain: '雷瓦汀',
      gilberta: '吉尔伯塔',
      yvonne: '伊芙',
      ardelia: '阿黛莉亚',
      lastRite: '末祭',
      ember: '烬燃',
      pogranichnik: '边境者',
      lifeng: '厉锋',
    },
    
    // Rarity
    star5: '五星',
    star4: '四星',
  },
};

// Detect browser language
export function detectBrowserLanguage() {
  const browserLang = navigator.language || navigator.userLanguage;
  const langCode = browserLang.split('-')[0].toLowerCase();
  
  if (langCode === 'ko') return 'ko';
  if (langCode === 'ja') return 'ja';
  if (langCode === 'zh') return 'zh';
  return 'en'; // Default to English
}

// Get translation function
export function getTranslation(lang) {
  return translations[lang] || translations.en;
}

// Get character name by language
export function getCharacterName(lang, key) {
  const t = getTranslation(lang);
  return t.characters[key] || key;
}
