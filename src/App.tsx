import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
// Views
import Home from './views/Home';
import Destinations from './views/Destinations';
import Bookings from './views/Bookings';
import BookingDetails from './views/BookingDetails';
import DestinationDetails from './views/DestinationsDetails';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Header />
        <main className="container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/destinations" element={<Destinations />} />
            <Route path="/destinations/:destinationId" element={<DestinationDetails />} />
            <Route path="/bookings" element={<Bookings />} />
            <Route path="/bookings/:bookingId" element={<BookingDetails />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;