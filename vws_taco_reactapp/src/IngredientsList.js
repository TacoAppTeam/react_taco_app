import React, { Component, PropTypes } from 'react';

class IngredientsList extends Component {
  constructor (props) {
    super(props);
    this.addTaco = this.addTaco.bind(this);
  }

  addTaco = (event) => {
    event.preventDefault();

    // get chosen ingredients from checkboxes
    const {taco} = this.form
    const checkboxArray = Array.prototype.slice.call(taco);
    const checkedCheckboxes = checkboxArray.filter(input => input.checked);

    // use .map() to extract the value from each checked checkbox
    const checkedCheckboxesValues = checkedCheckboxes.map(input => input.value);
    const checkedCheckboxesIDs = checkedCheckboxes.map(input => input.id);

    let new_taco = {ids: checkedCheckboxesIDs, desc: checkedCheckboxesValues.join(', ')}
    if (new_taco.desc) {
      this.props.handleAddTaco(new_taco);
    }
  }

  render() {
    return (
      <div>
        <form
          onSubmit={this.addTaco}
          ref={form => this.form = form}>
            {this.props.ingredients.map(ingredient =>
              <label>
                <input type="checkbox" name="taco" id={ingredient.id} value={ingredient.name}/>
                {ingredient.name} - {ingredient.description} - ${ingredient.price} ({ingredient.id})
              </label>
            )}
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

export default IngredientsList;