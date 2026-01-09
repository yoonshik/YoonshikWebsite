# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Build Commands

```bash
# Install dependencies
npm install

# Build all assets (compile LESS, minify CSS/JS, copy vendor files)
gulp

# Start development server with live reload on http://localhost:3000
gulp dev

# Individual tasks
gulp less          # Compile LESS to CSS
gulp minify-css    # Minify CSS (runs less first)
gulp minify-js     # Minify JavaScript
gulp copy          # Copy vendor libs from node_modules to vendor/
```

## Architecture

This is a static personal portfolio site based on the Start Bootstrap Freelancer template, hosted on GitHub Pages.

**Build System**: Gulp 3.9.1 with LESS preprocessing. The gulpfile compiles `less/freelancer.less` → `css/freelancer.css` → `css/freelancer.min.css`, and minifies `js/freelancer.js` → `js/freelancer.min.js`.

**Pages**:
- `index.html` - Main landing page with profile and social links
- `timeline.html` - Professional timeline using Knight Lab's TimelineJS (embedded via iframe from Google Sheets)

**Styling**: LESS source files in `less/` with variables in `variables.less` and mixins in `mixins.less`. Bootstrap 3.3.7 provides the grid and components.

**Deployment**: Push to `gh-pages` branch auto-deploys to GitHub Pages. Custom domain configured via `CNAME` file pointing to yoonshik.com.
