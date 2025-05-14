# دليل التثبيت

هذا الدليل يشرح كيفية تثبيت وإعداد تطبيق AI Interview Pro على بيئتك المحلية أو الخادم الخاص بك.

## المتطلبات الأساسية

قبل البدء، تأكد من توفر المتطلبات التالية:

- **Python 3.8+** - لغة البرمجة الأساسية للتطبيق
- **pip** - مدير حزم Python
- **مفتاح API من OpenAI** - مطلوب لاستخدام خدمات الذكاء الاصطناعي

## خطوات التثبيت

### 1. استنساخ المشروع

قم باستنساخ المشروع من GitHub إلى جهازك المحلي:

```bash
git clone https://github.com/yourusername/ai-interview-pro.git
cd ai-interview-pro
```

### 2. إنشاء بيئة افتراضية

من الأفضل استخدام بيئة افتراضية لعزل تثبيت الحزم الخاصة بالمشروع:

```bash
# لنظام Linux/macOS
python -m venv venv
source venv/bin/activate

# لنظام Windows
python -m venv venv
venv\Scripts\activate
```

### 3. تثبيت المتطلبات

قم بتثبيت جميع المكتبات والحزم المطلوبة:

```bash
pip install -r requirements.txt
```

### 4. إعداد متغيرات البيئة

قم بإنشاء ملف `.env` في المجلد الرئيسي للمشروع وإضافة المتغيرات التالية:

```
OPENAI_API_KEY=your_openai_api_key_here
SESSION_SECRET=your_random_secret_key_here
```

لنظام Linux/macOS يمكنك أيضًا تعيين المتغيرات مباشرة في الجلسة:

```bash
export OPENAI_API_KEY=your_openai_api_key_here
export SESSION_SECRET=your_random_secret_key_here
```

لنظام Windows:

```bash
set OPENAI_API_KEY=your_openai_api_key_here
set SESSION_SECRET=your_random_secret_key_here
```

### 5. تشغيل التطبيق

لتشغيل التطبيق في بيئة التطوير:

```bash
python main.py
```

أو باستخدام Gunicorn (مناسب للإنتاج):

```bash
gunicorn --bind 0.0.0.0:5000 --reuse-port --reload main:app
```

الآن يمكنك الوصول إلى التطبيق عبر المتصفح على العنوان: `http://localhost:5000`

## تثبيت على الخوادم

### استضافة على Replit

1. قم بإنشاء Repl جديد وحدد Python كلغة
2. قم بتحميل ملفات المشروع أو استنساخها من GitHub
3. قم بإضافة متغيرات البيئة في لوحة Secrets
4. قم بتشغيل التطبيق

### استضافة على Heroku

1. قم بإنشاء ملف `Procfile` بالمحتوى التالي:
   ```
   web: gunicorn main:app
   ```

2. قم بتسجيل الدخول إلى Heroku CLI:
   ```bash
   heroku login
   ```

3. قم بإنشاء تطبيق جديد:
   ```bash
   heroku create ai-interview-pro
   ```

4. قم بتعيين متغيرات البيئة:
   ```bash
   heroku config:set OPENAI_API_KEY=your_openai_api_key_here
   heroku config:set SESSION_SECRET=your_random_secret_key_here
   ```

5. قم بنشر التطبيق:
   ```bash
   git push heroku main
   ```

### استضافة على خادم VPS (مثل DigitalOcean، AWS EC2)

1. قم بتثبيت Python ومتطلباته:
   ```bash
   sudo apt update
   sudo apt install python3 python3-pip python3-venv
   ```

2. اتبع خطوات التثبيت الأساسية المذكورة أعلاه
   
3. قم بإعداد Nginx كبروكسي عكسي:
   ```bash
   sudo apt install nginx
   ```

4. قم بإنشاء ملف تكوين Nginx:
   ```bash
   sudo nano /etc/nginx/sites-available/ai-interview-pro
   ```

   أضف التكوين التالي:
   ```nginx
   server {
       listen 80;
       server_name yourdomain.com www.yourdomain.com;

       location / {
           proxy_pass http://127.0.0.1:5000;
           proxy_set_header Host $host;
           proxy_set_header X-Real-IP $remote_addr;
       }
   }
   ```

5. قم بتفعيل التكوين وإعادة تشغيل Nginx:
   ```bash
   sudo ln -s /etc/nginx/sites-available/ai-interview-pro /etc/nginx/sites-enabled
   sudo nginx -t
   sudo systemctl restart nginx
   ```

6. قم بإعداد Supervisor لإدارة العملية:
   ```bash
   sudo apt install supervisor
   sudo nano /etc/supervisor/conf.d/ai-interview-pro.conf
   ```

   أضف التكوين التالي:
   ```ini
   [program:ai-interview-pro]
   directory=/path/to/ai-interview-pro
   command=/path/to/ai-interview-pro/venv/bin/gunicorn --workers 3 --bind 127.0.0.1:5000 main:app
   autostart=true
   autorestart=true
   stderr_logfile=/var/log/ai-interview-pro/error.log
   stdout_logfile=/var/log/ai-interview-pro/access.log
   environment=OPENAI_API_KEY="your_openai_api_key_here",SESSION_SECRET="your_random_secret_key_here"
   ```

7. أنشئ دليل السجلات وحدّث Supervisor:
   ```bash
   sudo mkdir -p /var/log/ai-interview-pro
   sudo supervisorctl reread
   sudo supervisorctl update
   sudo supervisorctl start ai-interview-pro
   ```

## استكشاف الأخطاء وإصلاحها

### مشكلة: خطأ في تثبيت المتطلبات

```
ERROR: Could not install packages due to an OSError
```

**الحل:** تأكد من وجود حقوق كافية للكتابة في دليل التثبيت، أو استخدم الخيار `--user` مع pip.

### مشكلة: خطأ في مفتاح API

```
OpenAI API error: Invalid API key provided
```

**الحل:** تحقق من أن مفتاح API صحيح ومعيّن بشكل صحيح في متغيرات البيئة.

### مشكلة: التطبيق لا يعمل

**الحل:** تحقق من سجلات الخطأ، وتأكد من عدم استخدام المنفذ المحدد بواسطة تطبيق آخر.

## التحديثات والصيانة

للحصول على أحدث الإصدارات:

```bash
git pull origin main
pip install -r requirements.txt --upgrade
```

## الموارد الإضافية

- [توثيق Python](https://docs.python.org/)
- [توثيق Flask](https://flask.palletsprojects.com/)
- [منصة OpenAI](https://platform.openai.com/docs/)