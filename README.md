# 🎤 מחולל קול זמרים AI - Progressive Web App

![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)
![PWA](https://img.shields.io/badge/PWA-Ready-purple.svg)

אפליקציית וב מתקדמת למחולל קול זמרים עם שיבוט קול AI, אפקטים מקצועיים והקלטה איכותית.

---

## ✨ תכונות עיקריות

### 🎙️ הקלטת אודיו
- **הקלטה בזמן אמת** מהמיקרופון
- **ויזואליזציה חיה** של גלי האודיו
- **טעינת קבצי אודיו** קיימים (MP3, WAV, M4A, OGG)
- **איכות הקלטה גבוהה** - 48kHz sample rate
- **מדידת זמן הקלטה** בזמן אמת

### 🎭 שיבוט קול זמרים
- בחירה מבין **5 סגנונות קול** שונים:
  - זמר גברי עוצמתי 🎤
  - זמרת נשית עדינה 🎵
  - רוקר גברי 🎸
  - פופ נשי 🌟
  - ראפר 🎧
- **שמירת הקול המקורי** (אופציונלי)
- מוכן לאינטגרציה עם **Fish Audio API** או **ElevenLabs**

### 🎚️ אפקטים אודיו מקצועיים
- **🌊 Reverb** (הד חלל) - סימולציה של חללים שונים
- **📢 Echo** (הד כפול) - עיכוב והד עם משוב
- **🎵 Pitch Shift** (שינוי גובה צליל) - ±12 סמיטונים
- **🎛️ Bass EQ** (בס) - שליטה בתדרים נמוכים (±20dB)
- **🎚️ Treble EQ** (טרבל) - שליטה בתדרים גבוהים (±20dB)
- **החלת אפקטים בזמן אמת** עם Web Audio API

### 🎹 מיקסר ווקאל + מוזיקה
- **טעינת מוזיקת רקע** (קריוקי/פלייבק)
- **ערבול ווקאל + מוזיקה** במדויק
- **שליטה נפרדת בעוצמה**:
  - עוצמת מוזיקת רקע (0-100%)
  - עוצמת ווקאל (0-100%)
- **סנכרון אוטומטי** של הטראקים

### 🎧 נגן ומערכת ייצוא
- **נגן אינטראקטיבי** עם שליטה מלאה
- **פס התקדמות** ויזואלי
- **תצוגת זמן** (נוכחי / סך הכל)
- **ייצוא לפורמט WAV** באיכות גבוהה
- **הורדה ישירה** של הקובץ הסופי

### 📱 PWA - אפליקציה מתקדמת
- **התקנה כאפליקציה** על מסך הבית
- **עובד אופליין** (Service Worker)
- **עיצוב RTL** מושלם לעברית
- **מותאם למובייל** - כפתורים גדולים ונוחים
- **תמיכה מלאה**: iOS, Android, Desktop
- **מהירות גבוהה** עם Caching חכם

---

## 🚀 התקנה והפעלה

### דרישות מערכת

**דפדפנים נתמכים:**
- ✅ Chrome 90+ (מומלץ)
- ✅ Firefox 88+
- ✅ Safari 14+ (iOS/macOS)
- ✅ Edge 90+
- ✅ Opera 76+

**דרישות טכניות:**
- חיבור אינטרנט (להתקנה ראשונית)
- הרשאת מיקרופון (להקלטה)
- דפדפן תומך ב-Web Audio API

---

### אופציה 1: הרצה מקומית פשוטה

#### שיטה A: פתיחה ישירה בדפדפן
```bash
# פשוט פתח את index.html בדפדפן
# לחץ פעמיים על הקובץ או גרור אותו לחלון הדפדפן
```

#### שיטה B: שרת מקומי עם Python
```bash
# Python 3
python -m http.server 8000

# Python 2
python -m SimpleHTTPServer 8000

# פתח בדפדפן: http://localhost:8000
```

#### שיטה C: שרת מקומי עם Node.js
```bash
# התקן http-server
npm install -g http-server

# הרץ שרת
http-server -p 8000

# פתח בדפדפן: http://localhost:8000
```

#### שיטה D: Visual Studio Code Live Server
```bash
1. התקן תוסף "Live Server" ב-VS Code
2. לחץ ימני על index.html
3. בחר "Open with Live Server"
```

---

### אופציה 2: פרסום אונליין (חינמי!)

#### GitHub Pages (מומלץ)
```bash
# 1. צור repository חדש ב-GitHub
# 2. העלה את כל הקבצים
git init
git add .
git commit -m "Initial commit - Voice Generator PWA"
git branch -M main
git remote add origin https://github.com/USERNAME/voice-generator.git
git push -u origin main

# 3. הפעל GitHub Pages:
# Settings → Pages → Source: main branch → Save

# 4. האפליקציה תהיה זמינה ב:
# https://USERNAME.github.io/voice-generator/
```

#### Netlify (קל מאוד)
```bash
# 1. התקן Netlify CLI
npm install -g netlify-cli

# 2. התחבר ל-Netlify
netlify login

# 3. פרסם את האתר
netlify deploy --prod

# או פשוט גרור את התיקייה לאתר Netlify Drop
# https://app.netlify.com/drop
```

#### Vercel (מהיר מאוד)
```bash
# 1. התקן Vercel CLI
npm install -g vercel

# 2. פרסם
vercel

# או גרור את התיקייה לממשק הווב
# https://vercel.com/new
```

---

## 📱 התקנה כאפליקציה במובייל

### iOS (iPhone/iPad)

1. **פתח את האתר בדפדפן Safari**
2. לחץ על כפתור **שיתוף** (החץ כלפי מעלה) ⬆️
3. גלול למטה ובחר **"הוסף למסך הבית"** 📱
4. תן שם לאפליקציה ולחץ **"הוסף"**
5. כעת האפליקציה תופיע על מסך הבית שלך! 🎉

### Android

1. **פתח את האתר בדפדפן Chrome**
2. לחץ על תפריט **⋮** (שלוש נקודות)
3. בחר **"התקן אפליקציה"** או **"הוסף למסך הבית"** 📲
4. אשר את ההתקנה
5. האפליקציה תופיע במגירת האפליקציות! 🎊

**או פשוט:**
- חפש את **Banner ההתקנה** שמופיע אוטומטית בתחתית המסך
- לחץ על **"התקן"** ✅

### Desktop (Windows/Mac/Linux)

**Chrome/Edge:**
1. לחץ על אייקון **התקנה** בסרגל הכתובת 💻
2. או: תפריט ⋮ → **"התקן מחולל קול AI"**
3. האפליקציה תיפתח בחלון נפרד!

---

## 🎮 מדריך שימוש

### 1️⃣ הקלטת ווקאל

```
📍 סקציה: "הקלטת ווקאל"

1. לחץ על כפתור "🎙️ התחל הקלטה"
2. אפשר גישה למיקרופון (פעם ראשונה)
3. התחל לשיר או לדבר
4. עקוב אחרי הגלים החיים על המסך
5. לחץ "⏹️ עצור הקלטה" כשסיימת
6. ההקלטה נשמרת אוטומטית!

טיפ: 💡 הקלט לפחות 10-15 שניות לתוצאות טובות
```

**או העלה קובץ קיים:**
```
1. לחץ "📁 העלה קובץ אודיו"
2. בחר MP3, WAV, M4A או OGG
3. הקובץ יטען אוטומטית
```

---

### 2️⃣ שיבוט קול זמר

```
📍 סקציה: "שיבוט קול זמרים"

1. בחר סגנון קול מהרשימה:
   • זמר גברי עוצמתי 🎤
   • זמרת נשית עדינה 🎵
   • רוקר גברי 🎸
   • פופ נשי 🌟
   • ראפר 🎧
   
2. לחץ "✨ שבט קול"
3. המערכת תעבד את האודיו (2-3 שניות)
4. הקול המשובט מוכן!

הערה: 📝 בגרסה זו זהו דמו. 
לשיבוט קול אמיתי, חבר Fish Audio API
```

---

### 3️⃣ החלת אפקטים

```
📍 סקציה: "אפקטים אודיו"

גרור את הסליידרים להחלת אפקטים:

🌊 Reverb (0-100%):
   • 0% = יבש, ללא הד
   • 50% = חלל בינוני
   • 100% = אולם קונצרטים

📢 Echo (0-100%):
   • 0% = ללא הד
   • 50% = הד עדין
   • 100% = הד מרובה

🎵 Pitch (-12 עד +12):
   • -12 = אוקטבה למטה
   • 0 = מקורי
   • +12 = אוקטבה למעלה

🎛️ Bass (-20 עד +20 dB):
   • שליטה בתדרים נמוכים (200Hz)

🎚️ Treble (-20 עד +20 dB):
   • שליטה בתדרים גבוהים (3000Hz)

לחץ "✅ החל אפקטים" כשמוכן!
```

---

### 4️⃣ ערבול עם מוזיקת רקע

```
📍 סקציה: "פלייבק / קריוקי"

1. לחץ "📂 לחץ להעלאת קובץ מוזיקת רקע"
2. בחר קובץ אודיו (קריוקי/פלייבק)
3. התאם את העוצמות:
   • 🔊 עוצמת מוזיקת רקע (0-100%)
   • 🎤 עוצמת ווקאל (0-100%)
4. לחץ "🎵 ערבב ווקאל + מוזיקת רקע"
5. המערכת תיצור מיקס מושלם!

המלצה: 🎧
• מוזיקת רקע: 40-60%
• ווקאל: 70-90%
```

---

### 5️⃣ ניגון וייצוא

```
📍 סקציה: "נגן וייצוא"

נגן:
• לחץ "▶️" להשמעה
• לחץ "⏸️" להשהיה
• עקוב אחרי פס ההתקדמות
• ראה את הזמן הנוכחי/סך הכל

ייצוא:
1. לחץ "💾 ייצא MP3"
2. הקובץ יורד אוטומטית
3. שם הקובץ: voice-clone-TIMESTAMP.wav

אתחול:
• לחץ "🔄 אתחל הכל" להתחלה מחדש
```

---

## 🔧 אינטגרציה עם Fish Audio API

כדי לשבט קול באמת, צריך להוסיף את ה-API של Fish Audio:

### 1. קבל API Key בחינם

```bash
1. היכנס ל-https://fish.audio/
2. צור חשבון חינמי
3. עבור ל-Dashboard → API Keys
4. צור מפתח חדש והעתק אותו
```

### 2. הוסף את ה-API לקוד

פתח את `index.html` וחפש את הפונקציה `cloneVoice()` (שורה ~900):

```javascript
async function cloneVoice() {
  const selectedVoice = voiceSelect.value;
  
  if (!selectedVoice || selectedVoice === 'original') {
    showStatus('💡 נשאר עם הקול המקורי', 'info');
    return;
  }

  showStatus('🎭 משבט קול...', 'info');
  
  // **הוסף כאן את ה-API Key שלך**
  const API_KEY = 'YOUR_FISH_AUDIO_API_KEY_HERE';
  
  try {
    // המר את האודיו ל-Blob
    const audioBlob = new Blob([recordedBlob], { type: 'audio/wav' });
    
    // צור FormData
    const formData = new FormData();
    formData.append('audio', audioBlob, 'recording.wav');
    formData.append('voice_id', selectedVoice); // ID של הקול הרצוי
    
    // שלח ל-API
    const response = await fetch('https://api.fish.audio/v1/tts', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${API_KEY}`
      },
      body: formData
    });
    
    if (!response.ok) {
      throw new Error('API Error: ' + response.status);
    }
    
    // קבל את האודיו המשובט
    const clonedBlob = await response.blob();
    const arrayBuffer = await clonedBlob.arrayBuffer();
    currentAudioBuffer = await audioContext.decodeAudioData(arrayBuffer);
    
    showStatus('✨ שיבוט קול הושלם!', 'success');
    
  } catch (error) {
    console.error('Voice cloning error:', error);
    showStatus('❌ שגיאה בשיבוט קול: ' + error.message, 'error');
  }
}
```

### 3. רשימת קולות זמינים

עדכן את ה-`<select>` עם IDs אמיתיים מ-Fish Audio:

```html
<select id="voiceSelect" class="select">
  <option value="">בחר זמר מהרשימה...</option>
  <option value="male-powerful-01">זמר גברי עוצמתי 🎤</option>
  <option value="female-soft-02">זמרת נשית עדינה 🎵</option>
  <option value="male-rock-03">רוקר גברי 🎸</option>
  <option value="female-pop-04">פופ נשי 🌟</option>
  <option value="male-rap-05">ראפר 🎧</option>
  <option value="original">השאר מקורי (ללא שיבוט)</option>
