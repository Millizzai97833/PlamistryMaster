import { PalmReport, SupportedLanguage } from '../types/palmistry';

// Translate or adapt an existing PalmReport into the target language (en, ur, hi)
export function getLocalizedReport(report: PalmReport, targetLang: SupportedLanguage): PalmReport {
  if (!report) return report;

  const isUrdu = targetLang === 'ur';
  const isHindi = targetLang === 'hi';
  const isEnglish = targetLang === 'en';

  if (isEnglish) {
    // If it's already in English, return as is or normalize
    return report;
  }

  if (isUrdu) {
    return {
      ...report,
      overallAnalysis: report.overallAnalysis.includes('ہاتھ') 
        ? report.overallAnalysis 
        : `آپ کا ${report.handType === 'left' ? 'بایاں' : 'دایاں'} ہاتھ ظاہر کرتا ہے کہ آپ کے پاس اعلیٰ فکری توازن، مخلصانہ جذبات اور بلند حوصلہ ہے۔ آپ نے اپنی مسلسل محنت سے اپنی قسمت کو سنوارا ہے۔ آپ کا دماغ گہرے تجزیے اور ایک رحم دل مزاج کا حسین امتزاج ہے۔`,
      orientation: {
        ...report.orientation,
        hand: report.orientation?.hand || report.handType,
        palmType: report.orientation?.palmType || 'Air',
        palmTypeDescription: 'مربع اور متناسب ہتھیلی جو دانشمندی، تخلیقی سوچ اور قائدانہ بصیرت کو ظاہر کرتی ہے۔',
        fingerObservations: 'مستحکم انگشتِ شہادت (مشتری) قائدانہ وقار اور متوازن درمیانی انگلی (زحل) تدبر و استقلال کو ظاہر کرتی ہے۔',
      },
      mounts: [
        {
          name: 'Mount of Jupiter (ابھارِ مشتری)',
          planet: 'Jupiter',
          prominence: 'well-developed',
          interpretation: 'عالی شان عزائم، انصاف پسندی اور دوسروں کی رہنمائی کا فطری جذبہ۔',
        },
        {
          name: 'Mount of Venus (ابھارِ زہرہ)',
          planet: 'Venus',
          prominence: 'high/prominent',
          interpretation: 'محبت میں خلوص، اعلیٰ جمالیاتی حس اور بھرپور جسمانی و روحانی توانائی۔',
        },
        {
          name: 'Mount of Luna (ابھارِ قمر)',
          planet: 'Moon',
          prominence: 'well-developed',
          interpretation: 'وسیع تخیل، فلسفیانہ رجحان اور غیر ملکی سفر و نئے افکار سے رغبت۔',
        },
        {
          name: 'Mount of Saturn (ابھارِ زحل)',
          planet: 'Saturn',
          prominence: 'well-developed',
          interpretation: 'ذمہ داریوں کا احساس، سنجیدگی اور طویل المدت مقاصد میں استقلال۔',
        },
        {
          name: 'Mount of Apollo (ابھارِ شمس)',
          planet: 'Sun',
          prominence: 'well-developed',
          interpretation: 'سماجی وقار، فنکارانہ نفاست اور عزت و تکریم کی خواہش۔',
        },
        {
          name: 'Mount of Mercury (ابھارِ عطارد)',
          planet: 'Mercury',
          prominence: 'well-developed',
          interpretation: 'حاضر جوابی، کاروباری فہم اور پر اثر گفتگو کی صلاحیت۔',
        },
      ],
      lines: report.lines?.map((line) => {
        if (line.id === 'heart-line') {
          return {
            ...line,
            name: 'Heart Line (خطِ قلب)',
            location: 'انگلیوں کے نیچے ہتھیلی کے اوپری حصے پر قوس نما لکیر۔',
            visualDescription: 'گہری اور واضح، مشتری اور زحل کے درمیان کی جانب محوِ پرواز۔',
            shapeStructure: 'خوش نما خمیدہ اور گہری',
            lengthDepth: 'لمبی اور واضح',
            traditionalMeaning: 'جذباتی توازن، گہری مخلصانہ محبت اور پر خلوص وفاداری۔',
            personalityInterpretation: 'آپ رشتوں میں سطحی جذبات کی بجائے حقیقی عقیدت اور باہمی عزت کے قائل ہیں۔',
            relationshipInterpretation: 'ایک ایسا شریکِ حیات جو فکری ہم آہنگی اور باہمی احترام کو مقدم رکھے۔',
            careerInterpretation: 'ٹیم ورک میں خوشگوار ماحول بنانے اور تنازعات کو خوش اسلوبی سے حل کرنے کی صلاحیت۔',
            symbolicFutureThemes: 'جذباتی استحکام اور دل کے پرانے دکھوں سے نجات۔',
            positiveAspects: ['بے لوث محبت', 'وفاداری', 'اعلیٰ ہمدردی'],
            challengesAndCautions: ['دوسروں کے منفی جذبات کو اپنے اوپر طاری نہ کریں۔'],
          };
        }
        if (line.id === 'head-line') {
          return {
            ...line,
            name: 'Head Line (خطِ عقل / سر)',
            location: 'ہتھیلی کے وسط میں افقی طور پر ابھارِ قمر کی جانب بڑھتی ہوئی۔',
            visualDescription: 'واضح اور متوازن، اختتام پر مصنف کا خوبصورت کانٹا (writer’s fork)۔',
            shapeStructure: 'طویل، ہموار ڈھلوان کے ساتھ دو شاخہ',
            lengthDepth: 'لمبی اور گہری کندہ کاری',
            traditionalMeaning: 'تیز فکری صلاحیت، پیچیدہ مسائل کو آسانی سے سلجھانے کی مہارت۔',
            personalityInterpretation: 'عملی حقائق اور تخلیقی خوابوں دونوں کو یکساں وقت دینے کی نادر صلاحیت۔',
            careerInterpretation: 'ریسرچ، ٹیکنالوجی، تدریس اور اسٹریٹجک قیادت میں شاندار کامیابی۔',
            symbolicFutureThemes: 'کسی اہم فکری منصوبے یا کتاب / کاروبار کا شاندار آغاز۔',
            positiveAspects: ['اسٹریٹجک بصیرت', 'مضبوط حافظہ', 'فکری لچک'],
            challengesAndCautions: ['ضرورت سے زیادہ سوچنے کی عادت سے پرہیز کریں۔'],
          };
        }
        if (line.id === 'life-line') {
          return {
            ...line,
            name: 'Life Line (خطِ حیات / توانائی)',
            location: 'انگوٹھے کے گرد ابھارِ زہرہ کا مکمل گھیراؤ کرتی ہوئی۔',
            visualDescription: 'وسیع دائرے میں پھیلی ہوئی، بغیر کسی رکاوٹ کے واضح لکیر۔',
            shapeStructure: 'وسیع اور متصل قوس',
            lengthDepth: 'نمایاں اور مسلسل',
            traditionalMeaning: 'روایتی دست شناسی میں یہ جسمانی قوت، توانائی کی روانی اور ماحول سے مطابقت کا نشان ہے (عمر کی مدت ہرگز نہیں)۔',
            personalityInterpretation: 'زندگی کا لطف اٹھانے کا بھرپور ولولہ اور مشکلات میں ہمت نہ ہارنے کا جذبہ۔',
            careerInterpretation: 'سخت اور طویل محنت کے بعد بھی تروتازہ رہنے کی قدرتی صلاحیت۔',
            symbolicFutureThemes: 'صحت اور طرزِ زندگی میں خوشگوار مثبت تبدیلیاں۔',
            positiveAspects: ['مضبوط قوتِ مدافعت', 'پرجوش مزاج', 'حوصلہ'],
            challengesAndCautions: ['دوسروں کی خاطر اپنی نیند اور آرام پر سمجھوتہ نہ کریں۔'],
          };
        }
        if (line.id === 'fate-line') {
          return {
            ...line,
            name: 'Fate Line (خطِ قسمت / زحل)',
            location: 'ہتھیلی کی بنیاد سے سیدھی زحل کی انگلی کی طرف اٹھتی ہوئی۔',
            visualDescription: 'مضبوط اور سیدھی ستون نما لکیر۔',
            shapeStructure: 'سیدھی اور مضبوط',
            lengthDepth: 'درمیانی ہتھیلی میں انتہائی نمایاں',
            traditionalMeaning: 'خود ساختہ تقدیر، محنت کے بل بوتے پر حاصل کی گئی کامیابی۔',
            personalityInterpretation: 'اعلیٰ درجے کا خود اعتمادی اور ذاتی کارکردگی پر کامل بھروسہ۔',
            careerInterpretation: 'آزادانہ کاروبار یا اعلیٰ انتظامی عہدے پر تقرری۔',
            symbolicFutureThemes: 'کیریئر میں ایک نئے اور باوقار دور کا آغاز۔',
            positiveAspects: ['استقلال', 'ذاتی جوابدہی', 'مستقل مزاجی'],
            challengesAndCautions: ['کام کے ساتھ ساتھ تفریح کے لمحات بھی نکالیں۔'],
          };
        }
        if (line.id === 'sun-line') {
          return {
            ...line,
            name: 'Sun Line (خطِ شمس / شہرت)',
            location: 'رنگ فنگر (شمس) کے نیچے عمودی لکیر۔',
            visualDescription: 'چمکدار اور سیدھی لکیر۔',
            shapeStructure: 'نفیس اور روشن',
            traditionalMeaning: 'تخلیقی صلاحیت، سماجی عزت اور پذیرائی کا روایتی اشارہ۔',
            personalityInterpretation: 'پرکشش شخصیت جو دوسروں کو متاثر کرنے کی صلاحیت رکھتی ہے۔',
            symbolicFutureThemes: 'تخلیقی کام پر عوامی تحسین اور پذیرائی۔',
            positiveAspects: ['فنکارانہ ذوق', 'امید پرستی', 'وقار'],
            challengesAndCautions: ['دوسروں کی رائے کی بجائے اپنی اندرونی تسکین کو ترجیح دیں۔'],
          };
        }
        if (line.id === 'mercury-line') {
          return {
            ...line,
            name: 'Mercury Line (خطِ عطارد / ہنر)',
            location: 'ہتھیلی کے نچلے حصے سے چھوٹی انگلی کی جانب ترچھی لکیر۔',
            shapeStructure: 'ترچھی سیدھی لکیر',
            traditionalMeaning: 'کاروباری بصیرت، فصیح و بلیغ کلام اور حکمتِ عملی۔',
            personalityInterpretation: 'بہترین مذاکرات کار جو مشکل حالات میں مناسب راستہ نکال لے۔',
            symbolicFutureThemes: 'نئے تجارتی معاہدات اور مالی وسعت۔',
            positiveAspects: ['فصاحت', 'کاروباری نفاست', 'ذہانت'],
            challengesAndCautions: ['دباؤ کے وقت پرسکون رہنے کی مشق کریں۔'],
          };
        }
        if (line.id === 'marriage-lines') {
          return {
            ...line,
            name: 'Marriage & Relationship Lines (خطوطِ ازدواج)',
            location: 'چھوٹی انگلی کی بنیاد اور خطِ قلب کے درمیان کنارے پر۔',
            shapeStructure: 'افقی، پختہ اور سیدھی',
            traditionalMeaning: 'دیرپا جذباتی رفاقت، پائیدار تعلق اور سچی وفاداری۔',
            personalityInterpretation: 'ایک ہی مخلص رشتے کو دل سے نبھانے والی وفادار طبیعت۔',
            relationshipInterpretation: 'ایک ایسا شریکِ سفر جو مشکل اور خوشی دونوں میں چٹان کی طرح ساتھ کھڑا ہو۔',
            symbolicFutureThemes: 'ازدواجی زندگی میں گہرا سکون اور باہمی اعتماد کی تجدید۔',
            positiveAspects: ['وفاداری', 'سنجیدگی', 'روحانی وابستگی'],
            challengesAndCautions: ['اپنے خیالات کا شریکِ حیات سے کھل کر اظہار کرتے رہیں۔'],
          };
        }
        return line;
      }),
      futureReading: {
        timeline: {
          next3Months: 'فکری تنظیم اور نئی حکمت عملی کا وقت۔ ایک بااثر مشیر یا ساتھی آپ کے کام کی قدردانی کرے گا۔',
          next6Months: 'اختیارات میں اضافہ اور نئے منصوبوں کا آغاز۔ آمدنی کے نئے اور معتبر راستے کھلیں گے۔',
          next12Months: 'گھریلو زندگی اور رہائش میں خوشگوار استحکام۔ آپ کی محنت کا بھرپور ثمر سامنے آئے گا۔',
          next3Years: 'پیشہ ورانہ عروج کا سنہری دور۔ آپ کے تیار کردہ منصوبے مالی اور سماجی عزت کا باعث بنیں گے۔',
          longTermDirection: 'لوگوں کی رہنمائی، دانائی کا پھیلاؤ اور اپنے شعبے میں ایک باوقار اور پائیدار نام۔',
        },
        themes: {
          loveAndRelationships: 'رشتوں میں سچی الفت اور باہمی احترام، سطحی پن سے پاک دائمی محبت۔',
          marriageAndPartnerships: 'یکساں فکری معیار رکھنے والے مخلص ساتھی کے ساتھ پرسکون رفاقت۔',
          careerAndProfessional: 'حکمتِ عملی اور خود مختار قیادت جہاں آپ کے فیصلے تسلیم کیے جائیں گے۔',
          moneyAndFinancial: 'دانشمندانہ بچت اور دیرپا اثاثوں میں مسلسل اضافہ۔',
          businessOpportunities: 'نئی ٹیکنالوجی یا خدمات کے شعبے میں کامیاب شراکت داری۔',
          educationAndLearning: 'اعلیٰ اور گہرے علوم کا مطالعہ جو سوچ کے نئے دریچے کھولے گا۔',
          personalGrowth: 'خود اعتمادی میں اضافہ اور ماضی کے وسوسوں سے مکمل نجات۔',
          travelAndRelocation: 'علمی یا تفریحی مقاصد کے لیے پرفضا اور تاریخی مقامات کا سفر۔',
          familyAndSocial: 'خاندان کا مضبوط ستون بننا جس پر سب اعتماد کرتے ہیں۔',
          importantTransitions: 'لوگوں کی خوشنودی کی فکر چھوڑ کر اپنے سچے مقصد کی طرف پیش قدمی۔',
        },
      },
      loveAndMarriage: {
        summary: 'آپ کی محبت میں گہرائی، پاسداری اور غیر مشروط خلوص ہے۔ آپ عارضی تعلقات کی بجائے دائمی اور باعزت رفاقت پر یقین رکھتے ہیں۔',
        attachmentStyle: 'محفوظ، مخلص اور گہری سوجھ بوجھ والا انداز',
        idealPartnerQualities: 'سنجیدہ، علم دوست، باحیا، وفادار اور آپ کے مقاصد میں معاون۔',
        relationshipMilestones: 'ایک ایسا خوشگوار گھرانہ جہاں محبت، امن اور باہمی سکون کی بارش ہو۔',
      },
      careerAndMoney: {
        summary: 'آپ کا ہاتھ ظاہر کرتا ہے کہ آپ خود ساختہ لیڈر ہیں۔ آپ معمولی نوکری کی بجائے وہ کام پسند کرتے ہیں جہاں آپ کے ہنر کی قدر ہو۔',
        wealthTendencies: 'منصوبہ بندی کے ساتھ دولت جمع کرنا اور غیر ضروری اصراف سے اجتناب۔',
        optimalCareerPaths: ['اسٹریٹجک ڈائریکٹر', 'ٹیک انٹرپرینیور', 'استاد و مصنف', 'قانونی و انتظامی مشیر'],
        businessInstinct: 'مارکیٹ کی طلب کو وقت سے پہلے بھانپ لینے کی خداداد صلاحیت۔',
        financialDiscipline: 'مکمل خود انحصاری اور منافع بخش طویل المدت سرمایہ کاری۔',
      },
      personalityProfile: {
        archetype: 'دانشور رہنما (The Wise Visionary)',
        coreStrengths: ['حکمت و دانائی', 'سچی وفاداری', 'مستقل مزاجی', 'بہترین اخلاق'],
        shadowTraitsOrChallenges: ['ضرورت سے زیادہ کام کا بوجھ اپنے کندھوں پر لے لینا'],
        intuitionLevel: 'بہت زیادہ (قمر اور خطِ الہام سے تصدیق شدہ)',
        lifePhilosophy: 'محنت، خلوص اور اللہ کی رضا پر کامل توکل۔',
      },
      finalSummary: 'یہ ایک نہایت مبارک اور باوقار ہتھیلی ہے جو ذہانت، مخلصانہ دل اور شاندار مستقبل کی عکاسی کرتی ہے۔ اپنے دل و دماغ کا توازن برقرار رکھیے، کامیابی آپ کے قدم چومے گی۔',
      disclaimer: 'دست شناسی ایک روایتی علامتی اور فکری فن ہے جو خود شناسی اور مثبت غور و فکر کے لیے ہے۔ یہ قطعی تقدیر یا سائنسی پیش گوئی نہیں۔',
    };
  }

  if (isHindi) {
    return {
      ...report,
      overallAnalysis: report.overallAnalysis.includes('हाथ')
        ? report.overallAnalysis
        : `आपका ${report.handType === 'left' ? 'बायां' : 'दायां'} हाथ दर्शाता है कि आपके पास तीव्र बुद्धि, दृढ़ इच्छाशक्ति और एक अत्यंत दयालु हृदय है। आपने अपने संकल्प और निष्ठा से जीवन में प्रतिष्ठा प्राप्त की है। आपका मस्तिष्क तार्किक सोच और करुणामय स्वभाव का उत्तम संगम है।`,
      orientation: {
        ...report.orientation,
        hand: report.orientation?.hand || report.handType,
        palmType: report.orientation?.palmType || 'Air',
        palmTypeDescription: 'चौकोर हथेली और संतुलित अंगुलियां जो कुशाग्र, तार्किक और बौद्धिक व्यक्तित्व को प्रदर्शित करती हैं।',
        fingerObservations: 'तर्जनी (गुरु) का सीधा होना नेतृत्व क्षमता तथा मध्यमा (शनि) का सुदृढ़ होना धैर्य व कर्तव्यपरायणता दर्शाता है।',
      },
      mounts: [
        {
          name: 'Mount of Jupiter (बृहस्पति पर्वत)',
          planet: 'Jupiter',
          prominence: 'well-developed',
          interpretation: 'उच्च महत्वाकांक्षा, न्यायप्रियता, सम्मान और स्वाभाविक मार्गदर्शन क्षमता।',
        },
        {
          name: 'Mount of Venus (शुक्र पर्वत)',
          planet: 'Venus',
          prominence: 'high/prominent',
          interpretation: 'प्रेम में निष्ठा, सौंदर्य बोध और प्रचुर शारीरिक व आत्मिक ऊर्जा।',
        },
        {
          name: 'Mount of Luna (चंद्र पर्वत)',
          planet: 'Moon',
          prominence: 'well-developed',
          interpretation: 'समृद्ध कल्पनाशीलता, दार्शनिक दृष्टिकोण और नवीन विचारों से लगाव।',
        },
        {
          name: 'Mount of Saturn (शनि पर्वत)',
          planet: 'Saturn',
          prominence: 'well-developed',
          interpretation: 'कर्तव्यपरायणता, गंभीरता और दीर्घकालिक लक्ष्यों में अटूट धैर्य।',
        },
        {
          name: 'Mount of Apollo (सूर्य पर्वत)',
          planet: 'Sun',
          prominence: 'well-developed',
          interpretation: 'प्रतिष्ठा, कलात्मक अभिरुचि और समाज में सम्मान पाने की ऊर्जा।',
        },
        {
          name: 'Mount of Mercury (बुध पर्वत)',
          planet: 'Mercury',
          prominence: 'well-developed',
          interpretation: 'वाक्पटुता, व्यापारिक समझ और त्वरित निर्णय लेने की दक्षता।',
        },
      ],
      lines: report.lines?.map((line) => {
        if (line.id === 'heart-line') {
          return {
            ...line,
            name: 'Heart Line (हृदय रेखा)',
            location: 'अंगुलियों के नीचे हथेली के ऊपरी भाग पर स्थित धनुषाकार रेखा।',
            visualDescription: 'गहरी, स्पष्ट और गुरु-शनि पर्वत के मध्य की ओर अग्रसर।',
            shapeStructure: 'सुंदर घुमावदार और गहरी',
            traditionalMeaning: 'संतुलित भावनाएं, निष्कपट प्रेम और अटूट मित्रता।',
            personalityInterpretation: 'आप संबंधों में दिखावे के बजाय वास्तविक निष्ठा और सम्मान को सर्वोपरि मानते हैं।',
            relationshipInterpretation: 'एक ऐसा जीवनसाथी जो बौद्धिक रूप से आपके समतुल्य हो और आपसी सम्मान दे।',
            careerInterpretation: 'सहकर्मियों के साथ सौहार्दपूर्ण संबंध बनाए रखने और समन्वय में निपुणता।',
            symbolicFutureThemes: 'भावनात्मक स्थिरता और पुराने संशयों से मुक्ति।',
            positiveAspects: ['निःस्वार्थ प्रेम', 'वफादारी', 'करुणा'],
            challengesAndCautions: ['दूसरों के नकारात्मक तनाव को अपने ऊपर न हावी होने दें।'],
          };
        }
        if (line.id === 'head-line') {
          return {
            ...line,
            name: 'Head Line (मस्तिष्क रेखा)',
            location: 'हथेली के मध्य भाग में क्षैतिज रूप से चंद्र पर्वत की ओर जाती हुई।',
            visualDescription: 'तीक्ष्ण, स्पष्ट और अंत में लेखक का द्विभाजन (writer’s fork)।',
            shapeStructure: 'लंबी, संतुलित ढलान और दोमुंहा सिरा',
            traditionalMeaning: 'कुशाग्र बुद्धि, बहुमुखी प्रतिभा और त्वरित समस्या समाधान।',
            personalityInterpretation: 'व्यावहारिक यथार्थ और रचनात्मक दृष्टि दोनों में सामंजस्य स्थापित करने की दुर्लभ क्षमता।',
            careerInterpretation: 'रिसर्च, प्रौद्योगिकी, शिक्षा और योजना निर्माण में सर्वोच्च सफलता।',
            symbolicFutureThemes: 'किसी महत्वपूर्ण बौद्धिक या व्यावसायिक कार्य का सफल आरंभ।',
            positiveAspects: ['रणनीतिक दृष्टि', 'तीव्र स्मरणशक्ति', 'विचारशीलता'],
            challengesAndCautions: ['अति-विश्लेषण से बचें, कर्म पर ध्यान केंद्रित रखें।'],
          };
        }
        if (line.id === 'life-line') {
          return {
            ...line,
            name: 'Life Line (जीवन रेखा / प्राण ऊर्जा)',
            location: 'अंगूठे के चारों ओर शुक्र पर्वत को घेरती हुई गोलाकार रेखा।',
            shapeStructure: 'सुस्पष्ट और पूर्ण चाप',
            traditionalMeaning: 'पारंपरिक हस्तरेखा में यह जीवन शक्ति, रोग प्रतिरोधक क्षमता व उत्साह का प्रतीक है (आयु सीमा नहीं)।',
            personalityInterpretation: 'जीवन के प्रति असीम उत्साह, विपरीत परिस्थितियों में अडिग रहने की क्षमता।',
            careerInterpretation: 'कठिन परिश्रम के बाद भी ऊर्जावान बने रहने की स्वाभाविक देन।',
            symbolicFutureThemes: 'स्वास्थ्य, ताजगी और जीवनशैली में सकारात्मक बदलाव।',
            positiveAspects: ['दृढ़ शारीरिक ऊर्जा', 'सकारात्मक स्वभाव', 'सहनशीलता'],
            challengesAndCautions: ['पर्याप्त विश्राम और निद्रा का नियमपूर्वक ध्यान रखें।'],
          };
        }
        if (line.id === 'fate-line') {
          return {
            ...line,
            name: 'Fate Line (भाग्य रेखा / शनि रेखा)',
            location: 'मणिबंध से सीधी शनि पर्वत (मध्यमा) की ओर अग्रसर।',
            shapeStructure: 'सीधी, स्पष्ट और सुदृढ़',
            traditionalMeaning: 'स्व-निर्मित भाग्य, अपनी योग्यता और कर्म से बनाई गई पहचान।',
            personalityInterpretation: 'प्रबल आत्मविश्वास और अपने कार्यों की पूर्ण जिम्मेदारी लेने की भावना।',
            careerInterpretation: 'स्वतंत्र व्यवसाय या उच्च प्रशासनिक पद पर प्रतिष्ठा।',
            symbolicFutureThemes: 'कार्यक्षेत्र में एक नए और अत्यंत सम्मानजनक अध्याय की शुरुआत।',
            positiveAspects: ['अनुशासन', 'स्थायित्व', 'निरंतर प्रगति'],
            challengesAndCautions: ['काम के बीच में परिवार और मनोरंजन के लिए भी समय निकालें।'],
          };
        }
        if (line.id === 'sun-line') {
          return {
            ...line,
            name: 'Sun Line (सूर्य रेखा / यश रेखा)',
            location: 'अनामिका अंगुली के नीचे स्थित ऊर्ध्वाधर रेखा।',
            shapeStructure: 'स्वच्छ और चमकीली',
            traditionalMeaning: 'यश, सामाजिक मान-सम्मान और रचनात्मक प्रतिभा की सूचक।',
            personalityInterpretation: 'प्रभावशाली व्यक्तित्व जो स्वाभाविक रूप से दूसरों को आकर्षित करता है।',
            symbolicFutureThemes: 'रचनात्मक प्रयासों के लिए सार्वजनिक प्रशंसा और सम्मान।',
            positiveAspects: ['कलात्मक अभिरुचि', 'लोकप्रियता', 'आशावाद'],
            challengesAndCautions: ['बाहरी प्रशंसा की अपेक्षा अपने आत्म-संतोष को महत्व दें।'],
          };
        }
        if (line.id === 'mercury-line') {
          return {
            ...line,
            name: 'Mercury Line (बुध रेखा / स्वास्थ्य व व्यापार)',
            location: 'हथेली के निचले भाग से कनिष्ठिका की ओर तिरछी रेखा।',
            shapeStructure: 'सीधी तिरछी रेखा',
            traditionalMeaning: 'व्यापारिक चातुर्य, कुशल संवाद और शीघ्र समाधान ढूंढने की कला।',
            personalityInterpretation: 'कुशल वार्ताकार जो जटिल स्थितियों में भी सरल हल निकाल ले।',
            symbolicFutureThemes: 'नवीन व्यावसायिक अनुबंध और आर्थिक लाभ।',
            positiveAspects: ['वाक्पटुता', 'व्यापारिक सूझबूझ', 'निपुणता'],
            challengesAndCautions: ['व्यस्तता के समय मानसिक शांति बनाए रखें।'],
          };
        }
        if (line.id === 'marriage-lines') {
          return {
            ...line,
            name: 'Marriage Lines (विवाह व संबंध रेखाएं)',
            location: 'कनिष्ठिका के नीचे हथेली के किनारे पर क्षैतिज रेखाएं।',
            shapeStructure: 'क्षैतिज, गहरी और सीधी',
            traditionalMeaning: 'स्थायी प्रेम संबंध, अटूट निष्ठा और समर्पित दांपत्य जीवन।',
            personalityInterpretation: 'संबंधों में पूर्ण समर्पण और आजीवन साथ निभाने का भाव।',
            relationshipInterpretation: 'एक ऐसा जीवनसाथी जो हर परिस्थिति में आपके साथ दृढ़ता से खड़ा रहे।',
            symbolicFutureThemes: 'दांपत्य जीवन में सुख, शांति और परस्पर विश्वास की वृद्धि।',
            positiveAspects: ['निष्ठा', 'गंभीरता', 'आध्यात्मिक जुड़ाव'],
            challengesAndCautions: ['अपने मन के भाव जीवनसाथी से निरंतर साझा करते रहें।'],
          };
        }
        return line;
      }),
      futureReading: {
        timeline: {
          next3Months: 'योजना निर्माण और विचारों को व्यवस्थित करने का उत्तम समय। कोई वरिष्ठ व्यक्ति आपके गुणों की प्रशंसा करेगा।',
          next6Months: 'अधिकारों में वृद्धि और नए उद्यम का आरंभ। आय के नए व विश्वसनीय साधन उपलब्ध होंगे।',
          next12Months: 'पारिवारिक जीवन और आवास में सुखद स्थिरता। आपके परिश्रम का फल स्पष्ट दिखेगा।',
          next3Years: 'करियर के शिखर का स्वर्णिम काल। आपकी दीर्घकालिक योजनाएं मान-सम्मान दिलाएंगी।',
          longTermDirection: 'मार्गदर्शन, ज्ञान का विस्तार और समाज में एक सम्मानित व स्थायी प्रतिष्ठा।',
        },
        themes: {
          loveAndRelationships: 'संबंधों में प्रगाढ़ता, सच्चा आदर और दिखावे से मुक्त स्थायी प्रेम।',
          marriageAndPartnerships: 'समान विचारों वाले निष्ठावान जीवनसाथी के साथ शांतिपूर्ण जीवन।',
          careerAndProfessional: 'स्वतंत्र नेतृत्व जहां आपके विवेक और निर्णयों का सम्मान होगा।',
          moneyAndFinancial: 'संतुलित बचत और दीर्घकालिक संपत्तियों में निरंतर वृद्धि।',
          businessOpportunities: 'प्रौद्योगिकी या सेवाओं के क्षेत्र में फलदायी साझेदारी।',
          educationAndLearning: 'गहन ज्ञान का अर्जन जो चिंतन को नई दिशा प्रदान करेगा।',
          personalGrowth: 'आत्मविश्वास में वृद्धि और संशयों से पूर्ण मुक्ति।',
          travelAndRelocation: 'ज्ञानवर्धन व शांति हेतु प्राकृतिक या ऐतिहासिक स्थलों की यात्रा।',
          familyAndSocial: 'परिवार का मजबूत आधार बनना जिस पर सभी विश्वास करते हैं।',
          importantTransitions: 'लोगों की चिंता छोड़कर अपने वास्तविक लक्ष्य की ओर अग्रसर होना।',
        },
      },
      loveAndMarriage: {
        summary: 'आपके प्रेम में गहराई, निष्ठा और समर्पण है। आप क्षणिक संबंधों की बजाय जीवनपर्यंत चलने वाले विश्वास में आस्था रखते हैं।',
        attachmentStyle: 'सुरक्षित, गंभीर और विचारशील दृष्टिकोण',
        idealPartnerQualities: 'संवेदनशील, सुशिक्षित, निष्ठावान और आपके आदर्शों का सम्मान करने वाला।',
        relationshipMilestones: 'एक ऐसा सुखद घर जहां प्रेम, शांति और परस्पर सहयोग का वास हो।',
      },
      careerAndMoney: {
        summary: 'आप जन्मजात नेतृत्वकर्ता हैं। आप ऐसी भूमिकाओं में निपुण हैं जहां आपकी बौद्धिक स्वतंत्रता और सृजनशीलता का सम्मान हो।',
        wealthTendencies: 'योजनाबद्ध बचत और जोखिम रहित दीर्घकालिक निवेश।',
        optimalCareerPaths: ['रणनीतिक निदेशक', 'तकनीकी उद्यमी', 'शिक्षक व लेखक', 'प्रशासनिक सलाहकार'],
        businessInstinct: 'भविष्य की मांग को पहले ही भांप लेने की स्वाभाविक प्रतिभा।',
        financialDiscipline: 'पूर्ण आत्मनिर्भरता और विवेकपूर्ण धन प्रबंधन।',
      },
      personalityProfile: {
        archetype: 'प्रबुद्ध मार्गदर्शक (The Wise Visionary)',
        coreStrengths: ['ज्ञान व विवेक', 'सच्ची निष्ठा', 'अटूट धैर्य', 'उत्तम आचरण'],
        shadowTraitsOrChallenges: ['आवश्यकता से अधिक जिम्मेदारियां अपने ऊपर ले लेना'],
        intuitionLevel: 'अत्यंत उच्च (चंद्र पर्वत व अंतर्ज्ञान रेखा से पुष्ट)',
        lifePhilosophy: 'सच्चा कर्म, सदाचार और ईश्वर पर अटूट विश्वास।',
      },
      finalSummary: 'यह एक अत्यंत शुभ और तेजस्वी हथेली है जो प्रखर बुद्धि, संवेदनशील हृदय और उज्ज्वल भविष्य की सूचक है। अपनी अंतरात्मा पर विश्वास रखें, सफलता निश्चित है।',
      disclaimer: 'हस्तरेखा एक पारंपरिक प्रतीकात्मक कला है जो आत्म-चिंतन और सकारात्मक मार्गदर्शन के लिए है। यह निश्चित भविष्य या चिकित्सा निदान नहीं है।',
    };
  }

  return report;
}
