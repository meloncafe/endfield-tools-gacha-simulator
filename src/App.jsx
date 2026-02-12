import React, { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Separator } from '@/components/ui/separator';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Flame, Snowflake, Leaf, Zap, Star, RotateCcw, ChevronDown, ChevronUp, Check, X, ArrowRight, ArrowDown, Info, Github, Globe, Gift, Sparkles } from 'lucide-react';
import { LANGUAGES, detectBrowserLanguage, getTranslation, getCharacterName } from '@/lib/i18n';

const GACHA_CONFIG = {
  baseRate6Star: 0.008,
  softPityStart: 65,
  softPityIncrease: 0.05,
  hardPity: 80,
  featuredGuarantee: 120,
  dupeGuarantee: 240,
  fiftyFifty: { featured: 0.50, nextLimited: 0.1428, standard: 0.3572 }
};

const ELEMENTS = {
  Heat: { icon: Flame, color: 'text-orange-500' },
  Cryo: { icon: Snowflake, color: 'text-cyan-500' },
  Nature: { icon: Leaf, color: 'text-emerald-500' },
  Electric: { icon: Zap, color: 'text-violet-500' },
};

const BANNERS_DATA = {
  laevatain: {
    key: 'laevatain', period: '1/22 ~ 2/7', element: 'Heat',
    nextLimited: ['gilberta', 'yvonne']
  },
  gilberta: {
    key: 'gilberta', period: '2/7 ~', element: 'Nature',
    nextLimited: ['laevatain', 'yvonne']
  },
  yvonne: {
    key: 'yvonne', period: '2/21 ~', element: 'Cryo',
    nextLimited: ['laevatain', 'gilberta']
  }
};

const STANDARD_POOL_KEYS = ['ardelia', 'lastRite', 'ember', 'pogranichnik', 'lifeng'];
const STANDARD_POOL_ELEMENTS = {
  ardelia: 'Electric',
  lastRite: 'Nature',
  ember: 'Heat',
  pogranichnik: 'Cryo',
  lifeng: 'Electric'
};

