# DevWorkshopTacoReact

The second pass at the Taco App, using React.

To set up the repo:

* git clone git@github.com:TacoAppTeam/react_taco_app
* cd react_taco_app
* sudo pip3.6 install -r vws_taco_api/requirements.txt
* cd vws_taco_reactapp
* npm install

# To run the API + UI in docker

`make build`
`docker-compose up`

# To run the hug API

cd /path/to/DevWorkshopTacoReact
hug -f vws_taco_api/vws_taco_api/hug/taco_api.py

# To run the react app

cd /path/to/DevWorkshopTacoReact/vws_taco_reactapp
npm start

The query to get a list of all orders for an event, with info re: the tacos

select \* from orders as o join taco_order as taco on taco.order_id = o.id join taco_ingredient ti on ti.order_id = taco.id join ingredients ing on ing.id = ti.ingredient_id where o.event_id = 1 and o.user_id = 1;

# To deploy the app

Push to master - should be hooked to Jenkins job. Deploys to http://34.216.218.113/
