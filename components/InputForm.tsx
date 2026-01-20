import React from 'react';
import { LandingPageData } from '../types';

interface InputFormProps {
  data: LandingPageData;
  onChange: (field: keyof LandingPageData, value: string) => void;
  onSubmit: () => void;
  isLoading: boolean;
}

export const InputForm: React.FC<InputFormProps> = ({ data, onChange, onSubmit, isLoading }) => {
  return (
    <div className="w-full max-w-6xl mx-auto space-y-8 animate-fade-in">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Left Column: Copy */}
        <div className="space-y-2 h-full flex flex-col">
          <label htmlFor="copy" className="block text-sm font-medium text-slate-300">
            1. Copy da Página
          </label>
          <div className="relative flex-1">
            <textarea
              id="copy"
              className="w-full h-full min-h-[400px] p-4 bg-slate-800 border border-slate-700 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-slate-200 resize-none transition-all placeholder-slate-500 font-mono text-sm"
              placeholder="Cole aqui a sua copy completa.&#10;&#10;Exemplo:&#10;Headline: Emagreça em 30 dias&#10;Subhead: Método comprovado...&#10;Benefícios: ...&#10;Oferta: R$ 97,00"
              value={data.copy}
              onChange={(e) => onChange('copy', e.target.value)}
              disabled={isLoading}
            />
            <div className="absolute top-2 right-2 px-2 py-1 bg-slate-900/50 rounded text-xs text-slate-400 border border-slate-700">
              Texto Principal
            </div>
          </div>
        </div>

        {/* Right Column: References & Instructions */}
        <div className="space-y-6 flex flex-col h-full">
          
          {/* Visual References */}
          <div className="space-y-2 flex-1">
            <label htmlFor="visualReferences" className="block text-sm font-medium text-slate-300">
              2. Links de Referências Visuais
            </label>
            <div className="relative h-full">
              <textarea
                id="visualReferences"
                className="w-full h-full min-h-[180px] p-4 bg-slate-800 border border-slate-700 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-slate-200 resize-none transition-all placeholder-slate-500 text-sm"
                placeholder="Cole links de sites que você gosta ou descreva o estilo visual.&#10;&#10;Exemplo:&#10;- https://apple.com (Estilo minimalista)&#10;- https://site-concorrente.com (Estrutura de seções)&#10;- Cores: Azul marinho e Dourado."
                value={data.visualReferences}
                onChange={(e) => onChange('visualReferences', e.target.value)}
                disabled={isLoading}
              />
              <div className="absolute top-2 right-2 px-2 py-1 bg-slate-900/50 rounded text-xs text-slate-400 border border-slate-700">
                Design & Estilo
              </div>
            </div>
          </div>

          {/* Additional Instructions */}
          <div className="space-y-2 flex-1">
            <label htmlFor="instructions" className="block text-sm font-medium text-slate-300">
              3. Instruções Adicionais
            </label>
            <div className="relative h-full">
              <textarea
                id="instructions"
                className="w-full h-full min-h-[180px] p-4 bg-slate-800 border border-slate-700 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-slate-200 resize-none transition-all placeholder-slate-500 text-sm"
                placeholder="Detalhes específicos para o Gemini.&#10;&#10;Exemplo:&#10;- Use bordas arredondadas nos botões.&#10;- A oferta deve ter um contador regressivo (estático).&#10;- Adicione uma seção de FAQ no final."
                value={data.instructions}
                onChange={(e) => onChange('instructions', e.target.value)}
                disabled={isLoading}
              />
              <div className="absolute top-2 right-2 px-2 py-1 bg-slate-900/50 rounded text-xs text-slate-400 border border-slate-700">
                Regras Extras
              </div>
            </div>
          </div>

        </div>
      </div>

      <div className="flex flex-col items-center justify-center pt-4">
        <button
          onClick={onSubmit}
          disabled={isLoading || !data.copy || !data.visualReferences}
          className={`
            relative px-8 py-4 rounded-full text-lg font-bold text-white shadow-lg transition-all transform hover:scale-105 active:scale-95 w-full md:w-auto min-w-[300px]
            ${isLoading 
              ? 'bg-slate-600 cursor-not-allowed opacity-70' 
              : (!data.copy || !data.visualReferences) 
                ? 'bg-slate-700 cursor-not-allowed text-slate-400'
                : 'bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 shadow-indigo-500/25'}
          `}
        >
          {isLoading ? (
            <span className="flex items-center justify-center space-x-2">
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <span>Gerando Landing Page...</span>
            </span>
          ) : (
            <span className="flex items-center justify-center space-x-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
              </svg>
              <span>Criar Página HTML</span>
            </span>
          )}
        </button>
        {!isLoading && (!data.copy || !data.visualReferences) && (
             <p className="mt-2 text-sm text-slate-500">Preencha a Copy e as Referências para continuar.</p>
        )}
        {isLoading && (
          <p className="mt-4 text-sm text-slate-400 animate-pulse">Isso pode levar cerca de 10-20 segundos. O Gemini está codando...</p>
        )}
      </div>
    </div>
  );
};