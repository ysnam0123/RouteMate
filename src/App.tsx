import Sidebar from './components/sidebar/Sidebar';
import Channel from './pages/Channel';
import Header from './components/layout/Header';
import Home from './pages/Home';
import { Routes, Route } from 'react-router-dom';
import RootLayout from './components/layout/RootLayout';
// import Login from './pages/Login';
// import Register from './pages/Register';
import NotFound from './pages/NotFound';
export default function App() {
  return (
    <>
      <Routes>
        <Route element={<RootLayout />}>
          <Route path="/" element={<Home />} />
          {/* <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} /> */}
          <Route path="/channel" element={<Channel />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}
