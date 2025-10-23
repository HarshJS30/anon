import './App.css'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import { Create } from './components/Create/Create';
import { Home } from './components/Home/Home';
import { useEffect } from 'react';
import { socket } from './socket';
import { Room } from './components/Room/Room';
import { Join } from './components/Join/Join';


function App() {

  useEffect(()=>{
    if (socket.connected) {
        console.log("Already connected!");
    }
  
    socket.on('connect', () => {
        console.log("Connected!");
    });
    
    return () => {
        socket.off('connect');
    };
  },[])

  return (
    <div className='anon'>
      <Routes>
        <Route path='/' element={<Home />}></Route>
        <Route path='/create' element={<Create />}></Route>
        <Route path='/room/:code' element={<Room />}></Route>
        <Route path='/join' element={<Join />}></Route>
      </Routes>
    </div>
  )
}

export default App