</select>
```

---

## 🛠️ טכנולוגיות בשימוש

| טכנולוגיה | תיאור | שימוש |
|-----------|-------|-------|
| **HTML5** | מבנה הדף | סמנטי ונגיש |
| **CSS3** | עיצוב | Glassmorphism, RTL, Responsive |
| **JavaScript (ES6+)** | לוגיקה | Async/Await, Classes, Modules |
| **Web Audio API** | עיבוד אודיו | Nodes, Effects, Analysis |
| **MediaRecorder API** | הקלטה | הקלטת אודיו בזמן אמת |
| **Canvas API** | ויזואליזציה | ציור גלי אודיו |
| **Service Worker** | PWA | Caching, Offline support |
| **Manifest.json** | PWA | התקנה, אייקונים, הגדרות |

---

## 📊 מבנה הפרויקט

```
voice-generator-pwa/
│
├── index.html              # דף ראשי - כל האפליקציה
│   ├── <head>             # Metadata, fonts, manifest
│   ├── <style>            # CSS מוטמע מלא
│   ├── <body>             # מבנה HTML
│   └── <script>           # JavaScript מוטמע מלא
│
├── manifest.json           # הגדרות PWA
│   ├── name               # שם האפליקציה
│   ├── icons              # אייקונים (SVG inline)
│   ├── display            # standalone mode
│   ├── orientation        # portrait
│   └── shortcuts          # קיצורי דרך
│
├── service-worker.js       # Service Worker
│   ├── install            # Pre-caching
│   ├── activate           # Cache cleanup
│   ├── fetch              # Network strategies
│   └── sync               # Background operations
│
└── README.md              # התיעוד הזה
```

---

## 🎨 עיצוב וממשק משתמש

### עיקרון העיצוב: **Glassmorphism**

```css
/* אפקט זכוכית מטושטשת */
background: rgba(255, 255, 255, 0.1);
backdrop-filter: blur(10px);
border: 1px solid rgba(255, 255, 255, 0.2);
box-shadow: 0 8px 32px rgba(31, 38, 135, 0.37);
```

### פלטת צבעים

```
Primary:    #8b5cf6 (סגול)
Secondary:  #ec4899 (ורוד)
Gradient 1: #667eea (כחול-סגול)
Gradient 2: #764ba2 (סגול כהה)
Success:    #10b981 (ירוק)
Danger:     #ef4444 (אדום)
```

### RTL Support

```css
:root {
  direction: rtl;
  text-align: right;
}

