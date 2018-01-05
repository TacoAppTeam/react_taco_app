import Header from './components/Header';
import Home from './components/Home';
import Login from './components/Login';
import OrderBuilder from './components/OrderBuilder';
import PageNotFound from './components/PageNotFound';


const routes = {
  // Header component (wrapper for the whole application)
  component: Header,
  childRoutes: [
    {
      path: '/',
      component: Home
    },

    {
      path: '/login',
      component: Login
    },

    {
      path: '/order-builder',
      component: OrderBuilder
    },

    {
      path: '*',
      component: PageNotFound
    }
  ]
};

export default routes;
