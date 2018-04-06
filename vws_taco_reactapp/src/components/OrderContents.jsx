import React, {Component} from 'react';
import {connect} from 'react-redux';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import Chip from 'material-ui/Chip';
import Avatar from 'material-ui/Avatar';
import {Actions} from '../store';

const styles = {
  chip: {
    margin: 4
  },
  wrapper: {
    display: 'flex',
    flexWrap: 'wrap'
  },
  list: {
    listStyle: 'none'
  }
};

class OrderContents extends Component {
  constructor(props) {
    super(props);
    this.state = {
      orders: this.props.orderList
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({orders: nextProps.orderList});
  }

  handleChange = (idx, val) => {
    const orders = this.state.orders;
    orders[idx].payment_amount = val;
    orders[idx].dirty = true;
    this.setState({orders});
  };

  updateOrders = _ => {
    const ordersToUpdate = this.state.orders.filter(order => order.dirty);
    this.props.dispatch(Actions.order.updateOrders(ordersToUpdate));
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
        Taco Orders:
        {this.state.orders ? (
          <form onSubmit={this.submitOrder} ref={form => (this.form = form)}>
            <ul style={styles.list}>
              {this.state.orders.map((order, idx) => {
                return (
                  <li key={idx}>
                    <div>Order by: {order.user_id}</div>
                    <div>Cost: {order.order_amount}</div>
                    {this.props.isUserRunner ? (
                      <TextField
                        value={order.payment_amount}
                        onChange={(e, val) => {
                          console.log('test');
                          this.handleChange(idx, val);
                        }}
                      />
                    ) : (
                      <div>Amt Paid: {order.payment_amount}</div>
                    )}
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
                  </li>
                );
              })}
            </ul>
            {this.props.handleSubmitOrder ? (
              <RaisedButton primary type="submit" label="Sounds Tasty! ®" />
            ) : null}
            {this.props.isUserRunner ? (
              <RaisedButton onClick={this.updateOrders} label="Save changes" />
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
