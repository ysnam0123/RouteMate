import Channel from './components/Channel';
import { Routes, Route } from 'react-router-dom';
import RootLayout from './layout/RootLayout';
import Login from './pages/Login';
import Register from './pages/Register';
import NotFound from './pages/NotFound';
import ProfileEdit from './pages/ProfileEdit';
import PublicRouter from './components/routers/PublicRouter';
import ProtectedRouter from './components/routers/ProtectedRouter';
import Home from './pages/Home';
import ProfileIsNotLogged from './pages/ProfileIsNotLogged';
import ProfileIsLogged from './pages/ProfileIsLogged';
import Write from './pages/Write';
export default function App() {
    return (
        <>
            <Routes>
                {/* 임시로 둔곳 */}
                <Route path="/profile" element={<ProfileIsNotLogged />} />

                {/* 인증없이 사용가능한 라우터 */}
                <Route element={<PublicRouter />}>
                    <Route path="/" element={<Home />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/login" element={<Login />} />
                </Route>

                {/* 인증(로그인)이 있어야 사용가능한 라우터 */}
                <Route element={<ProtectedRouter />}>
                    <Route path="/profileedit" element={<ProfileEdit />} />
                    <Route path="/profile2" element={<ProfileIsLogged />} />
                    <Route path="/write" element={<Write />} />
                </Route>

                <Route element={<RootLayout />}>
                    <Route path="/channel" element={<Channel />} />
                </Route>

                <Route path="*" element={<NotFound />} />
            </Routes>
        </>
    );
}
