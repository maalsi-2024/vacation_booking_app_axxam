import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
// Views
import Home from './views/Home';
import Destinations from './views/Destinations';
import Bookings from './views/Bookings';
import BookingDetails from './views/BookingDetails';
import DestinationDetails from './views/DestinationsDetails';
import Login from './views/Login';
import Register from './views/Register';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/destinations" element={<Destinations />} />
            <Route path="/destinations/:destinationId" element={<DestinationDetails />} />
            <Route path="/bookings" element={<Bookings />} />
            <Route path="/bookings/:bookingId" element={<BookingDetails />} />
          </Routes>
      </div>
    </Router>
  );
}

export default App;