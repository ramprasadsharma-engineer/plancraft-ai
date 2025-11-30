# PlanCraft AI

> 🎯 Crafting perfect plans with intelligence - An advanced subscription plan recommendation wizard with lead generation and conversion features

[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-61DAFB?logo=react&logoColor=black)](https://reactjs.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-38B2AC?logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)

## 🎯 Overview

PlanCraft AI is a web application that helps users find the perfect subscription plan for their business. It uses an intelligent wizard that asks questions about your company and goals, then recommends the best plan with detailed ROI analysis. The app is built with React, TypeScript, and Tailwind CSS.

---

## ✨ Key Features

### 🧙‍♂️ Intelligent Wizard System
- **Multi-Step Process**: Easy-to-follow wizard with 4 steps
- **Progress Tracking**: Visual progress bar shows where you are
- **Smart Navigation**: Go back or forward between steps
- **Auto-Save**: Your progress is saved automatically
- **Resume Later**: Continue from where you left off

### 🎨 Theme & Appearance
- **Dark/Light Mode**: Switch between dark and light themes
- **Theme Memory**: Your theme preference is saved
- **Smooth Transitions**: Beautiful animations when switching themes
- **Responsive Design**: Works perfectly on phones, tablets, and computers

### 🤖 Smart Recommendation Engine
- **Multi-Factor Analysis**: Considers your role, company size, industry, goals, budget, and urgency
- **Smart Scoring**: Uses a weighted algorithm to find the best plan
- **Personalized Results**: Recommendations based on your specific needs
- **Feature Comparison**: See detailed differences between plans

### 💰 ROI & Analytics
- **ROI Calculation**: See projected return on investment
- **Time Savings**: Calculate hours saved per month
- **Cost Analysis**: Display savings in INR currency
- **Payback Period**: Know when you'll see returns
- **Indian Market Focus**: Optimized for Indian businesses

### 📊 Lead Generation Tools
1. **Email Capture Form**
   - Collect email addresses on the recommendation page
   - Form validation with error messages
   - Success notifications

2. **Book a Demo Button**
   - Ready for Calendly or Cal.com integration
   - Prominent call-to-action button
   - Easy to customize with your booking URL

3. **WhatsApp Share**
   - Share plan details via WhatsApp with one click
   - Pre-filled message with plan information
   - Great for the Indian market

4. **PDF Download**
   - Download a complete summary of your recommendation
   - Includes plan details and ROI analysis
   - Professional formatting

### 💬 Communication Features
- **Floating Chat Widget**
  - Live support button in the bottom-right corner
  - Slide-in chat window
  - Message history with timestamps
  - Auto-responses for common questions

- **SalesIQ Integration Ready**
  - Generate JSON summary of user data
  - Structured data format for CRM systems
  - Complete user context for sales team

### 🏆 Trust & Social Proof
- **Animated Statistics Banner**
  - Shows companies served
  - Industries covered
  - Average ROI increase
  - Customer satisfaction rate
  - Animated counters for visual impact

- **FAQ Section**
  - Accordion-style questions and answers
  - Common questions covered
  - Easy to expand and collapse

### 🎭 User Experience
- **Smooth Animations**: Beautiful transitions throughout
- **Loading States**: Clear feedback during operations
- **Error Handling**: User-friendly error messages
- **Accessibility**: Works with screen readers and keyboard navigation
- **Mobile-First**: Optimized for touch devices

---

## 🛠 Tech Stack

### Core Technologies
- **React 18.3.1** - Modern UI library
- **TypeScript** - Type-safe JavaScript
- **Vite** - Fast build tool and development server
- **Tailwind CSS 3.x** - Utility-first CSS framework

### UI Components & Libraries
- **Shadcn/ui** - High-quality component library
- **Radix UI** - Accessible component primitives
- **Lucide React** - Beautiful icon library
- **next-themes** - Theme management

### Form & Validation
- **React Hook Form 7.x** - Efficient form handling
- **Zod 3.x** - TypeScript-first validation
- **@hookform/resolvers** - Form validation integration

### Utilities & Tools
- **jsPDF** - Generate PDFs in the browser
- **class-variance-authority** - Component variant management
- **clsx & tailwind-merge** - Conditional CSS classes
- **date-fns** - Date manipulation library

---

## 📦 Installation & Setup

### Prerequisites
- Node.js 18 or higher
- npm (comes with Node.js)
- Git (optional, for cloning)

### Quick Start

```bash
# Clone the repository
git clone <your-repo-url>
cd plan-roi-assistant-main

# Install all dependencies
npm install

# Start the development server
npm run dev
```

The app will be available at `http://localhost:8080`

### Build for Production

```bash
# Create an optimized production build
npm run build

# Preview the production build locally
npm run preview
```

---

## 📂 Project Structure

```
src/
├── components/
│   ├── chat/                    # Chat widget components
│   │   ├── ChatWidget.tsx       # Main chat interface
│   │   └── FloatingChatButton.tsx  # Floating button
│   ├── theme/                   # Theme components
│   │   ├── ThemeProvider.tsx    # Theme context
│   │   └── ThemeToggle.tsx      # Theme switcher
│   ├── ui/                      # Reusable UI components (40+)
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── input.tsx
│   │   └── ...
│   └── wizard/                  # Wizard step components
│       ├── WelcomeStep.tsx      # Welcome screen
│       ├── BasicContextStep.tsx # Step 1: Company info
│       ├── GoalsBudgetStep.tsx # Step 2: Goals & budget
│       ├── ExtraNeedsStep.tsx  # Step 3: Additional needs
│       ├── RecommendationStep.tsx  # Final recommendation
│       ├── ProgressIndicator.tsx   # Progress bar
│       ├── PlanComparisonTable.tsx # Feature comparison
│       └── StatsBanner.tsx      # Statistics display
├── config/
│   ├── plansConfig.ts           # Plan definitions
│   └── recommendationLogic.ts  # Recommendation algorithm
├── contexts/
│   └── WizardContext.tsx       # Global wizard state
├── pages/
│   ├── Index.tsx               # Main wizard page
│   └── NotFound.tsx            # 404 error page
├── hooks/
│   ├── use-mobile.tsx          # Mobile detection
│   └── use-toast.ts            # Toast notifications
├── lib/
│   └── utils.ts                # Utility functions
├── App.tsx                     # Root component
├── index.css                   # Global styles
└── main.tsx                    # App entry point
```

---

## 🎨 Design System

### Color Tokens
All colors are defined as CSS variables in `src/index.css`. You can customize them there.

### Animation Classes
- `animate-fade-in` - Fade in with slide up
- `animate-scale-in` - Scale in animation
- `animate-slide-in-right` - Slide from right
- `hover-scale` - Scale on hover

### Typography
- Uses system fonts for fast loading
- Responsive text sizes
- Semantic HTML structure

---

## 🔧 Configuration

### Customizing Plans

Edit `src/config/plansConfig.ts` to change plan details:

```typescript
export const plans = [
  {
    id: "starter",
    name: "Starter",
    price: "₹2,400/month",
    features: [
      "Feature 1",
      "Feature 2",
      // Add your features here
    ],
  },
  // Add more plans...
];
```

### Customizing Recommendation Logic

Edit `src/config/recommendationLogic.ts` to adjust how recommendations are calculated:

```typescript
// Change scoring weights for different factors
const roleScores = {
  founder: { starter: 2, professional: 3, enterprise: 1 },
  // Adjust these values...
};

// Modify budget thresholds
const budgetScores = {
  "< ₹4,000": { starter: 3, professional: 1 },
  // Adjust these values...
};
```

### Integration Setup

**Demo Booking (Calendly)**
```typescript
// In src/components/wizard/RecommendationStep.tsx
const handleBookDemo = () => {
  window.open("YOUR_CALENDLY_URL", "_blank");
};
```

**Chat Widget Messages**
```typescript
// In src/components/chat/ChatWidget.tsx
// Customize the auto-response messages
const supportMessage = {
  text: "Your custom message here",
  sender: "support"
};
```

---

## 💾 Data Management

### LocalStorage
The app saves data in your browser's localStorage:
- `wizard_progress` - Saves your wizard answers and current step
- `theme` - Saves your theme preference (dark/light)

### State Management
- **WizardContext**: Manages wizard state using React Context
- **React Hook Form**: Handles all form inputs
- **next-themes**: Manages theme switching

---

## 📱 Responsive Design

### Screen Sizes
- **Mobile**: Less than 640px wide
- **Tablet**: 640px to 1024px wide
- **Desktop**: More than 1024px wide

### Mobile Features
- Touch-friendly buttons (minimum 44x44 pixels)
- Swipeable interfaces
- Optimized font sizes
- Collapsible sections

---

## 🚀 Deployment

### Build the App
```bash
npm run build
```

This creates an optimized production build in the `dist` folder.

### Deploy Options

You can deploy the `dist` folder to:

- **Vercel** - Recommended for React apps
- **Netlify** - Easy deployment with drag-and-drop
- **AWS S3 + CloudFront** - For AWS users
- **GitHub Pages** - Free hosting for public repos
- **Your own server** - Any web server that serves static files

### Environment Variables

If you need environment variables, create a `.env` file in the root directory:

```env
VITE_API_URL=your_api_url_here
VITE_CALENDLY_URL=your_calendly_url_here
```

Access them in your code with `import.meta.env.VITE_API_URL`

---

## 🌐 Browser Support

| Browser | Minimum Version |
|---------|----------------|
| Chrome  | Latest 2 versions |
| Firefox | Latest 2 versions |
| Safari  | Latest 2 versions |
| Edge    | Latest 2 versions |

---

## 🤝 Contributing

This is a private project. For collaboration inquiries, please contact the project maintainer.

---

## 📄 License

This project is proprietary and confidential.

---

## 🎉 Acknowledgments

Built with these amazing open-source technologies:
- [React](https://react.dev/) - UI library
- [TypeScript](https://www.typescriptlang.org/) - Type safety
- [Tailwind CSS](https://tailwindcss.com/) - Styling
- [Shadcn/ui](https://ui.shadcn.com/) - Component library
- [Radix UI](https://www.radix-ui.com/) - Accessible primitives
- [Lucide Icons](https://lucide.dev/) - Icons
- [Vite](https://vitejs.dev/) - Build tool

---

**Version**: 1.0.0  
**Last Updated**: November 2025

---

*PlanCraft AI - Helping businesses find the perfect subscription plan with intelligent recommendations and ROI analysis.* 🚀
