# DailyStream — Web-based News Aggregator

## Overview
DailyStream is a lightweight, web-based news aggregator built as part of my
CodeClause Web Development Internship. The application fetches real-time news
articles from multiple categories and presents them in a clean, responsive,
and user-friendly interface. It runs entirely in the browser and does not
require a backend server.

> Note: This application is intended for educational and demonstration purposes
> and relies on third-party news APIs for content.

## Features
- **Category-based news browsing**: General, Business, Technology, Sports, Health, Entertainment
- **Keyword search**: Search news articles by topic
- **Responsive UI**: Works smoothly on mobile, tablet, and desktop screens
- **Modern card layout**: Clean design with hover effects
- **Live data fetching**: Real-time headlines using NewsAPI
- **Loading indicators**: Visual feedback while fetching data
- **Graceful error handling**: Handles empty results and API errors

## Tech Stack
- **HTML5** for structure
- **CSS3 + Bootstrap 5 (CSS only)** for styling and responsiveness
- **JavaScript (ES6+)** for logic and API interaction
- **Google Fonts (Inter)** for typography
- **Font Awesome** for icons
- **NewsAPI** for fetching live news data

## Project Structure

.
├─ index.html # Main application layout
├─ css
│ └─ style.css # Styling and responsive layout
├─ js
│ └─ app.js # Core logic, API calls, UI interactions
└─ README.md # Project documentation


## Getting Started (Local)
This is a static web application. No build step is required.

### Option A: Open directly
1. Download or clone the repository.
2. Open `index.html` in any modern web browser.

### Option B: VS Code Live Server (Recommended)
1. Open the project folder in VS Code.
2. Install the **Live Server** extension.
3. Right-click `index.html` → **Open with Live Server**.

### API Key Setup
1. Get a free API key from https://newsapi.org/
2. Open `js/app.js`
3. Replace:
   ```js
   const API_KEY = "YOUR_NEWSAPI_KEY_HERE";

with your actual API key.
Usage

    Select a news category from the navigation bar.

    Use the search bar to find articles by keyword.

    Click Read More to open the full article on the original source website.

    Scroll through cards to browse multiple articles.

## Notes

    This project directly calls the NewsAPI from the browser for simplicity.

    For production use, API requests should be routed through a backend to avoid
    exposing API keys.

    The default country for headlines can be changed in js/app.js by modifying
    the COUNTRY constant.

    The project was intentionally kept framework-free to strengthen core
    JavaScript and DOM manipulation skills.

## Deployment

This is a static site and can be hosted on any static hosting platform.
GitHub Pages

    Push the project to a GitHub repository.

    Enable GitHub Pages from repository settings.

    Set the source branch to main and folder to /root.

Other Hosting Platforms

    Netlify

    Vercel

    Any static web server

No additional configuration is required.
Customization

    Update colors, layout, and typography in css/style.css.

    Modify categories by editing the data-category attributes in index.html.

    Adjust article summary length using the truncate() helper in js/app.js.

    Extend features such as pagination or country selection if needed.

## License

This project is created for educational and internship purposes.
Please review NewsAPI’s terms of service before using it in production
