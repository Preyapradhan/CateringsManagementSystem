# Indian Flavour - Catering Management System

A modern, full-stack catering management system built with React, TypeScript, and Supabase. This application helps manage catering services with features for both customers and administrators.

![Indian Flavour Banner](https://images.unsplash.com/photo-1585937421612-70a008356fbe?auto=format&fit=crop&q=80&w=800)

## 🚀 Features

### For Customers
- 🍽️ Browse extensive menu of authentic Indian dishes
- 🛒 Easy cart management and ordering
- 📦 Real-time order tracking
- 🚚 Delivery status updates
- 👤 User profile management
- 📱 Responsive design for all devices

### For Administrators
- 📊 Interactive dashboard with real-time metrics
- 🍳 Menu management system
- 📋 Order processing and tracking
- 🚗 Delivery management
- 👥 Customer management
- 📈 Revenue tracking

## 🛠️ Tech Stack

- **Frontend:**
  - React 18
  - TypeScript
  - Tailwind CSS
  - Zustand (State Management)
  - Lucide React (Icons)
  - React Router DOM

- **Backend:**
  - Supabase (Database & Authentication)
  - Row Level Security (RLS)
  - Real-time subscriptions

## 🏗️ Architecture

- Modern component-based architecture
- Secure authentication flow
- Real-time data synchronization
- Responsive design patterns
- Type-safe database interactions

## 🚀 Getting Started

1. **Clone the repository**
```bash
git clone https://github.com/yourusername/indian-flavour.git
cd indian-flavour
```

2. **Install dependencies**
```bash
npm install
```

3. **Set up environment variables**
Create a `.env` file in the root directory:
```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

4. **Start the development server**
```bash
npm run dev
```

## 📱 Application Structure

```
src/
├── components/     # Reusable UI components
├── pages/         # Page components
│   └── admin/     # Admin dashboard pages
├── store/         # Zustand store configurations
├── lib/           # Utility functions and configurations
└── types/         # TypeScript type definitions
```

## 🔐 Security

- Secure authentication using Supabase Auth
- Row Level Security (RLS) policies
- Role-based access control
- Secure API endpoints

## 🎨 Design Features

- Clean, minimalistic UI
- Responsive design
- Interactive components
- Smooth animations
- Consistent color scheme
- Accessibility-focused

## 📦 Database Schema

- **profiles:** User information and roles
- **products:** Menu items and details
- **orders:** Customer orders and status
- **order_items:** Individual items in orders

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Images from Unsplash
- Icons from Lucide React
- UI inspiration from modern design patterns