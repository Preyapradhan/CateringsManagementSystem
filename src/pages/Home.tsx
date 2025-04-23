import React from 'react';
import { Link } from 'react-router-dom';
import { ChefHat, UtensilsCrossed, ShoppingBag, Clock, Star, Users } from 'lucide-react';

const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 to-white">
      {/* Hero Section */}
      <div className="container mx-auto px-4 pt-16 pb-24">
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-5xl font-bold text-gray-900 mb-6 leading-tight">
            Experience the Magic of
            <span className="text-indigo-600"> Authentic Indian Cuisine</span>
          </h1>
          <p className="text-xl text-gray-600 mb-12 leading-relaxed">
            From traditional flavors to modern fusion, we bring the essence of India to your special events.
            Every dish tells a story, every meal creates a memory.
          </p>
          
          <div className="flex justify-center gap-6">
            <Link
              to="/products"
              className="px-8 py-4 bg-indigo-600 text-white rounded-full hover:bg-indigo-700 transition-all transform hover:scale-105 shadow-lg hover:shadow-xl"
            >
              Explore Our Menu
            </Link>
            <Link
              to="/products"
              className="px-8 py-4 border-2 border-indigo-600 text-indigo-600 rounded-full hover:bg-indigo-50 transition-all transform hover:scale-105"
            >
              View Special Offers
            </Link>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-white py-24">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-12 max-w-6xl mx-auto">
            <div className="bg-gradient-to-br from-indigo-50 to-white p-8 rounded-2xl shadow-lg transform hover:-translate-y-2 transition-all">
              <div className="bg-indigo-100 p-3 rounded-full w-fit mb-6">
                <ChefHat className="w-8 h-8 text-indigo-600" />
              </div>
              <h2 className="text-2xl font-bold mb-4 text-gray-900">Master Chefs</h2>
              <p className="text-gray-600 leading-relaxed">
                Our expert chefs bring decades of experience and passion to every dish, ensuring authentic flavors and perfect execution.
              </p>
            </div>
            
            <div className="bg-gradient-to-br from-indigo-50 to-white p-8 rounded-2xl shadow-lg transform hover:-translate-y-2 transition-all">
              <div className="bg-indigo-100 p-3 rounded-full w-fit mb-6">
                <UtensilsCrossed className="w-8 h-8 text-indigo-600" />
              </div>
              <h2 className="text-2xl font-bold mb-4 text-gray-900">Custom Menus</h2>
              <p className="text-gray-600 leading-relaxed">
                Create your perfect menu from our extensive selection of dishes, tailored to your taste and dietary preferences.
              </p>
            </div>
            
            <div className="bg-gradient-to-br from-indigo-50 to-white p-8 rounded-2xl shadow-lg transform hover:-translate-y-2 transition-all">
              <div className="bg-indigo-100 p-3 rounded-full w-fit mb-6">
                <Clock className="w-8 h-8 text-indigo-600" />
              </div>
              <h2 className="text-2xl font-bold mb-4 text-gray-900">Quick Delivery</h2>
              <p className="text-gray-600 leading-relaxed">
                Enjoy prompt and reliable delivery service, bringing fresh and hot meals right to your doorstep.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-indigo-600 py-20 text-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto text-center">
            <div>
              <div className="text-4xl font-bold mb-2">1000+</div>
              <div className="text-indigo-200">Happy Customers</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">50+</div>
              <div className="text-indigo-200">Menu Items</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">4.8</div>
              <div className="text-indigo-200">Average Rating</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">30+</div>
              <div className="text-indigo-200">Expert Chefs</div>
            </div>
          </div>
        </div>
      </div>

      {/* Testimonials */}
      <div className="py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">What Our Customers Say</h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              {
                name: "Sarah Johnson",
                comment: "The best Indian catering service I've ever experienced. The food was absolutely delicious!",
                rating: 5
              },
              {
                name: "Michael Chen",
                comment: "Incredible variety and authentic taste. Their service made our event truly special.",
                rating: 5
              },
              {
                name: "Emily Williams",
                comment: "Professional service and amazing food quality. Highly recommended for any event!",
                rating: 5
              }
            ].map((testimonial, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-lg">
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-600 mb-4 italic">"{testimonial.comment}"</p>
                <p className="font-semibold text-gray-900">{testimonial.name}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-indigo-600 to-indigo-800 py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-8">
            Ready to Experience Our Delicious Food?
          </h2>
          <Link
            to="/products"
            className="inline-block px-8 py-4 bg-white text-indigo-600 rounded-full font-semibold hover:bg-indigo-50 transition-all transform hover:scale-105 shadow-lg"
          >
            Order Now
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;