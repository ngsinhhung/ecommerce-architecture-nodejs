# 🛒 ecommerce-architecture-nodejs
A scalable and modular eCommerce architecture built with Node.js and Express, designed to follow best practices in clean code, separation of concerns, and service-oriented structure. This project serves as a boilerplate or foundational backend for modern eCommerce applications.

# 🚀 Features
- 🧱 Modular Architecture (services, routes, controllers, models)
- 🔐 JWT Authentication & Authorization
<!-- - 🛍️ Product & Category Management
- 🧾 Cart & Order Management
- 💳 Payment Integration Ready
- 🧑‍💼 Role-Based Access Control (RBAC)
- 📦 MongoDB with Mongoose ODM
- 🧪 Jest for Unit & Integration Testing
- 🌐 RESTful API design
- 📁 Environment-based configuration support -->

# 🛠 Tech Stack
- Node.js + Express
- MongoDB + Mongoose
- JWT for auth
- dotenv for environment configs
- Jest / Supertest for testing
- bcryptjs for password hashing

# 📁 Project Structure
```
ecommerce-architecture-nodejs/
│
├── src/
│   ├── configs/         
│   ├── controllers/    
│   ├── middleware/     
│   ├── models/         
│   ├── routes/         
│   ├── services/       
│   └── utils/          
│
├── tests/              
├── .env        
├── .gitignore
├── package.json
├── package-lock.json
└── README.md
```
# 🧪 Getting Started
## 1. Clone Repository
```bash
git clone https://github.com/ngsinhhung/ecommerce-architecture-nodejs.git
cd ecommerce-architecture-nodejs
```
## 2. Npm install
```bash
npm install
```
## 3. Setup Environment in Local
Create a `.env` and add your values
```bash
#port app
PORT = 3055

#dev env
DEV_APP_PORT = 
DEV_DB_PORT = 
DEV_DB_HOST = 
DEV_DB_USERNAME = 
DEV_DB_PASSWORD = 
DEV_DB_NAME = 

#prod env
PROD_APP_PORT =  
PROD_DB_PORT = 
PROD_DB_HOST = 
PROD_DB_USERNAME = 
PROD_DB_PASSWORD = 
PROD_DB_NAME = 
```

## 4. Run the Application
```bash
npm run dev
```
Server will start on `http://localhost:3055`

# 🤝 Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.