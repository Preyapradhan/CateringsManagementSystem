# Indian Flavour - Catering Management System

A modern, full-stack web application for managing catering services, built with **React**, **TypeScript**, and **Supabase**. This system provides a seamless experience for both customers and administrators in managing catering orders and services.

![Indian Flavour Banner](https://images.unsplash.com/photo-1585937421612-70a008356fbe?auto=format&fit=crop&q=80&w=800)

## 🌟 Features

### Customer Features
- **User Authentication**
  - Secure login and registration
  - Profile management
  - Password recovery

- **Menu & Ordering**
  - Browse through available catering products
  - Add items to cart
  - Real-time cart management
  - Place and track orders

- **Order Management**
  - View order history
  - Track order status
  - Cancel or modify orders
  - View order details

### Admin Features
- **Dashboard**
  - Overview of daily operations
  - Key performance metrics
  - Recent order notifications

- **Product Management**
  - Add/Edit/Delete products
  - Manage product categories
  - Update product availability
  - Set pricing and descriptions

- **Order Processing**
  - View all customer orders
  - Update order status
  - Process payments
  - Generate order reports

## 🛠️ Technology Stack

### Frontend
- **React 18** - UI library
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Styling and responsive design
- **Zustand** - State management
- **React Router DOM** - Client-side routing
- **Lucide React** - Icon library

### Backend
- **Supabase**
  - PostgreSQL database
  - Authentication
  - Real-time subscriptions
  - Row Level Security (RLS)

### Development Tools
- **Vite** - Build tool and development server
- **ESLint** - Code linting
- **TypeScript** - Type checking
- **Git** - Version control

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- Supabase account

### Installation

1. Clone the repository
```bash
git clone https://github.com/Preyapradhan/CateringsManagementSystem.git
cd catering-management-system
```

2. Install dependencies
```bash
npm install
```

3. Set up environment variables
Create a `.env` file in the root directory:
```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

4. Start the development server
```bash
npm run dev
```

## 📁 Project Structure

```
src/
├── components/     # Reusable UI components
│   └── Navbar.tsx
├── pages/         # Page components
│   ├── admin/     # Admin dashboard pages
│   │   ├── Dashboard.tsx
│   │   ├── Orders.tsx
│   │   └── Products.tsx
│   ├── Cart.tsx
│   ├── Home.tsx
│   ├── Login.tsx
│   ├── Orders.tsx
│   ├── Profile.tsx
│   ├── Products.tsx
│   └── Register.tsx
├── store/         # Zustand store configurations
├── lib/           # Utility functions and configurations
└── types/         # TypeScript type definitions
```

## 🔒 Security Features

- Secure authentication using Supabase Auth
- Row Level Security (RLS) policies
- Role-based access control
- Protected API endpoints
- Secure session management

## 🎨 UI/UX Features

- Responsive design for all devices
- Clean and intuitive interface
- Real-time updates
- Loading states and error handling
- Form validation
- Interactive components

## 📊 Database Schema

### Tables
- **users** - User profiles and authentication
- **products** - Catering menu items
- **orders** - Customer orders
- **order_items** - Individual items in orders
  
## 🙏 Acknowledgments

- Supabase team for the amazing backend platform
- React team for the frontend library
- All contributors and supporters of the project

## 🎨 Website Interface

![Screenshot 2025-04-19 212906](https://github.com/user-attachments/assets/4a75936a-349c-47cf-a6c8-bb429b85260e)


![Screenshot 2025-04-19 212919](https://github.com/user-attachments/assets/4ad8d110-1f2d-449d-b40a-b479e57365b1)


![Screenshot 2025-04-18 185203](https://github.com/user-attachments/assets/e31dfd55-7f2b-4798-bf6b-59ea86f8e11c)


![Screenshot 2025-04-23 124550](https://github.com/user-attachments/assets/645a3735-71cd-4f51-bff3-6ea2560f0238)


![Screenshot 2025-04-18 185402](https://github.com/user-attachments/assets/ff230bd4-586f-47f7-8b03-94ed8bf93233)


![Screenshot 2025-04-18 185417](https://github.com/user-attachments/assets/82d15b56-568d-4149-a7e3-eb54e43b6082)


![Screenshot 2025-04-18 185432](https://github.com/user-attachments/assets/e2fb633f-cc72-45c1-8777-9026cb0f7e50)






