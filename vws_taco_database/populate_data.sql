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
    (name, description, price, location_id)
values
    ('bacon', 'Beautiful crispy meat', 0.5, 1);
insert into Ingredients
    (name, description, price, location_id)
values
    ('egg', 'Golden yellow deliciousness', 0, 1);
insert into Ingredients
    (name, description, price, location_id)
values
    ('cheese', 'The best ever', 0, 1);
    insert into Ingredients
    (name, description, price, location_id)
values
    ('bacon', 'Beautiful crispy meat', 0.5, 2);
insert into Ingredients
    (name, description, price, location_id)
values
    ('egg', 'Golden yellow deliciousness', 0, 2);
insert into Ingredients
    (name, description, price, location_id)
values
    ('cheese', 'The best ever', 0, 2);
insert into Ingredients
    (name, description, price, location_id)
values
    ('brisket', 'Juicy, fatty meat', 1.5, 2);

insert into Ingredients
    (name, description, price, location_id)
values
    ('bacon', 'Strips of pork fat', 0.75, 3);

insert into Ingredients
    (name, description, price, location_id)
values
    ('chorizo', 'Crumbled up spicy meat', 0.75, 3);

insert into Ingredients
    (name, description, price, location_id)
values
    ('potato', 'Irish taco staple', 0.50, 3);

insert into Ingredients
    (name, description, price, location_id)
values
    ('sausage', 'Crumbled up pork fat', 0.75, 3);

insert into Ingredients
    (name, description, price, location_id)
values
    ('steak', 'Fancy cow meat', 2.5, 3);

insert into Ingredients
    (name, description, price, location_id)
values
    ('carne guisada', 'Spicy meat stuff', 2.5, 3);

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
    (name, street_address, city, state, zip, phone_number, hours, base_taco_price)
values
    ('Casa Rodriguez', '111 Test Rd.', 'Bryan', 'Texas', '77807', '9999999999', '8a-10p', 1.50);
insert into Locations
    (name, street_address, city, state, zip, phone_number, hours, base_taco_price)
values
    ('Jesses Tacqueria', '123 Test Ave', 'Bryan', 'Texas', '77807', '5555555555', '8a-3p', 2.00);
insert into Locations
    (name, street_address, city, state, zip, phone_number, hours, base_taco_price)
values
    ('Fuego', '108 Poplar St', 'College Station', 'Texas', '77840', '9797031804', '12a-12a', 1.50);
-- Populate Orders
insert into Orders
    (user_id, event_id, payment_amount, order_amount)
values
    ('cody.abney@viasat.com', '1', 3, 3);
insert into Orders
    (user_id, event_id, payment_amount, order_amount)
values
    ('brandon.ojeda@viasat.com', '1', 2, 2);
-- Populate Events
insert into Events
    (user_id, location_id, event_date)
values
    ('joshua.masterson@viasat.com', 1, '04/13/2018');
