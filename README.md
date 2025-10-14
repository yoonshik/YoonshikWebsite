# Yoonshik Hong - Personal Website

Welcome back to your personal website! This is a clean, professional portfolio website built with Bootstrap and hosted on GitHub Pages.

## 🌐 Live Website

- **Primary URL**: [www.yoonshik.com](https://www.yoonshik.com)
- **Alternative URL**: [yoonshik.com](https://yoonshik.com)

## 📋 Project Overview

This is a personal portfolio website showcasing your professional background as a Software Engineer. The site includes:

- **Homepage** (`index.html`): Main landing page with your profile, about section, and social links
- **Timeline** (`timeline.html`): Interactive timeline of your professional journey using Knight Lab's TimelineJS
- **Responsive Design**: Built with Bootstrap 3 for mobile-friendly experience
- **Modern UI**: Clean, professional design with custom styling

## 🛠️ Technology Stack

- **Frontend Framework**: Bootstrap 3.3.7
- **CSS Preprocessor**: LESS
- **Build Tool**: Gulp 3.9.1
- **JavaScript Libraries**: jQuery 3.4.1
- **Icons**: Font Awesome 4.6.3
- **Hosting**: GitHub Pages
- **Custom Domain**: yoonshik.com

## 🚀 Getting Started

### Prerequisites

Before running this project locally, make sure you have:

- **Node.js** (version 12 or higher recommended)
- **npm** (comes with Node.js)
- **Git** (for version control)

### Installation & Local Development

1. **Clone the repository** (if you haven't already):
   ```bash
   git clone https://github.com/yoonshik/YoonshikWebsite.git
   cd YoonshikWebsite
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Build the project**:
   ```bash
   npm run build
   # or
   gulp
   ```

4. **Start development server**:
   ```bash
   npm run dev
   # or
   gulp dev
   ```

5. **Open your browser** and navigate to:
   ```
   http://localhost:3000
   ```

The development server will automatically:
- Watch for changes in LESS files and recompile CSS
- Watch for changes in JavaScript files and minify them
- Reload the browser when HTML or JS files change
- Serve the site with live reload functionality

### Available Gulp Tasks

- `gulp` or `gulp default`: Build all assets (CSS, JS, copy vendor files)
- `gulp dev`: Start development server with live reload
- `gulp less`: Compile LESS files to CSS
- `gulp minify-css`: Minify compiled CSS
- `gulp minify-js`: Minify JavaScript files
- `gulp copy`: Copy vendor libraries from node_modules to vendor directory

## 📁 Project Structure

```
YoonshikWebsite/
├── css/                    # Compiled CSS files
│   ├── freelancer.css     # Main stylesheet
│   └── freelancer.min.css # Minified version
├── js/                     # JavaScript files
│   ├── freelancer.js      # Main JavaScript
│   ├── freelancer.min.js  # Minified version
│   ├── contact_me.js      # Contact form handling
│   └── jqBootstrapValidation.js # Form validation
├── less/                   # LESS source files
│   ├── freelancer.less    # Main LESS file
│   ├── mixins.less        # LESS mixins
│   └── variables.less     # LESS variables
├── img/                    # Images
│   └── profile.png        # Profile picture
├── vendor/                 # Third-party libraries
│   ├── bootstrap/         # Bootstrap framework
│   ├── font-awesome/      # Font Awesome icons
│   └── jquery/            # jQuery library
├── index.html             # Homepage
├── timeline.html          # Timeline page
├── gulpfile.js            # Gulp build configuration
├── package.json           # Node.js dependencies
├── CNAME                  # Custom domain configuration
└── LICENSE                # MIT License
```

## 🎨 Customization

### Updating Content

1. **Profile Information**: Edit the content in `index.html`:
   - Update the about section (lines 89-90)
   - Change social media links (lines 103-107)
   - Update copyright year (line 117)

2. **Profile Picture**: Replace `img/profile.png` with your current photo

3. **Timeline**: The timeline is embedded from Google Sheets. To update:
   - The timeline data is sourced from a Google Sheets document
   - Update the `src` attribute in `timeline.html` (line 68) if you create a new timeline

### Styling Changes

1. **Colors & Typography**: Edit `less/variables.less` for global changes
2. **Layout**: Modify `less/freelancer.less` for structural changes
3. **Custom Styles**: Add your own LESS files and import them in `freelancer.less`

### Adding New Pages

1. Create a new HTML file (e.g., `projects.html`)
2. Copy the structure from `index.html` or `timeline.html`
3. Update navigation links in the navbar
4. Add any new CSS/JS as needed

## 🚀 Deployment

This site is automatically deployed to GitHub Pages whenever you push to the `gh-pages` branch.

### Manual Deployment Steps

1. **Build the project**:
   ```bash
   gulp
   ```

2. **Commit and push changes**:
   ```bash
   git add .
   git commit -m "Update website content"
   git push origin gh-pages
   ```

3. **Wait for deployment**: GitHub Pages typically takes 1-10 minutes to update

### Custom Domain Setup

The site uses a custom domain (`yoonshik.com`) configured via:
- `CNAME` file pointing to your GitHub Pages URL
- DNS settings pointing to GitHub's servers

## 🔧 Troubleshooting

### Common Issues

1. **Dependencies won't install**:
   ```bash
   # Clear npm cache and try again
   npm cache clean --force
   npm install
   ```

2. **Gulp tasks fail**:
   ```bash
   # Make sure you have the right Node.js version
   node --version
   # Should be 12+ for Gulp 3.x
   ```

3. **CSS not updating**:
   ```bash
   # Rebuild CSS from LESS
   gulp less
   gulp minify-css
   ```

4. **Local server won't start**:
   ```bash
   # Check if port 3000 is in use
   lsof -ti:3000
   # Kill process if needed
   kill -9 $(lsof -ti:3000)
   ```

### Browser Compatibility

- Modern browsers (Chrome, Firefox, Safari, Edge)
- Internet Explorer 9+ (with polyfills)
- Mobile responsive design

## 📝 Notes

- The site was last updated in 2017 (based on copyright notice)
- Built on the Start Bootstrap Freelancer template
- Uses Google Fonts (Montserrat and Lato)
- Timeline powered by Knight Lab's TimelineJS
- All vendor libraries are included locally for offline development

## 🤝 Contributing

Since this is your personal website, you're the main contributor! But if you want to make changes:

1. Make your changes locally
2. Test thoroughly with `gulp dev`
3. Build with `gulp`
4. Commit and push to `gh-pages` branch

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

**Welcome back to your website!** 🎉 

If you need to update any content or make changes, the development workflow is straightforward with the Gulp build system. The site is ready to showcase your current professional journey!
