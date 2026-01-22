# DailyStream — Web-based News Aggregator

A clean, modern, and fully responsive news aggregator built with HTML, CSS, and vanilla JavaScript. It uses Bootstrap (CSS-only), Google Fonts, and Font Awesome. Live news is fetched from NewsAPI.org.

## Features
- Modern, professional, light theme UI
- Card-based layout with hover effects
- Responsive design for mobile, tablet, and desktop
- Category filters: General, Business, Technology, Sports, Health, Entertainment
- Search by keyword
- Loading spinner during fetch
- Graceful error handling
- Each card shows title, summary, source, and a "Read More" link

## Tech Stack
- HTML5
- CSS3 + Bootstrap 5 (CSS only)
- JavaScript (ES6+)
- Google Fonts (Inter)
- Font Awesome icons

## Getting Started

1. Clone or download this repository.
2. Open the project in your editor.
3. Get a free API key from https://newsapi.org/ (sign up and copy your API key).
4. Open `js/app.js` and replace:
   ```js
   const API_KEY = "YOUR_NEWSAPI_KEY_HERE";
   ```
   with your actual key, e.g.:
   ```js
   const API_KEY = "abc123...";
   ```
5. Open `index.html` in your browser (double-click or use a local server).

That's it! You should see live headlines and can switch categories or search.

## Project Structure
```
.
├── index.html
├── css
│   └── style.css
├── js
│   └── app.js
└── README.md
```

## Notes
- This demo calls the NewsAPI directly from the browser for simplicity. In production, consider routing requests through a lightweight backend to avoid exposing your API key.
- You can change the default country in `js/app.js` by editing `COUNTRY` (e.g., `"us"`, `"in"`, `"gb"`).
- If you prefer another provider, you may adapt the fetch URL/response mapping accordingly.

## Customization
- Update brand name, colors, and spacing in `index.html` and `css/style.css`.
- Modify categories in the navbar by changing the buttons' `data-category` attributes.
- Adjust truncation length in `js/app.js` (see `truncate()` helper).

## Screenshots
Add screenshots or a short GIF here to showcase the UI.

## License
This project is for educational/demo purposes. Check NewsAPI terms for usage.
