# Yoonshik Hong - Personal Website

A modern personal website built with Next.js 14, TypeScript, and CSS Modules. This site serves as both a portfolio and a platform for hosting small applications.

## 🚀 Features

- **Modern Stack**: Built with Next.js 14 App Router, React 18, and TypeScript
- **Multi-App Architecture**: Host multiple small apps under `yoonshik.com/{appname}`
- **Responsive Design**: Mobile-first design with CSS Modules
- **Type Safety**: Full TypeScript support for better development experience
- **Fast Performance**: Automatic code splitting and optimization
- **Easy Deployment**: Zero-config deployment on Vercel

## 📁 Project Structure

```
/
├── app/                          # Next.js app directory
│   ├── layout.tsx               # Root layout with navigation and footer
│   ├── page.tsx                 # Home page
│   ├── globals.css              # Global styles
│   └── [appname]/               # Dynamic routing for apps
│       ├── layout.tsx           # Apps layout
│       ├── page.tsx             # Dynamic app loader
│       ├── not-found.tsx        # 404 page for apps
│       └── apps/                # App components
│           └── Calculator.tsx   # Example calculator app
├── components/                   # Reusable React components
│   ├── Navigation.tsx           # Main navigation
│   ├── Navigation.module.css
│   ├── Footer.tsx               # Footer component
│   └── Footer.module.css
├── public/                       # Static assets
│   └── profile.png              # Profile image
├── legacy/                       # Old website files (for reference)
├── next.config.ts               # Next.js configuration
├── tsconfig.json                # TypeScript configuration
├── package.json                 # Project dependencies
└── vercel.json                  # Vercel deployment config
```

## 🛠️ Getting Started

### Prerequisites

- Node.js 18.0 or later
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yoonshik/YoonshikWebsite.git
cd YoonshikWebsite
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## 📝 Available Scripts

- `npm run dev` - Start development server on port 3000
- `npm run build` - Build production application
- `npm run start` - Start production server
- `npm run lint` - Run ESLint for code quality

## ➕ Adding New Apps

To add a new app to the site:

1. Create a new component in `app/[appname]/apps/`:
```tsx
// app/[appname]/apps/MyNewApp.tsx
'use client';

import styles from './MyNewApp.module.css';

export default function MyNewApp() {
  return (
    <div className={styles.container}>
      <h1>My New App</h1>
      {/* Your app content */}
    </div>
  );
}
```

2. Create a CSS Module for styling:
```css
/* app/[appname]/apps/MyNewApp.module.css */
.container {
  padding: 4rem 2rem;
}
```

3. Register the app in `app/[appname]/page.tsx`:
```tsx
import MyNewApp from './apps/MyNewApp';

const apps: Record<string, AppInfo> = {
  calculator: { /* ... */ },
  'my-new-app': {
    component: MyNewApp,
    title: 'My New App',
    description: 'Description of my new app',
  },
};
```

4. Add a link to the navigation in `components/Navigation.tsx`

Your app will be available at `yoonshik.com/my-new-app`

## 🚀 Deployment

### Deploy to Vercel (Recommended)

1. Push your code to GitHub:
```bash
git add .
git commit -m "Your commit message"
git push origin master
```

2. Import your repository on [Vercel](https://vercel.com):
   - Go to https://vercel.com/new
   - Import your GitHub repository
   - Vercel will auto-detect Next.js and configure everything
   - Click "Deploy"

3. Configure custom domain:
   - Go to your project settings on Vercel
   - Navigate to "Domains"
   - Add `yoonshik.com`
   - Update your DNS records as instructed by Vercel:
     - Add an A record pointing to Vercel's IP
     - Or add a CNAME record pointing to your Vercel project

### Deploy to Other Platforms

This is a standard Next.js application and can be deployed to any platform that supports Node.js:

- **Netlify**: Connect your GitHub repo and deploy
- **AWS Amplify**: Use the Amplify Console
- **Self-hosted**: Run `npm run build` and `npm run start`

## 🔧 Configuration

### Environment Variables

Create a `.env.local` file for local environment variables:

```env
# Example environment variables
NEXT_PUBLIC_SITE_URL=https://yoonshik.com
```

### Custom Domain on Vercel

1. Add domain in Vercel dashboard
2. Configure DNS with your domain provider:
   - Type: A
   - Name: @
   - Value: 76.76.21.21
   
   And:
   - Type: CNAME
   - Name: www
   - Value: cname.vercel-dns.com

## 🎨 Styling

This project uses CSS Modules for component-level styling:

- Each component has its own `.module.css` file
- Styles are scoped locally to avoid conflicts
- Global styles are in `app/globals.css`
- CSS variables defined in `:root` for theming

## 📦 Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: CSS Modules
- **Deployment**: Vercel
- **Version Control**: Git

## 📄 License

This project is private and for personal use.

## 👤 Author

**Yoonshik Hong**

- Website: [yoonshik.com](https://yoonshik.com)
- LinkedIn: [@yoonshik](https://linkedin.com/in/yoonshik)
- GitHub: [@yoonshik](https://github.com/yoonshik)

## 🗺️ Roadmap

- [ ] Add dark mode support
- [ ] Add more example apps
- [ ] Add blog functionality
- [ ] Add analytics integration
- [ ] Add contact form

---

Built with ❤️ using Next.js
