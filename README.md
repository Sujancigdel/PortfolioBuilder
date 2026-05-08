# PortfolioBuilder

A full-stack web application to **create, manage, and export beautiful personal portfolios** with ease.

Built with a modern React frontend and a robust Node.js + Express backend.

##  Features

- **User Authentication** (Register, Login, JWT)
- **Portfolio Creation & Management**
- **Multiple Portfolio Templates**
- **Real-time Preview**
- **Export as ZIP** (HTML + Assets) — ready to deploy anywhere
- **Responsive Design**
- **Secure Backend** with rate limiting, XSS protection & Helmet
- **Database**: PostgreSQL

## 🛠 Tech Stack

### Frontend (Client)
- **React 19** + Vite
- **React Router DOM**
- **Tailwind CSS** (assumed)
- Axios for API calls
- React Hot Toast

### Backend (Server)
- **Node.js** + **Express**
- **PostgreSQL** (pg)
- JWT Authentication
- Multer (file uploads)
- Handlebars (template rendering)
- bcrypt, Helmet, CORS, Rate Limiting

##  Project Structure
PortfolioBuilder/
├── client/                 # React + Vite Frontend
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── context/
│   │   └── assets/
│   ├── package.json
│   └── vite.config.js
│
├── server/                 # Node.js + Express Backend
│   ├── controllers/
│   ├── routes/
│   ├── models/
│   ├── middleware/
│   ├── server.js
│   └── package.json
│
└── README.md
