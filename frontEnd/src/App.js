

import Header from './components/Header';
import Footer from './components/Footer';
import {BrowserRouter,Route} from 'react-router-dom'
import {Container} from 'react-bootstrap'
import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';

function App() {
  return (

   <BrowserRouter>
     <Header/>
     <main>
      <Container>
        <Route path="/" component={HomeScreen} exact/>
        <Route path="/products/:id" component={ProductScreen}/>
        
       
      </Container>
      
      
    </main>
      <Footer/>
     
   </BrowserRouter>
  );
}

export default App;
