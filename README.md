# osu! Stream Overlay (v1.2.0)

![Next.js](https://img.shields.io/badge/Next.js-black?style=flat&logo=nextdotjs&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=flat&logo=tailwindcss&logoColor=white)
![osu! API v2](https://img.shields.io/badge/osu!_API_v2-FF66AA?style=flat&logo=osu!&logoColor=white)
![TikTok](https://img.shields.io/badge/TikTok_LIVE-000000?style=flat&logo=tiktok&logoColor=white)
![WebSocket](https://img.shields.io/badge/WebSocket-000000?style=flat&logo=socketdotio&logoColor=white)

A modern, highly customizable, and lightweight vertical stream overlay (9:16) built specifically for osu! streamers. Designed for **OBS** and **TikTok LIVE Studio** with modular rendering.

---

## ✨ Features

- **Live Rank Card:** Automatically fetches your Global and Country rank every 20 seconds using the official osu! API v2.
- **Real-Time PP Counter (v1.1.0):** Displays your current Performance Points (livePp) and potential SS PP (mSimulatedPp) dynamically during gameplay.
- **TikTok Song Request (v1.2.0):** Integrated TikTok LIVE chat listener for `!req [BeatmapID]` commands with automatic metadata fetching.
- **Modular URL Routing:** No more manual cropping! Render specific widgets via URL parameters (e.g., `?overlay=rank`).
- **Dynamic Goal Tracker:** A visual progress bar calculating your remaining ranks to reach your daily target.
- **Now Playing Widget:** Connects to [osu!StreamCompanion](https://github.com/Piotrekol/StreamCompanion) via WebSocket to display map details and star rating.
- **Secret Admin Panel:** Secure, PIN-protected dashboard to update goals, TikTok username, and **Simulate Requests** via BroadcastChannel.

## ⚠️ Important Disclaimer (Localhost Only)

This application is designed to be run on **Localhost**. It utilizes a local JSON file (`goal_config.json`) to persist your stream targets. Running it locally guarantees zero latency and keeps your API credentials safe on your own machine.

Running it locally guarantees zero latency for your OBS and keeps your API credentials completely safe on your own machine.

## 🚀 Installation & Setup

### 1. Prerequisites
- **Node.js** (v20 LTS or higher recommended).
- **[osu!StreamCompanion (by Piotrekol)](https://github.com/Piotrekol/StreamCompanion)** installed and running on your PC. 
  > ⚠️ **IMPORTANT:** This overlay is strictly built for StreamCompanion's WebSocket API (`ws://localhost:20727`). It will **NOT** work with other overlay programs like Gosumemory or osu!Sync.
- An **osu! API v2 OAuth Client** (See Step 4 for the guide).

### 2. Clone the Repository
```bash
git clone [https://github.com/YOUR_USERNAME/osu-overlay.git](https://github.com/YOUR_USERNAME/osu-overlay.git)
cd osu-overlay
```

### 3. Install Dependencies
```bash
npm install
```

### 4. Environment Variables & API Setup
Create a new file named `.env.local` in the root directory. You need to provide your osu! API credentials to make the live rank tracker work.

**How to get your osu! API v2 Credentials:**
1. Go to your [osu! Account Settings](https://osu.ppy.sh/home/account/edit#oauth) and scroll down to the **OAuth** section.
2. Click on **New OAuth Application**.
3. Fill in the details:
   - **Application Name:** Anything you want (e.g., `My Stream Overlay`).
   - **Application URL:** You can put `http://localhost:3000` or leave it empty.
4. Click **Register application**.
5. You will now see your **Client ID** (a number) and **Client Secret** (a long string of characters).

Copy those details and your exact osu! username into your `.env.local` file like this:
```env
OSU_CLIENT_ID=your_client_id_here
OSU_CLIENT_SECRET=your_client_secret_here
OSU_USERNAME=your_exact_osu_username
```
*Note: This .env.local file is automatically ignored by Git, ensuring your secret credentials will never be uploaded to the public repository.*

### 5. Setup Goal Configuration
Rename the provided example config file to initialize your local storage:
```bash
cp goal_config.example.json goal_config.json
```

## 🔗 URL Routing (Modular Rendering)
### To avoid manual cropping in OBS/TikTok Studio, use these specific URLs as Browser Sources:
1. Rank & PP Stats: http://localhost:3000/index.html?overlay=rank
2. Stream Goal: http://localhost:3000/index.html?overlay=goal
3. Song Request Queue: http://localhost:3000/index.html?overlay=queue
4. Now Playing Only: http://localhost:3000/index.html?overlay=nowplaying
5. Full Preview: http://localhost:3000/

## 💻 Usage
### Running the App Locally (Terminal/CMD)
Every time you want to stream, you need to start the local Next.js server. 

1. Open your terminal (Command Prompt, PowerShell, or VSCode Terminal).
2. Navigate to the project directory where you cloned/extracted the files:
   ```bash
   cd path/to/your/osu-overlay
   npm run dev
   ```


   *Or for better performance, build it once and start in production mode:*
   ```bash
   npm run build
   npm start
   ```
   ⚠️**IMPORTANT:** Keep the terminal window open while you are streaming. If you close the terminal, the overlay will go offline.

## OBS / TikTok LIVE Studio Setup
1. Open the Admin Panel at http://localhost:3000/admin (Default PIN: 12345).
2. Enter your TikTok Username in the field provided.
3. Viewers can request songs using: !req <BeatmapID> (Example: !req 923245).
4. Testing: Use the "Request Simulator" in the Admin Panel to test the UI without going live.

## Accessing the Admin Panel
To update your stream goals:
1. Open your browser and go to http://localhost:3000/admin.
2. Enter the default Secret PIN: 12345 (You can change this in src/app/admin/page.tsx).
3. Update your Start Rank, Live Target, or Ultimate Goal and click "Update Stream Goal". The overlay will update automatically!

## 🛠️ Built With
- Next.js - The React Framework for the Web.
- Tailwind CSS - Rapid UI styling.
- TypeScript - For type-safe code.

## 📄 License
This project is open-source and available under the MIT License. Feel free to fork, modify, and improve!