# Dyuration

Dyuration is a simple web application that calculates the **total duration of a YouTube playlist**. You can enter either the **playlist ID** or the full YouTube playlist URL, and the app will fetch and sum the durations of all videos in the playlist using the YouTube Data API v3.

---

## Features

- Accepts either **Playlist ID** or **full YouTube Playlist URL**.  
- Fetches all videos from the playlist (handles pagination).  
- Retrieves video durations using the YouTube Data API.  
- Converts ISO 8601 duration format into readable time (HH:MM:SS).  
- Displays total number of videos and the combined duration.  
- Responsive and minimal UI styled with CSS.  

---

## Project Structure

```
.
├── index.html   # Main HTML file with input and output UI
├── style.css    # Styling for layout and design
├── script.js    # Core logic to fetch playlist videos and calculate total duration
└── config.js    # Contains your YouTube API key (not included in repo for security)
```

---

## Setup Instructions

1. **Clone or Download the Project**
   ```bash
   git clone <repository-url>
   cd dyuration
   ```

2. **Obtain a YouTube API Key**
   - Go to [Google Cloud Console](https://console.cloud.google.com/).
   - Enable the **YouTube Data API v3**.
   - Create an API key.

3. **Configure the API Key**
   - Create a `config.js` file in the project root (same folder as `index.html`).
   - Add the following line:
     ```javascript
     const API_KEY = "YOUR_API_KEY_HERE";
     ```

4. **Run the Application**
   - Open `index.html` in your browser.
   - Enter a YouTube playlist ID or URL.
   - Click **GO** to fetch and calculate total duration.

---

## Example

Input:
```
https://www.youtube.com/playlist?list=PLynG1F8gVwYQ6P9Th3QoYBhS4bYoN3b2z
```

Output:
```
Playlist has 45 videos — total duration: 12:34:56
```

---

## Technologies Used

- **HTML5**  
- **CSS3**  
- **Vanilla JavaScript (ES6)**  
- **YouTube Data API v3**  

---

## Notes

- The API key should **not be exposed in public repositories**. Consider using environment variables or a backend proxy in production.  
- The free quota for YouTube Data API v3 may limit the number of requests per day.  
