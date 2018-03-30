-- Populate User data
insert into Users
    (first_name,last_name, password, email)
values
    ('Cody', 'Abney', '$argon2i$v=19$m=512,t=2,p=2$hqbvJZgDJzbB1O9eHzZkgw$Gk8Ghgc+IdYSVTWIwM5cTw', 'cody.abney@viasat.com');
insert into Users
    (first_name,last_name, password, email)
values
    ('Brandon', 'Ojeda', '$argon2i$v=19$m=512,t=2,p=2$hqbvJZgDJzbB1O9eHzZkgw$Gk8Ghgc+IdYSVTWIwM5cTw', 'brandon.ojeda@viasat.com');
insert into Users
    (first_name,last_name, password, email)
values
    ('Josh', 'Masterson', '$argon2i$v=19$m=512,t=2,p=2$hqbvJZgDJzbB1O9eHzZkgw$Gk8Ghgc+IdYSVTWIwM5cTw', 'joshua.masterson@viasat.com');
insert into Users
    (first_name,last_name, password, email)
values
    ('Ross', 'Hudgins', '$argon2i$v=19$m=512,t=2,p=2$hqbvJZgDJzbB1O9eHzZkgw$Gk8Ghgc+IdYSVTWIwM5cTw', 'michael.hudgins@viasat.com');
insert into Users
    (first_name,last_name, password, email)
values
    ('Josh', 'Titus', '$argon2i$v=19$m=512,t=2,p=2$hqbvJZgDJzbB1O9eHzZkgw$Gk8Ghgc+IdYSVTWIwM5cTw', 'josh.titus@viasat.com');
-- Populate Taco Shell data
insert into Taco_Shell
    (shell)
values
    ('hard');
insert into Taco_Shell
    (shell)
values
    ('soft');
-- Populate Taco Ingredient data
insert into Taco_Ingredient
    (order_id, ingredient_id)
values
    ('1', '1');
insert into Taco_Ingredient
    (order_id, ingredient_id)
values
    ('1', '2');
insert into Taco_Ingredient
    (order_id, ingredient_id)
values
    ('1', '3');
insert into Taco_Ingredient
    (order_id, ingredient_id)
values
    ('2', '1');
insert into Taco_Ingredient
    (order_id, ingredient_id)
values
    ('2', '2');
-- Populate Ingredients data
insert into Ingredients
    (name, description, price)
values
    ('bacon', 'Beautiful crispy meat', '1');
insert into Ingredients
    (name, description, price)
values
    ('egg', 'Golden yellow deliciousness', '1');
insert into Ingredients
    (name, description, price)
values
    ('cheese', 'The best ever', '1');
-- Populate Taco Order data
insert into Taco_Order
    (order_id, shell_id)
values
    ('1', '1');
insert into Taco_Order
    (order_id, shell_id)
values
    ('2', '2');
-- Populate Locations
insert into Locations
    (name, street_address, city, state, zip, phone_number, hours)
values
    ('Casa Rodriguez', '111 Test Rd.', 'Bryan', 'Texas', '77807', '9999999999', '8a-10p');
insert into Locations
    (name, street_address, city, state, zip, phone_number, hours)
values
    ('Jesses Tacqueria', '123 Test Ave', 'Bryan', 'Texas', '77807', '5555555555', '8a-3p');
-- Populate Orders
insert into Orders
    (user_id, event_id, payment_amount, order_amount)
values
    ('cody.abney@viasat.com', '1', '3', '3');
insert into Orders
    (user_id, event_id, payment_amount, order_amount)
values
    ('brandon.ojeda@viasat.com', '1', '2', '2');
-- Populate Events
insert into Events
    (user_id, location_id, event_date)
values
    ('joshua.masterson@viasat.com', '1', '06/09/2017'),
    ('2', '1', '09/01/2017');
