export interface LandingPageData {
  copy: string;
  visualReferences: string;
  instructions: string;
}

export interface GenerationResult {
  html: string;
  success: boolean;
  error?: string;
}

export enum ViewMode {
  FORM = 'FORM',
  PREVIEW = 'PREVIEW',
  CODE = 'CODE'
}