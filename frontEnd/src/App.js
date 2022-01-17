

import Header from './components/Header';
import Footer from './components/Footer';
import {BrowserRouter,Route} from 'react-router-dom'
import {Container} from 'react-bootstrap'
import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';
import CartScreen from './screens/CartScreen';
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import ProfileScreen from "./screens/ProfileSCreen";
import ShippingAddress from "./screens/ShippingAddress";

import PaymentScreen from "./screens/PaymentScreen";
import PlaceOrder from "./screens/PlaceOrder";
import OrderScreen from "./screens/OrderScreen";
import OrderListScreen from "./screens/OrderListScreen";
import userListScreen from "./screens/userListScreen";
import UserEditScreen from "./screens/UserEditScreen";
import ProductListScreen from "./screens/ProductListScreen";
import ProductEditScreen from "./screens/ProductEditScreen";

function App({ history }) {
  return (
    <BrowserRouter>
      <Header />

      <main>
        <Container>
          <Route path="/shipping" component={ShippingAddress} />
          <Route path="/orders/:id" component={OrderScreen} />
          <Route path="/admin/user/:id/edit" component={UserEditScreen} />

          <Route path="/admin/products" component={ProductListScreen} />
          <Route
            path="/admin/productList/page/:pageNumber"
            component={ProductListScreen}
          />
          <Route path="/admin/product/:id/edit" component={ProductEditScreen} />

          <Route path="/admin/orders" component={OrderListScreen} />
          <Route path="/profile" component={ProfileScreen} />
          <Route path="/sign-in" component={LoginScreen} />
          <Route path="/admin/users" component={userListScreen} />
          <Route path="/payment" component={PaymentScreen} />
          <Route path="/placeorder" component={PlaceOrder} />
          <Route path="/products/:id" component={ProductScreen} />
          <Route path="/cart/:id?" component={CartScreen} />
          <Route path="/register" component={RegisterScreen} />
          <Route path="/search/:keyword" component={HomeScreen} exact />
          <Route path="/page/:pageNumber" component={HomeScreen} />
          <Route
            path="/search/:keyword/page/:pageNumber"
            component={HomeScreen}
            exact
          />
          <Route path="/" component={HomeScreen} exact />
        </Container>
      </main>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
