import Header from './Header';
import Home from './Home';
import Login from './Login';
import OrderBuilder from './OrderBuilder';
import PageNotFound from './PageNotFound';


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
