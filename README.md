# BugShop - Arthropod Marketplace

A modern e-commerce platform for arthropod enthusiasts, breeders, and suppliers built with Next.js, TypeScript, and Stripe.

## Features Implemented

### ✅ User Authentication
- NextAuth.js integration with support for multiple providers
- Secure session management
- User profiles and dashboard

### ✅ Storefront Management
- Multi-vendor marketplace architecture
- Each user can own/manage multiple storefronts
- Role-based permissions (owner, manager, employee)
- Storefront creation flow with name and description

### ✅ Product Management
- Add products to storefronts
- Product details: name, description, price, quantity, status
- Inventory tracking
- Product listing on storefront pages

### ✅ Shopping Cart
- Database-persisted shopping cart
- Add/remove items functionality
- Cart organized by storefront (separate checkouts)
- Real-time cart count display
- Session-based cart management

### ✅ Stripe Integration
- Secure checkout flow with Stripe Checkout
- Payment processing
- Order creation and tracking
- Webhook handling for payment confirmation
- Cart cleanup after successful payment

### ✅ Order Management
- Order creation on checkout initiation
- Order status tracking (pending, paid, shipped, completed)
- Order items with price history
- Integration with Stripe payment intents

### ✅ Database Schema
Comprehensive schema with proper relationships:
- Users and authentication tables
- Storefronts with multi-user support
- Products with inventory management
- Shopping cart persistence
- Orders and order items
- Proper foreign key relationships and constraints

## Tech Stack

- **Frontend**: Next.js 15, React 19, TypeScript
- **Styling**: Tailwind CSS
- **Database**: PostgreSQL with Drizzle ORM
- **Authentication**: NextAuth.js
- **Payments**: Stripe
- **UI Components**: Radix UI, Lucide React icons

## Getting Started

### Prerequisites
- Node.js 18+ and npm/pnpm
- PostgreSQL database
- Stripe account

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd bugshop
```

2. Install dependencies:
```bash
npm install
# or
pnpm install
```

3. Set up environment variables:
```bash
cp .env.example .env
```

Fill in your environment variables:
```env
# Auth
NEXTAUTH_SECRET=your-secret-here
NEXTAUTH_URL=http://localhost:3000

# Database
DATABASE_URL=your-postgresql-url

# Stripe
STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...

# OAuth providers (optional)
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
```

4. Run database migrations:
```bash
npm run db:migrate
```

5. Start the development server:
```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) to see the application.

## Key Features Overview

### Multi-Vendor Architecture
- Users can create multiple storefronts
- Each storefront operates independently
- Role-based access control for storefront management

### Shopping Experience
- Browse products by storefront
- Add items to cart with real-time updates
- Separate checkout per storefront
- Secure payment processing via Stripe

### Seller Dashboard
- Create and manage storefronts
- Add and edit products
- View role in each storefront
- Access management tools based on permissions

## API Endpoints

### Storefronts
- `POST /api/storefronts` - Create new storefront
- `GET /api/storefronts` - Get user's storefronts

### Products
- `POST /api/products` - Add product to storefront
- `GET /api/products?storefrontId=<id>` - Get products for storefront

### Shopping Cart
- `GET /api/cart` - Get user's cart items
- `POST /api/cart` - Add item to cart
- `DELETE /api/cart?id=<itemId>` - Remove item from cart

### Checkout
- `POST /api/checkout` - Create Stripe checkout session

### Webhooks
- `POST /api/webhooks/stripe` - Handle Stripe payment events

## Database Schema

### Core Tables
- `user` - User accounts and profiles
- `storefront` - Individual seller storefronts
- `user_storefront` - Many-to-many user-storefront relationships
- `product` - Products/listings
- `cart_item` - Shopping cart persistence
- `order` - Order records
- `order_item` - Individual items in orders

### Key Relationships
- Users can belong to multiple storefronts with different roles
- Products belong to specific storefronts
- Cart items are linked to both users and storefronts
- Orders track payment status and fulfillment

## Development Notes

### Database Migrations
The project uses Drizzle ORM for database management. Generate new migrations with:
```bash
npx drizzle-kit generate
```

Apply migrations with:
```bash
npm run db:migrate
```

### Stripe Configuration
1. Set up a Stripe account and get your API keys
2. Configure webhook endpoints in Stripe Dashboard
3. Set the webhook secret in your environment variables
4. Webhook URL: `https://your-domain.com/api/webhooks/stripe`

### Authentication Setup
Configure OAuth providers in your environment or use email/password authentication through NextAuth.js.

## Current Limitations & Future Enhancements

### Current State
- Basic product management (no image uploads yet)
- Single storefront checkout only
- Simple order status tracking
- Basic user roles

### Potential Enhancements
- Product image upload and management
- Cross-storefront cart and checkout
- Advanced order management and tracking
- Review and rating system
- Search and filtering
- Email notifications
- Inventory alerts
- Shipping integration
- Payment split configuration for platform fees

## Contributing

This project follows standard Git workflow practices. Please ensure all tests pass and code is properly formatted before submitting pull requests.

## License

This project is private and proprietary.