/* תמיכה מלאה בעברית */
font-family: 'Heebo', sans-serif;
```

---

## 🐛 פתרון בעיות נפוצות

### ❌ המיקרופון לא עובד

**פתרון:**
1. ודא שאישרת גישה למיקרופון בדפדפן
2. בדוק ש-HTTPS מופעל (או localhost)
3. נסה דפדפן אחר (Chrome מומלץ)
4. ב-iOS: פתח ב-Safari (לא Chrome)

### ❌ האודיו לא מתנגן

**פתרון:**
1. לחץ על המסך פעם אחת (activation gesture)
2. בדוק שהעוצמה לא על אפס
3. נסה לייצא ולהשמיע מחוץ לאפליקציה
4. נקה את ה-Cache ורענן את הדף

### ❌ ההתקנה לא עובדת

**פתרון:**
1. ודא ש-HTTPS מופעל (לא HTTP)
2. בדוק שה-manifest.json נטען נכון
3. נסה במצב גלישה רגילה (לא Incognito)
4. רענן את הדף (Ctrl+F5)

### ❌ האפקטים לא נשמעים

**פתרון:**
1. ודא שהסליידרים לא על 0
2. לחץ "✅ החל אפקטים" אחרי השינויים
3. בדוק שיש אודיו טעון
4. נסה להגביר את העוצמות

### ❌ הייצוא נכשל

**פתרון:**
1. בדוק שיש אודיו להוריד
2. אפשר הורדות בדפדפן
3. נסה ייצוא שוב אחרי 5 שניות
4. בדוק שיש מספיק מקום בזיכרון

---

## 🔒 אבטחה ופרטיות

### ✅ מה האפליקציה עושה

- מקליטה אודיו **רק בהרשאתך המפורשת**
- מעבדת אודיו **לוקאלית בדפדפן**
- לא שולחת נתונים לשרתים (במצב דמו)
- לא אוספת מידע אישי
- לא משתמשת ב-Cookies
- לא עוקבת אחרי הפעילות שלך

### 🔐 שמירה על פרטיות

- כל העיבוד נעשה **על המכשיר שלך**
- אין שמירה קבועה של הקלטות
- המיקרופון נסגר אחרי כל הקלטה
- Service Worker שומר רק קבצי Cache

### ⚠️ הערות חשובות

- שיבוט קול אמיתי דורש API חיצוני
- אם מוסיפים Fish Audio - קרא את תנאי השימוש שלהם
- אל תשתמש בקולות של אנשים ללא אישורם
- שמור על הגבלות זכויות יוצרים

---

## 📈 שיפורים עתידיים

### בתוכנית הפיתוח:

- [ ] אינטגרציה מלאה עם Fish Audio API
- [ ] תמיכה באפקטים נוספים (Chorus, Phaser, Flanger)
- [ ] שמירת הגדרות מועדפות (LocalStorage)
- [ ] ייצוא ל-MP3 (לא רק WAV)
- [ ] עריכת אודיו חכמה (חיתוך, העתקה, הדבקה)
- [ ] תמיכה בפורמטים נוספים (FLAC, AAC)
- [ ] מצב כהה (Dark Mode)
- [ ] שיתוף ישיר לרשתות חברתיות
- [ ] היסטוריית הקלטות
- [ ] מודים מוכנים של אפקטים (Presets)
- [ ] תמיכה רב-לשונית (אנגלית, ערבית)

### רעיונות נוספים:

- תמיכה ב-MIDI controllers
- וירטואל mixer עם channels מרובים
- Vocal tuning אוטומטי
- אנליזת פרמטרים (Pitch, Volume, Spectral)
- אימון מודלים מותאמים אישית

---

## 🤝 תרומה לפרויקט

רוצה לתרום? מעולה! הנה איך:

### דרך 1: דווח על באג

פתח Issue ב-GitHub עם:
- תיאור הבעיה
- שלבי שחזור
- צילומי מסך (אם רלוונטי)
- דפדפן ומערכת הפעלה

### דרך 2: הצע תכונה חדשה

פתח Discussion ב-GitHub עם:
- תיאור התכונה
- מקרי שימוש
- מקסטים אם יש

### דרך 3: תרום קוד

```bash
1. Fork the repository
2. Create a feature branch
   git checkout -b feature/amazing-feature
