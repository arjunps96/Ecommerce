
import {Fragment} from 'react';
import Header from './components/Header';
import Footer from './components/Footer';

import HomeScreen from './screens/HomeScreen';

function App() {
  return (

   <Fragment>
     <Header/>
     <main>
       <HomeScreen/>
      
    </main>
      <Footer/>
     
   </Fragment>
  );
}

export default App;
