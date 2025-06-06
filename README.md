# AI Interview Pro

<div align="center">
    <img src="static/images/logo.png" alt="AI Interview Pro Logo" width="200">
    <h3>مولد أسئلة المقابلات الذكي</h3>
    <p>منصة متكاملة تستخدم الذكاء الاصطناعي لإنشاء أسئلة مقابلات مخصصة بناءً على تحليل السير الذاتية ووصف الوظائف</p>
</div>

## 🌟 المميزات الرئيسية

✅ **توليد أسئلة مخصصة**: إنشاء أسئلة مقابلات مخصصة بناءً على تحليل السيرة الذاتية ووصف الوظيفة.

✅ **تحليل السيرة الذاتية**: تحليل شامل للسيرة الذاتية مقارنة بمتطلبات الوظيفة مع رسوم بيانية ونسبة توافق.

✅ **المقابلات الصوتية**: إجراء مقابلات صوتية تفاعلية مع محاكي المقابلات بالذكاء الاصطناعي.

✅ **حفظ وإدارة الأسئلة**: حفظ مجموعات الأسئلة المولدة للرجوع إليها لاحقًا.

✅ **واجهة سهلة الاستخدام**: تصميم عصري وسهل الاستخدام مع تجربة مستخدم مميزة.

## 📋 محتويات المشروع

