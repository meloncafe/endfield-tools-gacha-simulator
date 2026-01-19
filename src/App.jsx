import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Separator } from '@/components/ui/separator';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';
import { Flame, Snowflake, Leaf, Zap, Star, RotateCcw, ChevronDown, ChevronUp, Check, X, ArrowRight, Info, Github } from 'lucide-react';

const GACHA_CONFIG = {
  baseRate6Star: 0.008,
  softPityStart: 65,
  softPityIncrease: 0.05,
  hardPity: 80,
  featuredGuarantee: 120,
  fiftyFifty: { featured: 0.50, nextLimited: 0.1428, standard: 0.3572 }
};

const ELEMENTS = {
  Heat: { icon: Flame, color: 'text-orange-500' },
  Cryo: { icon: Snowflake, color: 'text-cyan-500' },
  Nature: { icon: Leaf, color: 'text-emerald-500' },
  Electric: { icon: Zap, color: 'text-violet-500' },
};

const BANNERS = {
  laevatain: {
    name: '레바테인', period: '1/22 ~ 2/7', element: 'Heat',
    nextLimited: [{ name: '질베르타', element: 'Nature' }, { name: '이본', element: 'Cryo' }]
  },
  gilberta: {
    name: '질베르타', period: '2/7 ~', element: 'Nature',
    nextLimited: [{ name: '레바테인', element: 'Heat' }, { name: '이본', element: 'Cryo' }]
  },
  yvonne: {
    name: '이본', period: '2/21 ~', element: 'Cryo',
    nextLimited: [{ name: '레바테인', element: 'Heat' }, { name: '질베르타', element: 'Nature' }]
  }
};

const STANDARD_POOL = [
  { name: '아델리아', element: 'Electric' },
  { name: '라스트 라이트', element: 'Nature' },
  { name: '엠버', element: 'Heat' },
  { name: '포그라니치니크', element: 'Cryo' },
  { name: '리펑', element: 'Electric' }
];

