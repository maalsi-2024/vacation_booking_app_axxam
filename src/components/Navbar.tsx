import { Link } from 'react-router-dom';
import { Compass, Calendar, User } from 'lucide-react';

export default function Navbar() {
  return (
    <nav className="bg-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2">
            <Compass className="h-8 w-8 text-indigo-600" />
            <span className="text-xl font-bold text-gray-900">Axxam</span>
          </Link>
          
          <div className="flex space-x-4">
            <Link to="/destinations" className="flex items-center space-x-1 px-3 py-2 rounded-md text-gray-700 hover:text-indigo-600">
              <Calendar className="h-5 w-5" />
              <span>Destinations</span>
            </Link>
            <Link to="/bookings" className="flex items-center space-x-1 px-3 py-2 rounded-md text-gray-700 hover:text-indigo-600">
              <User className="h-5 w-5" />
              <span>Mes Réservations</span>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}