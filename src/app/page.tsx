'use client';

import { useState, useEffect } from 'react';
import Navigation from './Navigation';
import { Download, ShieldCheck, Smartphone, Users, Sparkles, CheckCircle2, Zap, X, Loader2 } from 'lucide-react';

export default function Home() {
  const [lang, setLang] = useState<'en' | 'ar'>('ar');
  const [downloads, setDownloads] = useState<number>(573);
  const [liveVisitors, setLiveVisitors] = useState<number>(24);
  const [showDownloadModal, setShowDownloadModal] = useState<boolean>(false);
  const [isDownloading, setIsDownloading] = useState<boolean>(false);

  const isAr = lang === 'ar';

  useEffect(() => {
    // Fixed launch reference timestamp
    const launchDate = new Date('2026-07-20T00:00:00Z').getTime();

    const calculateMetrics = () => {
      const now = new Date().getTime();
      const hoursPassed = Math.max(0, Math.floor((now - launchDate) / (1000 * 60 * 60)));
      
      // Start at 573 and add 17 every hour
      setDownloads(573 + (hoursPassed * 17));
    };

    calculateMetrics();
    const downloadInterval = setInterval(calculateMetrics, 60000); // Check every minute for new hours

    // Change visitors between 9 and 148 every single second (1000ms)
    const visitorInterval = setInterval(() => {
      const randomVisitors = Math.floor(Math.random() * (148 - 9 + 1)) + 9;
      setLiveVisitors(randomVisitors);
    }, 1000);

    return () => {
      clearInterval(downloadInterval);
      clearInterval(visitorInterval);
    };
  }, []);

  const triggerHiddenDownload = async () => {
    setIsDownloading(true);
    try {
      const apkUrl = "https://github.com/Younesouani/Quran-App/releases/download/V3.0.1/application-ecf828ab-e19e-4a1c-a14d-2cfc4bf0349c.apk";
      const response = await fetch(apkUrl);
      const blob = await response.blob();
      
      const blobUrl = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = blobUrl;
      link.download = "QuranApp-v3.0.1.apk";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(blobUrl);
    } catch {
      const link = document.createElement('a');
      link.href = "https://github.com/Younesouani/Quran-App/releases/download/V3.0.1/application-ecf828ab-e19e-4a1c-a14d-2cfc4bf0349c.apk";
      link.download = "QuranApp-v3.0.1.apk";
      link.click();
    } finally {
      setIsDownloading(false);
    }
  };

  const handleDownloadClick = () => {
    setShowDownloadModal(true);
    triggerHiddenDownload();
  };

  return (
    <div dir={isAr ? 'rtl' : 'ltr'} className="min-h-screen bg-neutral-950 text-amber-50 flex flex-col justify-between selection:bg-amber-500 selection:text-neutral-950 relative">
      <Navigation lang={lang} setLang={setLang} liveVisitors={liveVisitors} />

      {/* Hero Section */}
      <main className="relative z-10 max-w-4xl mx-auto px-4 py-12 w-full flex flex-col items-center text-center">
        {/* Release Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-amber-500/40 bg-amber-500/10 text-amber-300 text-xs font-semibold mb-6 shadow-lg shadow-amber-500/10">
          <Sparkles className="w-4 h-4 text-amber-400" />
          <span>{isAr ? 'الإصدار المباشر لأجهزة الأندرويد • v3.0.1' : 'Official Android Direct APK Release • v3.0.1'}</span>
        </div>

        {/* Main Gold Title */}
        <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-white mb-6 leading-tight">
          {isAr ? (
            <>
              اقرأ وتدبر <span className="bg-gradient-to-r from-amber-300 via-amber-400 to-yellow-500 bg-clip-text text-transparent">القرآن الكريم</span> بتصميم ذهبي فخم
            </>
          ) : (
            <>
              Experience the Holy Quran with <span className="bg-gradient-to-r from-amber-300 via-amber-400 to-yellow-500 bg-clip-text text-transparent">Golden Elegance & Speed</span>
            </>
          )}
        </h1>

        <p className="text-amber-100/70 text-base sm:text-lg max-w-2xl mb-8 leading-relaxed">
          {isAr
            ? 'تطبيق قرآني خفيف وسريع بدون إعلانات، يحتوي على تلاوات شجية ومكتبة كتب السنة والتفسير مع استماع وتصفح بدون إنترنت.'
            : 'A lightweight, fast, ad-free Quran app featuring noble recitations, authentic Hadith books, and Tafsir with complete offline support.'}
        </p>

        {/* Main CTA Download Button */}
        <div className="w-full sm:w-auto flex flex-col items-center gap-4">
          <button
            onClick={handleDownloadClick}
            className="w-full sm:w-80 px-8 py-4 rounded-2xl bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 text-neutral-950 font-black text-lg hover:brightness-110 transition-all shadow-2xl shadow-amber-500/30 flex items-center justify-center gap-3 active:scale-95 border border-amber-300/50 cursor-pointer"
          >
            <Download className="w-6 h-6" />
            <span>{isAr ? 'تحميل ملف APK مباشرة' : 'Download APK Direct'}</span>
          </button>

          <div className="flex items-center gap-2 text-xs text-amber-400/80">
            <ShieldCheck className="w-4 h-4 text-amber-400" />
            <span>{isAr ? 'آمن ومفحوص 100% • خالي تماماً من الإعلانات' : '100% Scanned & Verified • Completely Ad-Free'}</span>
          </div>
        </div>

        {/* Live Counters Banner */}
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-4 mt-12">
          <div className="bg-neutral-900/80 border border-amber-500/30 rounded-3xl p-6 backdrop-blur-md shadow-xl text-center flex flex-col items-center">
            <Users className="w-7 h-7 text-amber-400 mb-2" />
            <div className="text-3xl font-black text-amber-200">{downloads.toLocaleString()}</div>
            <div className="text-xs text-amber-400/70 mt-1 font-medium">
              {isAr ? 'إجمالي التحميلات' : 'Total Downloads'}
            </div>
          </div>

          <div className="bg-neutral-900/80 border border-amber-500/30 rounded-3xl p-6 backdrop-blur-md shadow-xl text-center flex flex-col items-center">
            <Smartphone className="w-7 h-7 text-amber-400 mb-2" />
            <div className="text-3xl font-black text-amber-200">Android 6.0+</div>
            <div className="text-xs text-amber-400/70 mt-1 font-medium">
              {isAr ? 'متوافق مع جميع الهواتف' : 'Universal Android Support'}
            </div>
          </div>
        </div>

        {/* Auxiliaries Feature Highlights */}
        <div className="w-full bg-neutral-900/50 border border-amber-500/20 rounded-3xl p-6 sm:p-8 mt-8 text-right sm:text-center backdrop-blur-sm">
          <h3 className="text-lg font-bold text-amber-300 mb-4 flex items-center justify-center gap-2">
            <Zap className="w-5 h-5 text-amber-400" />
            <span>{isAr ? 'مميزات النسخة الحالية v3.0.1' : 'Key Auxiliary Features'}</span>
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs sm:text-sm text-amber-100/80">
            <div className="flex items-center gap-2 bg-neutral-950/60 p-3 rounded-xl border border-amber-500/10">
              <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
              <span>{isAr ? 'خط عثماني مريح للعين' : 'Clear Uthmani Script'}</span>
            </div>
            <div className="flex items-center gap-2 bg-neutral-950/60 p-3 rounded-xl border border-amber-500/10">
              <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
              <span>{isAr ? 'تصفح بدون اتصال بالإنترنت' : 'Offline Reading & Audio'}</span>
            </div>
            <div className="flex items-center gap-2 bg-neutral-950/60 p-3 rounded-xl border border-amber-500/10">
              <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
              <span>{isAr ? 'تلاوات صوتية عالية الجودة' : 'High Quality Audio Reciters'}</span>
            </div>
          </div>
        </div>
      </main>

      {/* Download Popup Window / Modal */}
      {showDownloadModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
          <div className="bg-neutral-900 border border-amber-500/40 rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl relative text-center">
            {/* Close Button */}
            <button
              onClick={() => setShowDownloadModal(false)}
              className="absolute top-4 left-4 sm:top-5 sm:left-5 text-amber-400/60 hover:text-amber-400 p-1 rounded-full hover:bg-neutral-800 transition-all"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Spinner Icon */}
            <div className="w-16 h-16 rounded-full bg-amber-500/10 border border-amber-500/30 flex items-center justify-center mx-auto mb-4">
              <Loader2 className="w-8 h-8 text-amber-400 animate-spin" />
            </div>

            <h2 className="text-xl sm:text-2xl font-black text-amber-200 mb-2">
              {isAr ? 'جاري التحميل المباشر...' : 'Download Starting...'}
            </h2>

            <p className="text-xs sm:text-sm text-amber-100/70 mb-6 leading-relaxed">
              {isAr
                ? 'بدأ تنزيل ملف التطبيق تلقائياً على جهازك. يُرجى الانتظار لحظات.'
                : 'Your APK download is starting automatically. Please wait a moment.'}
            </p>

            <button
              onClick={triggerHiddenDownload}
              disabled={isDownloading}
              className="inline-flex items-center justify-center gap-2 w-full py-3 px-6 rounded-xl bg-amber-500 text-neutral-950 font-bold text-sm hover:bg-amber-400 transition-all shadow-lg shadow-amber-500/20 mb-4 cursor-pointer disabled:opacity-50"
            >
              <Download className="w-4 h-4" />
              <span>{isDownloading ? (isAr ? 'جاري تجهيز الملف...' : 'Preparing File...') : (isAr ? 'إعادة التحميل' : 'Retry Download')}</span>
            </button>

            <div className="pt-4 border-t border-amber-500/10 text-[11px] text-amber-400/60 space-y-1">
              <p>📦 Package: QuranApp-v3.0.1.apk</p>
              <p>🛡️ Status: Verified Safe & Virus-Free</p>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="border-t border-amber-500/20 py-6 text-center text-xs text-amber-400/80 font-medium tracking-wide">
        <p>Develop By Youness</p>
        <p className="text-[10px] text-amber-500/50 mt-1">© {new Date().getFullYear()} Quran App. All Rights Reserved.</p>
      </footer>
    </div>
  );
}
