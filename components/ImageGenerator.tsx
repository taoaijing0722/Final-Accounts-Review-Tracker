import React, { useState } from 'react';
import { ImageSize } from '../types';
import { generateGeminiImage } from '../services/geminiService';
import { Image as ImageIcon, Download, RefreshCw, Wand2, Loader2, AlertCircle } from 'lucide-react';

const ImageGenerator: React.FC = () => {
  const [prompt, setPrompt] = useState('财务报表分析图，展示增长趋势，专业风格，蓝色调');
  const [size, setSize] = useState<ImageSize>(ImageSize.SIZE_1K);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async () => {
    if (!prompt) return;
    setLoading(true);
    setError(null);
    setGeneratedImage(null);

    try {
      const imageBase64 = await generateGeminiImage(prompt, size);
      setGeneratedImage(imageBase64);
    } catch (err: any) {
      setError(err.message || "图片生成失败，请重试");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6 animate-fade-in">
      <div className="bg-white p-8 rounded-xl shadow-sm border border-slate-200">
        <div className="flex items-center space-x-3 mb-6">
          <div className="p-2 bg-purple-100 rounded-lg">
            <Wand2 className="w-6 h-6 text-purple-600" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-800">AI 可视化生成</h2>
            <p className="text-sm text-slate-500">使用 Nano Banana Pro (Gemini 3 Pro Image) 生成演示素材</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Controls */}
          <div className="space-y-6 lg:col-span-1">
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700">画面描述 (Prompt)</label>
              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                rows={5}
                className="w-full p-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm resize-none bg-slate-50"
                placeholder="描述您想要生成的图片内容..."
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700">分辨率</label>
              <div className="grid grid-cols-3 gap-3">
                {Object.values(ImageSize).map((s) => (
                  <button
                    key={s}
                    onClick={() => setSize(s)}
                    className={`py-2 px-3 text-sm font-medium rounded-lg border transition-all ${
                      size === s
                        ? 'bg-purple-600 text-white border-purple-600 shadow-md'
                        : 'bg-white text-slate-600 border-slate-200 hover:border-purple-300'
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={handleGenerate}
              disabled={loading || !prompt}
              className="w-full py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-lg font-medium shadow-lg hover:shadow-purple-500/30 hover:scale-[1.02] transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center space-x-2"
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>正在生成...</span>
                </>
              ) : (
                <>
                  <ImageIcon className="w-5 h-5" />
                  <span>开始生成</span>
                </>
              )}
            </button>
            
            {error && (
               <div className="p-3 bg-red-50 text-red-700 text-sm rounded-lg flex items-start gap-2 border border-red-100">
                 <AlertCircle className="w-4 h-4 mt-0.5 shrink-0"/>
                 <span>{error}</span>
               </div>
            )}
          </div>

          {/* Preview Area */}
          <div className="lg:col-span-2 bg-slate-50 rounded-xl border border-slate-200 border-dashed min-h-[400px] flex items-center justify-center relative overflow-hidden group">
            {generatedImage ? (
              <>
                <img 
                  src={generatedImage} 
                  alt="Generated content" 
                  className="max-w-full max-h-[600px] object-contain shadow-2xl rounded-lg"
                />
                <div className="absolute top-4 right-4 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <a 
                    href={generatedImage} 
                    download={`gemini-gen-${Date.now()}.png`}
                    className="p-2 bg-white/90 backdrop-blur text-slate-700 rounded-lg shadow-lg hover:text-purple-600 transition-colors"
                    title="下载图片"
                  >
                    <Download className="w-5 h-5" />
                  </a>
                </div>
              </>
            ) : (
              <div className="text-center text-slate-400">
                {loading ? (
                  <div className="flex flex-col items-center animate-pulse">
                    <div className="w-16 h-16 bg-slate-200 rounded-full mb-4"></div>
                    <div className="h-4 bg-slate-200 rounded w-32 mb-2"></div>
                    <div className="h-4 bg-slate-200 rounded w-24"></div>
                  </div>
                ) : (
                  <div className="flex flex-col items-center">
                     <ImageIcon className="w-16 h-16 mb-4 opacity-20" />
                     <p>在此处预览生成的图片</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
      
      <div className="bg-blue-50 border border-blue-100 rounded-lg p-4 flex gap-3 text-sm text-blue-800">
        <AlertCircle className="w-5 h-5 shrink-0 text-blue-600" />
        <p>
          提示：高分辨率 (2K/4K) 图片生成可能需要较长时间，请耐心等待。
          生成的图片仅供内部演示使用。
        </p>
      </div>
    </div>
  );
};

export default ImageGenerator;
