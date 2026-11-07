import { PalmReport } from '../types/palmistry';

export const SAMPLE_PALMS: { id: string; title: string; subtitle: string; handType: 'left' | 'right'; report: PalmReport }[] = [
  {
    id: 'sample-1',
    title: 'Intuitive Visionary',
    subtitle: 'Deep Head Line with Moon fork, prominent Sun Line, strong Mount of Luna',
    handType: 'right',
    report: {
      id: 'sample-1-report',
      timestamp: Date.now() - 3600000,
      imageUrl: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=800&q=80',
      handType: 'right',
      imageQuality: {
        isClear: true,
        clarityScore: 94,
        message: 'Excellent high-resolution palm capture. Major and minor flexion creases are clearly resolved.'
      },
      orientation: {
        hand: 'right',
        palmType: 'Air',
        palmTypeDescription: 'Square palm with long, slender fingers. Characteristic of an intellectual, communicative, and socially conscious individual driven by ideas and curiosity.',
        fingerObservations: 'Long straight index (Jupiter) finger indicating innate leadership, balanced ring (Apollo) finger revealing refined artistic aesthetic.'
      },
      overallAnalysis: 'The active right hand displays a harmonious convergence of intellect and spiritual discernment. The palm reveals an ambitious, self-driven temperament with exceptional analytical clarity softened by an empathetic heart.',
      mounts: [
        {
          name: 'Mount of Jupiter',
          planet: 'Jupiter',
          prominence: 'well-developed',
          interpretation: 'Reflects noble ambition, authentic integrity, and natural mentorship abilities without tyrannical pride.'
        },
        {
          name: 'Mount of Venus',
          planet: 'Venus',
          prominence: 'high/prominent',
          interpretation: 'Ample vitality, generous warmth, passionate aesthetic appreciation, and deep devotion to loved ones.'
        },
        {
          name: 'Mount of Luna',
          planet: 'Moon',
          prominence: 'well-developed',
          interpretation: 'Rich imagination, poetic sensitivity, affinity for philosophical inquiry and overseas journeys.'
        },
        {
          name: 'Mount of Saturn',
          planet: 'Saturn',
          prominence: 'well-developed',
          interpretation: 'Grounded sense of civic duty, patience in long-term enterprise, and spiritual introspection.'
        },
        {
          name: 'Mount of Apollo (Sun)',
          planet: 'Sun',
          prominence: 'well-developed',
          interpretation: 'Radiant charisma, creative flair, and desire to leave an inspiring public legacy.'
        },
        {
          name: 'Mount of Mercury',
          planet: 'Mercury',
          prominence: 'well-developed',
          interpretation: 'Nimble persuasive speech, quick commercial acumen, and sharp problem-solving dexterity.'
        }
      ],
      lines: [
        {
          id: 'heart-line',
          name: 'Heart Line',
          location: 'Originates beneath the index/middle fingers and sweeps across the upper palm below the digits.',
          visualDescription: 'Clear, gently curving upward toward the space between Jupiter and Saturn mounts with delicate feathering.',
          shapeStructure: 'Curved and fluid with healthy depth',
          lengthDepth: 'Long and distinctly engraved',
          specialMarkings: ['Gentle upward bifurcation near the Jupiter mount', 'Absence of deep restrictive bars'],
          traditionalMeaning: 'Signifies balanced emotional poise; love is expressed through genuine devotion rather than obsessive attachment.',
          personalityInterpretation: 'You possess rich empathy, yet maintain healthy personal boundaries. You listen deeply and prize emotional authenticity.',
          relationshipInterpretation: 'Thrives in partnerships built on intellectual camaraderie, mutual respect, and reciprocal vulnerability.',
          careerInterpretation: 'Attracts collaborative team harmony; well-suited for counseling, strategic communication, and executive mediation.',
          symbolicFutureThemes: 'Deepening emotional stability and harmonizing past relational wounds into mature wisdom.',
          positiveAspects: ['Unconditional warmth', 'Loyalty', 'Emotional resilience'],
          challengesAndCautions: ['May occasionally absorb external emotional stress; remember to reserve quiet sanctuary time.'],
          confidence: 96,
          svgPathKey: 'heart'
        },
        {
          id: 'head-line',
          name: 'Head Line',
          location: 'Traverses the middle palm horizontally between the Mount of Mars and Mount of Luna.',
          visualDescription: 'Deep, crisp engraving that slopes smoothly toward the upper Mount of Luna with a subtle writer’s fork at the end.',
          shapeStructure: 'Long, gently downward-sloping with terminal fork',
          lengthDepth: 'Extended length, highly distinct depth',
          specialMarkings: ['Writer’s fork (creative split between pragmatic reasoning and creative imagination)'],
          traditionalMeaning: 'Represents extraordinary mental agility, blending rational logic with lateral visionary creative intuition.',
          personalityInterpretation: 'Inquisitive thinker capable of mastering complex abstract concepts while retaining practical execution skills.',
          careerInterpretation: 'Exceptional capacity for research, software architecture, authoring, and strategic entrepreneurship.',
          symbolicFutureThemes: 'Pivotal intellectual breakthroughs, publishing, or launching an innovative enterprise.',
          positiveAspects: ['Strategic vision', 'Multi-disciplinary comprehension', 'Sharp memory'],
          challengesAndCautions: ['Mental fatigue caused by over-analyzing alternate scenarios; balance contemplation with bodily movement.'],
          confidence: 98,
          svgPathKey: 'head'
        },
        {
          id: 'life-line',
          name: 'Life Line',
          location: 'Encirclement of the Mount of Venus, curving from between the thumb and index finger down to the wrist rascettes.',
          visualDescription: 'Broad, sweeping semi-circular sweep embracing a generous Venus mount, deep and uninterrupted throughout.',
          shapeStructure: 'Expansive arc, smoothly continuous',
          lengthDepth: 'Prominent and unbroken',
          specialMarkings: ['Small upward ascending ambition branch rising toward Jupiter mount in early twenties zone'],
          traditionalMeaning: 'Traditional palmistry symbolizes vitality, constitutional enthusiasm, recuperative stamina, and lifestyle adaptability (never denotes biological lifespan).',
          personalityInterpretation: 'Vibrant zest for worldly experiences, travel, culinary delight, and physical recreation.',
          careerInterpretation: 'High threshold for sustained sustained effort and resilience during intense career transitions.',
          symbolicFutureThemes: 'Renewal of energy, prospective relocation to an inspiring natural environment, and vibrant wellness practices.',
          positiveAspects: ['Robust physical endurance', 'Warm charisma', 'Optimistic spirit'],
          challengesAndCautions: ['Beware of overcommitting your vitality to please others; guard your rest cycles.'],
          confidence: 95,
          svgPathKey: 'life'
        },
        {
          id: 'fate-line',
          name: 'Fate Line (Saturn Line)',
          location: 'Ascends vertically from the palm base upward toward the Mount of Saturn beneath the middle finger.',
          visualDescription: 'Begins cleanly from the inner plain of Mars and ascends with steadfast strength, intensifying past age 30.',
          shapeStructure: 'Vertical and straight with ascending upward offshoots',
          lengthDepth: 'Strongly pronounced in middle palm',
          specialMarkings: ['Clear upward branches aiming toward the Sun mount at mid-point'],
          traditionalMeaning: 'Symbolizes deliberate self-made destiny, professional self-determination, and purposeful career evolution.',
          personalityInterpretation: 'You possess exceptional self-discipline and an innate drive to master your chosen craft through focused perseverance.',
          careerInterpretation: 'Success earned through persistent skill acquisition rather than mere windfall; leadership authority gained through merit.',
          symbolicFutureThemes: 'Major professional milestone and autonomous stewardship of key initiatives.',
          positiveAspects: ['Singular focus', 'Professional accountability', 'Steadfast perseverance'],
          challengesAndCautions: ['Avoid defining your entire self-worth through professional status alone.'],
          confidence: 92,
          svgPathKey: 'fate'
        },
        {
          id: 'sun-line',
          name: 'Sun Line (Apollo Line)',
          location: 'Vertical filament parallel to the Fate Line rising toward the ring finger.',
          visualDescription: 'A luminous, clearly defined line appearing prominently under the Apollo mount.',
          shapeStructure: 'Vertical, refined and lucid',
          lengthDepth: 'Medium length, sharp definition',
          specialMarkings: ['Star-like triangle formation at its summit'],
          traditionalMeaning: 'Traditional indicator of creative brilliance, cultural recognition, magnetic presence, and rewarding honors.',
          personalityInterpretation: 'You possess natural charisma that draws recognition and goodwill from mentors and colleagues.',
          careerInterpretation: 'Thrives in public-facing, creative, brand development, or artistic innovation domains.',
          symbolicFutureThemes: 'Public acclaim, celebration of an artistic or technical milestone, and social influence.',
          positiveAspects: ['Innate aesthetic grace', 'Optimism', 'Public magnetism'],
          challengesAndCautions: ['Do not rely excessively on external validation; trust the intrinsic value of your creations.'],
          confidence: 90,
          svgPathKey: 'sun'
        },
        {
          id: 'mercury-line',
          name: 'Mercury Line (Hepatica / Line of Skill)',
          location: 'Rises diagonally from near the life line or wrist toward the pinky finger.',
          visualDescription: 'Slender, unwavering trajectory reaching the base of the Mercury mount.',
          shapeStructure: 'Direct diagonal ascent',
          lengthDepth: 'Slender, cohesive',
          specialMarkings: ['Trident base near the plain of Mars'],
          traditionalMeaning: 'Governs commercial perception, linguistic eloquence, rapid negotiations, and adaptable business instincts.',
          personalityInterpretation: 'Persuasive communicator with quick wit and knack for synthesizing disparate viewpoints.',
          careerInterpretation: 'Excels in negotiations, technology, consulting, trade, and media.',
          symbolicFutureThemes: 'Successful venture negotiations and lucrative commercial agreements.',
          positiveAspects: ['Persuasive eloquence', 'Negotiation skill', 'Fast cognitive speed'],
          challengesAndCautions: ['Ensure rest for your vocal cords and nervous system during periods of fast-paced communication.'],
          confidence: 88,
          svgPathKey: 'mercury'
        },
        {
          id: 'marriage-lines',
          name: 'Marriage & Relationship Lines',
          location: 'Horizontal markings on the percussion edge of the palm between the heart line and the pinky base.',
          visualDescription: 'Two distinct, deep horizontal strokes without downward drooping or island chains.',
          shapeStructure: 'Horizontal, clean, straight',
          lengthDepth: 'Deep, distinct, and level',
          specialMarkings: ['Unencumbered, straight trajectories without cross bars'],
          traditionalMeaning: 'Symbolizes significant soul-bond partnerships and lasting emotional commitments.',
          personalityInterpretation: 'Dedicated and constant in loyalty, valuing authentic emotional security and shared life purpose.',
          relationshipInterpretation: 'Points toward a profound, stabilizing bond marked by genuine spiritual equality and enduring companionship.',
          symbolicFutureThemes: 'Celebration of committed harmony, renewal of pledges, or deepening shared home foundation.',
          positiveAspects: ['Commitment-oriented', 'Spiritual compatibility', 'Devoted partnership'],
          challengesAndCautions: ['Practice patience during periods where partners need individual self-reflection.'],
          confidence: 89,
          svgPathKey: 'marriage'
        },
        {
          id: 'health-line',
          name: 'Health Line (Vitality Line - Symbolic)',
          location: 'Runs along the hypothenar eminence.',
          visualDescription: 'Smooth and largely faint, indicating harmonious equilibrium in traditional palmistry lore.',
          shapeStructure: 'Faint and undisturbed (traditionally viewed as most favorable)',
          lengthDepth: 'Faint and unobtrusive',
          specialMarkings: ['Absence of deep red islands or broken links'],
          traditionalMeaning: 'Traditional symbolic reading: A smooth or absent line historically indicates unburdened, natural vitality (strictly traditional lore, not medical diagnosis).',
          personalityInterpretation: 'Intuitive body awareness; responds favorably to mindful holistic living, clean hydration, and nature walks.',
          symbolicFutureThemes: 'Adoption of revitalizing daily habits and mindful balance between exertion and rest.',
          positiveAspects: ['Harmonious energy flow', 'Intuitive self-care awareness'],
          challengesAndCautions: ['Keep consistent sleep rhythm during demanding project launches.'],
          confidence: 85,
          svgPathKey: 'health'
        },
        {
          id: 'travel-lines',
          name: 'Travel Lines',
          location: 'Horizontal or arched ripples on the Mount of Luna along the lower outer edge of the palm.',
          visualDescription: 'Three distinct horizontal ripples etched onto the upper and mid Luna mount.',
          shapeStructure: 'Horizontal ripples curving upward toward the palm center',
          lengthDepth: 'Medium length, crisp',
          specialMarkings: ['Upward curve indicating rewarding exploratory journeys'],
          traditionalMeaning: 'Symbolic indicator of foreign excursions, cross-cultural relocations, and spiritual pilgrimages.',
          personalityInterpretation: 'Deep wanderlust and hunger to absorb different civilizations, languages, and philosophies.',
          symbolicFutureThemes: 'An inspiring international voyage or relocation for creative or educational expansion.',
          positiveAspects: ['Cross-cultural empathy', 'Adaptability in novel surroundings'],
          challengesAndCautions: ['Anchor your inner home regardless of geographical wanderings.'],
          confidence: 87,
          svgPathKey: 'travel'
        },
        {
          id: 'intuition-line',
          name: 'Intuition Line (Line of Clairvoyance)',
          location: 'Crescent curve originating from the lower Mount of Luna curving toward the Mercury mount.',
          visualDescription: 'Delicate yet clearly legible crescent arc hugging the outer percussion.',
          shapeStructure: 'Graceful crescent curve',
          lengthDepth: 'Fine and distinct',
          specialMarkings: ['Crescent shape without disruptive crossbars'],
          traditionalMeaning: 'Traditional symbol of acute gut feelings, premonitions, and uncanny perceptive foresight.',
          personalityInterpretation: 'You often sense unspoken interpersonal dynamics before anyone articulates them.',
          symbolicFutureThemes: 'Heightened creative synchronicity and trusting first impressions in crucial judgments.',
          positiveAspects: ['Profound instinctive foresight', 'Empathetic antennae', 'Symbolic dreams'],
          challengesAndCautions: ['Ground yourself through tangible everyday activities so you are not overwhelmed by sensory impressions.'],
          confidence: 86,
          svgPathKey: 'intuition'
        },
        {
          id: 'bracelet-lines',
          name: 'Bracelet / Rascette Lines',
          location: 'Transverse horizontal lines circling the wrist crease immediately below the palm base.',
          visualDescription: 'Three complete, parallel rascette lines forming a well-defined triple bracelet.',
          shapeStructure: 'Parallel, unbroken horizontal bands',
          lengthDepth: 'Deep and cleanly etched',
          specialMarkings: ['Top rascette clean and arching cleanly toward the palm'],
          traditionalMeaning: 'Known historically as the "Royal Bracelets of Hermes", signifying constitutional stamina, prosperity, and longevity of spirit.',
          personalityInterpretation: 'Possesses strong foundations in both physical stamina and moral integrity.',
          symbolicFutureThemes: 'Cumulative prosperity and establishing an enduring familial or creative legacy.',
          positiveAspects: ['Structural life stability', 'Resilience across decades'],
          challengesAndCautions: ['Remember that true wealth includes peace of mind and stillness.'],
          confidence: 93,
          svgPathKey: 'bracelet'
        }
      ],
      futureReading: {
        timeline: {
          next3Months: 'A phase of mental consolidation. Creative insights will crystallize into concrete plans. An influential mentor or strategic partner is likely to acknowledge your contributions.',
          next6Months: 'Expansion of responsibilities. Clear opportunities for public visibility, public speaking, or launching an autonomous venture. Financial flow strengthens through disciplined execution.',
          next12Months: 'Significant domestic or geographic milestone. A meaningful relocation or domestic upgrade harmonizes with career elevation, establishing serene equilibrium.',
          next3Years: 'A peak cycle of vocational recognition. Projects cultivated in the preceding years reach maturity, generating both financial abundance and reputable authority.',
          longTermDirection: 'Legacy of mentorship, wisdom sharing, and cultural or creative contribution that leaves an enduring mark upon your community.'
        },
        themes: {
          loveAndRelationships: 'Deepening authentic vulnerability, moving beyond superficial romance into soul-aligned partnership built upon mutual respect and intellectual sharing.',
          marriageAndPartnerships: 'Stable covenant of companionship with clear mutual goals, emotional loyalty, and shared philosophical aspirations.',
          careerAndProfessional: 'Ascent into strategic leadership and creative autonomy where your unique synthesis of analysis and empathy commands respect.',
          moneyAndFinancial: 'Disciplined wealth accumulation through multiple streams; favorable intuition regarding high-value long-term assets.',
          businessOpportunities: 'Joint ventures marrying technological innovation with humanistic services or creative arts prove extraordinarily fruitful.',
          educationAndLearning: 'Intensive immersion in specialized mastery—likely involving esoteric wisdom, advanced analytics, or cultural languages.',
          personalGrowth: 'Integration of the inner shadow, releasing perfectionism to embrace organic flow and fearless creative experimentation.',
          travelAndRelocation: 'Journeys across water or to historic mountain sanctuaries spark profound creative breakthroughs.',
          familyAndSocial: 'Acting as a peaceful anchor for the extended family circle while setting loving, firm personal boundaries.',
          importantTransitions: 'A deliberate pivot from seeking approval to embodying natural executive authority.'
        }
      },
      loveAndMarriage: {
        summary: 'Your heart reveals a rare combination of tender romantic devotion and grounded intellectual respect. You do not seek codependency; rather, you crave an enlightened co-creator.',
        attachmentStyle: 'Secure with thoughtful introspective depth',
        idealPartnerQualities: 'Intellectually stimulating, emotionally expressive, ambitious yet serene, valuing truth over flattery.',
        relationshipMilestones: 'A profound union characterized by harmonious co-habitation, shared travel adventures, and unconditional trust.'
      },
      careerAndMoney: {
        summary: 'The Fate and Sun lines indicate a stellar self-made vocational trajectory. You are not suited for repetitive bureaucratic drudgery; your destiny lies in innovation and leadership.',
        wealthTendencies: 'Strategic saver with high-conviction investments; avoids reckless gambling in favor of compound growth.',
        optimalCareerPaths: ['Creative Director', 'Strategic Consultant', 'Tech Founder', 'Author / Educator', 'Holistic Counselor'],
        businessInstinct: 'Exceptional pattern recognition; able to identify unmet market desires before competitors notice.',
        financialDiscipline: 'High prudence tempered by willingness to invest generously in personal learning, wellness, and aesthetic beauty.'
      },
      personalityProfile: {
        archetype: 'The Enlightened Strategist',
        coreStrengths: ['Acute visionary foresight', 'Compassionate communication', 'Steely perseverance', 'Refined aesthetic taste'],
        shadowTraitsOrChallenges: ['Tendency toward mental over-exertion', 'Reluctance to delegate when perfection is desired'],
        intuitionLevel: 'Exceptionally High (verified by crescent Intuition Line and Luna fork)',
        lifePhilosophy: 'Aligning deliberate action with universal cosmic harmony.'
      },
      finalSummary: 'A sublime palm marked by intellectual distinction, emotional nobility, and purposeful creative destiny. By harmonizing your sharp analytical mind with your profound intuitive empathy, you command both inner peace and worldly achievement.',
      disclaimer: 'Palmistry is a traditional symbolic and interpretive art designed for personal self-reflection, mindfulness, and philosophical contemplation. It is not a scientifically validated system of deterministic future prediction or medical diagnosis.'
    }
  },
  {
    id: 'sample-2',
    title: 'Dynamic Leader & Pioneer',
    subtitle: 'Straight Head Line, strong Mars mount, continuous Fate Line to Saturn',
    handType: 'left',
    report: {
      id: 'sample-2-report',
      timestamp: Date.now() - 7200000,
      imageUrl: 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&w=800&q=80',
      handType: 'left',
      imageQuality: {
        isClear: true,
        clarityScore: 91,
        message: 'Crisp capture highlighting innate constitutional lines of the passive left hand.'
      },
      orientation: {
        hand: 'left',
        palmType: 'Fire',
        palmTypeDescription: 'Long palm with shorter fingers, high internal furnace of motivation, passionate action, courage, and charismatic influence.',
        fingerObservations: 'Firm, stout thumb showing decisive willpower; robust knuckles indicating practical problem-solving capability.'
      },
      overallAnalysis: 'The innate left hand reveals ancestral fortitude, innate executive authority, and an unquenchable drive to overcome adversity with courageous directness.',
      mounts: [
        {
          name: 'Mount of Mars (Positive)',
          planet: 'Mars',
          prominence: 'high/prominent',
          interpretation: 'Remarkable moral courage, boldness in speaking truth, and unyielding defense of underdogs.'
        },
        {
          name: 'Mount of Jupiter',
          planet: 'Jupiter',
          prominence: 'high/prominent',
          interpretation: 'Commanding executive aura, ambition for large-scale enterprise, and generosity toward loyal allies.'
        },
        {
          name: 'Mount of Venus',
          planet: 'Venus',
          prominence: 'well-developed',
          interpretation: 'Robust physical endurance, passionate loyalties, and protective warmth.'
        },
        {
          name: 'Mount of Saturn',
          planet: 'Saturn',
          prominence: 'well-developed',
          interpretation: 'Respect for tradition, self-reliance, and capacity to shoulder heavy burdens without complaint.'
        },
        {
          name: 'Mount of Luna',
          planet: 'Moon',
          prominence: 'well-developed',
          interpretation: 'Instinctive street-smarts and strategic tactical imagination.'
        },
        {
          name: 'Mount of Mercury',
          planet: 'Mercury',
          prominence: 'well-developed',
          interpretation: 'Decisive, punchy deal-making and decisive action.'
        }
      ],
      lines: [
        {
          id: 'heart-line',
          name: 'Heart Line',
          location: 'Runs directly into the Mount of Jupiter with a clean terminal arc.',
          visualDescription: 'Deep, direct furrow extending firmly beneath the index digit.',
          shapeStructure: 'Direct, focused and resolute',
          lengthDepth: 'Deeply etched',
          specialMarkings: ['Clean upward rise into Jupiter mount'],
          traditionalMeaning: 'Traditional marker of fierce loyalty, protective chivalry, and idealistic passion in relationships.',
          personalityInterpretation: 'You express love through acts of service, protective shelter, and unshakeable loyalty.',
          relationshipInterpretation: 'Seeks an independent partner who possesses their own passionate life purpose.',
          symbolicFutureThemes: 'Deepening partnership grounded in shared challenges conquered together.',
          positiveAspects: ['Unwavering loyalty', 'Protective strength', 'Honesty in affection'],
          challengesAndCautions: ['Avoid impatience when others express emotions more hesitantly.'],
          confidence: 94,
          svgPathKey: 'heart'
        },
        {
          id: 'head-line',
          name: 'Head Line',
          location: 'Crosses the palm in a clean, straight, horizontal trajectory into upper Mars.',
          visualDescription: 'Razor-sharp straight line traversing directly across the upper palm.',
          shapeStructure: 'Straight, disciplined and clear',
          lengthDepth: 'Extremely well-defined',
          specialMarkings: ['Sharp terminal point with zero erratic islands'],
          traditionalMeaning: 'Symbolizes pragmatism, analytical precision, swift decision-making, and unflinching realism.',
          personalityInterpretation: 'Objective thinker who cuts through superfluous noise to identify the core facts quickly.',
          careerInterpretation: 'Mastery in operations, legal analysis, civil engineering, and corporate leadership.',
          symbolicFutureThemes: 'Executing complex administrative or business restructuring with decisive triumph.',
          positiveAspects: ['Rational clarity', 'Decisiveness', 'Unflappable under pressure'],
          challengesAndCautions: ['Remember to factor emotional subtleties into organizational decisions.'],
          confidence: 97,
          svgPathKey: 'head'
        },
        {
          id: 'life-line',
          name: 'Life Line',
          location: 'Broad, muscular arc carving deep around the thumb base.',
          visualDescription: 'Vigorous, unyielding furrow outlining the entire Mount of Venus.',
          shapeStructure: 'Deep, broad and full-bodied',
          lengthDepth: 'Deeply engraved and uninterrupted',
          specialMarkings: ['Upward ascending vitality rays'],
          traditionalMeaning: 'Traditional palmistry signifies robust constitutional vigor, iron willpower, and immense recuperative capacity.',
          personalityInterpretation: 'Boundless stamina, high resilience against burnout, and natural athletic instinct.',
          careerInterpretation: 'Thrives in demanding, high-stakes environments that require long hours and rapid turnarounds.',
          symbolicFutureThemes: 'Expansion of personal enterprise and vibrant outdoor vitality.',
          positiveAspects: ['Iron stamina', 'Unrelenting resilience', 'Infectious dynamism'],
          challengesAndCautions: ['Ensure rest breaks to prevent long-term joint or physical fatigue.'],
          confidence: 96,
          svgPathKey: 'life'
        },
        {
          id: 'fate-line',
          name: 'Fate Line',
          location: 'Rises steadfastly from the wrist straight to Saturn’s threshold.',
          visualDescription: 'Resolute, unbroken vertical pillar like a mast across the palm.',
          shapeStructure: 'Pillar-straight and continuous',
          lengthDepth: 'Exceptional continuity',
          specialMarkings: ['Straight unbroken track through the plain of Mars'],
          traditionalMeaning: 'The classic hallmark of the self-determining pioneer who sculpts circumstances to their will.',
          personalityInterpretation: 'Unshakable personal agency, holding oneself accountable to the highest personal standards of excellence.',
          careerInterpretation: 'Natural-born founder, commander, or chief executive officer.',
          symbolicFutureThemes: 'Attaining executive authority and guiding large-scale initiatives to triumphant completion.',
          positiveAspects: ['Self-discipline', 'Commanding authority', 'Relentless execution'],
          challengesAndCautions: ['Cultivate room for spontaneous play outside of scheduled agendas.'],
          confidence: 95,
          svgPathKey: 'fate'
        },
        {
          id: 'sun-line',
          name: 'Sun Line',
          location: 'Rises firmly beneath the ring finger.',
          visualDescription: 'Strong vertical ray illuminating the upper Apollo mount.',
          shapeStructure: 'Straight, crisp',
          lengthDepth: 'Medium length, sharp definition',
          specialMarkings: ['Branch connecting toward the Fate line'],
          traditionalMeaning: 'Symbolizes well-earned public esteem and enduring professional reputation.',
          personalityInterpretation: 'Commands respect naturally without needing to demand it loudly.',
          symbolicFutureThemes: 'Formal recognition or industry leadership award.',
          positiveAspects: ['Authority', 'Trustworthiness', 'Pioneering reputation'],
          challengesAndCautions: ['Do not let external accolades distract from internal peace.'],
          confidence: 90,
          svgPathKey: 'sun'
        },
        {
          id: 'mercury-line',
          name: 'Mercury Line',
          location: 'Slanted line targeting the base of the little finger.',
          visualDescription: 'Clear, direct and sharp trajectory.',
          shapeStructure: 'Direct diagonal',
          lengthDepth: 'Well-etched',
          specialMarkings: ['Clear summit beneath the pinky'],
          traditionalMeaning: 'Symbolizes executive communication, crisp negotiations, and strategic resource allocation.',
          personalityInterpretation: 'Says what is needed with minimum wasted words; commands negotiations.',
          symbolicFutureThemes: 'Signing landmark enterprise contracts.',
          positiveAspects: ['Clarity', 'Decisive speech', 'Financial acumen'],
          challengesAndCautions: ['Ensure diplomacy balances brevity.'],
          confidence: 89,
          svgPathKey: 'mercury'
        },
        {
          id: 'marriage-lines',
          name: 'Marriage & Relationship Lines',
          location: 'Percussion edge beneath the little finger.',
          visualDescription: 'One single deep, resolute horizontal line.',
          shapeStructure: 'Deep, singular, unwavering',
          lengthDepth: 'Deeply grooved',
          specialMarkings: ['Straight and clear without feathering'],
          traditionalMeaning: 'Singular, intense soulmate bond of profound fidelity and mutual endurance.',
          personalityInterpretation: 'Deeply devoted, protective, and resolute in relational loyalty; values quiet depth over superficial flirtation.',
          relationshipInterpretation: 'Values lifelong fidelity; loyal to the core once trust is earned.',
          symbolicFutureThemes: 'Deepening partnership stability and solidifying family legacy.',
          positiveAspects: ['Rock-solid loyalty', 'Devotion to family protection'],
          challengesAndCautions: ['Allow vulnerability alongside protective strength.'],
          confidence: 92,
          svgPathKey: 'marriage'
        },
        {
          id: 'health-line',
          name: 'Health Line (Traditional Vitality Symbol)',
          location: 'Hypothenar eminence.',
          visualDescription: 'Barely perceptible, which traditional palmistry considers optimal.',
          shapeStructure: 'Subtle and clear',
          lengthDepth: 'Faint',
          specialMarkings: ['Uninterrupted field'],
          traditionalMeaning: 'Traditional symbolic reading denotes robust equilibrium and natural vitality (not medical advice).',
          personalityInterpretation: 'Thrives when engaging in physical challenges and rigorous outdoor pursuits.',
          symbolicFutureThemes: 'Peak athletic stamina and sustained physical energy.',
          positiveAspects: ['Constitutional power', 'Rapid recuperation'],
          challengesAndCautions: ['Respect rest days after heavy physical labor.'],
          confidence: 86,
          svgPathKey: 'health'
        },
        {
          id: 'travel-lines',
          name: 'Travel Lines',
          location: 'Mount of Luna edge.',
          visualDescription: 'Bold horizontal strokes extending into the palm.',
          shapeStructure: 'Crisp horizontal dashes',
          lengthDepth: 'Short but decisive',
          specialMarkings: ['Direct horizontal orientation'],
          traditionalMeaning: 'Symbolizes purpose-driven travel: trade missions, diplomatic expeditions, and strategic ventures.',
          personalityInterpretation: 'Travels with a purpose; loves exploring new markets and forging regional alliances.',
          symbolicFutureThemes: 'High-impact business expeditions across borders.',
          positiveAspects: ['Resourcefulness in foreign markets', 'Adventurous courage'],
          challengesAndCautions: ['Keep in close touch with home during extended travel.'],
          confidence: 88,
          svgPathKey: 'travel'
        },
        {
          id: 'intuition-line',
          name: 'Intuition Line',
          location: 'Luna mount edge.',
          visualDescription: 'Short distinct arc connecting to gut instincts.',
          shapeStructure: 'Firm crescent',
          lengthDepth: 'Medium',
          specialMarkings: ['Connects with plain of Mars'],
          traditionalMeaning: 'Tactical instincts—the soldier or trader intuition that senses market movements or opponent tactics.',
          personalityInterpretation: 'Sharp instant assessments of people and situations that prove remarkably accurate.',
          symbolicFutureThemes: 'Trusting immediate instincts in high-stakes negotiations.',
          positiveAspects: ['Tactical awareness', 'Instant situational appraisal'],
          challengesAndCautions: ['Verify instincts with objective facts when managing high capital.'],
          confidence: 85,
          svgPathKey: 'intuition'
        },
        {
          id: 'bracelet-lines',
          name: 'Bracelet / Rascette Lines',
          location: 'Base of wrist.',
          visualDescription: 'Three heavy, chain-free rascettes like iron bands.',
          shapeStructure: 'Firm, dense parallel lines',
          lengthDepth: 'Deeply etched',
          specialMarkings: ['Upper rascette completely straight and unbroken'],
          traditionalMeaning: 'Traditional symbol of solid foundation, prosperity through labor, and generational endurance.',
          personalityInterpretation: 'Endowed with the capability to build lasting physical and organizational structures.',
          symbolicFutureThemes: 'Building generational assets and creating enduring employment for others.',
          positiveAspects: ['Generational builder', 'Structural endurance'],
          challengesAndCautions: ['Take time to enjoy the fruits of your labor with loved ones.'],
          confidence: 94,
          svgPathKey: 'bracelet'
        }
      ],
      futureReading: {
        timeline: {
          next3Months: 'Strategic alignment of resources. Resolving operational bottlenecks and assembling key personnel.',
          next6Months: 'Direct expansion. Launching a venture or taking over a crucial mandate that commands respect in your industry.',
          next12Months: 'Consolidation of market leadership. Reaping rewards of disciplined execution and solidifying financial buffers.',
          next3Years: 'Building an enterprise or foundation that outlives any single project; establishing an enduring legacy.',
          longTermDirection: 'Respected elder statesman and industrial builder whose guidance shapes the next generation.'
        },
        themes: {
          loveAndRelationships: 'Fierce loyalty and protective devotion; building a serene fortress of love away from worldly battles.',
          marriageAndPartnerships: 'Unshakeable covenant with an equal companion who shares your hunger for excellence.',
          careerAndProfessional: 'Executive leadership, commanding respect through direct action and moral courage.',
          moneyAndFinancial: 'Substantial asset accumulation in hard assets, productive land, and enterprise equity.',
          businessOpportunities: 'Pioneering entry into emerging sectors where bold first-movers dominate.',
          educationAndLearning: 'Hands-on experiential mastery, leadership psychology, and strategic economics.',
          personalGrowth: 'Learning to blend iron discipline with compassionate forgiveness of human fallibility.',
          travelAndRelocation: 'Expeditions that combine commerce, trade, and cultural discovery.',
          familyAndSocial: 'The protective pillar of the family upon whom everyone relies in turbulent weather.',
          importantTransitions: 'Ascending to top-tier leadership without sacrificing core ethical principles.'
        }
      },
      loveAndMarriage: {
        summary: 'Your love is grounded in deeds rather than empty words. You protect, provide, and champion your partner with resolute chivalry.',
        attachmentStyle: 'Secure, loyal, and protective',
        idealPartnerQualities: 'Emotionally mature, confident, self-sufficient, loyal, and appreciative of frank honesty.',
        relationshipMilestones: 'A lasting, enduring marriage that withstands the tests of time and triumphs over obstacles.'
      },
      careerAndMoney: {
        summary: 'Born for executive stewardship. You thrive when given full authority and accountability over mission-critical outcomes.',
        wealthTendencies: 'Aggressive yet calculated wealth generation; favors tangible assets and businesses with solid cash flows.',
        optimalCareerPaths: ['Founder / CEO', 'Operations Director', 'Venture Capitalist', 'Civil Engineer / Developer', 'Civic Leader'],
        businessInstinct: 'Exceptional tactical courage; moves when others hesitate.',
        financialDiscipline: 'Prudent cash-flow management; leaves nothing to random chance.'
      },
      personalityProfile: {
        archetype: 'The Sovereign Commander',
        coreStrengths: ['Courageous leadership', 'Decisive execution', 'Unflinching loyalty', 'High stamina'],
        shadowTraitsOrChallenges: ['Impatience with hesitation or ambiguity', 'Can be perceived as intimidatingly direct'],
        intuitionLevel: 'High Tactical Instincts (sharp Mount of Mars and straight Head Line)',
        lifePhilosophy: 'Destiny favors those who dare to build.'
      },
      finalSummary: 'A powerhouse palm embodying constitutional vigor, iron willpower, and natural authority. Your destiny is carved with your own hands, leading to enduring respect and generational prosperity.',
      disclaimer: 'Palmistry is a traditional symbolic and interpretive art designed for personal self-reflection, mindfulness, and philosophical contemplation. It is not a scientifically validated system of deterministic future prediction or medical diagnosis.'
    }
  }
];
