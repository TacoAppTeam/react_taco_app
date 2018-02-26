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
      path: '/event-summary',
      component: EventSummary
    },
    {
      path: '*',
      component: PageNotFound
    }
  ]
};

export default routes;