3. Commit your changes
   git commit -m 'Add amazing feature'
4. Push to the branch
   git push origin feature/amazing-feature
5. Open a Pull Request
```

---

## 📄 רישיון

הפרויקט הזה מופץ תחת רישיון **MIT License**.

```
MIT License

Copyright (c) 2026 Voice Generator PWA

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

---

## 💬 יצירת קשר ותמיכה

### תמיכה טכנית

- 📧 Email: support@voice-generator.app (דמו - לא אמיתי)
- 💬 Discord: [הצטרף לקהילה](https://discord.gg/example) (דמו)
- 📖 Wiki: [תיעוד מפורט](https://github.com/example/wiki) (דמו)

### קהילה

- ⭐ תן כוכב ל-Repository ב-GitHub
- 🐦 עקוב אחרינו ב-Twitter (דמו)
- 📺 הרשם לערוץ YouTube (דמו)

---

## 🌟 תודות מיוחדות

הפרויקט הזה נעזר בטכנולוגיות ושירותים הבאים:

- **Web Audio API** - Mozilla, Google, W3C
- **MediaRecorder API** - W3C Standard
- **Google Fonts** - פונט Heebo
- **Fish Audio** - אפשרות לשיבוט קול
- **PWA Standards** - Progressive Web Apps community

---

## 📊 סטטיסטיקות הפרויקט

- **גרסה נוכחית**: 1.0.0
- **תאריך שחרור**: 2026-01-01
- **קבצים**: 3 (HTML, JSON, JS)
- **שורות קוד**: ~1,500
- **גודל כולל**: ~60KB
- **זמן טעינה**: < 1 שנייה
- **תמיכה במכשירים**: 📱 💻 🖥️

---

## 🎉 תהנה מהאפליקציה!

האפליקציה הזו נבנתה באהבה עבור יוצרי תוכן, מוזיקאים וכל מי שרוצה לשחק עם הקול שלו.

**זכור:**
- 🎤 תהנה מהיצירה
- 🎵 שתף את היצירות שלך
- 💡 תרום רעיונות לשיפור
- ⭐ תן כוכב אם נהנית!

---

**נבנה עם ❤️ ו-Web Audio API**

*Progressive Web App • Open Source • 100% חינמי*

---

## 📚 לימוד נוסף

רוצה ללמוד איך זה בנוי?

### Web Audio API
- [MDN Documentation](https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API)
- [Web Audio API Examples](https://github.com/mdn/webaudio-examples)

### PWA
- [PWA Documentation](https://web.dev/progressive-web-apps/)
- [Service Worker Cookbook](https://serviceworke.rs/)

### Audio Processing
- [Digital Signal Processing](https://en.wikipedia.org/wiki/Digital_signal_processing)
- [Audio Effects Theory](https://www.soundonsound.com/)

---

**גרסה**: 1.0.0 | **עדכון אחרון**: 2026-01-01 | **תמיכה**: RTL Hebrew ✅