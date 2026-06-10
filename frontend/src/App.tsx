//import BookCard from './components/BookCard';
import Start from './pages/Start';
import Authors from './pages/Authors';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import "./css/App.css"


function App() {


  return (
    <>
   < Navbar/>
    <main>
      <Routes>
         
      <Route path="/" element={<Start />} />
      <Route path="/authors" element={<Authors />} />
  
      </Routes>
    </main>
    </>
  );
}

export default App;