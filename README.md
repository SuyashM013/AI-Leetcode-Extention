# 🚀 LeetCode Helper – Chrome Extension  

A Chrome Extension that helps you while solving problems on **LeetCode**.It does not provide you with code you can ask for help, approaches, hints or documenting your code for posting solution or if you stuck with TC it will help.

It smartly integrates with LeetCode problem pages and opens a **side panel** for assistance. If you try to open it on a non-LeetCode page, it shows a helpful **notification**.  

---

## ✨ Features  
- 📌 **Smart Detection** – Works only on Leetcode Problem pages.  
- 📑 **Does not Provide Code** – Even if you ask for solution, it will not provide directly code.  
- 🧠 **Approaches & Tricks** – Forget thinking of code, ask AI it will give hints and approaches.  
- 🧭 **Side Panel Integration** – Opens a custom side panel with tools/resources for problem-solving.  
- 🔔 **Friendly Notifications** – If opened outside LeetCode, it notifies you to go to a problem page.  
- 🖱️ **Icon Triggered** – Opens the side panel only when you click the extension icon.  
- 🛡️ **Cheat-Proof Code** – Core logic (`manifest.json` and `background.js`) is ignored in `.gitignore`.  

---

## 🛠️ Tech Stack  
- **React + Vite** (for UI)  
- **Tailwind CSS** (for styling)  
- **Javascript ES6** (for Logic)  
- **Chrome Extensions API** (side panel, notifications, actions)  

---

## 🚦 How It Works  
1. Install the extension in Chrome.  
2. Navigate to any **LeetCode problem page** (`https://leetcode.com/problems/...`).  
3. Click the extension icon → 🎉 Side panel opens with your helper tools.  
4. If you click the icon on other websites → 🔔 Notification shows up.  

### Extention is not live if you want contact me
---

## 📂 Project Structure  
```
📦 leetcode-helper-extension
┣ 📂 public
┃ ┗ logo.png
┣ 📂 src
┃ ┣ Main.jsx
┃ ┗ App.jsx
┣ .gitignore
┣ index.html
┣ README.md
┗ package.json

````

> ⚠️ `manifest.json` and `background.js` are intentionally **.gitignored** to prevent direct copying.  
---


## 🚀 Installation

1.  Install dependencies:

    ``` bash
    npm install
    ```

2.  Build the extension:

    ``` bash
    npm run build
    ```

3.  Open Chrome and go to:

        chrome://extensions/

4.  Enable **Developer Mode**

5.  Click **Load unpacked**

6.  Select the `dist` folder

------------------------------------------------------------------------

## 🤝 Contributing

Contributions are welcome!

If you want to add features or test improvements:

1.  Fork the repo
2.  Create a branch (feature/my-feature)
3.  Submit a Pull Request

If you want the full project setup (including manifest + background.js)
→ open an issue or contact me directly.

------------------------------------------------------------------------

## 📬 Contact
#### 💡 Have ideas or want to collaborate? Reach out:

- Open a GitHub Issue / Pull Request

- Or contact me personally