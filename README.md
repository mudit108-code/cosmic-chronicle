# 🌌 Cosmic Chronicle

**Cosmic Chronicle** is an interactive and educational React-based web application designed for space enthusiasts. It brings together data from NASA and The Space Devs APIs to allow users to explore historical space events and enjoy visual and interactive astronomy content — all within a clean, responsive interface.

## 🛠 Installation and Setup Instructions

To run this project locally:

1. Make sure you have **Node.js** and **npm** installed on your system.

2. Open VS Code, then either clone this repository using Git or manually copy the files into a local project folder.

3. Open the project folder in VS Code.

4. Open the integrated terminal and run the following command to install all dependencies:

   npm install:
Once installation is complete, start the development server with:

   npm start:
Your app should open in your browser.

### 🌟 Website Functionality and Unique Features:

Cosmic Chronicle offers a rich set of features focused on historical and visual space data. At its core, the app provides a calendar-based interface where users can select any month and day to explore space events that occurred on that date across different years. This includes two categories of space data: Launch Events, which detail spacecraft or satellite launches with time, vehicle, and provider; and General Events, which include milestones like discoveries, mission landings or commemorations.

One of the most visually engaging features is the integration of NASA’s Astronomy Picture of the Day (APOD). Users can view stunning space imagery each day along with a scientific description pulled directly from NASA's APOD API. This keeps the experience fresh and aligned with daily astronomical highlights.

Another standout feature is the inclusion of an interactive 3D model of the Voyager spacecraft. Built using react-three-fiber and three.js, the model allows users to rotate and explore the iconic Voyager probe in real time, helping users visually understand the design and components of deep space missions.

The application is fully responsive, ensuring smooth usage on both desktop and mobile devices. The timeline section uses optimized pagination and filtering logic to scan for matching dates without overloading the API, while APOD and Voyager content are rendered with minimal performance overhead.

#### 📦 Dependencies:

This project uses the following packages and tools:

react – Main UI framework for building the app.

axios – Used to make API calls to both SpaceDevs and NASA endpoints.

react-calendar – Calendar component that allows users to pick a date (month and day only) to view events.

three and @react-three/fiber – For rendering and interacting with the 3D Voyager model.

react-dom – React DOM renderer.

APIs used:

NASA APOD API: Used to fetch the Astronomy Picture of the Day for the current date.

SpaceDevs Launch Library 2 API: Used to fetch past launch and general space events filtered by date.

