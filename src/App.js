import './App.css';
import { Route, Routes} from 'react-router-dom';
import { Product_Detail } from './Components/ProductDetail/Product_Detail';
import { Cart } from './Components/cart/cart';
import { Home } from './Routes/homePage';
import { Signup } from './Components/auth/Signup';
const App=()=> {
 
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Home/>}> 
        </Route>
        <Route path='/detail' element={<Product_Detail/>}/>
        <Route path='/cart' element={<Cart/>}/>
        <Route path='/signup' element={<Signup/>}/>

      </Routes>
  
    </div>
  );
}

export default App;
