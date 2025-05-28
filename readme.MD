# homeDash

**homeDash** is an open-source, customizable home dashboard for your browser. It’s designed to be your personal start page, providing quick access to bookmarks, widgets (like weather, system info, and more), and admin features for advanced users.

---

## Features

- **User Authentication**: Secure login system with admin/user roles.
- **Bookmarks Bar**: Add, remove, and organize your favorite links.
- **Widgets**: Modular widget system (weather, system info, clock, etc.).
- **Admin Panel**: Admins can manage users and configure which widgets are available.
- **Responsive Design**: Works great on desktop and mobile.
- **Server Storage**: User and widget settings are stored on the server.

---

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18+ recommended)
- [npm](https://www.npmjs.com/)

### Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/coneheadlarry/homeDash.git
   cd homeDash/home-page
   ```

2. **Install dependencies:**

   ```bash
   cd frontend
   npm install
   ```

3. **Configure environment variables:**

   - Copy `.env.example` to `.env` in both `backend` and `frontend` folders and adjust as needed.

4. **Start the backend:**

   ```bash
   cd backend
   npm start
   ```

5. **Start the frontend:**

   ```bash
   cd ../frontend
   npm run dev
   ```

project already has nodemon and conconancy to set up front and back. Alternate approach is just running npm run dev in home-page

6. **Open your browser:**  
   Visit [http://localhost:3000](http://localhost:3000)

---

## Project Structure

```
homeDash/
  backend/      # Express.js backend (auth, widgets, bookmarks, etc.)
  frontend/     # Next.js frontend (UI, widgets, dashboard)
```

---

## Contributing

Contributions are welcome! Please open issues and pull requests for features, bug fixes, or documentation improvements.

1. Fork the repo
2. Create your feature branch (`git checkout -b feature/your-feature`)
3. Commit your changes (`git commit -am 'Add new feature'`)
4. Push to the branch (`git push origin feature/your-feature`)
5. Open a pull request

---

## Roadmap

- [ ] UI panel to add new widgets without needing to edit code.
- [ ] More widgets (calendar, news, etc.).
- [ ] Drag and drop for reordering UI.

---

## Acknowledgements

- [Next.js](https://nextjs.org/)
- [Express.js](https://expressjs.com/)
- [Open-Meteo](https://open-meteo.com/) for weather data
- All contributors and the open source community!

---

**homeDash** — Your open-source, personal dashboard.

**Creating Widgets**

1. The first step is to create a react component for the UI.

2. Add the new widget/react component to the index.ts file in side ./frontend/src/app/widget/index.ts

3. Add the component to the json file in ./backend/ widgets.json
