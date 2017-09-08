import React, { Component, PropTypes } from 'react';

export default class IngredientsList extends Component {
  constructor (props) {
    super(props);
    this.addTaco = this.addTaco.bind(this);
  }

  addTaco (event) {
    event.preventDefault();
    console.log(event)
    let taco = {}
    this.props.handleAddTaco(taco);
  }

  // TODO add props
  render() {
    return (
      <div>
        <form onSubmit={this.addTaco}>
          <ul>
            {this.props.ingredients.map(ingredient =>
              <li>
                <input type="checkbox" name={ingredient.name} id={ingredient.id} />
                {ingredient.name} - {ingredient.description} - ${ingredient.price}
              </li>
            )}
          </ul>
          <input type="submit" value="+ Add Taco"></input>
        </form>
      </div>
    );
  }
}

IngredientsList.propTypes = {
  handleAddTaco: PropTypes.func.isRequired,
  ingredients: PropTypes.array.isRequired
}
