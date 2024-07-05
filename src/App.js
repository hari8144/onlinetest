import './App.css';
import Home from './Compontent/Home';
import About from './Compontent/About';
import'./Compontent/Home.css';
import { Route, Routes } from 'react-router-dom';
function App() {
  return (
    <div className="App">
   {/* <Home/> */}
   {/* <About/> */}
<h1>Welcome</h1>
   <Routes>
    <Route path='/home' element={<Home/>}/>
    <Route path='/about' element={<About/>}/>
    
   </Routes>
    </div>
  );
}

export default App;