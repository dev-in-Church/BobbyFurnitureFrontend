# 🛒 E-Commerce Website

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![GitHub issues](https://img.shields.io/github/issues/yourusername/ecommerce-website)](https://github.com/yourusername/ecommerce-website/issues)
[![GitHub stars](https://img.shields.io/github/stars/yourusername/ecommerce-website)](https://github.com/yourusername/ecommerce-website/stargazers)
[![GitHub forks](https://img.shields.io/github/forks/yourusername/ecommerce-website)](https://github.com/yourusername/ecommerce-website/network)

A modern, full-featured e-commerce platform built to provide seamless online shopping experiences with secure payment processing and intuitive user interface.

## 📸 Screenshots

![Homepage](screenshots/homepage.png)
![Product Page](screenshots/product-page.png)
![Shopping Cart](screenshots/cart.png)

> Add your screenshots to a `screenshots` folder in your repository

## 🚀 Live Demo

Check out the live demo: [https://your-demo-site.com](https://your-demo-site.com)

## ✨ Features

### 👥 Customer Features
- ✅ User registration and authentication with JWT
- 🔍 Advanced product search and filtering
- 📦 Product categories and subcategories
- 🖼️ Detailed product pages with image galleries
- 🛒 Shopping cart with real-time updates
- ❤️ Wishlist functionality
- 💳 Secure checkout with multiple payment options
- 📱 Fully responsive design (mobile, tablet, desktop)
- 📧 Email notifications for orders
- ⭐ Product reviews and ratings
- 📊 Order tracking and history
- 👤 User profile management

### 🔧 Admin Features
- 📈 Analytics dashboard with sales insights
- ➕ Product management (Create, Read, Update, Delete)
- 📊 Inventory tracking and management
- 📦 Order management and fulfillment
- 👥 Customer management
- 🏷️ Category and tag management
- 💰 Sales reports and revenue analytics
- 🎟️ Promotional codes and discount management
- 📧 Bulk email notifications

## 🛠️ Technology Stack

### Frontend
- React.js 18+
- Redux Toolkit for state management
- React Router for navigation
- Axios for API calls
- Tailwind CSS for styling
- React Hook Form for form validation
- React Icons

### Backend
- Node.js & Express.js
- MongoDB with Mongoose ODM
- JWT for authentication
- Bcrypt for password hashing
- Express Validator for input validation
- Multer for file uploads
- Nodemailer for email services

### Payment Integration
- Stripe API
- PayPal SDK

### DevOps & Tools
- Git & GitHub for version control
- Docker for containerization
- GitHub Actions for CI/CD
- Cloudinary for image storage
- Heroku / Vercel for deployment

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (v14.x or higher)
- npm or yarn
- MongoDB (v4.x or higher)
- Git

## ⚙️ Installation & Setup

### 1. Clone the repository
```bash
git clone https://github.com/yourusername/ecommerce-website.git
cd ecommerce-website
```

### 2. Backend Setup
```bash
cd backend
npm install
```

Create a `.env` file in the backend directory:
```env
NODE_ENV=development
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
JWT_EXPIRE=30d

# Payment Gateway
STRIPE_SECRET_KEY=your_stripe_secret_key
PAYPAL_CLIENT_ID=your_paypal_client_id

# Email Configuration
EMAIL_SERVICE=gmail
EMAIL_USERNAME=your_email@gmail.com
EMAIL_PASSWORD=your_app_password

# Cloudinary
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# Frontend URL
CLIENT_URL=http://localhost:3000
```

### 3. Frontend Setup
```bash
cd ../frontend
npm install
```

Create a `.env` file in the frontend directory:
```env
REACT_APP_API_URL=http://localhost:5000
REACT_APP_STRIPE_PUBLIC_KEY=your_stripe_public_key
```

### 4. Run the Application

**Backend (Terminal 1):**
```bash
cd backend
npm run dev
```

**Frontend (Terminal 2):**
```bash
cd frontend
npm start
```

The application will be available at:
- Frontend: `http://localhost:3000`
- Backend: `http://localhost:5000`

### 5. Seed Database (Optional)
```bash
cd backend
npm run seed
```

## 📁 Project Structure

```
ecommerce-website/
├── backend/
│   ├── config/
│   │   └── db.js
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── productController.js
│   │   └── orderController.js
│   ├── middleware/
│   │   ├── auth.js
│   │   └── errorHandler.js
│   ├── models/
│   │   ├── User.js
│   │   ├── Product.js
│   │   └── Order.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── productRoutes.js
│   │   └── orderRoutes.js
│   ├── utils/
│   ├── .env
│   ├── server.js
│   └── package.json
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Header/
│   │   │   ├── Footer/
│   │   │   ├── Product/
│   │   │   └── Cart/
│   │   ├── pages/
│   │   │   ├── Home.jsx
│   │   │   ├── ProductDetails.jsx
│   │   │   ├── Cart.jsx
│   │   │   └── Checkout.jsx
│   │   ├── redux/
│   │   │   ├── store.js
│   │   │   └── slices/
│   │   ├── services/
│   │   ├── utils/
│   │   ├── App.js
│   │   └── index.js
│   ├── .env
│   └── package.json
│
├── .gitignore
├── README.md
└── LICENSE
```

## 🔌 API Endpoints

### Authentication
| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/api/auth/register` | Register new user | No |
| POST | `/api/auth/login` | User login | No |
| GET | `/api/auth/profile` | Get user profile | Yes |
| PUT | `/api/auth/profile` | Update profile | Yes |

### Products
| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/api/products` | Get all products | No |
| GET | `/api/products/:id` | Get single product | No |
| POST | `/api/products` | Create product | Admin |
| PUT | `/api/products/:id` | Update product | Admin |
| DELETE | `/api/products/:id` | Delete product | Admin |

### Orders
| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/api/orders` | Create new order | Yes |
| GET | `/api/orders/myorders` | Get user orders | Yes |
| GET | `/api/orders/:id` | Get order by ID | Yes |
| PUT | `/api/orders/:id/pay` | Update order to paid | Yes |

## 🧪 Testing

```bash
# Run all tests
npm test

# Run tests with coverage
npm run test:coverage

# Run tests in watch mode
npm run test:watch
```

## 🚀 Deployment

### Deploy to Heroku

```bash
# Login to Heroku
heroku login

# Create a new app
heroku create your-app-name

# Add MongoDB Atlas
heroku addons:create mongolab:sandbox

# Set environment variables
heroku config:set JWT_SECRET=your_secret

# Deploy
git push heroku main
```

### Deploy Frontend to Vercel

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
cd frontend
vercel
```

## 🔒 Security Features

- Password encryption using bcrypt
- JWT authentication with HTTP-only cookies
- Input validation and sanitization
- Protection against XSS attacks
- CORS configuration
- Rate limiting on API endpoints
- SQL injection prevention with Mongoose
- Environment variables for sensitive data

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a new branch (`git checkout -b feature/YourFeature`)
3. Make your changes
4. Commit your changes (`git commit -m 'Add some feature'`)
5. Push to the branch (`git push origin feature/YourFeature`)
6. Open a Pull Request

Please make sure to update tests as appropriate and follow the code style of the project.

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Your Name**
- GitHub: [@yourusername](https://github.com/yourusername)
- LinkedIn: [Your LinkedIn](https://linkedin.com/in/yourprofile)
- Email: your.email@example.com

## 🙏 Acknowledgments

- [Stripe](https://stripe.com) for payment processing
- [Cloudinary](https://cloudinary.com) for image management
- [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) for database hosting
- [Tailwind CSS](https://tailwindcss.com) for styling
- All contributors who helped with this project

## 📞 Support

For support, email your.email@example.com or open an issue in the GitHub repository.

---

⭐ If you find this project useful, please consider giving it a star on GitHub!
