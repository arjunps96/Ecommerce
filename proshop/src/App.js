
import {Fragment} from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import {Container} from 'react-bootstrap'

function App() {
  return (

   <Fragment>
     <Header/>
     <main>
       <Container>
       <h2>Welcome to shop App</h2>
       </Container>
      
    </main>
      <Footer/>
     
   </Fragment>
  );
}

export default App;
