import { X, Home, Building2, Palmtree, Plane, Calendar, CreditCard, Heart, MapPin, Settings, HelpCircle, LogOut } from 'lucide-react';

interface MenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export function Menu({ isOpen, onClose }: MenuProps) {
  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity z-40 ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
      />

      {/* Menu Panel */}
      <div
        className={`fixed inset-y-0 left-0 w-80 bg-gray-900/95 backdrop-blur-xl border-r border-white/10 transform transition-transform duration-300 ease-in-out z-50 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="p-6">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-xl font-bold text-white">Vacation Menu</h2>
            <button
              onClick={onClose}
              className="p-2 rounded-full hover:bg-white/10 text-white/70 hover:text-white transition-colors"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          <nav className="space-y-2">
            <a
              href="#"
              className="flex items-center px-4 py-3 text-white rounded-xl hover:bg-white/10 transition-colors group"
            >
              <Home className="h-5 w-5 mr-3 text-blue-400 group-hover:text-blue-300" />
              <span>Home</span>
            </a>
            <a
              href="#"
              className="flex items-center px-4 py-3 text-white rounded-xl hover:bg-white/10 transition-colors group"
            >
              <Building2 className="h-5 w-5 mr-3 text-emerald-400 group-hover:text-emerald-300" />
              <span>Accommodations</span>
            </a>
            <a
              href="#"
              className="flex items-center px-4 py-3 text-white rounded-xl hover:bg-white/10 transition-colors group"
            >
              <Palmtree className="h-5 w-5 mr-3 text-yellow-400 group-hover:text-yellow-300" />
              <span>Activities</span>
            </a>
            <a
              href="#"
              className="flex items-center px-4 py-3 text-white rounded-xl hover:bg-white/10 transition-colors group"
            >
              <Plane className="h-5 w-5 mr-3 text-purple-400 group-hover:text-purple-300" />
              <span>Transport</span>
            </a>
          </nav>

          <div className="mt-6 pt-6 border-t border-white/10">
            <h3 className="text-sm font-semibold text-white/70 px-4 mb-2">My Account</h3>
            <nav className="space-y-2">
              <a
                href="#"
                className="flex items-center px-4 py-3 text-white rounded-xl hover:bg-white/10 transition-colors group"
              >
                <Calendar className="h-5 w-5 mr-3 text-green-400 group-hover:text-green-300" />
                <span>My Bookings</span>
              </a>
              <a
                href="#"
                className="flex items-center px-4 py-3 text-white rounded-xl hover:bg-white/10 transition-colors group"
              >
                <Heart className="h-5 w-5 mr-3 text-pink-400 group-hover:text-pink-300" />
                <span>Favorites</span>
              </a>
              <a
                href="#"
                className="flex items-center px-4 py-3 text-white rounded-xl hover:bg-white/10 transition-colors group"
              >
                <CreditCard className="h-5 w-5 mr-3 text-orange-400 group-hover:text-orange-300" />
                <span>Payment Methods</span>
              </a>
              <a
                href="#"
                className="flex items-center px-4 py-3 text-white rounded-xl hover:bg-white/10 transition-colors group"
              >
                <MapPin className="h-5 w-5 mr-3 text-red-400 group-hover:text-red-300" />
                <span>Saved Locations</span>
              </a>
            </nav>
          </div>

          <div className="mt-6 pt-6 border-t border-white/10">
            <nav className="space-y-2">
              <a
                href="#"
                className="flex items-center px-4 py-3 text-white/70 rounded-xl hover:bg-white/10 hover:text-white transition-colors group"
              >
                <Settings className="h-5 w-5 mr-3" />
                <span>Settings</span>
              </a>
              <a
                href="#"
                className="flex items-center px-4 py-3 text-white/70 rounded-xl hover:bg-white/10 hover:text-white transition-colors group"
              >
                <HelpCircle className="h-5 w-5 mr-3" />
                <span>Help Center</span>
              </a>
              <a
                href="#"
                className="flex items-center px-4 py-3 text-white/70 rounded-xl hover:bg-white/10 hover:text-white transition-colors group"
              >
                <LogOut className="h-5 w-5 mr-3" />
                <span>Sign Out</span>
              </a>
            </nav>
          </div>
        </div>
      </div>
    </>
  );
}