# Desires — Premium Intimacy E-Commerce Store

A full-stack Next.js e-commerce application for premium intimacy products. Features a beautiful storefront, secure Stripe payments, and a comprehensive admin dashboard.

## 🌟 Features

- **Beautiful Storefront**: Modern, responsive design with luxury branding
- **Product Catalog**: Dynamic product listings with images and descriptions
- **Shopping Cart**: Client-side cart with localStorage persistence
- **Secure Payments**: Stripe integration for secure checkout
- **Admin Dashboard**: Complete product and order management
- **Authentication**: JWT-based admin login system
- **MongoDB Database**: Scalable NoSQL database for products and orders
- **Responsive Design**: Mobile-friendly interface

## 📋 Tech Stack

**Frontend:**
- Next.js 14
- React 18
- Axios for HTTP requests

**Backend:**
- Node.js with Express
- MongoDB with Mongoose
- JWT authentication
- Stripe API

**DevOps:**
- Vercel deployment ready
- Docker support

## 🚀 Quick Start

### Prerequisites
- Node.js 16+ and npm
- MongoDB Atlas account (free tier available)
- Stripe account (test mode available)

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/TheDesireCompany4U/The-Desire-Store-.git
cd The-Desire-Store-
npm install
```

2. **Set up environment variables**
```bash
cp .env.local.example .env.local
```

Edit `.env.local` and add:
```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/desires
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_your_key
STRIPE_SECRET_KEY=sk_test_your_key
JWT_SECRET=your_random_secret_key_here
ADMIN_EMAIL=admin@desirestore.com
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

3. **Run development server**
```bash
npm run dev
```

Visit `http://localhost:3000` in your browser.

## 📁 Project Structure

```
The-Desire-Store-/
├── pages/
│   ├── index.js              # Main storefront
│   ├── admin/
│   │   ├── index.js         # Admin dashboard
│   │   └── login.js         # Admin login page
│   └── api/
│       ├── products.js      # Product endpoints
│       ├── orders.js        # Order endpoints
│       └── auth/
│           └── login.js     # Authentication endpoint
├── models/
│   ├── Product.js           # Product schema
│   ├── Order.js             # Order schema
│   └── Admin.js             # Admin schema
├── lib/
│   └── mongodb.js           # MongoDB connection
├── package.json
├── next.config.js
└── .env.local              # Environment variables
```

## 🔑 API Endpoints

### Products
- `GET /api/products` - Get all products
- `POST /api/products` - Create new product (admin)

### Orders
- `POST /api/orders` - Create new order with Stripe payment

### Authentication
- `POST /api/auth/login` - Admin login

## 🛠️ Admin Setup

### Create Admin Account

Connect to MongoDB and insert an admin user:
```javascript
const bcryptjs = require('bcryptjs');

const hashedPassword = await bcryptjs.hash('your_password', 10);
db.admins.insertOne({
  email: 'admin@desirestore.com',
  password: hashedPassword,
  name: 'Admin User',
  role: 'admin'
});
```

Then login at `/admin/login`

### Adding Products

1. Login to admin dashboard at `/admin`
2. Click "+ Add Product"
3. Fill in product details:
   - Name
   - Price
   - Inventory quantity
   - Description
4. Click "Save Product"

## 💳 Stripe Integration

### Test Mode Setup
1. Create a Stripe account at stripe.com
2. Go to Developers → API Keys
3. Copy test keys into `.env.local`
4. Use test card: `4242 4242 4242 4242` for testing

## 🚢 Deployment

### Deploy to Vercel

1. Push code to GitHub
2. Connect repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy with one click

### Environment Variables on Vercel
```
MONGODB_URI
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
STRIPE_SECRET_KEY
JWT_SECRET
ADMIN_EMAIL
NEXT_PUBLIC_APP_URL=https://your-domain.vercel.app
```

## 📚 Usage Guide

### For Customers
1. Browse products on homepage
2. Click "+" to add items to cart
3. Click "Bag" to view cart
4. Proceed to secure Stripe checkout
5. Enter test card details and confirm payment

### For Admins
1. Visit `/admin/login`
2. Enter admin credentials
3. Manage products (add, view, track inventory)
4. Monitor orders and payment status
5. View customer information

## 🔒 Security Features

- Password hashing with bcryptjs
- JWT token authentication
- Secure Stripe payment processing
- CORS protection
- Environment variable protection
- MongoDB connection pooling

## 📦 Dependencies

Key packages used:
- `next`: React framework
- `mongoose`: MongoDB ODM
- `stripe`: Payment processing
- `jsonwebtoken`: JWT authentication
- `bcryptjs`: Password hashing
- `cors`: Cross-origin resource sharing

## 🐛 Troubleshooting

**MongoDB Connection Error**
- Verify MONGODB_URI is correct
- Check MongoDB Atlas IP whitelist includes your IP
- Ensure database credentials are valid

**Stripe Payment Issues**
- Confirm API keys are in .env.local
- Test keys must start with `pk_test_` and `sk_test_`
- Use correct test card number

**Admin Login Not Working**
- Verify admin user exists in MongoDB
- Check JWT_SECRET is set
- Clear browser localStorage and try again

## 🤝 Contributing

1. Create a feature branch
2. Make your changes
3. Submit a pull request

## 📄 License

Proprietary - All rights reserved

## 📞 Support

For issues or questions:
- Check GitHub issues
- Review API documentation
- Contact admin@desirestore.com

---

**Made with ❤️ for Desires — Your pleasure, your way.**
