import { Link } from 'react-router-dom';
import { Compass, Calendar, User, LogIn, UserPlus, MapPin } from 'lucide-react';

export default function Navbar() {
  return (
    <nav className="bg-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2">
            <Compass className="h-8 w-8 text-indigo-600" />
            <span className="text-xl font-bold text-gray-900">Axxam</span>
          </Link>
          
          <div className="flex items-center space-x-4">
            <Link 
              to="/destinations" 
              className="flex items-center space-x-1 px-3 py-2 rounded-md text-gray-700 hover:text-indigo-600 hover:bg-gray-50"
            >
              <MapPin className="h-5 w-5" />
              <span>Destinations</span>
            </Link>
            
            <Link 
              to="/bookings" 
              className="flex items-center space-x-1 px-3 py-2 rounded-md text-gray-700 hover:text-indigo-600 hover:bg-gray-50"
            >
              <Calendar className="h-5 w-5" />
              <span>Réservations</span>
            </Link>

            <div className="h-6 w-px bg-gray-200"></div>

            <Link 
              to="/login" 
              className="flex items-center space-x-1 px-3 py-2 rounded-md text-gray-700 hover:text-indigo-600 hover:bg-gray-50"
            >
              <LogIn className="h-5 w-5" />
              <span>Connexion</span>
            </Link>
            
            <Link 
              to="/register" 
              className="flex items-center space-x-1 px-4 py-2 rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
            >
              <UserPlus className="h-5 w-5" />
              <span>Inscription</span>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}