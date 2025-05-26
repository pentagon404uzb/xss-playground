# **XSS Pentagon404 Playground - Advanced XSS Playground**  
**By Pentagon 404**  

![XSS PENTAGON404 Banner]([https://i.imgur.com/xyz1234.png](https://codeby.net/blogs/wp-content/uploads/2017/04/042917_2021_XSSRCEX1.jpg)) *(Optional: Add a banner image here)*  

## **🔥 Overview**  
**XSS Dojo** is an advanced, interactive playground for testing and mastering Cross-Site Scripting (XSS) techniques. Designed for security researchers, bug bounty hunters, and penetration testers, this environment provides **16 progressively challenging levels** covering various XSS vectors, filter bypasses, and real-world exploitation scenarios.  

🔹 **Safe & Controlled Environment** – Test payloads without harming real systems.  
🔹 **16 Unique Challenges** – From basic script injection to CSP bypass and advanced obfuscation.  
🔹 **Interactive UI** – Dark/Light mode, cheat sheet, hints, and real-time rendering.  
🔹 **Learning-Oriented** – Detailed hints, success conditions, and source code inspection.  

---

## **🚀 Features**  

### **🎯 Challenge Levels**  
| Level | Title | Difficulty | Key Techniques |
|-------|-------|------------|----------------|
| 1 | Basic Script Injection | ⭐ | `<script>` tags |
| 2 | Simple Tag Filter | ⭐ | Event handlers (`onerror`, `onload`) |
| 3 | Attribute Injection | ⭐⭐ | `javascript:` URI, `style` attribute |
| 4 | Event Handler Basics | ⭐⭐ | `onclick`, `onmouseover` |
| 5 | DOM-Based XSS | ⭐⭐⭐ | Template literals, string manipulation |
| 6 | JavaScript URI | ⭐⭐⭐ | `href="javascript:..."` |
| 7 | SVG Vector | ⭐⭐⭐ | `<svg onload=alert(1)>` |
| 8 | Filter Evasion | ⭐⭐⭐⭐ | Obscure event handlers (`onanimationstart`) |
| 9 | HTML Entity Encoding | ⭐⭐⭐⭐ | `&lt;script&gt;` bypass |
| 10 | Hex Encoding | ⭐⭐⭐⭐ | `\x3Cscript\x3E` |
| 11 | Unicode Obfuscation | ⭐⭐⭐⭐⭐ | `\u0061lert(1)` |
| 12 | Template Literals | ⭐⭐⭐⭐⭐ | `${alert(1)}` |
| 13 | CSS Injection | ⭐⭐⭐⭐⭐ | `@keyframes`, `onanimationstart` |
| 14 | CSP Bypass | ⭐⭐⭐⭐⭐ | Nonce, `unsafe-eval`, CDN abuse |
| 15 | Advanced Obfuscation | ⭐⭐⭐⭐⭐ | String splitting, indirect `eval` |
| 16 | Ultimate Challenge | ⭐⭐⭐⭐⭐ | All protections enabled |

### **🛠️ Playground Features**  
✔ **Real-Time Rendering** – See how your payload executes.  
✔ **Source Code Inspection** – Understand how input is processed.  
✔ **Cheat Sheet** – Common payloads for quick testing.  
✔ **Hints System** – Stuck? Get guided hints.  
✔ **Dark/Light Mode** – Eye-friendly themes.  
✔ **Progress Tracking** – Stats, achievements, and success rate.  

---

## **⚡ Quick Start**  

### **1. Clone the Repository**  
```bash
git clone https://github.com/pentagon404uzb/xss-playground.git
cd xss-playground
```

### **2. Open in Browser**  
Simply open `pentagon404-sxx.html` in any modern browser (Chrome, Firefox, Edge).  

### **3. Start Hacking!**  
- Select a challenge level.  
- Enter your XSS payload in the input box.  
- Click **"Test"** to see if it works.  
- Use the **cheat sheet** and **hints** if needed.  

---

## **📌 How to Use**  

### **🎮 UI Overview**  
- **Left Sidebar**: Challenge selection & cheat sheet.  
- **Main Panel**:  
  - Challenge description & difficulty rating.  
  - Payload input field.  
  - **Result, Source Code, Console** tabs for debugging.  
- **Right Panel**: Stats, achievements, and success rate.  

### **🎯 Success Conditions**  
Each challenge has specific requirements to pass:  
- Some require `alert(1)` execution.  
- Others need specific bypass techniques (e.g., no parentheses, no `script` tags).  
- Check the **hint** if stuck!  

---

## **🔧 Customization**  
Want to add more challenges? Modify:  
- `script.js` → `challenges` object (add new levels).  
- `pentagon404-xss.html` → Challenge list in the sidebar.
  
---

## **💡 Author & Contributions**  
👤 **Pentagon404uzb**  
🔗 [GitHub](https://github.com/pentagon404uzb) | [Instagram](https://www.instagram.com/pentagon.404?igsh=MXRhdHhoOGhwY3M3NA%3D%3D&utm_source=qr)  | [LinkedIn(https://www.linkedin.com/in/saidaziz-tokhirov-62103a360?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app)]

**Contributions welcome!**  
- Found a bug? Open an **Issue**.  
- Improved a challenge? Submit a **Pull Request**.  

---

## **⚠️ Disclaimer**  
This tool is for **legal security research only**. Do not use it for unauthorized testing. The author is not responsible for misuse.  

---

## **🚀 Ready to Hack?**  
🔗 **[Try XSS PENTAGON404 Now!](#)**   

Happy Hacking! 🚨💻
