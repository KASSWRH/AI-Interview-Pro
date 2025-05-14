# توثيق واجهة برمجة التطبيقات (API)

هذا المستند يشرح واجهات برمجة التطبيقات (APIs) المتاحة في تطبيق AI Interview Pro. يمكن استخدام هذه الواجهات لدمج وظائف التطبيق في تطبيقات أخرى أو لتطوير امتدادات خاصة.

## نقاط النهاية الرئيسية

### توليد أسئلة المقابلات

#### `POST /generate`

ينشئ أسئلة مقابلات مخصصة بناءً على السيرة الذاتية ووصف الوظيفة.

**طلب:**

```json
{
  "resume_text": "نص السيرة الذاتية...",
  "job_description": "نص وصف الوظيفة...",
  "options": {
    "question_count": 3,
    "focus_area": "balanced",
    "difficulty_level": "intermediate"
  }
}
```

**المعلمات:**

- `resume_text` (مطلوب): النص الكامل للسيرة الذاتية.
- `job_description` (مطلوب): النص الكامل لوصف الوظيفة.
- `options` (اختياري): خيارات إضافية لتخصيص الأسئلة:
  - `question_count`: عدد الأسئلة لكل فئة (الافتراضي: 3)
  - `focus_area`: مجال التركيز (الخيارات: "balanced", "technical", "experience", "behavioral", "skill_gaps")
  - `difficulty_level`: مستوى الصعوبة (الخيارات: "entry", "intermediate", "advanced", "expert")

**استجابة:**

```json
{
  "success": true,
  "questions": {
    "technical_questions": ["سؤال 1", "سؤال 2", "سؤال 3"],
    "experience_questions": ["سؤال 1", "سؤال 2", "سؤال 3"],
    "behavioral_questions": ["سؤال 1", "سؤال 2", "سؤال 3"],
    "skill_gap_questions": ["سؤال 1", "سؤال 2", "سؤال 3"]
  },
  "match_score": 85
}
```

**رموز الحالة:**

- `200 OK`: تم إنشاء الأسئلة بنجاح
- `400 Bad Request`: معلمات غير صالحة أو مفقودة
- `401 Unauthorized`: مفتاح API غير صالح أو مفقود
- `500 Internal Server Error`: خطأ في الخادم

### تحليل السيرة الذاتية

#### `POST /analyze-resume`

يحلل السيرة الذاتية مقارنة بوصف الوظيفة ويقدم تحليلًا مفصلاً.

**طلب:**

```json
{
  "resume_text": "نص السيرة الذاتية...",
  "job_description": "نص وصف الوظيفة..."
}
```

**المعلمات:**

- `resume_text` (مطلوب): النص الكامل للسيرة الذاتية.
- `job_description` (مطلوب): النص الكامل لوصف الوظيفة.

**استجابة:**

```json
{
  "success": true,
  "analysis": {
    "overallMatchScore": 85,
    "skillMatch": {
      "matched": ["مهارة 1", "مهارة 2", "مهارة 3"],
      "missing": ["مهارة 4", "مهارة 5"]
    },
    "experienceMatch": {
      "years": "4 سنوات (تلبي المتطلبات)",
      "relevance": "مرتفع",
      "highlights": ["نقطة 1", "نقطة 2", "نقطة 3"]
    },
    "educationMatch": {
      "degree": "علوم الحاسوب (يلبي المتطلبات)",
      "relevantCourses": ["مساق 1", "مساق 2"]
    },
    "recommendations": ["توصية 1", "توصية 2", "توصية 3"]
  }
}
```

**رموز الحالة:**
- نفس رموز حالة نقطة نهاية `/generate`

### حفظ الأسئلة

#### `POST /save-questions`

يحفظ مجموعة من الأسئلة المولدة لاستخدامها لاحقًا.

**طلب:**

```json
{
  "name": "اسم مجموعة الأسئلة",
  "notes": "ملاحظات اختيارية...",
  "questions": {
    "technical_questions": ["سؤال 1", "سؤال 2", "سؤال 3"],
    "experience_questions": ["سؤال 1", "سؤال 2", "سؤال 3"],
    "behavioral_questions": ["سؤال 1", "سؤال 2", "سؤال 3"],
    "skill_gap_questions": ["سؤال 1", "سؤال 2", "سؤال 3"]
  }
}
```

