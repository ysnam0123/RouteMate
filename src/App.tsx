import Sidebar from "./components/Sidebar";

export default function App() {
  return (
    <>
      <Sidebar />
    </>
  );
}

// import { twMerge } from 'tailwind-merge';

// export default function App() {
//   const islogin = true;
//   return (
//     <>
//       <h1
//         className={twMerge('text-3xl', 'text-9xl', islogin && 'text-rose-500')}
//       >
//         Hello World!
//       </h1>
//     </>
//   );
// }
