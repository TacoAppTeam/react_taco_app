import React, {Component} from 'react';

class IngredientsList extends Component {
  constructor(props) {
    super(props);
    this.addTaco = this.addTaco.bind(this);
  }

  addTaco = event => {
    event.preventDefault();

    // get chosen ingredients from checkboxes
    const {taco} = this.form;
    const checkboxArray = Array.prototype.slice.call(taco);
    const checkedCheckboxes = checkboxArray.filter(input => input.checked);

    // use .map() to extract the value from each checked checkbox
    const checkedCheckboxesValues = checkedCheckboxes.map(input => input.value);
    const checkedCheckboxesIDs = checkedCheckboxes.map(input => input.id);

    let new_taco = {
      ids: checkedCheckboxesIDs,
      desc: checkedCheckboxesValues.join(', '),
      shell: this.props.shell.id
    };
    if (new_taco.desc) {
      this.props.handleAddTaco(new_taco);
    }
  };

  render() {
    return (
      <div>
        <form onSubmit={this.addTaco} ref={form => (this.form = form)}>
          {this.props.ingredients.map(item => {
            const ingredient = item.ingredient;
            return (
              <div>
                <input
                  type="checkbox"
                  name="taco"
                  id={ingredient.id}
                  value={ingredient.name}
                />
                <span>
                  {ingredient.name +
                    ' - ' +
                    ingredient.description +
                    ' - $' +
                    ingredient.price}
                </span>
              </div>
            );
          })}
          <button bsStyle="primary" type="submit">
            Add yo'taco!
          </button>
        </form>
      </div>
    );
  }
}

export default IngredientsList;
