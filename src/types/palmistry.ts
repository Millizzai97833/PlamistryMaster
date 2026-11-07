export type HandType = 'left' | 'right';

export interface PalmLineDetail {
  id: string;
  name: string;
  location: string;
  visualDescription: string;
  shapeStructure: string; // e.g. "Deep and curved", "Faint and chained", "Straight with fork"
  lengthDepth: string;
  specialMarkings: string[]; // e.g. ["Fork at termination", "Small island near middle", "Upward branch"]
  traditionalMeaning: string;
  personalityInterpretation: string;
  relationshipInterpretation?: string;
  careerInterpretation?: string;
  symbolicFutureThemes: string;
  positiveAspects: string[];
  challengesAndCautions: string[];
  confidence: number; // 0 to 100
  svgPathKey?: string; // used for interactive palm illustration
}

export interface MountObservation {
  name: string; // e.g. "Mount of Venus", "Mount of Jupiter", "Mount of Saturn", etc.
  planet: string;
  prominence: 'flat' | 'well-developed' | 'high/prominent' | 'under-developed';
  interpretation: string;
}

export interface FutureTimeline {
  next3Months: string;
  next6Months: string;
  next12Months: string;
  next3Years: string;
  longTermDirection: string;
}

export interface FutureThemes {
  loveAndRelationships: string;
  marriageAndPartnerships: string;
  careerAndProfessional: string;
  moneyAndFinancial: string;
  businessOpportunities: string;
  educationAndLearning: string;
  personalGrowth: string;
  travelAndRelocation: string;
  familyAndSocial: string;
  importantTransitions: string;
}

export interface PalmReport {
  id: string;
  timestamp: number;
  imageUrl: string;
  handType: HandType;
  imageQuality: {
    isClear: boolean;
    clarityScore: number; // 0 - 100
    message: string;
    suggestions?: string;
  };
  orientation: {
    hand: HandType;
    palmType: 'Earth' | 'Air' | 'Fire' | 'Water';
    palmTypeDescription: string;
    fingerObservations: string;
  };
  overallAnalysis: string;
  mounts: MountObservation[];
  lines: PalmLineDetail[];
  futureReading: {
    timeline: FutureTimeline;
    themes: FutureThemes;
  };
  loveAndMarriage: {
    summary: string;
    attachmentStyle: string;
    idealPartnerQualities: string;
    relationshipMilestones: string;
  };
  careerAndMoney: {
    summary: string;
    wealthTendencies: string;
    optimalCareerPaths: string[];
    businessInstinct: string;
    financialDiscipline: string;
  };
  personalityProfile: {
    archetype: string;
    coreStrengths: string[];
    shadowTraitsOrChallenges: string[];
    intuitionLevel: string;
    lifePhilosophy: string;
  };
  finalSummary: string;
  disclaimer: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: number;
  suggestedFollowUps?: string[];
}

export type SupportedLanguage = 
  | 'en' // English
  | 'ur' // Urdu (اردو)
  | 'hi'; // Hindi (हिन्दी)

export interface LanguageInfo {
  code: SupportedLanguage;
  name: string;
  nativeName: string;
  dir: 'ltr' | 'rtl';
}
