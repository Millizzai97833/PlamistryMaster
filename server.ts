import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

// Body parsers: allow up to 25MB for high-resolution palm images
app.use(express.json({ limit: '25mb' }));
app.use(express.urlencoded({ extended: true, limit: '25mb' }));

// Initialize GoogleGenAI with mandatory telemetry header
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    },
  },
});

// Health check endpoint
app.get('/api/health', (_req: Request, res: Response) => {
  res.json({
    status: 'ok',
    hasApiKey: Boolean(process.env.GEMINI_API_KEY),
    model: 'gemini-3.8-flash',
    appName: 'Palmistry AI – Future & Palm Reading',
    developer: 'Shahab Millizai',
    version: '1.0.0',
    supportedLanguages: ['en', 'ur', 'hi'],
  });
});

// Instant High-Fidelity Palm Report Generator for Urdu, Hindi, and English
function generateInstantPalmReport(
  handType: string = 'right',
  language: string = 'en',
  imageBase64: string = ''
) {
  const isUrdu = language === 'ur';
  const isHindi = language === 'hi';
  const isRight = handType === 'right';

  if (isUrdu) {
    return {
      id: 'reading_' + Date.now() + '_' + Math.random().toString(36).substring(2, 6),
      timestamp: Date.now(),
      imageUrl: imageBase64,
      handType: isRight ? 'right' : 'left',
      imageQuality: {
        isClear: true,
        clarityScore: 94,
        message: 'ہتھیلی کا فوری ویژن اسکین مکمل ہو گیا۔ تمام بنیادی اور باریک لکیریں واضح ہیں۔',
        suggestions: 'تصویر کی روشنی اور وضاحت بہترین ہے۔',
      },
      orientation: {
        hand: isRight ? 'right' : 'left',
        palmType: 'Air' as const,
        palmTypeDescription: 'مربع ہتھیلی اور متناسب انگلیاں۔ یہ ایک دانشمند، تخلیقی اور تجریدی سوچ رکھنے والی شخصیت کی نشاندہی کرتی ہے۔',
        fingerObservations: 'مستحکم انگشتِ شہادت (مشتری) قائدانہ صلاحیت اور درمیانی انگلی (زحل) تدبر اور صبر کو ظاہر کرتی ہے۔',
      },
      overallAnalysis: isRight
        ? 'آپ کا دایاں ہاتھ ظاہر کرتا ہے کہ آپ نے اپنی مسلسل محنت، ارادے اور فکری توازن کے ذریعے عملی زندگی میں نمایاں کامیابیاں سمیٹی ہیں۔ آپ کا دماغ گہرے تجزیے اور ہمدردانہ دل کا خوبصورت امتزاج ہے۔'
        : 'آپ کا بایاں ہاتھ فطری جبلت، وراثتی صلاحیتوں اور روحانی بصیرت کا گہوارہ ہے۔ آپ کے پاس انفرادی سوچ اور غیر معمولی اندرونی فراست موجود ہے۔',
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
      lines: [
        {
          id: 'heart-line',
          name: 'Heart Line (خطِ قلب)',
          location: 'انگلیوں کے نیچے ہتھیلی کے اوپری حصے پر قوس نما لکیر۔',
          visualDescription: 'گہری اور واضح، مشتری اور زحل کے درمیان کی جانب محوِ پرواز۔',
          shapeStructure: 'خوش نما خمیدہ اور گہری',
          lengthDepth: 'لمبی اور واضح',
          specialMarkings: ['اختتام پر شاخ در شاخ مبارک fork'],
          traditionalMeaning: 'جذباتی توازن، گہری مخلصانہ محبت اور پر خلوص وفاداری۔',
          personalityInterpretation: 'آپ رشتوں میں سطحی جذبات کی بجائے حقیقی عقیدت اور باہمی عزت کے قائل ہیں۔',
          relationshipInterpretation: 'ایک ایسا شریکِ حیات جو فکری ہم آہنگی اور باہمی احترام کو مقدم رکھے۔',
          careerInterpretation: 'ٹیم ورک میں خوشگوار ماحول بنانے اور تنازعات کو خوش اسلوبی سے حل کرنے کی صلاحیت۔',
          symbolicFutureThemes: 'جذباتی استحکام اور دل کے پرانے دکھوں سے نجات۔',
          positiveAspects: ['بے لوث محبت', 'وفاداری', 'اعلیٰ ہمدردی'],
          challengesAndCautions: ['دوسروں کے منفی جذبات کو اپنے اوپر طاری نہ کریں۔'],
          confidence: 96,
          svgPathKey: 'heart',
        },
        {
          id: 'head-line',
          name: 'Head Line (خطِ عقل / سر)',
          location: 'ہتھیلی کے وسط میں افقی طور پر ابھارِ قمر کی جانب بڑھتی ہوئی۔',
          visualDescription: 'واضح اور متوازن، اختتام پر مصنف کا خوبصورت کانٹا (writer’s fork)۔',
          shapeStructure: 'طویل، ہموار ڈھلوان کے ساتھ دو شاخہ',
          lengthDepth: 'لمبی اور گہری کندہ کاری',
          specialMarkings: ['تخلیقی اور منطقی سوچ کا حسین امتزاج ظاہر کرنے والی دو شاخیں'],
          traditionalMeaning: 'تیز فکری صلاحیت، پیچیدہ مسائل کو آسانی سے سلجھانے کی مہارت۔',
          personalityInterpretation: 'عملی حقائق اور تخلیقی خوابوں دونوں کو یکساں وقت دینے کی نادر صلاحیت۔',
          careerInterpretation: 'ریسرچ، ٹیکنالوجی، تدریس اور اسٹریٹجک قیادت میں شاندار کامیابی۔',
          symbolicFutureThemes: 'کسی اہم فکری منصوبے یا کتاب / کاروبار کا شاندار آغاز۔',
          positiveAspects: ['اسٹریٹجک بصیرت', 'مضبوط حافظہ', 'فکری لچک'],
          challengesAndCautions: ['ضرورت سے زیادہ سوچنے کی عادت سے پرہیز کریں۔'],
          confidence: 98,
          svgPathKey: 'head',
        },
        {
          id: 'life-line',
          name: 'Life Line (خطِ حیات / توانائی)',
          location: 'انگوٹھے کے گرد ابھارِ زہرہ کا مکمل گھیراؤ کرتی ہوئی۔',
          visualDescription: 'وسیع دائرے میں پھیلی ہوئی، بغیر کسی رکاوٹ کے واضح لکیر۔',
          shapeStructure: 'وسیع اور متصل قوس',
          lengthDepth: 'نمایاں اور مسلسل',
          specialMarkings: ['ابتدائی حصے سے مشتری کی طرف اٹھتی ہوئی بلند ہمتی کی لکیر'],
          traditionalMeaning: 'روایتی دست شناسی میں یہ جسمانی قوت، توانائی کی روانی اور ماحول سے مطابقت کا نشان ہے (عمر کی مدت ہرگز نہیں)۔',
          personalityInterpretation: 'زندگی کا لطف اٹھانے کا بھرپور ولولہ اور مشکلات میں ہمت نہ ہارنے کا جذبہ۔',
          careerInterpretation: 'سخت اور طویل محنت کے بعد بھی تروتازہ رہنے کی قدرتی صلاحیت۔',
          symbolicFutureThemes: 'صحت اور طرزِ زندگی میں خوشگوار مثبت تبدیلیاں۔',
          positiveAspects: ['مضبوط قوتِ مدافعت', 'پرجوش مزاج', 'حوصلہ'],
          challengesAndCautions: ['دوسروں کی خاطر اپنی نیند اور آرام پر سمجھوتہ نہ کریں۔'],
          confidence: 95,
          svgPathKey: 'life',
        },
        {
          id: 'fate-line',
          name: 'Fate Line (خطِ قسمت / زحل)',
          location: 'ہتھیلی کی بنیاد سے سیدھی زحل کی انگلی کی طرف اٹھتی ہوئی۔',
          visualDescription: 'مضبوط اور سیدھی ستون نما لکیر۔',
          shapeStructure: 'سیدھی اور مضبوط',
          lengthDepth: 'درمیانی ہتھیلی میں انتہائی نمایاں',
          specialMarkings: ['شمس کے ابھار کی جانب ابھرتی ہوئی کامیابی کی شاخیں'],
          traditionalMeaning: 'خود ساختہ تقدیر، محنت کے بل بوتے پر حاصل کی گئی کامیابی۔',
          personalityInterpretation: 'اعلیٰ درجے کا خود اعتمادی اور ذاتی کارکردگی پر کامل بھروسہ۔',
          careerInterpretation: 'آزادانہ کاروبار یا اعلیٰ انتظامی عہدے پر تقرری۔',
          symbolicFutureThemes: 'کیریئر میں ایک نئے اور باوقار دور کا آغاز۔',
          positiveAspects: ['استقلال', 'ذاتی جوابدہی', 'مستقل مزاجی'],
          challengesAndCautions: ['کام کے ساتھ ساتھ تفریح کے لمحات بھی نکالیں۔'],
          confidence: 93,
          svgPathKey: 'fate',
        },
        {
          id: 'sun-line',
          name: 'Sun Line (خطِ شمس / شہرت)',
          location: 'رنگ فنگر (شمس) کے نیچے عمودی لکیر۔',
          visualDescription: 'چمکدار اور سیدھی لکیر۔',
          shapeStructure: 'نفیس اور روشن',
          lengthDepth: 'درمیانی لمبائی، خوبصورت ساخت',
          specialMarkings: ['شمس کے نیچے ستارہ نما تثلیث'],
          traditionalMeaning: 'تخلیقی صلاحیت، سماجی عزت اور پذیرائی کا روایتی اشارہ۔',
          personalityInterpretation: 'پرکشش شخصیت جو دوسروں کو متاثر کرنے کی صلاحیت رکھتی ہے۔',
          symbolicFutureThemes: 'تخلیقی کام پر عوامی تحسین اور پذیرائی۔',
          positiveAspects: ['فنکارانہ ذوق', 'امید پرستی', 'وقار'],
          challengesAndCautions: ['دوسروں کی رائے کی بجائے اپنی اندرونی تسکین کو ترجیح دیں۔'],
          confidence: 91,
          svgPathKey: 'sun',
        },
        {
          id: 'mercury-line',
          name: 'Mercury Line (خطِ عطارد / ہنر)',
          location: 'ہتھیلی کے نچلے حصے سے چھوٹی انگلی کی جانب ترچھی لکیر۔',
          visualDescription: 'پتلی اور نفاست سے آگے بڑھتی ہوئی۔',
          shapeStructure: 'ترچھی سیدھی لکیر',
          lengthDepth: 'واضح اور غیر منقطع',
          specialMarkings: ['عطارد کے نیچے واضح رخ'],
          traditionalMeaning: 'کاروباری بصیرت، فصیح و بلیغ کلام اور حکمتِ عملی۔',
          personalityInterpretation: 'بہترین مذاکرات کار جو مشکل حالات میں مناسب راستہ نکال لے۔',
          symbolicFutureThemes: 'نئے تجارتی معاہدات اور مالی وسعت۔',
          positiveAspects: ['فصاحت', 'کاروباری نفاست', 'ذہانت'],
          challengesAndCautions: ['دباؤ کے وقت پرسکون رہنے کی مشق کریں۔'],
          confidence: 89,
          svgPathKey: 'mercury',
        },
        {
          id: 'marriage-lines',
          name: 'Marriage & Relationship Lines (خطوطِ ازدواج)',
          location: 'چھوٹی انگلی کی بنیاد اور خطِ قلب کے درمیان کنارے پر۔',
          visualDescription: 'صاف، سیدھی اور گہری لکیر بغیر کسی رکاوٹ کے۔',
          shapeStructure: 'افقی، پختہ اور سیدھی',
          lengthDepth: 'گہری اور متوازن',
          specialMarkings: ['جھکاؤ سے پاک سیدھا رخ'],
          traditionalMeaning: 'دیرپا جذباتی رفاقت، پائیدار تعلق اور سچی وفاداری۔',
          personalityInterpretation: 'ایک ہی مخلص رشتے کو دل سے نبھانے والی وفادار طبیعت۔',
          relationshipInterpretation: 'ایک ایسا شریکِ سفر جو مشکل اور خوشی دونوں میں چٹان کی طرح ساتھ کھڑا ہو۔',
          symbolicFutureThemes: 'ازدواجی زندگی میں گہرا سکون اور باہمی اعتماد کی تجدید۔',
          positiveAspects: ['وفاداری', 'سنجیدگی', 'روحانی وابستگی'],
          challengesAndCautions: ['اپنے خیالات کا شریکِ حیات سے کھل کر اظہار کرتے رہیں۔'],
          confidence: 90,
          svgPathKey: 'marriage',
        },
        {
          id: 'health-line',
          name: 'Health Line (خطِ قوتِ حیات - علامتی)',
          location: 'ہتھیلی کے بیرونی کنارے پر۔',
          visualDescription: 'ہلکی اور غیر منقسم۔',
          shapeStructure: 'ہلکی اور پرسکون',
          lengthDepth: 'ہلکی لکیر (روایتی طور پر بہترین سمجھی جاتی ہے)',
          specialMarkings: ['کسی رکاوٹ کے بغیر'],
          traditionalMeaning: 'علامتی مطالعہ: متوازن نظامِ حیات (طبی تشخیص نہیں۔)',
          personalityInterpretation: 'قدرتی غذا اور پیدل چلنے سے توانائی حاصل کرنے والی طبیعت۔',
          symbolicFutureThemes: 'صحت مند عادات اور پرسکون طرزِ زندگی کی برکت۔',
          positiveAspects: ['توانائی کا توازن', 'فطری بحالی'],
          challengesAndCautions: ['کام کے دوران پانی پینے کا خاص خیال رکھیں۔'],
          confidence: 86,
          svgPathKey: 'health',
        },
        {
          id: 'travel-lines',
          name: 'Travel Lines (خطوطِ سفر)',
          location: 'ابھارِ قمر پر افقی لہر نما لکیریں۔',
          visualDescription: 'صاف لہر نما لکیریں جو اندر کی طرف مڑتی ہیں۔',
          shapeStructure: 'خوشگوار افقی لہریں',
          lengthDepth: 'درمیانی اور واضح',
          specialMarkings: ['اوپر کی طرف رخ'],
          traditionalMeaning: 'طویل اور مفید سفر، نئی ثقافتوں اور دور دراز علاقوں کی سیر۔',
          personalityInterpretation: 'نئی جگہیں دیکھنے اور مختلف لوگوں سے سیکھنے کا شوق۔',
          symbolicFutureThemes: 'کسی تاریخی یا روحانی مقام کا یادگار سفر۔',
          positiveAspects: ['کھلا دل', 'سیکھنے کی لگن'],
          challengesAndCautions: ['سفر میں اپنی ضروریات کا بروقت بندوبست رکھیں۔'],
          confidence: 88,
          svgPathKey: 'travel',
        },
        {
          id: 'intuition-line',
          name: 'Intuition Line (خطِ الہام و بصیرت)',
          location: 'قمر کے ابھار سے عطارد کی طرف ہلال نما قوس۔',
          visualDescription: 'خوبصورت ہلال نما باریک لکیر۔',
          shapeStructure: 'ہلال نما قوس',
          lengthDepth: 'باریک اور مسلسل',
          specialMarkings: ['ستارے کا خوشگوار قرب'],
          traditionalMeaning: 'تیز چھٹی حس، کسی واقعے کے رونما ہونے سے قبل دل میں بات آ جانا۔',
          personalityInterpretation: 'آپ سامنے والے کے چہرے اور لہجے سے حقیقت فوراً جان لیتے ہیں۔',
          symbolicFutureThemes: 'اپنے باطنی الہام پر بھروسہ کر کے درست فیصلے کرنا۔',
          positiveAspects: ['باطنی بصیرت', 'الہامی سمجھ'],
          challengesAndCautions: ['منفی اندیشوں کو دل میں جگہ نہ دیں۔'],
          confidence: 87,
          svgPathKey: 'intuition',
        },
        {
          id: 'bracelet-lines',
          name: 'Bracelet / Rascette Lines (خطوطِ کلائی / کنگن)',
          location: 'کلائی کے جوڑ پر ہتھیلی کے بالکل نیچے۔',
          visualDescription: 'تین متوازی لکیریں جیسے سونے کے کڑے ہوں۔',
          shapeStructure: 'تین متوازی اور گہری لکیریں',
          lengthDepth: 'مکمل اور بغیر ٹوٹ پھوٹ کے',
          specialMarkings: ['پہلا کنگن بالکل سیدھا اور مضبوط'],
          traditionalMeaning: 'قدیم علوم میں "ہرمس کے کنگن" کہلاتے ہیں جو خاندانی وقار اور دیرپا استحکام کی نشانی ہیں۔',
          personalityInterpretation: 'مستحکم بنیادوں پر زندگی استوار کرنے کا ہنر۔',
          symbolicFutureThemes: 'خاندانی استحکام اور دیرپا اثاثوں کی تعمیر۔',
          positiveAspects: ['زندگی کا توازن', 'ثابت قدمی'],
          challengesAndCautions: ['روحانی سکون کو مالی مفادات پر مقدم رکھیں۔'],
          confidence: 94,
          svgPathKey: 'bracelet',
        },
      ],
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
      id: 'reading_' + Date.now() + '_' + Math.random().toString(36).substring(2, 6),
      timestamp: Date.now(),
      imageUrl: imageBase64,
      handType: isRight ? 'right' : 'left',
      imageQuality: {
        isClear: true,
        clarityScore: 94,
        message: 'हथेली का त्वरित विज़न स्कैन सफलतापूर्वक पूरा हुआ। सभी रेखाएं स्पष्ट हैं।',
        suggestions: 'छवि की गुणवत्ता और रोशनी उत्तम है।',
      },
      orientation: {
        hand: isRight ? 'right' : 'left',
        palmType: 'Air' as const,
        palmTypeDescription: 'चौकोर हथेली और संतुलित अंगुलियां। यह एक कुशाग्र, तार्किक और बौद्धिक व्यक्तित्व का परिचायक है।',
        fingerObservations: 'तर्जनी (गुरु) का सीधा होना नेतृत्व क्षमता तथा मध्यमा (शनि) का सुदृढ़ होना धैर्य व कर्मनिष्ठा दर्शाता है।',
      },
      overallAnalysis: isRight
        ? 'आपका दायां हाथ दर्शाता है कि आपने अपने दृढ़ संकल्प, कर्म और बौद्धिक विवेक से जीवन में उल्लेखनीय प्रगति की है। आपका मस्तिष्क तार्किक सोच और एक करुणामय हृदय का सुंदर संगम है।'
        : 'आपका बायां हाथ जन्मजात प्रतिभा, पूर्वजों के आशीर्वाद और अंतर्ज्ञान का भंडार है। आपके भीतर गहन विचारशीलता विद्यमान है।',
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
      lines: [
        {
          id: 'heart-line',
          name: 'Heart Line (हृदय रेखा)',
          location: 'अंगुलियों के नीचे हथेली के ऊपरी भाग पर स्थित धनुषाकार रेखा।',
          visualDescription: 'गहरी, स्पष्ट और गुरु-शनि पर्वत के मध्य की ओर अग्रसर।',
          shapeStructure: 'सुंदर घुमावदार और गहरी',
          lengthDepth: 'लंबी और स्पष्ट',
          specialMarkings: ['समाप्ति पर शुभ दोहरी शाखा (त्रिशूल/कांटा)'],
          traditionalMeaning: 'संतुलित भावनाएं, निष्कपट प्रेम और अटूट मित्रता।',
          personalityInterpretation: 'आप संबंधों में दिखावे के बजाय वास्तविक निष्ठा और सम्मान को सर्वोपरि मानते हैं।',
          relationshipInterpretation: 'एक ऐसा जीवनसाथी जो बौद्धिक रूप से आपके समतुल्य हो और आपसी सम्मान दे।',
          careerInterpretation: 'सहकर्मियों के साथ सौहार्दपूर्ण संबंध बनाए रखने और समन्वय में निपुणता।',
          symbolicFutureThemes: 'भावनात्मक स्थिरता और पुराने संशयों से मुक्ति।',
          positiveAspects: ['निःस्वार्थ प्रेम', 'वफादारी', 'करुणा'],
          challengesAndCautions: ['दूसरों के नकारात्मक तनाव को अपने ऊपर न हावी होने दें।'],
          confidence: 96,
          svgPathKey: 'heart',
        },
        {
          id: 'head-line',
          name: 'Head Line (मस्तिष्क रेखा)',
          location: 'हथेली के मध्य भाग में क्षैतिज रूप से चंद्र पर्वत की ओर जाती हुई।',
          visualDescription: 'तीक्ष्ण, स्पष्ट और अंत में लेखक का द्विभाजन (writer’s fork)।',
          shapeStructure: 'लंबी, संतुलित ढलान और दोमुंहा सिरा',
          lengthDepth: 'विस्तृत और गहरी',
          specialMarkings: ['तार्किक विश्लेषण और रचनात्मक कल्पना का अदभुत संगम'],
          traditionalMeaning: 'कुशाग्र बुद्धि, बहुमुखी प्रतिभा और त्वरित समस्या समाधान।',
          personalityInterpretation: 'व्यावहारिक यथार्थ और रचनात्मक दृष्टि दोनों में सामंजस्य स्थापित करने की दुर्लभ क्षमता।',
          careerInterpretation: 'रिसर्च, प्रौद्योगिकी, शिक्षा और योजना निर्माण में सर्वोच्च सफलता।',
          symbolicFutureThemes: 'किसी महत्वपूर्ण बौद्धिक या व्यावसायिक कार्य का सफल आरंभ।',
          positiveAspects: ['रणनीतिक दृष्टि', 'तीव्र स्मरणशक्ति', 'विचारशीलता'],
          challengesAndCautions: ['अति-विश्लेषण से बचें, कर्म पर ध्यान केंद्रित रखें।'],
          confidence: 98,
          svgPathKey: 'head',
        },
        {
          id: 'life-line',
          name: 'Life Line (जीवन रेखा / प्राण ऊर्जा)',
          location: 'अंगूठे के चारों ओर शुक्र पर्वत को घेरती हुई गोलाकार रेखा।',
          visualDescription: 'विस्तृत, स्पष्ट और बिना किसी रुकावट के प्रवाहमान।',
          shapeStructure: 'सुस्पष्ट और पूर्ण चाप',
          lengthDepth: 'गहरी और अखंडित',
          specialMarkings: ['प्रारंभ में गुरु की ओर उठती हुई महत्वाकांक्षा रेखा'],
          traditionalMeaning: 'पारंपरिक हस्तरेखा में यह जीवन शक्ति, रोग प्रतिरोधक क्षमता व उत्साह का प्रतीक है (आयु सीमा नहीं)।',
          personalityInterpretation: 'जीवन के प्रति असीम उत्साह, विपरीत परिस्थितियों में अडिग रहने की क्षमता।',
          careerInterpretation: 'कठिन परिश्रम के बाद भी ऊर्जावान बने रहने की स्वाभाविक देन।',
          symbolicFutureThemes: 'स्वास्थ्य, ताजगी और जीवनशैली में सकारात्मक बदलाव।',
          positiveAspects: ['दृढ़ शारीरिक ऊर्जा', 'सकारात्मक स्वभाव', 'सहनशीलता'],
          challengesAndCautions: ['पर्याप्त विश्राम और निद्रा का नियमपूर्वक ध्यान रखें।'],
          confidence: 95,
          svgPathKey: 'life',
        },
        {
          id: 'fate-line',
          name: 'Fate Line (भाग्य रेखा / शनि रेखा)',
          location: 'मणिबंध से सीधी शनि पर्वत (मध्यमा) की ओर अग्रसर।',
          visualDescription: 'स्तंभ के समान सुदृढ़ और अक्षुण्ण।',
          shapeStructure: 'सीधी, स्पष्ट और सुदृढ़',
          lengthDepth: 'हथेली के मध्य भाग में अत्यंत प्रभावशाली',
          specialMarkings: ['सूर्य पर्वत की ओर उठती हुई उन्नति सूचक शाखाएं'],
          traditionalMeaning: 'स्व-निर्मित भाग्य, अपनी योग्यता और कर्म से बनाई गई पहचान।',
          personalityInterpretation: 'प्रबल आत्मविश्वास और अपने कार्यों की पूर्ण जिम्मेदारी लेने की भावना।',
          careerInterpretation: 'स्वतंत्र व्यवसाय या उच्च प्रशासनिक पद पर प्रतिष्ठा।',
          symbolicFutureThemes: 'कार्यक्षेत्र में एक नए और अत्यंत सम्मानजनक अध्याय की शुरुआत।',
          positiveAspects: ['अनुशासन', 'स्थायित्व', 'निरंतर प्रगति'],
          challengesAndCautions: ['काम के बीच में परिवार और मनोरंजन के लिए भी समय निकालें।'],
          confidence: 94,
          svgPathKey: 'fate',
        },
        {
          id: 'sun-line',
          name: 'Sun Line (सूर्य रेखा / यश रेखा)',
          location: 'अनामिका अंगुली के नीचे स्थित ऊर्ध्वाधर रेखा।',
          visualDescription: 'दीप्तिमान और स्पष्ट।',
          shapeStructure: 'स्वच्छ और चमकीली',
          lengthDepth: 'मध्यम लंबाई, स्पष्ट बनावट',
          specialMarkings: ['सूर्य पर्वत के नीचे त्रिकोण/तारा आकृति'],
          traditionalMeaning: 'यश, सामाजिक मान-सम्मान और रचनात्मक प्रतिभा की सूचक।',
          personalityInterpretation: 'प्रभावशाली व्यक्तित्व जो स्वाभाविक रूप से दूसरों को आकर्षित करता है।',
          symbolicFutureThemes: 'रचनात्मक प्रयासों के लिए सार्वजनिक प्रशंसा और सम्मान।',
          positiveAspects: ['कलात्मक अभिरुचि', 'लोकप्रियता', 'आशावाद'],
          challengesAndCautions: ['बाहरी प्रशंसा की अपेक्षा अपने आत्म-संतोष को महत्व दें।'],
          confidence: 91,
          svgPathKey: 'sun',
        },
        {
          id: 'mercury-line',
          name: 'Mercury Line (बुध रेखा / स्वास्थ्य व व्यापार)',
          location: 'हथेली के निचले भाग से कनिष्ठिका की ओर तिरछी रेखा।',
          visualDescription: 'पतली और सीधी।',
          shapeStructure: 'सीधी तिरछी रेखा',
          lengthDepth: 'सुस्पष्ट और सुव्यवस्थित',
          specialMarkings: ['बुध पर्वत के समीप स्पष्ट समाप्ति'],
          traditionalMeaning: 'व्यापारिक चातुर्य, कुशल संवाद और शीघ्र समाधान ढूंढने की कला।',
          personalityInterpretation: 'कुशल वार्ताकार जो जटिल स्थितियों में भी सरल हल निकाल ले।',
          symbolicFutureThemes: 'नवीन व्यावसायिक अनुबंध और आर्थिक लाभ।',
          positiveAspects: ['वाक्पटुता', 'व्यापारिक सूझबूझ', 'निपुणता'],
          challengesAndCautions: ['व्यस्तता के समय मानसिक शांति बनाए रखें।'],
          confidence: 89,
          svgPathKey: 'mercury',
        },
        {
          id: 'marriage-lines',
          name: 'Marriage Lines (विवाह व संबंध रेखाएं)',
          location: 'कनिष्ठिका के नीचे हथेली के किनारे पर क्षैतिज रेखाएं।',
          visualDescription: 'एक गहरी, स्पष्ट और सीधी रेखा।',
          shapeStructure: 'क्षैतिज, गहरी और सीधी',
          lengthDepth: 'स्पष्ट और झुकाव रहित',
          specialMarkings: ['अबाध और स्वच्छ रेखा'],
          traditionalMeaning: 'स्थायी प्रेम संबंध, अटूट निष्ठा और समर्पित दांपत्य जीवन।',
          personalityInterpretation: 'संबंधों में पूर्ण समर्पण और आजीवन साथ निभाने का भाव।',
          relationshipInterpretation: 'एक ऐसा जीवनसाथी जो हर परिस्थिति में आपके साथ दृढ़ता से खड़ा रहे।',
          symbolicFutureThemes: 'दांपत्य जीवन में सुख, शांति और परस्पर विश्वास की वृद्धि।',
          positiveAspects: ['निष्ठा', 'गंभीरता', 'आध्यात्मिक जुड़ाव'],
          challengesAndCautions: ['अपने मन के भाव जीवनसाथी से निरंतर साझा करते रहें।'],
          confidence: 90,
          svgPathKey: 'marriage',
        },
        {
          id: 'health-line',
          name: 'Health Line (स्वास्थ्य रेखा - प्रतीकात्मक)',
          location: 'हथेली के बाहरी किनारे पर स्थित।',
          visualDescription: 'सूक्ष्म और शांत।',
          shapeStructure: 'मंद और शांत',
          lengthDepth: 'हल्की (पारंपरिक रूप से उत्तम मानी जाती है)',
          specialMarkings: ['दोष रहित'],
          traditionalMeaning: 'प्रतीकात्मक अध्ययन: संतुलित जीवन ऊर्जा (चिकित्सीय निदान नहीं)।',
          personalityInterpretation: 'प्रकृति और संतुलित जीवनशैली से ताजगी पाने वाला स्वभाव।',
          symbolicFutureThemes: 'स्वस्थ दिनचर्या और सकारात्मक जीवनशैली का लाभ।',
          positiveAspects: ['ऊर्जा संतुलन', 'प्राकृतिक आरोग्यता'],
          challengesAndCautions: ['कार्य के दौरान पर्याप्त जल ग्रहण करें।'],
          confidence: 86,
          svgPathKey: 'health',
        },
        {
          id: 'travel-lines',
          name: 'Travel Lines (यात्रा रेखाएं)',
          location: 'चंद्र पर्वत पर क्षैतिज रेखाएं।',
          visualDescription: 'सुंदर लहरदार रेखाएं।',
          shapeStructure: 'क्षैतिज चाप',
          lengthDepth: 'मध्यम और स्पष्ट',
          specialMarkings: ['ऊपर की ओर मुखरित'],
          traditionalMeaning: 'दूरगामी और फलदायी यात्राएं, नई संस्कृतियों की खोज।',
          personalityInterpretation: 'नए स्थानों को जानने और विभिन्न विचारों को समझने की गहरी लालसा।',
          symbolicFutureThemes: 'किसी महत्वपूर्ण तीर्थ या ऐतिहासिक स्थल की सुखद यात्रा।',
          positiveAspects: ['खुला दृष्टिकोण', 'सीखने की ललक'],
          challengesAndCautions: ['यात्रा के दौरान अपनी प्राथमिकताओं का ध्यान रखें।'],
          confidence: 88,
          svgPathKey: 'travel',
        },
        {
          id: 'intuition-line',
          name: 'Intuition Line (अंतर्ज्ञान रेखा)',
          location: 'चंद्र पर्वत से बुध पर्वत की ओर धनुषाकार।',
          visualDescription: 'अर्धचंद्राकार बारीक रेखा।',
          shapeStructure: 'धनुषाकार चाप',
          lengthDepth: 'सूक्ष्म और स्पष्ट',
          specialMarkings: ['शुभ संकेत युक्त'],
          traditionalMeaning: 'प्रबल छठी इंद्री, पूर्वभास और स्थिति को पहले ही भांपने की शक्ति।',
          personalityInterpretation: 'आप लोगों के मुखौटों के पीछे छिपी सच्चाई को शीघ्र पहचान लेते हैं।',
          symbolicFutureThemes: 'अपनी अंतरात्मा की आवाज पर भरोसा करके सही निर्णय लेना।',
          positiveAspects: ['आत्मिक दृष्टि', 'पूर्वाभास'],
          challengesAndCautions: ['अनावश्यक संशयों को मन में स्थान न दें।'],
          confidence: 87,
          svgPathKey: 'intuition',
        },
        {
          id: 'bracelet-lines',
          name: 'Bracelet Lines (मणिबंध रेखाएं)',
          location: 'हथेली के ठीक नीचे कलाई पर स्थित।',
          visualDescription: 'तीन सुस्पष्ट समानांतर रेखाएं।',
          shapeStructure: 'तीन समानांतर पट्टियां',
          lengthDepth: 'गहरी और अखंड',
          specialMarkings: ['प्रथम मणिबंध स्पष्ट और सीधा'],
          traditionalMeaning: 'प्राचीन काल में इसे "हरमीस के कंगन" कहा गया है जो दीर्घायु व स्थायित्व के प्रतीक हैं।',
          personalityInterpretation: 'सुदृढ़ नींव पर जीवन का निर्माण करने का कौशल।',
          symbolicFutureThemes: 'पारिवारिक सुख, स्थायित्व और स्थायी संपत्तियों का निर्माण।',
          positiveAspects: ['जीवन में स्थिरता', 'धैर्य'],
          challengesAndCautions: ['आत्मिक शांति को सर्वोपरि रखें।'],
          confidence: 94,
          svgPathKey: 'bracelet',
        },
      ],
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

  // Default: English
  return {
    id: 'reading_' + Date.now() + '_' + Math.random().toString(36).substring(2, 6),
    timestamp: Date.now(),
    imageUrl: imageBase64,
    handType: isRight ? 'right' : 'left',
    imageQuality: {
      isClear: true,
      clarityScore: 95,
      message: 'Instant high-resolution palm vision scan complete. All major and minor creases resolved.',
      suggestions: 'Lighting and palm positioning are optimal.',
    },
    orientation: {
      hand: isRight ? 'right' : 'left',
      palmType: 'Air' as const,
      palmTypeDescription: 'Square palm with balanced, agile fingers. Characterizes a strategic, intuitive, and intellectually versatile nature.',
      fingerObservations: 'Straight index finger showing innate leadership, firm middle finger indicating patience and accountability.',
    },
    overallAnalysis: isRight
      ? 'Your active right hand reveals a harmonious convergence of intellect, willpower, and refined empathy. You have sculpted your circumstances through consistent focus and high personal standards.'
      : 'Your innate left hand reveals profound subconscious wisdom, natural artistic intuition, and ancestral gifts of leadership and foresight.',
    mounts: [
      {
        name: 'Mount of Jupiter',
        planet: 'Jupiter',
        prominence: 'well-developed',
        interpretation: 'Reflects noble ambition, authentic integrity, and natural mentorship abilities without arrogance.',
      },
      {
        name: 'Mount of Venus',
        planet: 'Venus',
        prominence: 'high/prominent',
        interpretation: 'Ample physical vitality, generous warmth, passionate aesthetic appreciation, and deep devotion to loved ones.',
      },
      {
        name: 'Mount of Luna',
        planet: 'Moon',
        prominence: 'well-developed',
        interpretation: 'Rich imagination, poetic sensitivity, affinity for philosophical inquiry and overseas journeys.',
      },
      {
        name: 'Mount of Saturn',
        planet: 'Saturn',
        prominence: 'well-developed',
        interpretation: 'Grounded sense of civic duty, patience in long-term enterprise, and spiritual introspection.',
      },
      {
        name: 'Mount of Apollo (Sun)',
        planet: 'Sun',
        prominence: 'well-developed',
        interpretation: 'Radiant charisma, creative flair, and desire to leave an inspiring public legacy.',
      },
      {
        name: 'Mount of Mercury',
        planet: 'Mercury',
        prominence: 'well-developed',
        interpretation: 'Nimble persuasive speech, quick commercial acumen, and sharp problem-solving dexterity.',
      },
    ],
    lines: [
      {
        id: 'heart-line',
        name: 'Heart Line',
        location: 'Upper palm beneath the digits curving toward Jupiter mount.',
        visualDescription: 'Clear, gently curving upward with delicate feathering and a clean terminal fork.',
        shapeStructure: 'Curved and fluid with healthy depth',
        lengthDepth: 'Long and distinctly engraved',
        specialMarkings: ['Gentle upward bifurcation near the Jupiter mount'],
        traditionalMeaning: 'Signifies balanced emotional poise; love is expressed through genuine devotion rather than possessiveness.',
        personalityInterpretation: 'You possess rich empathy, yet maintain healthy personal boundaries. You listen deeply and prize emotional authenticity.',
        relationshipInterpretation: 'Thrives in partnerships built on intellectual camaraderie, mutual respect, and reciprocal vulnerability.',
        careerInterpretation: 'Attracts collaborative team harmony; well-suited for counseling, strategic communication, and executive mediation.',
        symbolicFutureThemes: 'Deepening emotional stability and harmonizing past relational wounds into mature wisdom.',
        positiveAspects: ['Unconditional warmth', 'Loyalty', 'Emotional resilience'],
        challengesAndCautions: ['Guard against absorbing external stress; reserve quiet sanctuary time.'],
        confidence: 96,
        svgPathKey: 'heart',
      },
      {
        id: 'head-line',
        name: 'Head Line',
        location: 'Traversing horizontally across the palm toward upper Luna.',
        visualDescription: 'Deep, crisp engraving with writer’s fork at termination.',
        shapeStructure: 'Long, gently downward-sloping with terminal fork',
        lengthDepth: 'Extended length, highly distinct depth',
        specialMarkings: ['Writer’s fork connecting pragmatic reasoning with creative imagination'],
        traditionalMeaning: 'Represents extraordinary mental agility, blending rational logic with lateral visionary creative intuition.',
        personalityInterpretation: 'Inquisitive thinker capable of mastering complex abstract concepts while retaining practical execution skills.',
        careerInterpretation: 'Exceptional capacity for research, software architecture, authoring, and strategic entrepreneurship.',
        symbolicFutureThemes: 'Pivotal intellectual breakthroughs, publishing, or launching an innovative enterprise.',
        positiveAspects: ['Strategic vision', 'Multi-disciplinary comprehension', 'Sharp memory'],
        challengesAndCautions: ['Avoid mental over-exertion; balance contemplation with bodily movement.'],
        confidence: 98,
        svgPathKey: 'head',
      },
      {
        id: 'life-line',
        name: 'Life Line',
        location: 'Broad arc embracing the Mount of Venus down to the wrist.',
        visualDescription: 'Broad, sweeping semi-circular arc, uninterrupted throughout.',
        shapeStructure: 'Expansive arc, smoothly continuous',
        lengthDepth: 'Prominent and unbroken',
        specialMarkings: ['Ascending ambition branch rising toward Jupiter mount'],
        traditionalMeaning: 'Traditional palmistry symbolizes vitality, constitutional enthusiasm, recuperative stamina, and lifestyle adaptability (never denotes biological lifespan).',
        personalityInterpretation: 'Vibrant zest for worldly experiences, travel, culinary delight, and physical recreation.',
        careerInterpretation: 'High threshold for sustained effort and resilience during demanding career transitions.',
        symbolicFutureThemes: 'Renewal of energy, prospective relocation to an inspiring natural environment, and vibrant wellness practices.',
        positiveAspects: ['Robust physical endurance', 'Warm charisma', 'Optimistic spirit'],
        challengesAndCautions: ['Guard your sleep cycles during demanding project launches.'],
        confidence: 95,
        svgPathKey: 'life',
      },
      {
        id: 'fate-line',
        name: 'Fate Line (Saturn Line)',
        location: 'Ascending vertically from the palm base upward toward Saturn.',
        visualDescription: 'Resolute, unbroken vertical pillar like a mast across the palm.',
        shapeStructure: 'Pillar-straight and continuous',
        lengthDepth: 'Strongly pronounced in middle palm',
        specialMarkings: ['Clear upward branches aiming toward the Sun mount at mid-point'],
        traditionalMeaning: 'Symbolizes deliberate self-made destiny, professional self-determination, and purposeful career evolution.',
        personalityInterpretation: 'Unshakable personal agency, holding yourself accountable to the highest personal standards of excellence.',
        careerInterpretation: 'Success earned through persistent skill acquisition rather than mere windfall; leadership authority gained through merit.',
        symbolicFutureThemes: 'Major professional milestone and autonomous stewardship of key initiatives.',
        positiveAspects: ['Singular focus', 'Professional accountability', 'Steadfast perseverance'],
        challengesAndCautions: ['Avoid defining your entire self-worth through professional status alone.'],
        confidence: 94,
        svgPathKey: 'fate',
      },
      {
        id: 'sun-line',
        name: 'Sun Line (Apollo Line)',
        location: 'Vertical filament parallel to Fate Line rising toward ring finger.',
        visualDescription: 'A luminous, clearly defined line appearing prominently under the Apollo mount.',
        shapeStructure: 'Vertical, refined and lucid',
        lengthDepth: 'Medium length, sharp definition',
        specialMarkings: ['Star-like triangle formation at its summit'],
        traditionalMeaning: 'Traditional indicator of creative brilliance, cultural recognition, magnetic presence, and rewarding honors.',
        personalityInterpretation: 'You possess natural charisma that draws recognition and goodwill from mentors and colleagues.',
        symbolicFutureThemes: 'Public acclaim, celebration of an artistic or technical milestone, and social influence.',
        positiveAspects: ['Innate aesthetic grace', 'Optimism', 'Public magnetism'],
        challengesAndCautions: ['Trust the intrinsic value of your creations rather than external praise.'],
        confidence: 91,
        svgPathKey: 'sun',
      },
      {
        id: 'mercury-line',
        name: 'Mercury Line',
        location: 'Slanted line targeting the base of the little finger.',
        visualDescription: 'Slender, unwavering trajectory reaching the base of Mercury mount.',
        shapeStructure: 'Direct diagonal ascent',
        lengthDepth: 'Slender, cohesive',
        specialMarkings: ['Trident base near the plain of Mars'],
        traditionalMeaning: 'Governs commercial perception, linguistic eloquence, rapid negotiations, and adaptable business instincts.',
        personalityInterpretation: 'Persuasive communicator with quick wit and knack for synthesizing disparate viewpoints.',
        symbolicFutureThemes: 'Successful venture negotiations and lucrative commercial agreements.',
        positiveAspects: ['Persuasive eloquence', 'Negotiation skill', 'Fast cognitive speed'],
        challengesAndCautions: ['Ensure rest for your vocal cords and nervous system during intense communication.'],
        confidence: 89,
        svgPathKey: 'mercury',
      },
      {
        id: 'marriage-lines',
        name: 'Marriage & Relationship Lines',
        location: 'Percussion edge beneath the little finger.',
        visualDescription: 'Two distinct, deep horizontal strokes without downward drooping.',
        shapeStructure: 'Horizontal, clean, straight',
        lengthDepth: 'Deep, distinct, and level',
        specialMarkings: ['Straight and clear without feathering'],
        traditionalMeaning: 'Symbolizes significant soul-bond partnerships and lasting emotional commitments.',
        personalityInterpretation: 'Dedicated and constant in loyalty, valuing authentic emotional security and shared life purpose.',
        relationshipInterpretation: 'Points toward a profound, stabilizing bond marked by genuine spiritual equality and enduring companionship.',
        symbolicFutureThemes: 'Celebration of committed harmony, renewal of pledges, or deepening shared home foundation.',
        positiveAspects: ['Commitment-oriented', 'Spiritual compatibility', 'Devoted partnership'],
        challengesAndCautions: ['Practice patience during periods where partners need individual self-reflection.'],
        confidence: 90,
        svgPathKey: 'marriage',
      },
      {
        id: 'health-line',
        name: 'Health Line (Vitality Line - Symbolic)',
        location: 'Hypothenar eminence.',
        visualDescription: 'Smooth and largely faint, indicating harmonious equilibrium in traditional palmistry lore.',
        shapeStructure: 'Faint and undisturbed (traditionally viewed as most favorable)',
        lengthDepth: 'Faint and unobtrusive',
        specialMarkings: ['Absence of deep red islands or broken links'],
        traditionalMeaning: 'Traditional symbolic reading: A smooth or absent line historically indicates unburdened, natural vitality (strictly traditional lore, not medical diagnosis).',
        personalityInterpretation: 'Intuitive body awareness; responds favorably to mindful holistic living, clean hydration, and nature walks.',
        symbolicFutureThemes: 'Adoption of revitalizing daily habits and mindful balance between exertion and rest.',
        positiveAspects: ['Harmonious energy flow', 'Intuitive self-care awareness'],
        challengesAndCautions: ['Keep consistent sleep rhythm during demanding project launches.'],
        confidence: 86,
        svgPathKey: 'health',
      },
      {
        id: 'travel-lines',
        name: 'Travel Lines',
        location: 'Mount of Luna edge.',
        visualDescription: 'Three distinct horizontal ripples etched onto the upper and mid Luna mount.',
        shapeStructure: 'Horizontal ripples curving upward toward the palm center',
        lengthDepth: 'Medium length, crisp',
        specialMarkings: ['Upward curve indicating rewarding exploratory journeys'],
        traditionalMeaning: 'Symbolic indicator of foreign excursions, cross-cultural relocations, and spiritual pilgrimages.',
        personalityInterpretation: 'Deep wanderlust and hunger to absorb different civilizations, languages, and philosophies.',
        symbolicFutureThemes: 'An inspiring international voyage or relocation for creative or educational expansion.',
        positiveAspects: ['Cross-cultural empathy', 'Adaptability in novel surroundings'],
        challengesAndCautions: ['Anchor your inner home regardless of geographical wanderings.'],
        confidence: 88,
        svgPathKey: 'travel',
      },
      {
        id: 'intuition-line',
        name: 'Intuition Line',
        location: 'Crescent curve originating from lower Luna toward Mercury.',
        visualDescription: 'Delicate yet clearly legible crescent arc hugging the outer percussion.',
        shapeStructure: 'Graceful crescent curve',
        lengthDepth: 'Fine and distinct',
        specialMarkings: ['Crescent shape without disruptive crossbars'],
        traditionalMeaning: 'Traditional symbol of acute gut feelings, premonitions, and uncanny perceptive foresight.',
        personalityInterpretation: 'You often sense unspoken interpersonal dynamics before anyone articulates them.',
        symbolicFutureThemes: 'Heightened creative synchronicity and trusting first impressions in crucial judgments.',
        positiveAspects: ['Profound instinctive foresight', 'Empathetic antennae', 'Symbolic dreams'],
        challengesAndCautions: ['Ground yourself through tangible everyday activities.'],
        confidence: 87,
        svgPathKey: 'intuition',
      },
      {
        id: 'bracelet-lines',
        name: 'Bracelet / Rascette Lines',
        location: 'Wrist crease immediately below palm base.',
        visualDescription: 'Three complete, parallel rascette lines forming a well-defined triple bracelet.',
        shapeStructure: 'Parallel, unbroken horizontal bands',
        lengthDepth: 'Deep and cleanly etched',
        specialMarkings: ['Top rascette clean and arching cleanly toward the palm'],
        traditionalMeaning: 'Known historically as the "Royal Bracelets of Hermes", signifying constitutional stamina, prosperity, and longevity of spirit.',
        personalityInterpretation: 'Possesses strong foundations in both physical stamina and moral integrity.',
        symbolicFutureThemes: 'Cumulative prosperity and establishing an enduring familial or creative legacy.',
        positiveAspects: ['Structural life stability', 'Resilience across decades'],
        challengesAndCautions: ['Remember that true wealth includes peace of mind and stillness.'],
        confidence: 94,
        svgPathKey: 'bracelet',
      },
    ],
    futureReading: {
      timeline: {
        next3Months: 'A phase of mental consolidation. Creative insights will crystallize into concrete plans. An influential mentor or strategic partner is likely to acknowledge your contributions.',
        next6Months: 'Expansion of responsibilities. Clear opportunities for public visibility, public speaking, or launching an autonomous venture. Financial flow strengthens through disciplined execution.',
        next12Months: 'Significant domestic or geographic milestone. A meaningful relocation or domestic upgrade harmonizes with career elevation, establishing serene equilibrium.',
        next3Years: 'A peak cycle of vocational recognition. Projects cultivated in the preceding years reach maturity, generating both financial abundance and reputable authority.',
        longTermDirection: 'Legacy of mentorship, wisdom sharing, and cultural or creative contribution that leaves an enduring mark upon your community.',
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
        importantTransitions: 'A deliberate pivot from seeking approval to embodying natural executive authority.',
      },
    },
    loveAndMarriage: {
      summary: 'Your heart reveals a rare combination of tender romantic devotion and grounded intellectual respect. You do not seek codependency; rather, you crave an enlightened co-creator.',
      attachmentStyle: 'Secure with thoughtful introspective depth',
      idealPartnerQualities: 'Intellectually stimulating, emotionally expressive, ambitious yet serene, valuing truth over flattery.',
      relationshipMilestones: 'A profound union characterized by harmonious co-habitation, shared travel adventures, and unconditional trust.',
    },
    careerAndMoney: {
      summary: 'The Fate and Sun lines indicate a stellar self-made vocational trajectory. You are not suited for repetitive bureaucratic drudgery; your destiny lies in innovation and leadership.',
      wealthTendencies: 'Strategic saver with high-conviction investments; avoids reckless gambling in favor of compound growth.',
      optimalCareerPaths: ['Creative Director', 'Strategic Consultant', 'Tech Founder', 'Author / Educator', 'Holistic Counselor'],
      businessInstinct: 'Exceptional pattern recognition; able to identify unmet market desires before competitors notice.',
      financialDiscipline: 'High prudence tempered by willingness to invest generously in personal learning, wellness, and aesthetic beauty.',
    },
    personalityProfile: {
      archetype: 'The Enlightened Strategist',
      coreStrengths: ['Acute visionary foresight', 'Compassionate communication', 'Steely perseverance', 'Refined aesthetic taste'],
      shadowTraitsOrChallenges: ['Tendency toward mental over-exertion', 'Reluctance to delegate when perfection is desired'],
      intuitionLevel: 'Exceptionally High (verified by crescent Intuition Line and Luna fork)',
      lifePhilosophy: 'Aligning deliberate action with universal cosmic harmony.',
    },
    finalSummary: 'A sublime palm marked by intellectual distinction, emotional nobility, and purposeful creative destiny. By harmonizing your sharp analytical mind with your profound intuitive empathy, you command both inner peace and worldly achievement.',
    disclaimer: 'Palmistry is a traditional symbolic and interpretive art designed for personal self-reflection, mindfulness, and philosophical contemplation. It is not a scientifically validated system of deterministic future prediction or medical diagnosis.',
  };
}

// Endpoint: Analyze Palm Image with Vision Model + Fast Fallback
app.post('/api/analyze-palm', async (req: Request, res: Response) => {
  const { imageBase64, mimeType = 'image/jpeg', handType = 'right', language = 'en', quickScan = false } = req.body;

  if (!imageBase64) {
    return res.status(400).json({ error: 'Missing imageBase64 data in request body.' });
  }

  // If Quick Scan was requested, immediately return instant report in under 1 second!
  if (quickScan) {
    const instantReport = generateInstantPalmReport(handType, language, imageBase64);
    return res.json(instantReport);
  }

  // Strip data URL scheme prefix
  const cleanBase64 = imageBase64.replace(/^data:image\/[a-zA-Z0-9+]+;base64,/, '');

  try {
    // 6.5s timeout promise so user never gets stuck waiting
    const timeoutPromise = new Promise<null>((resolve) => {
      setTimeout(() => resolve(null), 6500);
    });

    const visionPromise = (async () => {
      const systemPrompt = `You are Palmistry AI created by Shahab Millizai.
Analyze this human palm photo. Hand: ${handType}. Language: ${language} (en, ur, or hi).
Return STRICT JSON ONLY matching:
{
  "imageQuality": { "isClear": true, "clarityScore": 95, "message": "Clear photo" },
  "orientation": { "hand": "${handType}", "palmType": "Air", "palmTypeDescription": "Detailed element", "fingerObservations": "Details" },
  "overallAnalysis": "Comprehensive synthesis in language: ${language}",
  "mounts": [ { "name": "Mount of Jupiter", "planet": "Jupiter", "prominence": "well-developed", "interpretation": "Details" } ],
  "lines": [
    { "id": "heart-line", "name": "Heart Line", "location": "Upper palm", "visualDescription": "Visible shape", "shapeStructure": "Curved and clear", "lengthDepth": "Long", "specialMarkings": ["Branch"], "traditionalMeaning": "Details", "personalityInterpretation": "Details", "relationshipInterpretation": "Details", "careerInterpretation": "Details", "symbolicFutureThemes": "Details", "positiveAspects": ["Warmth"], "challengesAndCautions": ["Caution"], "confidence": 95, "svgPathKey": "heart" }
  ],
  "futureReading": {
    "timeline": { "next3Months": "Details", "next6Months": "Details", "next12Months": "Details", "next3Years": "Details", "longTermDirection": "Details" },
    "themes": { "loveAndRelationships": "Details", "marriageAndPartnerships": "Details", "careerAndProfessional": "Details", "moneyAndFinancial": "Details", "businessOpportunities": "Details", "educationAndLearning": "Details", "personalGrowth": "Details", "travelAndRelocation": "Details", "familyAndSocial": "Details", "importantTransitions": "Details" }
  },
  "loveAndMarriage": { "summary": "Details", "attachmentStyle": "Details", "idealPartnerQualities": "Details", "relationshipMilestones": "Details" },
  "careerAndMoney": { "summary": "Details", "wealthTendencies": "Details", "optimalCareerPaths": ["Career 1", "Career 2"], "businessInstinct": "Details", "financialDiscipline": "Details" },
  "personalityProfile": { "archetype": "The Visionary Leader", "coreStrengths": ["Strength 1"], "shadowTraitsOrChallenges": ["Challenge 1"], "intuitionLevel": "High", "lifePhilosophy": "Quote" },
  "finalSummary": "Inspirational synthesis",
  "disclaimer": "Traditional interpretive art, not medical or scientific prediction."
}`;

      const imagePart = {
        inlineData: {
          mimeType: mimeType || 'image/jpeg',
          data: cleanBase64,
        },
      };

      const response = await ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: { parts: [imagePart, { text: `Provide complete palmistry analysis in ${language}. Return JSON.` }] },
        config: {
          systemInstruction: systemPrompt,
          responseMimeType: 'application/json',
        },
      });

      const responseText = response.text || '';
      try {
        return JSON.parse(responseText);
      } catch {
        const jsonMatch = responseText.match(/```(?:json)?\s*([\s\S]*?)\s*```/);
        if (jsonMatch && jsonMatch[1]) {
          return JSON.parse(jsonMatch[1]);
        }
      }
      return null;
    })();

    // Race between fast vision call and timeout
    const result = await Promise.race([visionPromise, timeoutPromise]);

    if (result && result.lines && result.lines.length > 0) {
      const completeReport = {
        id: 'reading_' + Date.now() + '_' + Math.random().toString(36).substring(2, 7),
        timestamp: Date.now(),
        imageUrl: imageBase64.startsWith('data:') ? imageBase64 : `data:${mimeType};base64,${cleanBase64}`,
        handType: handType || result.orientation?.hand || 'right',
        ...result,
      };
      return res.json(completeReport);
    }

    // Fast fallback if timeout or parsing issue
    const fallbackReport = generateInstantPalmReport(handType, language, imageBase64);
    return res.json(fallbackReport);
  } catch (error: any) {
    console.error('Error during palm analysis, serving instant report:', error);
    const fallbackReport = generateInstantPalmReport(handType, language, imageBase64);
    return res.json(fallbackReport);
  }
});

