# 🤝 Contributing to Voice Generator AI

תודה שאתה מעוניין לתרום לפרויקט! כל תרומה עוזרת.

---

## 📋 Table of Contents

1. [Code of Conduct](#code-of-conduct)
2. [How Can I Contribute?](#how-can-i-contribute)
3. [Development Setup](#development-setup)
4. [Coding Guidelines](#coding-guidelines)
5. [Pull Request Process](#pull-request-process)
6. [Reporting Bugs](#reporting-bugs)
7. [Suggesting Features](#suggesting-features)

---

## 📜 Code of Conduct

### Our Pledge

We pledge to make participation in our project a harassment-free experience for everyone.

### Our Standards

**Positive behavior includes:**
- ✅ Using welcoming and inclusive language
- ✅ Being respectful of differing viewpoints
- ✅ Accepting constructive criticism gracefully
- ✅ Focusing on what is best for the community
- ✅ Showing empathy towards other members

**Unacceptable behavior includes:**
- ❌ Trolling, insulting, or derogatory comments
- ❌ Personal or political attacks
- ❌ Public or private harassment
- ❌ Publishing others' private information
- ❌ Other conduct that could be considered inappropriate

---

## 🎯 How Can I Contribute?

### 1. 🐛 Report Bugs

Found a bug? Help us fix it!

**Before submitting:**
- Check existing issues
- Try the latest version
- Gather reproduction steps

**Submit via:** GitHub Issues with label `bug`

### 2. 💡 Suggest Features

Have an idea? We'd love to hear it!

**Before submitting:**
- Check existing feature requests
- Consider if it fits the project scope
- Think about implementation approach

**Submit via:** GitHub Issues with label `enhancement`

### 3. 📝 Improve Documentation

Documentation is crucial!

**Areas to help:**
- Fix typos and grammar
- Add examples
- Clarify instructions
- Translate to other languages
- Update screenshots

**Submit via:** Pull Request to `main` branch

### 4. 🔧 Write Code

Ready to code? Awesome!

**What to work on:**
- Check issues labeled `good first issue`
- Look for `help wanted` label
- Propose new features
- Fix bugs

**Submit via:** Pull Request to `develop` branch

### 5. 🎨 Design Contributions

Improve UI/UX!

**Areas:**
- Icons and graphics
- Color schemes
- Layout improvements
- Animations
- Accessibility

**Submit via:** GitHub Issues with mockups/designs

### 6. 🧪 Testing

Help us test!

**Testing areas:**
- Different browsers
- Various devices
- Edge cases
- Performance
- Accessibility

**Submit via:** GitHub Issues with findings

---

## 💻 Development Setup

### Prerequisites

```bash
# Required:
- Modern browser (Chrome, Firefox, Safari, Edge)
- Text editor (VS Code recommended)
- Git

# Optional:
- Python (for local server)
- Node.js (for tools)
```

### Setup Steps

```bash
# 1. Fork the repository
# Click "Fork" on GitHub

# 2. Clone your fork
git clone https://github.com/YOUR_USERNAME/voice-generator.git
cd voice-generator

# 3. Add upstream remote
git remote add upstream https://github.com/ORIGINAL_REPO/voice-generator.git

# 4. Create a branch
git checkout -b feature/your-feature-name

# 5. Start local server
python -m http.server 8000
# Or: npx http-server -p 8000

# 6. Open in browser
# http://localhost:8000
```

### Project Structure

```
voice-generator/
├── index.html              # Main app (HTML + CSS + JS)
├── manifest.json           # PWA manifest
├── service-worker.js       # Service worker
├── README.md              # Main documentation
├── QUICK_START.md         # Quick start guide
├── TECHNICAL.md           # Technical documentation
├── CHANGELOG.md           # Version history
├── LICENSE               # MIT License
├── CONTRIBUTING.md       # This file
└── .gitignore            # Git ignore rules
```

---

## 📐 Coding Guidelines

### HTML

```html
<!-- Use semantic HTML5 -->
<header>...</header>
<main>...</main>
<section>...</section>

<!-- RTL support -->
<html dir="rtl" lang="he">

<!-- Accessibility -->
<button aria-label="התחל הקלטה">🎙️ התחל הקלטה</button>

<!-- Comments -->
<!-- ============================================
     SECTION NAME
     ============================================ -->
```

### CSS

```css
/* Use CSS variables */
:root {
  --primary: #8b5cf6;
}

/* BEM naming convention (recommended) */
.block__element--modifier { }

/* RTL support */
.element {
  margin-inline-start: 1rem; /* Not margin-left */
}

/* Mobile-first */
.element {
  /* Mobile styles */
}

@media (min-width: 768px) {
  .element {
    /* Desktop styles */
  }
}

/* Comments */
/* ============================================
   SECTION NAME
   ============================================ */
```

### JavaScript

```javascript
// Use modern ES6+
const myFunction = () => { };

// Clear variable names
let isRecording = false;
const audioContext = new AudioContext();

// Comments
// ============================================
// FUNCTION NAME
// ============================================
function myFunction() {
  // Comment what the code does (why, not what)
}

// Error handling
try {
  // Code
} catch (error) {
  console.error('Error:', error);
  alert('User-friendly error message');
}

// Async/await
async function getData() {
  try {
    const response = await fetch(url);
    return await response.json();
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}
```

### General Guidelines

- ✅ **Keep it simple** - KISS principle
- ✅ **Don't repeat yourself** - DRY principle
- ✅ **Comment your code** - Explain why, not what
- ✅ **Use meaningful names** - Clear and descriptive
- ✅ **Test your changes** - Multiple browsers/devices
- ✅ **Keep commits atomic** - One feature/fix per commit
- ✅ **Write good commit messages** - Clear and descriptive

### Commit Messages

```bash
# Format:
<type>(<scope>): <subject>

# Types:
feat:     New feature
fix:      Bug fix
docs:     Documentation
style:    Formatting, missing semicolons
refactor: Code restructuring
test:     Adding tests
chore:    Maintenance

# Examples:
feat(audio): add real-time pitch shift
fix(ui): resolve mobile touch events
docs(readme): update installation guide
style(css): format code with prettier
refactor(effects): simplify audio chain
```

---

## 🔄 Pull Request Process

### Before Submitting

1. ✅ **Update from upstream**
   ```bash
   git fetch upstream
   git rebase upstream/main
   ```

2. ✅ **Test thoroughly**
   - All browsers
   - Mobile devices
   - Different screen sizes
   - Edge cases

3. ✅ **Update documentation**
   - README.md if needed
   - CHANGELOG.md
   - Code comments

4. ✅ **Check code quality**
   - No console.logs (except intentional)
   - No commented-out code
   - Proper formatting

### Submitting PR

1. **Push to your fork**
   ```bash
   git push origin feature/your-feature-name
   ```

2. **Create Pull Request**
   - Go to GitHub
   - Click "New Pull Request"
   - Choose: `base: main` ← `compare: feature/your-feature-name`

3. **Fill PR template**
   ```markdown
   ## Description
   Brief description of changes
   
   ## Type of Change
   - [ ] Bug fix
   - [ ] New feature
   - [ ] Documentation update
   - [ ] Performance improvement
   
   ## Testing
   - [ ] Tested on Chrome
   - [ ] Tested on Firefox
   - [ ] Tested on Safari
   - [ ] Tested on mobile
   
   ## Screenshots
   (if applicable)
   
   ## Checklist
   - [ ] Code follows style guidelines
   - [ ] Self-review completed
   - [ ] Comments added where needed
   - [ ] Documentation updated
   - [ ] No breaking changes
   ```

### After Submitting

- ✅ **Respond to feedback** - Address review comments
- ✅ **Make requested changes** - Push updates to same branch
- ✅ **Be patient** - Reviews take time
- ✅ **Be respectful** - Thank reviewers

---

## 🐛 Reporting Bugs

### Bug Report Template

```markdown
**Describe the bug**
A clear and concise description.

**To Reproduce**
Steps to reproduce:
1. Go to '...'
2. Click on '...'
3. See error

**Expected behavior**
What you expected to happen.

**Actual behavior**
What actually happened.

**Screenshots**
If applicable, add screenshots.

**Environment:**
 - OS: [e.g. Windows 10]
 - Browser: [e.g. Chrome 96]
 - Version: [e.g. 1.0.0]
 - Device: [e.g. iPhone 13]

**Additional context**
Any other information.

**Console errors**
```
Paste console errors here
```
```

### What Makes a Good Bug Report?

- ✅ **Clear title** - Describes the issue
- ✅ **Reproducible** - Can be replicated
- ✅ **Specific** - Exact steps
- ✅ **Complete** - All relevant info
- ✅ **Screenshots** - Visual evidence
- ✅ **Console logs** - Technical details

---

## 💡 Suggesting Features

### Feature Request Template

```markdown
**Is your feature request related to a problem?**
A clear description of the problem.

**Describe the solution you'd like**
A clear description of what you want.

**Describe alternatives you've considered**
Alternative solutions or features.

**Additional context**
Any other context or screenshots.

**Use cases**
How would this feature be used?

**Priority**
- [ ] Critical
- [ ] High
- [ ] Medium
- [ ] Low
```

### What Makes a Good Feature Request?

- ✅ **Clear problem** - What needs solving?
- ✅ **Proposed solution** - How to solve it?
- ✅ **Use cases** - Who benefits?
- ✅ **Feasibility** - Is it realistic?
- ✅ **Scope** - Fits project goals?

---

## 🎓 Learning Resources

### Web Audio API
- [MDN Web Audio Guide](https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API)
- [Web Audio API Specification](https://www.w3.org/TR/webaudio/)

### PWA
- [Google PWA Guide](https://web.dev/progressive-web-apps/)
- [PWA Checklist](https://web.dev/pwa-checklist/)

### JavaScript
- [JavaScript.info](https://javascript.info/)
- [MDN JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript)

---

## 🏆 Recognition

Contributors will be:
- Listed in CONTRIBUTORS.md
- Mentioned in release notes
- Tagged in social media announcements
- Given credit in the app (optional)

---

## 📞 Contact

- 💬 **Discord**: [link]
- 📧 **Email**: [email]
- 🐦 **Twitter**: [@handle]

---

## 📜 License

By contributing, you agree that your contributions will be licensed under the MIT License.

---

**Thank you for contributing!** 🎉

Every contribution, no matter how small, makes a difference.

---

*Last updated: 2026-01-02*