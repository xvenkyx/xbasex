import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Layout/Navbar';
import Home from './pages/Home';
import Projects from './pages/Projects';
import ChatApp from './projects/ChatApp';
import TodoApp from './projects/TodoApp';
import WeatherApp from './projects/WeatherApp';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-white text-gray-900">
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/projects/chat" element={<ChatApp />} />
            <Route path="/projects/todo" element={<TodoApp />} />
            <Route path="/projects/weather" element={<WeatherApp />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;