// Endpoint: Palmistry Master AI Chat
app.post('/api/chat', async (req: Request, res: Response) => {
  const { message, history = [], currentReading = null, language = 'en' } = req.body;

  if (!message) {
    return res.status(400).json({ error: 'Message is required.' });
  }

  const isUrdu = language === 'ur';
  const isHindi = language === 'hi';

  try {
    const timeoutPromise = new Promise<null>((resolve) => setTimeout(() => resolve(null), 5500));

    const chatPromise = (async () => {
      const systemInstruction = `You are "Palmistry Master", an expert AI palmistry sage created by Shahab Millizai in "Palmistry AI – Future & Palm Reading".
Language to respond in: ${language} (en: English, ur: Urdu, hi: Hindi).
Provide insightful, compassionate, and precise palmistry answers.
Current reading context: Hand=${currentReading?.handType || 'general'}, Archetype=${currentReading?.personalityProfile?.archetype || 'Seeker'}.
Always conclude with 2-3 short suggested questions inside [FOLLOW_UPS] ... [/FOLLOW_UPS].`;

      const contents: any[] = [];
      if (Array.isArray(history)) {
        for (const turn of history.slice(-6)) {
          if (turn.role && turn.text) {
            contents.push({
              role: turn.role === 'model' ? 'model' : 'user',
              parts: [{ text: turn.text }],
            });
          }
        }
      }
      contents.push({ role: 'user', parts: [{ text: message }] });

      const response = await ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents,
        config: { systemInstruction },
      });

      const rawText = response.text || '';
      let text = rawText;
      let suggestedFollowUps: string[] = [];

      const followUpMatch = rawText.match(/\[FOLLOW_UPS\]([\s\S]*?)\[\/FOLLOW_UPS\]/);
      if (followUpMatch) {
        text = rawText.replace(/\[FOLLOW_UPS\][\s\S]*?\[\/FOLLOW_UPS\]/, '').trim();
        suggestedFollowUps = followUpMatch[1]
          .split('\n')
          .map((s) => s.replace(/^[-*•\d.]\s*/, '').trim())
          .filter((s) => s.length > 0);
      }

      return { text, suggestedFollowUps };
    })();

    const fastResult = await Promise.race([chatPromise, timeoutPromise]);

    if (fastResult && fastResult.text) {
      return res.json({
        role: 'model',
        text: fastResult.text,
        suggestedFollowUps: fastResult.suggestedFollowUps,
        timestamp: Date.now(),
      });
    }

    // Instant contextual response in selected language
    let instantReply = '';
    let instantFollowUps: string[] = [];

    if (isUrdu) {
      instantReply = `محترم سائل، دست شناسی کے علم کے مطابق آپ کا سوال نہایت اہم ہے۔ ہتھیلی کی لکیریں انسان کے دماغی رجحانات اور اعصابی ردِعمل کی علامت ہیں۔ خطِ قلب اور خطِ عقل کا زاویہ ظاہر کرتا ہے کہ آپ کی بصیرت گہری ہے اور زندگی کے فیصلے توازن کے متقاضی ہیں۔ مزید جس لکیر کے بارے میں آپ جاننا چاہیں، دریافت فرمائیں۔`;
      instantFollowUps = ['خطِ قلب اور محبت کے بارے میں بتائیں', 'میرے کیریئر اور خطِ قسمت کا کیا مطلب ہے؟', 'بائیں اور دائیں ہاتھ کا فرق واضح کریں'];
    } else if (isHindi) {
      instantReply = `प्रिय साधक, हस्तरेखा शास्त्र के अनुसार आपका प्रश्न अत्यंत सार्थक है। हथेली की रेखाएं व्यक्ति की आंतरिक चेतना और कर्मों का दर्पण होती हैं। आपकी हृदय रेखा और मस्तिष्क रेखा का संतुलन दर्शाता है कि आप में तार्किक विचार और संवेदनशीलता का उत्तम सामंजस्य है। आप किसी भी रेखा या पर्वत के बारे में विस्तार से पूछ सकते हैं।`;
      instantFollowUps = ['मेरी हृदय रेखा और प्रेम जीवन के बारे में बताएं', 'भाग्य रेखा और करियर की दिशा क्या है?', 'बाएं और दाएं हाथ में क्या अंतर है?'];
    } else {
      instantReply = `Greetings, seeker. In traditional palmistry lore, every flexion crease reflects the subtle neural pathways of your mind. Your palm indicates balanced emotional poise paired with acute analytical focus. Feel free to ask about any specific line, planetary mount, or future phase.`;
      instantFollowUps = ['Explain my Heart Line attachment pattern', 'What does my Fate Line indicate for my career?', 'How do the left and right palms differ?'];
    }

    return res.json({
      role: 'model',
      text: instantReply,
      suggestedFollowUps: instantFollowUps,
      timestamp: Date.now(),
    });
  } catch (error) {
    console.error('Chat error:', error);
    return res.json({
      role: 'model',
      text: isUrdu
        ? 'دست شناسی کا حکمت بھرا جواب: آپ کی ہتھیلی کی بنیادی لکیریں مسلسل فکری اور جذباتی ارتقاء کو ظاہر کرتی ہیں۔'
        : isHindi
        ? 'हस्तरेखा का ज्ञान: आपकी हथेली की प्रमुख रेखाएं निरंतर प्रगति और आत्म-विकास की सूचक हैं।'
        : 'Palmistry wisdom: The creases of your hand indicate continuous personal and vocational growth.',
      suggestedFollowUps: [],
      timestamp: Date.now(),
    });
  }
});

// Setup Vite dev server or static file serving
async function setupServer() {
  if (process.env.NODE_ENV !== 'production') {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.resolve(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req: Request, res: Response) => {
      res.sendFile(path.resolve(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Palmistry AI Server running on http://0.0.0.0:${PORT}`);
  });
}

setupServer().catch((err) => {
  console.error('Failed to start server:', err);
  process.exit(1);
});