export default function App() {
  const [selectedBanner, setSelectedBanner] = useState('laevatain');
  const [pityCounter, setPityCounter] = useState(0);
  const [featuredCounter, setFeaturedCounter] = useState(0);
  const [totalPulls, setTotalPulls] = useState(0);
  const [results, setResults] = useState([]);
  const [history, setHistory] = useState([]);
  const [stats, setStats] = useState({ total6: 0, totalFeatured: 0 });
  const [showInfo, setShowInfo] = useState(false);
  const [pendingBanner, setPendingBanner] = useState(null);
  const [showBannerDialog, setShowBannerDialog] = useState(false);

  const banner = BANNERS[selectedBanner];

  const get6StarRate = (pulls) => {
    if (pulls < GACHA_CONFIG.softPityStart) return GACHA_CONFIG.baseRate6Star;
    return Math.min(1, GACHA_CONFIG.baseRate6Star + (pulls - GACHA_CONFIG.softPityStart + 1) * GACHA_CONFIG.softPityIncrease);
  };

  const handleBannerChange = (key) => {
    if (key === selectedBanner) return;
    if (featuredCounter > 0) {
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
          result = { name: banner.name, element: banner.element, type: 'featured', rarity: 6 };
          newStats.totalFeatured++;
          newFeatured = 0;
        } else if (sixStarRoll < GACHA_CONFIG.fiftyFifty.featured + GACHA_CONFIG.fiftyFifty.nextLimited) {
          const next = banner.nextLimited[Math.floor(Math.random() * banner.nextLimited.length)];
          result = { ...next, type: 'nextLimited', rarity: 6 };
          newFeatured++;
        } else {
          const std = STANDARD_POOL[Math.floor(Math.random() * STANDARD_POOL.length)];
          result = { ...std, type: 'standard', rarity: 6 };
          newFeatured++;
        }
        newPity = 0;
        newStats.total6++;
        newHistory.push(result);
      } else if (roll < rate6Star + 0.08) {
        result = { name: '5성', rarity: 5 };
        newPity++; newFeatured++;
      } else {
        result = { name: '4성', rarity: 4 };
        newPity++; newFeatured++;
      }
      newResults.push(result);
    }

    setPityCounter(newPity);
    setFeaturedCounter(newFeatured);
    setTotalPulls(prev => prev + count);
    setResults(newResults);
    setStats(newStats);
    setHistory(newHistory);
  };

  const reset = () => {
    setPityCounter(0); 
    setFeaturedCounter(0); 
    setTotalPulls(0);
    setResults([]); 
    setHistory([]); 
    setStats({ total6: 0, totalFeatured: 0 });
  };

  const currentRate = (get6StarRate(pityCounter) * 100).toFixed(2);

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
          {item.name}
          {item.type === 'featured' && <Check className="w-3 h-3 ml-1" />}
        </Badge>
      );
    }
    
    return (
      <Badge variant="outline" className={item.rarity === 5 ? 'border-purple-300 text-purple-600' : 'border-gray-300 text-gray-500'}>
        {item.name}
      </Badge>
    );
  };

  return (
    <div className="min-h-screen bg-slate-50 p-4">
      <div className="max-w-md mx-auto space-y-4">
        
        {/* 헤더 */}
        <div className="text-center pt-2 pb-4">
          <h1 className="text-xl font-bold tracking-tight">엔드필드 가챠 시뮬레이터</h1>
          <p className="text-sm text-muted-foreground mt-1">v1.0 정식 출시 기준</p>
        </div>

        {/* 초기화 버튼 */}
        <Button 
          variant="destructive" 
          className="w-full" 
          onClick={reset}
        >
          <RotateCcw className="w-4 h-4 mr-2" />
          전체 초기화
        </Button>

        {/* 확률 정보 토글 */}
        <Button 
          variant="ghost" 
          className="w-full"
          onClick={() => setShowInfo(!showInfo)}
        >
          확률 정보
          {showInfo ? <ChevronUp className="w-4 h-4 ml-2" /> : <ChevronDown className="w-4 h-4 ml-2" />}
        </Button>

        {showInfo && (
          <div className="space-y-4">
            
            {/* 데이터 출처 */}
            <Card>
              <CardHeader>
                <CardTitle>데이터 출처</CardTitle>
                <CardDescription>시뮬레이터에 적용된 확률 기준</CardDescription>
              </CardHeader>
              <CardContent className="space-y-2 text-sm">
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">게임 버전</span>
                  <span className="font-medium">v1.0 정식 출시</span>
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">출처</span>
                  <span className="font-medium">정식 출시 미리보기 방송</span>
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">업데이트</span>
                  <span className="font-medium">2026-01-19</span>
                </div>
              </CardContent>
            </Card>

            {/* 천장 시스템 */}
            <Card>
              <CardHeader>
                <CardTitle>천장 시스템</CardTitle>
                <CardDescription>이월 여부에 주의하세요</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 bg-slate-50 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold">6성 천장</span>
                      <Badge variant="outline" className="bg-emerald-50 text-emerald-700 border-emerald-200">
                        <Check className="w-3 h-3 mr-1" />이월됨
                      </Badge>
                    </div>
                    <span className="text-xl font-bold">80뽑</span>
                  </div>
                  <p className="text-sm text-muted-foreground">65뽑부터 확률 +5%/뽑</p>
                </div>
                
                <div className="p-4 bg-slate-50 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold">픽업 확정</span>
                      <Badge variant="outline" className="bg-red-50 text-red-600 border-red-200">
                        <X className="w-3 h-3 mr-1" />이월안됨
                      </Badge>
                    </div>
                    <span className="text-xl font-bold">120뽑</span>
                  </div>
                  <p className="text-sm text-muted-foreground">배너 종료 시 카운터 리셋</p>
                </div>
              </CardContent>
            </Card>

            {/* 6성 획득 시 분배 */}
            <Card>
              <CardHeader>
                <CardTitle>6성 획득 시 분배</CardTitle>
                <CardDescription>50/50 시스템 — 확천 없음</CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex items-center justify-between p-3 bg-amber-50 rounded-lg">
                  <span className="text-sm font-medium text-amber-800">현재 픽업</span>
                  <span className="text-lg font-bold text-amber-800">50%</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-violet-50 rounded-lg">
                  <span className="text-sm font-medium text-violet-800">다음 한정 (2명 중 1명)</span>
                  <span className="text-lg font-bold text-violet-800">14.28%</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-sky-50 rounded-lg">
                  <span className="text-sm font-medium text-sky-800">상시 풀 (5명 중 1명)</span>
                  <span className="text-lg font-bold text-sky-800">35.72%</span>
                </div>
              </CardContent>
            </Card>

            {/* 주의사항 */}
            <Card>
              <CardHeader>
                <CardTitle>주의사항</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Alert variant="destructive">
                  <X className="h-4 w-4" />
                  <AlertDescription>
                    <span className="font-semibold">확천 없음</span> — 픽뚫 후에도 다음 6성이 50/50
                  </AlertDescription>
                </Alert>
                <Alert variant="destructive">
                  <X className="h-4 w-4" />
                  <AlertDescription>
                    <span className="font-semibold">120뽑 이월 없음</span> — 배너 종료 시 리셋
                  </AlertDescription>
                </Alert>
                <Alert className="border-emerald-200 bg-emerald-50 text-emerald-800 [&>svg]:text-emerald-600">
                  <Check className="h-4 w-4" />
                  <AlertDescription>
                    <span className="font-semibold">80뽑 이월</span> — 6성 카운터는 다음 배너로 유지
                  </AlertDescription>
                </Alert>
              </CardContent>
            </Card>

            {/* 배너 변경 시 */}
            <Card>
              <CardHeader>
                <CardTitle>배너 변경/종료 시</CardTitle>
                <CardDescription>무엇이 유지되고 리셋되는지</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 text-emerald-700">
                    <Check className="w-5 h-5 flex-shrink-0" />
                    <span>6성 카운터 유지 (0~79)</span>
                  </div>
                  <Separator />
                  <div className="flex items-center gap-3 text-red-600">
                    <X className="w-5 h-5 flex-shrink-0" />
                    <span>120뽑 카운터 리셋 → 0</span>
                  </div>
                  <div className="flex items-center gap-3 text-red-600">
                    <X className="w-5 h-5 flex-shrink-0" />
                    <span>50/50 기록 없음 (매번 새로 50/50)</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* 보너스 */}
            <Card>
              <CardHeader>
                <CardTitle>긴급모집 보너스</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <ArrowRight className="w-5 h-5 text-muted-foreground flex-shrink-0" />
                    <span><span className="font-semibold">30뽑</span> → 무료 10뽑권 (천장 미반영)</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <ArrowRight className="w-5 h-5 text-muted-foreground flex-shrink-0" />
                    <span><span className="font-semibold">60뽑</span> → 다음 배너 10뽑권</span>
                  </div>
                </div>
              </CardContent>
            </Card>

          </div>
        )}

        {/* 배너 선택 */}
        <Card>
          <CardHeader>
            <CardTitle>배너 선택</CardTitle>
            <CardDescription>배너 변경 시 120뽑 카운터가 리셋됩니다</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 gap-2">
              {Object.entries(BANNERS).map(([key, b]) => {
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
                    <span className="text-sm font-medium">{b.name}</span>
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
              <CardTitle>6성 카운터</CardTitle>
              <Badge variant="outline" className="bg-emerald-50 text-emerald-700 border-emerald-200">
                <Check className="w-3 h-3 mr-1" />이월됨
              </Badge>
            </div>
            <CardDescription>65뽑부터 확률 증가, 80뽑 확정</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-end justify-between mb-3">
              <div className="text-3xl font-bold tabular-nums">
                {pityCounter}<span className="text-lg font-normal text-muted-foreground">/80</span>
              </div>
              <div className="text-sm text-muted-foreground">
                확률 <span className="font-medium text-foreground">{currentRate}%</span>
                {pityCounter >= 65 && <span className="text-orange-500 ml-1">(소프트)</span>}
              </div>
            </div>
            <Progress value={(pityCounter / 80) * 100} className="h-2" />
          </CardContent>
        </Card>

        {/* 카운터 - 120뽑 */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>픽업 확정 카운터</CardTitle>
              <Badge variant="outline" className="bg-red-50 text-red-600 border-red-200">
                <X className="w-3 h-3 mr-1" />이월안됨
              </Badge>
            </div>
            <CardDescription>배너 종료 시 리셋됩니다</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-end justify-between mb-3">
              <div className="text-3xl font-bold tabular-nums">
                {featuredCounter}<span className="text-lg font-normal text-muted-foreground">/120</span>
              </div>
              <div className="text-sm text-muted-foreground">
                {120 - featuredCounter}뽑 남음
              </div>
            </div>
            <Progress value={(featuredCounter / 120) * 100} className="h-2" />
          </CardContent>
        </Card>

        {/* 통계 */}
        <Card>
          <CardHeader>
            <CardTitle>통계</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-4 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold tabular-nums">{totalPulls}</div>
                <div className="text-xs text-muted-foreground">총 뽑기</div>
              </div>
              <div>
                <div className="text-2xl font-bold tabular-nums">{(totalPulls * 500).toLocaleString()}</div>
                <div className="text-xs text-muted-foreground">합성옥</div>
              </div>
              <div>
                <div className="text-2xl font-bold tabular-nums text-amber-500">{stats.total6}</div>
                <div className="text-xs text-muted-foreground">6성</div>
              </div>
              <div>
                <div className="text-2xl font-bold tabular-nums text-emerald-500">{stats.totalFeatured}</div>
                <div className="text-xs text-muted-foreground">픽업</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 뽑기 버튼 */}
        <div className="grid grid-cols-2 gap-3">
          <Button variant="outline" size="lg" className="h-14 text-base" onClick={() => doPulls(1)}>
            1회 뽑기
            <span className="text-muted-foreground ml-2">500</span>
          </Button>
          <Button size="lg" className="h-14 text-base" onClick={() => doPulls(10)}>
            10회 뽑기
            <span className="text-slate-400 ml-2">5,000</span>
          </Button>
        </div>

        {/* 결과 */}
        {results.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle>최근 결과</CardTitle>
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
              <CardTitle>6성 획득 기록</CardTitle>
              <CardDescription>{history.length}회 획득</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {history.map((c, i) => <ResultTag key={i} item={c} />)}
              </div>
            </CardContent>
          </Card>
        )}

        {/* 푸터 */}
        <Card className="bg-slate-100 border-0">
          <CardContent className="pt-6">
            <div className="text-center space-y-3">
              <p className="text-sm font-semibold text-slate-700">Endfield Tools</p>
              <Separator />
              <div className="text-xs text-muted-foreground space-y-1">
                <p>본 시뮬레이터는 팬메이드 도구이며, Gryphline/Hypergryph와 무관합니다.</p>
                <p>게임 내 실제 확률과 다를 수 있습니다.</p>
                <p>Arknights: Endfield™ 및 관련 상표는 각 소유자의 자산입니다.</p>
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
              <AlertDialogTitle>배너를 변경하시겠습니까?</AlertDialogTitle>
              <AlertDialogDescription asChild>
                <div className="space-y-4 pt-2">
                  <p>현재 {featuredCounter}뽑 진행 중입니다. 배너 변경 시:</p>
                  
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 p-2 bg-emerald-50 rounded-lg text-emerald-700">
                      <Check className="w-4 h-4 flex-shrink-0" />
                      <span className="text-sm">6성 카운터 <span className="font-semibold">{pityCounter}뽑 유지</span></span>
                    </div>
                    <div className="flex items-center gap-2 p-2 bg-red-50 rounded-lg text-red-600">
                      <X className="w-4 h-4 flex-shrink-0" />
                      <span className="text-sm">120뽑 카운터 <span className="font-semibold">{featuredCounter}뽑 → 0 리셋</span></span>
                    </div>
                  </div>

                  {featuredCounter >= 80 && (
                    <Alert variant="destructive">
                      <Info className="h-4 w-4" />
                      <AlertDescription>
                        {120 - featuredCounter}뽑만 더 하면 픽업 확정입니다!
                      </AlertDescription>
                    </Alert>
                  )}
                </div>
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel onClick={cancelBannerChange}>취소</AlertDialogCancel>
              <AlertDialogAction onClick={confirmBannerChange}>배너 변경</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>

      </div>
    </div>
  );
}