**المعلمات:**

- `name` (مطلوب): اسم مجموعة الأسئلة.
- `notes` (اختياري): ملاحظات إضافية حول مجموعة الأسئلة.
- `questions` (مطلوب): كائن يحتوي على الأسئلة المولدة مقسمة حسب الفئة.

**استجابة:**

```json
{
  "success": true
}
```

**رموز الحالة:**
- `200 OK`: تم حفظ الأسئلة بنجاح
- `400 Bad Request`: معلمات غير صالحة أو مفقودة
- `500 Internal Server Error`: خطأ في الخادم

### بدء مقابلة صوتية

#### `POST /api/start-voice-interview`

يبدأ جلسة مقابلة صوتية تفاعلية.

**طلب:**

```json
{
  "position": "مطور واجهة أمامية",
  "level": "mid",
  "focus_areas": ["technical", "behavioral"],
  "duration": "medium",
  "resume": "نص السيرة الذاتية (اختياري)..."
}
```

**المعلمات:**

- `position` (مطلوب): عنوان المنصب أو الوظيفة.
- `level` (مطلوب): مستوى الخبرة (الخيارات: "entry", "junior", "mid", "senior", "lead").
- `focus_areas` (اختياري): مصفوفة تحدد مجالات التركيز للأسئلة.
- `duration` (اختياري): مدة المقابلة المفضلة (الخيارات: "short", "medium", "long").
- `resume` (اختياري): نص السيرة الذاتية لتخصيص الأسئلة.

**استجابة:**

```json
{
  "success": true,
  "message": "تم إعداد المقابلة الصوتية بنجاح"
}
```

**رموز الحالة:**
- نفس رموز حالة نقطة نهاية `/generate`

### تعيين مفتاح API

#### `POST /api/set-api-key`

يعيّن أو يحدّث مفتاح API الخاص بالمستخدم.

**طلب:**

```json
{
  "api_key": "sk-abc123..."
}
```

**المعلمات:**

- `api_key` (مطلوب): مفتاح API صالح من OpenAI.

**استجابة:**

```json
{
  "success": true,
  "message": "تم استلام مفتاح API"
}
```

**رموز الحالة:**
- `200 OK`: تم تعيين المفتاح بنجاح
- `400 Bad Request`: مفتاح غير صالح أو مفقود
- `500 Internal Server Error`: خطأ في الخادم

## نقاط نهاية العرض

الواجهات التالية ترجع صفحات HTML:

- `GET /`: الصفحة الرئيسية مع مولد أسئلة المقابلات
- `GET /saved-questions`: صفحة عرض وإدارة الأسئلة المحفوظة
- `GET /resume-analysis`: صفحة تحليل السيرة الذاتية
- `GET /voice-interview`: صفحة المقابلات الصوتية

## أمثلة الاستخدام

### مثال: توليد أسئلة مقابلة باستخدام cURL

```bash
curl -X POST http://localhost:5000/generate \
  -H "Content-Type: application/json" \
  -d '{
    "resume_text": "نص السيرة الذاتية...",
    "job_description": "نص وصف الوظيفة...",
    "options": {
      "question_count": 3,
      "focus_area": "technical",
      "difficulty_level": "advanced"
    }
  }'
```

### مثال: تحليل السيرة الذاتية باستخدام JavaScript

```javascript
async function analyzeResume(resumeText, jobDescription) {
  try {
    const response = await fetch('/analyze-resume', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        resume_text: resumeText,
        job_description: jobDescription
      })
    });
    
    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.error || 'حدث خطأ أثناء تحليل السيرة الذاتية');
    }
    
    return data.analysis;
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
}
```

## مصادقة API

جميع طلبات API تتطلب مفتاح API صالح من OpenAI. يتم التحقق من وجود هذا المفتاح في متغيرات البيئة على الخادم، أو يمكن إرساله كجزء من إعدادات المستخدم.

للحصول على مفتاح API من OpenAI، يرجى زيارة موقع [OpenAI](https://platform.openai.com/account/api-keys).