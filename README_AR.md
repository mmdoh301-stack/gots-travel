# GOTS Travel — نسخة متوافقة مع Vercel

## مهم
النسخة السابقة كانت PHP/MySQL ولا تعمل مباشرة على Vercel. هذه النسخة تستبدل PHP بدوال Vercel Serverless وتستخدم Supabase لقاعدة البيانات وتسجيل دخول لوحة الإدارة.

## ستحتاج إلى حسابين مجانيين للبدء
1. Vercel: https://vercel.com/signup
2. Supabase: https://supabase.com/dashboard

لا ترسل كلمة مرورك أو مفاتيح المشروع في المحادثة.

## الخطوة 1 — إعداد Supabase
1. أنشئ حساباً في Supabase ثم New project.
2. احتفظ باسم المشروع وكلمة مرور قاعدة البيانات في مكان آمن.
3. افتح SQL Editor ثم New query.
4. انسخ محتوى `supabase/schema.sql` وشغّله.
5. من Authentication > Users أنشئ مستخدم المدير يدوياً (Create user) بالبريد وكلمة مرور قوية.
6. عطّل التسجيل العام للمستخدمين من Authentication > Providers / Sign up settings إن كان مفعلاً. لا تنشئ حسابات عامة للزوار.

## الخطوة 2 — رفع المشروع إلى GitHub
1. أنشئ مستودعاً جديداً خاصاً على https://github.com/new
2. ارفع كل محتويات هذا المجلد إلى المستودع (لا ترفع ملف .env أو مفاتيح سرية).
3. تأكد أن `index.html` في جذر المستودع.

## الخطوة 3 — النشر على Vercel
1. افتح https://vercel.com/new
2. اختر Import Git Repository واربط GitHub.
3. اختر مستودع GOTS Travel ثم Deploy.
4. من Project > Settings > Environment Variables أضف:
   - `SUPABASE_URL` = Project URL من Supabase > Project Settings > API
   - `SUPABASE_ANON_KEY` = publishable/anon key من Supabase > Project Settings > API
   - `SUPABASE_SERVICE_ROLE_KEY` = secret service_role key من نفس الصفحة (سرّي جداً، لا تضعه في HTML ولا GitHub)
5. اختر Production وPreview حسب حاجتك، ثم Save.
6. اذهب إلى Deployments واعمل Redeploy لآخر نسخة بعد إضافة المتغيرات.

## الخطوة 4 — اختبار النظام
1. افتح رابط Vercel.
2. أرسل طلباً تجريبياً من نموذج الموقع.
3. تحقق من ظهوره في Supabase Table Editor > bookings.
4. افتح `https://YOUR-VERCEL-DOMAIN/admin/` وسجل دخول المدير.
5. غيّر حالة طلب تجريبي وتأكد من حفظها.

## الخطوة 5 — ربط النطاق goldenoceantrvl.com
بعد نجاح النسخة التجريبية:
1. في Vercel > Project > Settings > Domains أضف `goldenoceantrvl.com` و`www.goldenoceantrvl.com`.
2. اتبع سجلات DNS التي يعرضها Vercel حرفياً لدى الجهة التي تدير DNS للنطاق.
3. لا تغيّر سجلات البريد MX أو سجلات أخرى لا يطلب Vercel تعديلها.
4. انتظر تحقق النطاق وصدور HTTPS.

## ملاحظات أمان وتشغيل
- لا تشارك `SUPABASE_SERVICE_ROLE_KEY` مع أي شخص؛ يمنح صلاحيات واسعة.
- لوحة الإدارة تعتمد على Supabase Auth وRLS. أنشئ المدير يدوياً فقط.
- النسخة الحالية تحفظ طلبات الحجز والاستفسار، وليست حجزاً فورياً بمقاعد متاحة أو دفعاً إلكترونياً.
- لم نضف إشعارات بريدية أو بوابة دفع أو تقويم توافر.
- اختبر الموقع والروابط والنموذج على الهاتف والكمبيوتر قبل تحويل النطاق الأساسي.
- فعّل نسخاً احتياطية لقاعدة البيانات، وأضف سياسة خصوصية وموافقة مناسبة لجمع بيانات العملاء.
