import Sidebar from './components/Sidebar';
import Channel from './pages/Channel';
import Header from './layout/Header';
import Post from './components/Post';
export default function App() {
  return (
    <>
      <Header />
      <div className="flex flex-row">
        <Sidebar />
        <div className="flex flex-col">
          <div className="flex justify-center w-screen">
            <Channel />
          </div>
          <div className="flex justify-center">
            <Post />
          </div>
        </div>
      </div>
    </>
  );
}