export default function App() {
  const [lang, setLang] = useState(() => {
    const saved = localStorage.getItem('endfield-gacha-lang');
    return saved || detectBrowserLanguage();
  });
  const [selectedBanner, setSelectedBanner] = useState('laevatain');
  const [pityCounter, setPityCounter] = useState(0);
  const [featuredCounter, setFeaturedCounter] = useState(0);
  const [dupeCounter, setDupeCounter] = useState(0);
  const [totalPulls, setTotalPulls] = useState(0);
  const [results, setResults] = useState([]);
  const [history, setHistory] = useState([]);
  const [stats, setStats] = useState({ total6: 0, totalFeatured: 0, totalDupeTokens: 0 });
  const [showInfo, setShowInfo] = useState(false);
  const [pendingBanner, setPendingBanner] = useState(null);
  const [showBannerDialog, setShowBannerDialog] = useState(false);

  const t = getTranslation(lang);
  const banner = BANNERS_DATA[selectedBanner];

  useEffect(() => {
    localStorage.setItem('endfield-gacha-lang', lang);
  }, [lang]);

  // Ezoic ad initialization
  useEffect(() => {
    if (window.ezstandalone) {
      window.ezstandalone.cmd.push(function () {
        window.ezstandalone.showAds(101, 103);
      });
    }
  }, []);

  const get6StarRate = (pulls) => {
    if (pulls < GACHA_CONFIG.softPityStart) return GACHA_CONFIG.baseRate6Star;
    return Math.min(1, GACHA_CONFIG.baseRate6Star + (pulls - GACHA_CONFIG.softPityStart + 1) * GACHA_CONFIG.softPityIncrease);
  };

  const handleBannerChange = (key) => {
    if (key === selectedBanner) return;
    if (featuredCounter > 0 || dupeCounter > 0) {
      setPendingBanner(key);
      setShowBannerDialog(true);
    } else {
      setSelectedBanner(key);
      setResults([]);
    }
  };

  const confirmBannerChange = () => {
    if (pendingBanner) {
      setSelectedBanner(pendingBanner);
      setFeaturedCounter(0);
      setDupeCounter(0);
      setResults([]);
      setPendingBanner(null);
    }
    setShowBannerDialog(false);
  };

  const cancelBannerChange = () => {
    setPendingBanner(null);
    setShowBannerDialog(false);
  };

  const doPulls = (count) => {
    const newResults = [];
    let newPity = pityCounter;
    let newFeatured = featuredCounter;
    let newDupe = dupeCounter;
    let newStats = { ...stats };
    let newHistory = [...history];

    for (let i = 0; i < count; i++) {
      const rate6Star = get6StarRate(newPity);
      const roll = Math.random();
      let result;
      const is6Star = newFeatured >= 119 || newPity >= 79 || roll < rate6Star;

      if (is6Star) {
        const sixStarRoll = Math.random();
        if (newFeatured >= 119 || sixStarRoll < GACHA_CONFIG.fiftyFifty.featured) {
          // 픽업 획득
          const gotDupeToken = newDupe >= 239;
          result = { 
            key: banner.key, 
            element: banner.element, 
            type: 'featured', 
            rarity: 6,
            dupeToken: gotDupeToken
          };
          newStats.totalFeatured++;
          newFeatured = 0;
          
          // 240뽑 돌파 재화 체크
          if (gotDupeToken) {
            newStats.totalDupeTokens++;
            newDupe = 0;
          } else {
            newDupe++;
          }
        } else if (sixStarRoll < GACHA_CONFIG.fiftyFifty.featured + GACHA_CONFIG.fiftyFifty.nextLimited) {
          // 다음 한정 픽뚫
          const nextKey = banner.nextLimited[Math.floor(Math.random() * banner.nextLimited.length)];
          result = { key: nextKey, element: BANNERS_DATA[nextKey].element, type: 'nextLimited', rarity: 6 };
          newFeatured++;
          newDupe++;
        } else {
          // 상시 픽뚫
          const stdKey = STANDARD_POOL_KEYS[Math.floor(Math.random() * STANDARD_POOL_KEYS.length)];
          result = { key: stdKey, element: STANDARD_POOL_ELEMENTS[stdKey], type: 'standard', rarity: 6 };
          newFeatured++;
          newDupe++;
        }
        newPity = 0;
        newStats.total6++;
        newHistory.push(result);
      } else if (roll < rate6Star + 0.08) {
        result = { rarity: 5 };
        newPity++; newFeatured++; newDupe++;
      } else {
        result = { rarity: 4 };
        newPity++; newFeatured++; newDupe++;
      }
      newResults.push(result);
    }

    setPityCounter(newPity);
    setFeaturedCounter(newFeatured);
    setDupeCounter(newDupe);
    setTotalPulls(prev => prev + count);
    setResults(newResults);
    setStats(newStats);
    setHistory(newHistory);
  };

  const reset = () => {
    setPityCounter(0); 
    setFeaturedCounter(0);
    setDupeCounter(0);
    setTotalPulls(0);
    setResults([]); 
    setHistory([]); 
    setStats({ total6: 0, totalFeatured: 0, totalDupeTokens: 0 });
  };

  const currentRate = (get6StarRate(pityCounter) * 100).toFixed(2);
  const isNextPullGuaranteed = pityCounter >= 79;

  const ResultTag = ({ item }) => {
    const E = item.element ? ELEMENTS[item.element] : null;
    const is6 = item.rarity === 6;
    
    if (is6) {
      const className = item.type === 'featured' 
        ? 'bg-amber-100 text-amber-800 border-amber-200'
        : item.type === 'nextLimited' 
        ? 'bg-violet-100 text-violet-800 border-violet-200'
        : 'bg-sky-100 text-sky-800 border-sky-200';
      
      return (
        <Badge variant="outline" className={className}>
          <Star className="w-3 h-3 mr-1" />
          {E && <E.icon className={`w-3 h-3 mr-1 ${E.color}`} />}
          {getCharacterName(lang, item.key)}
          {item.type === 'featured' && <Check className="w-3 h-3 ml-1" />}
          {item.dupeToken && <Gift className="w-3 h-3 ml-1 text-pink-500" />}
        </Badge>
      );
    }
    
    return (
      <Badge variant="outline" className={item.rarity === 5 ? 'border-purple-300 text-purple-600' : 'border-gray-300 text-gray-500'}>
        {item.rarity === 5 ? t.star5 : t.star4}
      </Badge>
    );
  };

  // 가챠 흐름 시각화 컴포넌트
  const GachaFlowChart = () => (
    <div className="space-y-3 text-sm">
      {/* Step 1: 뽑기 */}
      <div className="flex items-center gap-3 p-3 bg-slate-100 rounded-lg">
        <div className="w-8 h-8 rounded-full bg-slate-700 text-white flex items-center justify-center font-bold">1</div>
        <div className="flex-1">
          <div className="font-semibold">{t.flowStep1Title}</div>
          <div className="text-muted-foreground text-xs">{t.flowStep1Desc}</div>
        </div>
      </div>
      
      <div className="flex justify-center"><ArrowDown className="w-4 h-4 text-muted-foreground" /></div>
      
      {/* Step 2: 6성 판정 */}
      <div className="flex items-center gap-3 p-3 bg-amber-50 rounded-lg border border-amber-200">
        <div className="w-8 h-8 rounded-full bg-amber-500 text-white flex items-center justify-center font-bold">2</div>
        <div className="flex-1">
          <div className="font-semibold text-amber-800">{t.flowStep2Title}</div>
          <div className="text-amber-700 text-xs">{t.flowStep2Desc}</div>
        </div>
      </div>
      
      <div className="flex justify-center"><ArrowDown className="w-4 h-4 text-muted-foreground" /></div>
      
      {/* Step 3: 50/50 분기 */}
      <div className="grid grid-cols-2 gap-2">
        <div className="p-3 bg-emerald-50 rounded-lg border border-emerald-200">
          <div className="font-semibold text-emerald-800 text-center">50%</div>
          <div className="text-emerald-700 text-xs text-center">{t.flowWin}</div>
          <div className="mt-2 p-2 bg-emerald-100 rounded text-center">
            <Check className="w-4 h-4 inline text-emerald-600" />
            <div className="text-xs font-medium text-emerald-800">{t.flowFeaturedGet}</div>
          </div>
        </div>
        <div className="p-3 bg-red-50 rounded-lg border border-red-200">
          <div className="font-semibold text-red-800 text-center">50%</div>
          <div className="text-red-700 text-xs text-center">{t.flowLose}</div>
          <div className="mt-2 p-2 bg-red-100 rounded text-center">
            <X className="w-4 h-4 inline text-red-600" />
            <div className="text-xs font-medium text-red-800">{t.flowOffBanner}</div>
          </div>
        </div>
      </div>
      
      <div className="flex justify-center"><ArrowDown className="w-4 h-4 text-muted-foreground" /></div>
      
      {/* Step 4: 다음 뽑기 */}
      <div className="p-3 bg-orange-50 rounded-lg border border-orange-200">
        <div className="flex items-center gap-2">
          <X className="w-5 h-5 text-orange-600" />
          <div>
            <div className="font-semibold text-orange-800">{t.flowNoGuarantee}</div>
            <div className="text-orange-700 text-xs">{t.flowNoGuaranteeDesc}</div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-50 p-4">
      <div className="max-w-md mx-auto space-y-4">
        
        {/* 헤더 + 언어 선택 */}
        <div className="pt-2 pb-4">
          <div className="flex justify-end mb-3">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="gap-2">
                  <Globe className="w-4 h-4" />
                  <span>{LANGUAGES[lang].flag} {LANGUAGES[lang].name}</span>
                  <ChevronDown className="w-3 h-3" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {Object.values(LANGUAGES).map((language) => (
                  <DropdownMenuItem
                    key={language.code}
                    onClick={() => setLang(language.code)}
                    className={lang === language.code ? 'bg-slate-100' : ''}
                  >
                    <span className="mr-2">{language.flag}</span>
                    {language.name}
                    {lang === language.code && <Check className="w-4 h-4 ml-auto" />}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <div className="text-center">
            <h1 className="text-xl font-bold tracking-tight">{t.title}</h1>
            <p className="text-sm text-muted-foreground mt-1">{t.version}</p>
          </div>
        </div>

        {/* Ezoic Ad Placeholder - Top (101) */}
        <div id="ezoic-pub-ad-placeholder-101" />

        {/* 핵심 주의사항 배너 - 항상 표시 */}
        <Alert variant="destructive" className="border-2">
          <X className="h-4 w-4" />
          <AlertDescription className="font-medium">
            {t.criticalWarning}
          </AlertDescription>
        </Alert>

        {/* 초기화 버튼 */}
        <Button 
          variant="destructive" 
          className="w-full" 
          onClick={reset}
        >
          <RotateCcw className="w-4 h-4 mr-2" />
          {t.reset}
        </Button>

        {/* 확률 정보 토글 */}
        <Button 
          variant="ghost" 
          className="w-full"
          onClick={() => setShowInfo(!showInfo)}
        >
          {t.probabilityInfo}
          {showInfo ? <ChevronUp className="w-4 h-4 ml-2" /> : <ChevronDown className="w-4 h-4 ml-2" />}
        </Button>

        {showInfo && (
          <div className="space-y-4">
            
            {/* 가챠 흐름도 - 새로 추가 */}
            <Card>
              <CardHeader>
                <CardTitle>{t.gachaFlow}</CardTitle>
                <CardDescription>{t.gachaFlowDesc}</CardDescription>
              </CardHeader>
              <CardContent>
                <GachaFlowChart />
              </CardContent>
            </Card>

            {/* 3단계 천장 시스템 요약 */}
            <Card>
              <CardHeader>
                <CardTitle>{t.threeStepPity}</CardTitle>
                <CardDescription>{t.threeStepPityDesc}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {/* 80뽑 */}
                <div className="flex items-center gap-3 p-3 bg-amber-50 rounded-lg border border-amber-200">
                  <div className="text-2xl font-bold text-amber-600">80</div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold">{t.pity80Title}</span>
                      <Badge variant="outline" className="bg-emerald-50 text-emerald-700 border-emerald-200 text-xs">
                        <Check className="w-3 h-3 mr-1" />{t.carryOver}
                      </Badge>
                    </div>
                    <div className="text-xs text-muted-foreground">{t.pity80Desc}</div>
                  </div>
                </div>
                
                {/* 120뽑 */}
                <div className="flex items-center gap-3 p-3 bg-emerald-50 rounded-lg border border-emerald-200">
                  <div className="text-2xl font-bold text-emerald-600">120</div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold">{t.pity120Title}</span>
                      <Badge variant="outline" className="bg-red-50 text-red-600 border-red-200 text-xs">
                        <X className="w-3 h-3 mr-1" />{t.noCarryOver}
                      </Badge>
                    </div>
                    <div className="text-xs text-muted-foreground">{t.pity120Desc}</div>
                  </div>
                </div>
                
                {/* 240뽑 */}
                <div className="flex items-center gap-3 p-3 bg-pink-50 rounded-lg border border-pink-200">
                  <div className="text-2xl font-bold text-pink-600">240</div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold">{t.pity240Title}</span>
                      <Badge variant="outline" className="bg-red-50 text-red-600 border-red-200 text-xs">
                        <X className="w-3 h-3 mr-1" />{t.noCarryOver}
                      </Badge>
                    </div>
                    <div className="text-xs text-muted-foreground">{t.pity240Desc}</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* 데이터 출처 */}
            <Card>
              <CardHeader>
                <CardTitle>{t.dataSource}</CardTitle>
                <CardDescription>{t.dataSourceDesc}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-2 text-sm">
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">{t.gameVersion}</span>
                  <span className="font-medium">{t.gameVersionValue}</span>
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">{t.source}</span>
                  <span className="font-medium">{t.sourceValue}</span>
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">{t.update}</span>
                  <span className="font-medium">{t.updateValue}</span>
                </div>
              </CardContent>
            </Card>

            {/* 천장 시스템 상세 */}
            <Card>
              <CardHeader>
                <CardTitle>{t.pitySystem}</CardTitle>
                <CardDescription>{t.pitySystemDesc}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 bg-slate-50 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold">{t.sixStarPity}</span>
                      <Badge variant="outline" className="bg-emerald-50 text-emerald-700 border-emerald-200">
                        <Check className="w-3 h-3 mr-1" />{t.carryOver}
                      </Badge>
                    </div>
                    <span className="text-xl font-bold">80{t.pulls}</span>
                  </div>
                  <p className="text-sm text-muted-foreground">{t.softPityDesc}</p>
                </div>
                
                <div className="p-4 bg-slate-50 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold">{t.featuredGuarantee}</span>
                      <Badge variant="outline" className="bg-red-50 text-red-600 border-red-200">
                        <X className="w-3 h-3 mr-1" />{t.noCarryOver}
                      </Badge>
                    </div>
                    <span className="text-xl font-bold">120{t.pulls}</span>
                  </div>
                  <p className="text-sm text-muted-foreground">{t.featuredResetDesc}</p>
                </div>

                <div className="p-4 bg-slate-50 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold">{t.dupeGuarantee}</span>
                      <Badge variant="outline" className="bg-red-50 text-red-600 border-red-200">
                        <X className="w-3 h-3 mr-1" />{t.noCarryOver}
                      </Badge>
                    </div>
                    <span className="text-xl font-bold">240{t.pulls}</span>
                  </div>
                  <p className="text-sm text-muted-foreground">{t.dupeResetDesc}</p>
                </div>
              </CardContent>
            </Card>

            {/* 6성 획득 시 분배 */}
            <Card>
              <CardHeader>
                <CardTitle>{t.sixStarDistribution}</CardTitle>
                <CardDescription>{t.sixStarDistributionDesc}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex items-center justify-between p-3 bg-amber-50 rounded-lg">
                  <span className="text-sm font-medium text-amber-800">{t.currentFeatured}</span>
                  <span className="text-lg font-bold text-amber-800">50%</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-violet-50 rounded-lg">
                  <span className="text-sm font-medium text-violet-800">{t.nextLimited}</span>
                  <span className="text-lg font-bold text-violet-800">14.28%</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-sky-50 rounded-lg">
                  <span className="text-sm font-medium text-sky-800">{t.standardPool}</span>
                  <span className="text-lg font-bold text-sky-800">35.72%</span>
                </div>
              </CardContent>
            </Card>

            {/* 주의사항 */}
            <Card>
              <CardHeader>
                <CardTitle>{t.warnings}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Alert variant="destructive">
                  <X className="h-4 w-4" />
                  <AlertDescription>
                    <span className="font-semibold">{t.noGuarantee}</span> — {t.noGuaranteeDesc}
                  </AlertDescription>
                </Alert>
                <Alert variant="destructive">
                  <X className="h-4 w-4" />
                  <AlertDescription>
                    <span className="font-semibold">{t.no120CarryOver}</span> — {t.no120CarryOverDesc}
                  </AlertDescription>
                </Alert>
                <Alert variant="destructive">
                  <X className="h-4 w-4" />
                  <AlertDescription>
                    <span className="font-semibold">{t.no240CarryOver}</span> — {t.no240CarryOverDesc}
                  </AlertDescription>
                </Alert>
                <Alert className="border-emerald-200 bg-emerald-50 text-emerald-800 [&>svg]:text-emerald-600">
                  <Check className="h-4 w-4" />
                  <AlertDescription>
                    <span className="font-semibold">{t.pityCarryOver}</span> — {t.pityCarryOverDesc}
                  </AlertDescription>
                </Alert>
              </CardContent>
            </Card>

            {/* 배너 변경 시 */}
            <Card>
              <CardHeader>
                <CardTitle>{t.bannerChangeTitle}</CardTitle>
                <CardDescription>{t.bannerChangeDesc}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 text-emerald-700">
                    <Check className="w-5 h-5 flex-shrink-0" />
                    <span>{t.sixStarCounterKeep}</span>
                  </div>
                  <Separator />
                  <div className="flex items-center gap-3 text-red-600">
                    <X className="w-5 h-5 flex-shrink-0" />
                    <span>{t.counter120Reset}</span>
                  </div>
                  <div className="flex items-center gap-3 text-red-600">
                    <X className="w-5 h-5 flex-shrink-0" />
                    <span>{t.counter240Reset}</span>
                  </div>
                  <div className="flex items-center gap-3 text-red-600">
                    <X className="w-5 h-5 flex-shrink-0" />
                    <span>{t.fiftyFiftyReset}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* 보너스 */}
            <Card>
              <CardHeader>
                <CardTitle>{t.bonusTitle}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <ArrowRight className="w-5 h-5 text-muted-foreground flex-shrink-0" />
                    <span><span className="font-semibold">{t.bonus30}</span> → {t.bonus30Desc}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <ArrowRight className="w-5 h-5 text-muted-foreground flex-shrink-0" />
                    <span><span className="font-semibold">{t.bonus60}</span> → {t.bonus60Desc}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

          </div>
        )}

        {/* 배너 선택 */}
        <Card>
          <CardHeader>
            <CardTitle>{t.bannerSelection}</CardTitle>
            <CardDescription>{t.bannerSelectionDesc}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 gap-2">
              {Object.entries(BANNERS_DATA).map(([key, b]) => {
                const E = ELEMENTS[b.element];
                const selected = selectedBanner === key;
                return (
                  <Button
                    key={key}
                    variant={selected ? "default" : "outline"}
                    className={`h-auto py-4 flex-col gap-2 ${selected ? 'bg-slate-900' : ''}`}
                    onClick={() => handleBannerChange(key)}
                  >
                    <E.icon className={`w-6 h-6 ${selected ? 'text-white' : E.color}`} />
                    <span className="text-sm font-medium">{getCharacterName(lang, key)}</span>
                    <span className={`text-xs ${selected ? 'text-slate-300' : 'text-muted-foreground'}`}>{b.period}</span>
                  </Button>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* 카운터 - 6성 */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>{t.sixStarCounter}</CardTitle>
              <Badge variant="outline" className="bg-emerald-50 text-emerald-700 border-emerald-200">
                <Check className="w-3 h-3 mr-1" />{t.carryOver}
              </Badge>
            </div>
            <CardDescription>{t.sixStarCounterDesc}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-end justify-between mb-3">
              <div className="text-3xl font-bold tabular-nums">
                {pityCounter}<span className="text-lg font-normal text-muted-foreground">/80</span>
              </div>
              <div className="text-sm text-muted-foreground">
                {isNextPullGuaranteed ? (
                  <span className="font-semibold text-amber-600 animate-pulse">{t.nextPullGuaranteed}</span>
                ) : (
                  <>
                    {t.probability} <span className="font-medium text-foreground">{currentRate}%</span>
                    {pityCounter >= 65 && <span className="text-orange-500 ml-1">{t.soft}</span>}
                  </>
                )}
              </div>
            </div>
            <Progress value={(pityCounter / 80) * 100} className="h-2" />
          </CardContent>
        </Card>

        {/* 카운터 - 120뽑 */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>{t.featuredCounter}</CardTitle>
              <Badge variant="outline" className="bg-red-50 text-red-600 border-red-200">
                <X className="w-3 h-3 mr-1" />{t.noCarryOver}
              </Badge>
            </div>
            <CardDescription>{t.featuredCounterDesc}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-end justify-between mb-3">
              <div className="text-3xl font-bold tabular-nums">
                {featuredCounter}<span className="text-lg font-normal text-muted-foreground">/120</span>
              </div>
              <div className="text-sm text-muted-foreground">
                {featuredCounter >= 119 ? (
                  <span className="font-semibold text-amber-600 animate-pulse">{t.nextPullFeatured}</span>
                ) : (
                  <>{120 - featuredCounter}{t.pullsRemaining}</>
                )}
              </div>
            </div>
            <Progress value={(featuredCounter / 120) * 100} className="h-2" />
          </CardContent>
        </Card>

        {/* 카운터 - 240뽑 돌파 */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                {t.dupeCounter}
                <Gift className="w-4 h-4 text-pink-500" />
              </CardTitle>
              <Badge variant="outline" className="bg-red-50 text-red-600 border-red-200">
                <X className="w-3 h-3 mr-1" />{t.noCarryOver}
              </Badge>
            </div>
            <CardDescription>{t.dupeCounterDesc}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-end justify-between mb-3">
              <div className="text-3xl font-bold tabular-nums">
                {dupeCounter}<span className="text-lg font-normal text-muted-foreground">/240</span>
              </div>
              <div className="text-sm text-muted-foreground">
                {dupeCounter >= 239 ? (
                  <span className="font-semibold text-pink-600 animate-pulse">{t.nextPullDupe}</span>
                ) : (
                  <>{240 - dupeCounter}{t.pullsRemaining}</>
                )}
              </div>
            </div>
            <Progress value={(dupeCounter / 240) * 100} className="h-2 [&>div]:bg-pink-500" />
            {stats.totalDupeTokens > 0 && (
              <div className="mt-2 text-sm text-pink-600 flex items-center gap-1">
                <Gift className="w-4 h-4" />
                {t.dupeTokensEarned}: {stats.totalDupeTokens}
              </div>
            )}
          </CardContent>
        </Card>

        {/* 통계 */}
        <Card>
          <CardHeader>
            <CardTitle>{t.stats}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-5 gap-2 text-center">
              <div>
                <div className="text-xl font-bold tabular-nums">{totalPulls}</div>
                <div className="text-xs text-muted-foreground">{t.totalPulls}</div>
              </div>
              <div>
                <div className="text-xl font-bold tabular-nums">{(totalPulls * 500).toLocaleString()}</div>
                <div className="text-xs text-muted-foreground">{t.oroberyl}</div>
              </div>
              <div>
                <div className="text-xl font-bold tabular-nums text-amber-500">{stats.total6}</div>
                <div className="text-xs text-muted-foreground">{t.sixStar}</div>
              </div>
              <div>
                <div className="text-xl font-bold tabular-nums text-emerald-500">{stats.totalFeatured}</div>
                <div className="text-xs text-muted-foreground">{t.featured}</div>
              </div>
              <div>
                <div className="text-xl font-bold tabular-nums text-pink-500">{stats.totalDupeTokens}</div>
                <div className="text-xs text-muted-foreground">{t.dupeTokens}</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 뽑기 버튼 */}
        <div className="grid grid-cols-2 gap-3">
          <Button variant="outline" size="lg" className="h-14 text-base" onClick={() => doPulls(1)}>
            {t.pull1}
            <span className="text-muted-foreground ml-2">500</span>
          </Button>
          <Button size="lg" className="h-14 text-base" onClick={() => doPulls(10)}>
            {t.pull10}
            <span className="text-slate-400 ml-2">5,000</span>
          </Button>
        </div>

        {/* 결과 */}
        {results.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle>{t.recentResults}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {results.map((r, i) => <ResultTag key={i} item={r} />)}
              </div>
            </CardContent>
          </Card>
        )}

        {/* 6성 기록 */}
        {history.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle>{t.sixStarHistory}</CardTitle>
              <CardDescription>{history.length}{t.acquired}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {history.map((c, i) => <ResultTag key={i} item={c} />)}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Ezoic Ad Placeholder - Bottom (103) */}
        <div id="ezoic-pub-ad-placeholder-103" />

        {/* 푸터 */}
        <Card className="bg-slate-100 border-0">
          <CardContent className="pt-6">
            <div className="text-center space-y-3">
              <p className="text-sm font-semibold text-slate-700">{t.footerTitle}</p>
              <Separator />
              <div className="text-xs text-muted-foreground space-y-1">
                <p>{t.footerDisclaimer1}</p>
                <p>{t.footerDisclaimer2}</p>
                <p>{t.footerDisclaimer3}</p>
              </div>
              <Separator />
              <a 
                href="https://github.com/meloncafe/endfield-tools-gacha-simulator" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                <Github className="w-4 h-4" />
                <span>GitHub</span>
              </a>
            </div>
          </CardContent>
        </Card>

        {/* 배너 변경 확인 다이얼로그 */}
        <AlertDialog open={showBannerDialog} onOpenChange={setShowBannerDialog}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>{t.bannerChangeDialog}</AlertDialogTitle>
              <AlertDialogDescription asChild>
                <div className="space-y-4 pt-2">
                  <p>{t.bannerChangeDialogDescPrefix}{featuredCounter}{t.bannerChangeDialogDesc}</p>
                  
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 p-2 bg-emerald-50 rounded-lg text-emerald-700">
                      <Check className="w-4 h-4 flex-shrink-0" />
                      <span className="text-sm">{t.sixStarCounterKeepDialog} <span className="font-semibold">{pityCounter}{t.keepSuffix}</span></span>
                    </div>
                    <div className="flex items-center gap-2 p-2 bg-red-50 rounded-lg text-red-600">
                      <X className="w-4 h-4 flex-shrink-0" />
                      <span className="text-sm">120{t.pulls} <span className="font-semibold">{featuredCounter}{t.resetSuffix}</span></span>
                    </div>
                    <div className="flex items-center gap-2 p-2 bg-red-50 rounded-lg text-red-600">
                      <X className="w-4 h-4 flex-shrink-0" />
                      <span className="text-sm">240{t.pulls} <span className="font-semibold">{dupeCounter}{t.resetSuffix}</span></span>
                    </div>
                  </div>

                  {featuredCounter >= 80 && (
                    <Alert variant="destructive">
                      <Info className="h-4 w-4" />
                      <AlertDescription>
                        {120 - featuredCounter}{t.almostGuarantee}
                      </AlertDescription>
                    </Alert>
                  )}
                </div>
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel onClick={cancelBannerChange}>{t.cancel}</AlertDialogCancel>
              <AlertDialogAction onClick={confirmBannerChange}>{t.changeBanner}</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>

      </div>
    </div>
  );
}
