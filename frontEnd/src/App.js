

import Header from './components/Header';
import Footer from './components/Footer';
import {BrowserRouter,Route} from 'react-router-dom'
import {Container} from 'react-bootstrap'
import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';
import CartScreen from './screens/CartScreen';

function App() {
  return (

   <BrowserRouter>
     <Header/>
     <main>
      <Container>
        <Route path="/" component={HomeScreen} exact/>
        <Route path="/products/:id" component={ProductScreen}/>
        <Route path="/cart/:id?" component={CartScreen}/>
        
       
      </Container>
      
      
    </main>
      <Footer/>
     
   </BrowserRouter>
  );
}

export default App;
