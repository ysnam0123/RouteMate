import SidebarIsLogged from './layout/SidebarIsLogged';
import SidebarIsNotLogged from './layout/SidebarIsNotLogged';
import Channel from './components/Channel';
import Home from './pages/Home';
import { Routes, Route } from 'react-router-dom';
import RootLayout from './layout/RootLayout';
import Login from './pages/Login';
import Register from './pages/Register';
import NotFound from './pages/NotFound';
export default function App() {
  return (
    <>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<Home />} />
        <Route element={<RootLayout />}>
          <Route path="/channel" element={<Channel />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}
