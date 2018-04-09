import React, {Component} from 'react';
import {connect} from 'react-redux';
import Paper from 'material-ui/Paper';
import {ListItem} from 'material-ui/List';
import Avatar from 'material-ui/Avatar';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import Chip from 'material-ui/Chip';
import {Actions} from '../store';
import {styles} from '../index';

class OrderContents extends Component {
  constructor(props) {
    super(props);
    this.state = {
      orders: this.props.orderList,
      dirty: false
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({orders: nextProps.orderList});
  }

  handleChange = (idx, val) => {
    const orders = this.state.orders;
    orders[idx].payment_amount = val;
    orders[idx].dirty = true;
    this.setState({orders, dirty: true});
  };

  updateOrders = _ => {
    const ordersToUpdate = this.state.orders.filter(order => order.dirty);
    this.props.dispatch(Actions.order.updateOrders(ordersToUpdate));
    const orders = this.state.orders.map(order => {
      order.dirty = false;
      return order;
    });
    this.setState({orders, dirty: false});
  };

  submitOrder = event => {
    event.preventDefault();

    // send off to parent
    if (this.props.handleSubmitOrder) {
      this.props.handleSubmitOrder();
    }
  };
  render() {
    return (
      <div>
        {this.state.orders ? (
          <form onSubmit={this.submitOrder} ref={form => (this.form = form)}>
            {this.state.orders.map((order, idx) => {
              return (
                <Paper style={styles.paper} key={idx} zDepth={2}>
                  <ListItem disabled leftAvatar={<Avatar />}>
                    {order.user_id}
                  </ListItem>
                  <ListItem disabled>
                    <span>
                      $
                      {this.props.isUserRunner ? (
                        <TextField
                          type="number"
                          style={{
                            width: 45,
                            textAlign: 'right'
                          }}
                          value={order.payment_amount}
                          onChange={(e, val) => this.handleChange(idx, val)}
                        />
                      ) : (
                        <span>{order.payment_amount} </span>
                      )}
                      paid out of ${order.order_amount}
                    </span>
                  </ListItem>

                  <ul style={styles.list}>
                    {order.taco_orders.map((taco, idx) => {
                      taco.user = order.user_id;
                      return (
                        <li key={idx}>
                          {this.props.handleDeleteTaco ? (
                            <Chip
                              style={styles.chip}
                              onRequestDelete={() => {
                                this.props.handleDeleteTaco(taco);
                              }}
                            >
                              <Avatar src="/taco.jpeg" />
                              {taco.ingredient_desc}
                            </Chip>
                          ) : (
                            <Chip style={styles.chip}>
                              <Avatar src="/taco.jpeg" />
                              {taco.ingredient_desc}
                            </Chip>
                          )}
                        </li>
                      );
                    })}
                  </ul>
                </Paper>
              );
            })}
            <br />
            {this.props.handleSubmitOrder ? (
              <RaisedButton style={styles.button} primary type="submit" label="Sounds Tasty! ®" />
            ) : null}
            {this.props.isUserRunner ? (
              <RaisedButton
                primary={this.state.dirty}
                style={styles.button}
                onClick={this.updateOrders}
                label="Save changes"
              />
            ) : null}
          </form>
        ) : (
          <div>NO ORDERS YET!!!</div>
        )}
      </div>
    );
  }
}

export default connect()(OrderContents);
