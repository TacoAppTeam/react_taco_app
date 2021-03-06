import React, {Component} from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import Checkbox from 'material-ui/Checkbox';

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
          {this.props.ingredients.map((ingredient, i) => {
            let label = `${ingredient.name + (ingredient.description ? (" - " + ingredient.description) : "")}`;
            if (ingredient.price) {
              label += ` (add $${ingredient.price})`;
            }
            return (
              <div key={ i }>
                <Checkbox
                  type="checkbox"
                  name="taco"
                  id={ingredient.id}
                  value={ingredient.name}
                  label={label}
                />
                <div />
              </div>
            );
          })}
          <RaisedButton type="submit" label="🌮 Add yo'taco! 🌮" />
        </form>
      </div>
    );
  }
}

export default IngredientsList;