- [نظرة عامة](#نظرة-عامة)
- [لقطات شاشة](#لقطات-شاشة)
- [التثبيت](#التثبيت)
- [كيفية الاستخدام](#كيفية-الاستخدام)
- [المتطلبات](#المتطلبات)
- [هيكل المشروع](#هيكل-المشروع)
- [التقنيات المستخدمة](#التقنيات-المستخدمة)
- [المساهمة](#المساهمة)
- [الترخيص](#الترخيص)

## 🔍 نظرة عامة

**AI Interview Pro** هو تطبيق ويب متكامل يساعد مسؤولي التوظيف والمرشحين في عملية المقابلات. يستخدم التطبيق نماذج الذكاء الاصطناعي من OpenAI لتحليل السير الذاتية ووصف الوظائف، وتوليد أسئلة مقابلات مخصصة تستهدف المهارات والخبرات المطلوبة.

يتضمن التطبيق أربع وحدات رئيسية:
1. **مولد الأسئلة**: يقوم بإنشاء أسئلة مقابلات مخصصة في أربع فئات (تقنية، خبرة، سلوكية، فجوات المهارات).
2. **تحليل السيرة الذاتية**: يقدم تحليلًا شاملًا لمدى توافق المرشح مع متطلبات الوظيفة.
3. **المقابلات الصوتية**: يتيح إجراء مقابلات تفاعلية صوتية مع محاكي المقابلات بالذكاء الاصطناعي.
4. **إدارة الأسئلة المحفوظة**: يتيح حفظ وإدارة مجموعات الأسئلة التي تم إنشاؤها سابقًا.

## 📸 لقطات شاشة

<div align="center">
    <img src="static/images/screenshot-home.png" alt="الصفحة الرئيسية" width="45%">
    <img src="static/images/screenshot-analysis.png" alt="تحليل السيرة الذاتية" width="45%">
    <img src="static/images/screenshot-voice.png" alt="المقابلات الصوتية" width="45%">
    <img src="static/images/screenshot-saved.png" alt="الأسئلة المحفوظة" width="45%">
</div>

## ⚙️ التثبيت

### المتطلبات الأساسية
- Python 3.8+
- pip (مدير حزم Python)
- مفتاح API من OpenAI

### خطوات التثبيت

1. استنساخ المشروع:
```bash
git clone https://github.com/yourusername/ai-interview-pro.git
cd ai-interview-pro
```

2. إنشاء بيئة افتراضية وتفعيلها:
```bash
python -m venv venv
source venv/bin/activate  # لنظام Linux/macOS
# أو
venv\Scripts\activate  # لنظام Windows
```

3. تثبيت المتطلبات:
```bash
pip install -r requirements.txt
```

4. إعداد متغيرات البيئة:
```bash
export OPENAI_API_KEY=your_openai_api_key
export SESSION_SECRET=your_secret_key
# أو في Windows
set OPENAI_API_KEY=your_openai_api_key
set SESSION_SECRET=your_secret_key
```

5. تشغيل التطبيق:
```bash
python main.py
```

الآن يمكنك الوصول إلى التطبيق عبر المتصفح على العنوان: `http://localhost:5000`

## 🚀 كيفية الاستخدام

### توليد أسئلة المقابلات

1. انتقل إلى الصفحة الرئيسية
2. أدخل نص السيرة الذاتية في الحقل المخصص (أو استخدم الزر "تحميل عينة")
3. أدخل وصف الوظيفة في الحقل المخصص
4. (اختياري) قم بتخصيص الإعدادات المتقدمة:
   - عدد الأسئلة لكل فئة
   - مجال التركيز
   - مستوى الصعوبة
5. انقر على زر "توليد أسئلة المقابلة"
6. استعرض الأسئلة المولدة مقسمة حسب الفئة
7. استخدم أزرار الحفظ أو الطباعة أو التنزيل لإدارة النتائج

### تحليل السيرة الذاتية

1. انتقل إلى صفحة "تحليل السيرة الذاتية"
2. أدخل نص السيرة الذاتية ووصف الوظيفة
3. انقر على زر "تحليل السيرة الذاتية"
4. استعرض التحليل الشامل الذي يتضمن:
   - نسبة التوافق الإجمالية
   - تحليل المهارات مع رسم بياني
   - تحليل الخبرة والمؤهلات
   - توصيات للمقابلة

### المقابلات الصوتية

1. انتقل إلى صفحة "المقابلات الصوتية"
2. أدخل تفاصيل الوظيفة ومستوى الخبرة
3. حدد مجالات التركيز ومدة المقابلة
4. (اختياري) أضف سيرتك الذاتية لتخصيص الأسئلة
5. انقر على زر "بدء المقابلة الصوتية"
6. اسمح بالوصول إلى الميكروفون عند الطلب
7. استمع لأسئلة المحاور الافتراضي وأجب بصوتك
8. استعرض ملخص وتقييم المقابلة بعد الانتهاء

## 📋 المتطلبات

- Python 3.8+
- Flask 2.0+
- OpenAI API (نموذج GPT-4o)
- Bootstrap 5
- jQuery
- Chart.js (للرسوم البيانية)

للاطلاع على القائمة الكاملة للمتطلبات، راجع ملف `requirements.txt`.

## 📁 هيكل المشروع

```
ai-interview-pro/
├── static/
│   ├── css/
│   │   ├── style.css
│   │   └── voice_interview.css
│   ├── js/
│   │   ├── main.js
│   │   ├── saved_questions.js
│   │   ├── resume_analysis.js
│   │   └── voice_interview.js
│   └── images/
│       ├── logo.png
│       └── screenshots/
├── templates/
│   ├── index.html
│   ├── saved_questions.html
│   ├── resume_analysis.html
│   └── voice_interview.html
├── services/
│   └── openai_service.py
├── app.py
├── forms.py
├── main.py
├── requirements.txt
└── README.md
```

## 🔧 التقنيات المستخدمة

- **Backend:** Python, Flask
- **Frontend:** HTML, CSS, JavaScript, Bootstrap 5
- **AI Integration:** OpenAI GPT-4o
- **Data Visualization:** Chart.js
- **Icons:** Feather Icons

## 🤝 المساهمة

نرحب بمساهماتكم! إذا كنت ترغب في المساهمة في هذا المشروع، يرجى اتباع الخطوات التالية:

1. افتح issue لمناقشة التغيير الذي ترغب في إجرائه
2. قم بعمل fork للمشروع
3. أنشئ فرعًا جديدًا (`git checkout -b feature/amazing-feature`)
4. قم بإجراء التغييرات وتأكيدها (`git commit -m 'Add amazing feature'`)
5. ادفع التغييرات إلى الفرع (`git push origin feature/amazing-feature`)
6. افتح طلب سحب (Pull Request)

## 📄 الترخيص

تم ترخيص هذا المشروع تحت رخصة MIT - راجع ملف `LICENSE` للتفاصيل.

---

<div align="center">
    <p>تم تطويره بواسطة فريق AI Interview Pro</p>
</div>