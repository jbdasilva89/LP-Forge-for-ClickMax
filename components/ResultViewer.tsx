import React, { useState, useEffect } from 'react';

interface ResultViewerProps {
  html: string;
  onBack: () => void;
}

export const ResultViewer: React.FC<ResultViewerProps> = ({ html, onBack }) => {
  const [activeTab, setActiveTab] = useState<'preview' | 'code'>('preview');
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(html);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full h-full flex flex-col bg-slate-900">
      {/* Toolbar */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-900/95 backdrop-blur sticky top-0 z-10">
        <div className="flex items-center space-x-4">
          <button 
            onClick={onBack}
            className="text-slate-400 hover:text-white transition-colors flex items-center text-sm font-medium"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Editar Inputs
          </button>
          <div className="h-6 w-px bg-slate-700"></div>
          <div className="flex bg-slate-800 rounded-lg p-1">
            <button
              onClick={() => setActiveTab('preview')}
              className={`px-4 py-1.5 rounded-md text-sm font-medium transition-all ${activeTab === 'preview' ? 'bg-slate-700 text-white shadow' : 'text-slate-400 hover:text-slate-200'}`}
            >
              Preview Visual
            </button>
            <button
              onClick={() => setActiveTab('code')}
              className={`px-4 py-1.5 rounded-md text-sm font-medium transition-all ${activeTab === 'code' ? 'bg-slate-700 text-white shadow' : 'text-slate-400 hover:text-slate-200'}`}
            >
              Código HTML
            </button>
          </div>
        </div>

        <button
          onClick={handleCopy}
          className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-bold transition-all ${
            copied 
            ? 'bg-green-500/10 text-green-400 border border-green-500/20' 
            : 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-500/20'
          }`}
        >
          {copied ? (
            <>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              <span>Copiado!</span>
            </>
          ) : (
            <>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
              </svg>
              <span>Copiar para ClickMax</span>
            </>
          )}
        </button>
      </div>

      {/* Content Area */}
      <div className="flex-1 overflow-hidden relative bg-slate-950">
        {activeTab === 'preview' ? (
           <div className="w-full h-full flex justify-center bg-gray-900 overflow-hidden">
             <div className="w-full h-full max-w-[100%] bg-white shadow-2xl overflow-hidden relative">
                <iframe
                    title="LP Preview"
                    srcDoc={html}
                    className="w-full h-full border-0 block"
                    sandbox="allow-scripts"
                />
             </div>
           </div>
        ) : (
          <div className="w-full h-full overflow-auto p-6">
            <pre className="text-sm font-mono text-slate-300 bg-slate-900 p-6 rounded-xl border border-slate-800 shadow-inner overflow-x-auto">
              <code>{html}</code>
            </pre>
          </div>
        )}
      </div>
    </div>
  );
};