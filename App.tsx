import React, { useState } from 'react';
import { LandingPageData, ViewMode } from './types';
import { InputForm } from './components/InputForm';
import { ResultViewer } from './components/ResultViewer';
import { generateLandingPageHtml } from './services/geminiService';

const App: React.FC = () => {
  const [data, setData] = useState<LandingPageData>({
    copy: '',
    visualReferences: '',
    instructions: ''
  });
  
  const [viewMode, setViewMode] = useState<ViewMode>(ViewMode.FORM);
  const [generatedHtml, setGeneratedHtml] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleInputChange = (field: keyof LandingPageData, value: string) => {
    setData(prev => ({ ...prev, [field]: value }));
  };

  const handleGenerate = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const html = await generateLandingPageHtml(data.copy, data.visualReferences, data.instructions);
      setGeneratedHtml(html);
      setViewMode(ViewMode.PREVIEW);
    } catch (err) {
      console.error(err);
      setError("Falha ao gerar a Landing Page. Por favor, verifique sua API Key e tente novamente.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setViewMode(ViewMode.FORM);
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header - Only show in Form mode to give full screen to preview */}
      {viewMode === ViewMode.FORM && (
        <header className="py-8 px-6 text-center space-y-4">
          <div className="flex items-center justify-center space-x-3">
             <div className="bg-gradient-to-tr from-indigo-500 to-violet-500 p-2 rounded-lg shadow-lg shadow-indigo-500/20">
               <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
               </svg>
             </div>
             <h1 className="text-3xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">
               LP Forge <span className="text-slate-500 font-normal">for ClickMax</span>
             </h1>
          </div>
          <p className="text-slate-400 max-w-xl mx-auto text-lg">
            Transforme sua copy e referências em uma Landing Page HTML pronta para uso em segundos com IA.
          </p>
        </header>
      )}

      {/* Main Content */}
      <main className={`flex-1 flex flex-col ${viewMode === ViewMode.FORM ? 'px-6 pb-12' : ''}`}>
        {viewMode === ViewMode.FORM ? (
          <>
             {error && (
              <div className="max-w-4xl mx-auto mb-6 w-full bg-red-500/10 border border-red-500/20 text-red-200 p-4 rounded-lg flex items-center space-x-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                <span>{error}</span>
              </div>
            )}
            <InputForm 
              data={data}
              onChange={handleInputChange}
              onSubmit={handleGenerate}
              isLoading={isLoading}
            />
          </>
        ) : (
          <ResultViewer 
            html={generatedHtml} 
            onBack={handleReset} 
          />
        )}
      </main>

      {/* Footer - Only in Form mode */}
      {viewMode === ViewMode.FORM && (
        <footer className="py-6 text-center text-slate-600 text-sm">
          <p>Powered by Google Gemini 3</p>
        </footer>
      )}
    </div>
  );
};

export default App;