# MD Effort Estimator

🧮 **Interactive web calculator for estimating IT project effort in man-days**

A modern, responsive React application that helps project managers, developers, and stakeholders estimate IT initiative efforts with adjustable risk factors, focus coefficients, and communication buffers.

![MD Estimator Screenshot](https://via.placeholder.com/800x400/3b82f6/ffffff?text=MD+Estimator+Screenshot)

## ✨ Features

### 📊 **Comprehensive Input Management**
- **Development** effort input
- **QA** effort with auto-calculation (% of Dev) or manual input
- **Architecture/Research** effort tracking
- **PM/BA/Management** overhead estimation

### ⚙️ **Adjustable Coefficients**
- **Focus Factor** (1.0–1.5) - accounts for effective working time
- **Risk Factor** (0–0.5) - uncertainty and project risks
- **Communication Buffer** (0–0.3) - cross-team dependencies and coordination

### 🧮 **Smart Calculations**
Uses the proven formula:
```
MD_total = ((Dev + QA + Arch + PM) × FocusFactor) × (1 + RiskFactor) + (CommBuffer × BaseMD)
```

### 📈 **Visual Analytics**
- **Pie Chart** for effort distribution overview
- **Bar Chart** for detailed comparison
- Interactive tooltips and legends
- Real-time updates on parameter changes

### 🔧 **Productivity Tools**
- **Reset** functionality for quick form clearing
- **CSV Export** for documentation and reporting
- Responsive design for desktop and mobile
- Clean, minimalist UI

## 🚀 Live Demo

[**Try MD Estimator →**](https://your-demo-url.com)

## 🛠️ Tech Stack

- **React 18** - Modern UI framework
- **Tailwind CSS** - Utility-first styling
- **Recharts** - Interactive data visualization
- **Lucide React** - Beautiful icons
- **Vite** - Fast build tool

## 📦 Installation

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Quick Start
```bash
# Clone the repository
git clone https://github.com/yourusername/md-effort-estimator.git

# Navigate to project directory
cd md-effort-estimator

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

## 🎯 Usage Example

**Sample Project Estimation:**
- Development: 20 MD
- QA: Auto-calculated 30% → 6 MD  
- Architecture: 4 MD
- PM/Management: 3 MD
- Focus Factor: 1.2
- Risk Factor: 0.25
- Communication Buffer: 0.15

**Result: ~41.1 MD total effort**

## 📁 Project Structure

```
md-effort-estimator/
├── public/
│   └── index.html
├── src/
│   ├── components/
│   │   └── MDEstimator.jsx
│   ├── utils/
│   ├── styles/
│   └── App.jsx
├── package.json
└── README.md
```

## 🔧 Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint
npm run test         # Run tests
```

## 🎨 Customization

### Adding New Roles
Extend the `inputs` state in `MDEstimator.jsx`:
```javascript
const [inputs, setInputs] = useState({
  dev: 0,
  qa: 0,
  arch: 0,
  pm: 0,
  devops: 0,  // New role
  design: 0   // New role
});
```

### Modifying Coefficients
Adjust ranges in coefficient sliders:
```javascript
// Example: Extend Risk Factor to 1.0
<input
  type="range"
  min="0"
  max="1.0"    // Extended range
  step="0.05"
  // ...
/>
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

### Development Guidelines
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📋 Roadmap

- [ ] **Templates** - Pre-configured estimation templates for different project types
- [ ] **History** - Save and compare multiple estimations
- [ ] **Team Velocity** - Integration with historical team performance data
- [ ] **API Integration** - Connect with project management tools (Jira, Asana)
- [ ] **Multi-language** - Support for Ukrainian, German, Spanish
- [ ] **Dark Mode** - Theme switching capability
- [ ] **Advanced Analytics** - Confidence intervals and statistical analysis

## 📊 Why MD Estimator?

**Traditional estimation challenges:**
- ❌ Static spreadsheets with no interactivity
- ❌ Fixed coefficients that don't reflect reality  
- ❌ No visual feedback for stakeholders
- ❌ Manual calculations prone to errors

**MD Estimator solutions:**
- ✅ Interactive, real-time calculations
- ✅ Adjustable parameters for different contexts
- ✅ Visual charts for clear communication
- ✅ Automated formulas with proven methodology
- ✅ Export capabilities for documentation

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Inspired by industry best practices for software estimation
- Built with modern React ecosystem
- Icons by [Lucide](https://lucide.dev)
- Charts powered by [Recharts](https://recharts.org)

## 📞 Support

Having issues? Please check our [Issues](https://github.com/yourusername/md-effort-estimator/issues) page or create a new issue.

---

**Made with ❤️ for the development community**

⭐ Star this repo if you find it useful!