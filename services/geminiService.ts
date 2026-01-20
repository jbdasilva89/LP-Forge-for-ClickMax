import { GoogleGenAI } from "@google/genai";

const getClient = () => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    throw new Error("API Key not found in environment variables.");
  }
  return new GoogleGenAI({ apiKey });
};

export const generateLandingPageHtml = async (
  copy: string, 
  visualReferences: string,
  instructions: string
): Promise<string> => {
  const ai = getClient();
  
  const prompt = `
    Você é um Engenheiro Frontend Sênior e especialista em CRO (Conversion Rate Optimization).
    
    Sua tarefa é escrever o código HTML e CSS para uma Landing Page de alta conversão.
    O código deve ser formatado para ser colado em um bloco HTML personalizado de construtores de páginas como o "ClickMax".

    DADOS DE ENTRADA:
    1. Copy (Texto de Venda):
    ${copy}

    2. Referências Visuais (Links/Estilo):
    ${visualReferences}

    3. Instruções Adicionais:
    ${instructions}

    REGRAS TÉCNICAS ESTRITAS:
    - Gere um ÚNICO arquivo HTML.
    - Todo o CSS deve estar dentro de uma tag <style> no head ou inline. NÃO use links externos para CSS (exceto Google Fonts).
    - O código deve ser responsivo (Mobile First).
    - Use tags semânticas (header, section, footer, h1, h2, button).
    - Use imagens de placeholder do https://picsum.photos/width/height se necessário.
    - O design deve ser moderno, limpo e focado em conversão (botões de CTA contrastantes, boa tipografia).
    - NÃO inclua tags <html>, <head> ou <body> externas se não for necessário, mas garanta que o conteúdo esteja envolto em uma <div class="lp-container"> principal para isolar estilos.
    - Importante: Se a copy não tiver texto suficiente para todas as seções sugeridas pela referência, improvise textos de preenchimento inteligentes (Lorem Ipsum profissional) mas priorize o texto do usuário.
    
    SAÍDA ESPERADA:
    Apenas o código HTML bruto. Não use blocos de código markdown (\`\`\`). Retorne apenas o texto do código.
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-pro-preview', // Using pro for complex coding tasks
      contents: prompt,
      config: {
        temperature: 0.4, // Lower temperature for more deterministic code
        systemInstruction: "You are a coding assistant optimized for generating standalone HTML components for marketing tools.",
      }
    });

    let html = response.text || "";
    
    // Cleanup markdown if strictly returned by model despite instructions
    html = html.replace(/```html/g, '').replace(/```/g, '').trim();

    return html;
  } catch (error) {
    console.error("Error generating landing page:", error);
    throw error;
  }
};