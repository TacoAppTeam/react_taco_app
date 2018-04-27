import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import {Redirect} from 'react-router';
import ReactDataGrid from 'react-data-grid';

class LocationGrid extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rowId: null,
      redirect: false
    };
  }

  handleRowClick(rowIndex) {
    if (rowIndex >= 0) {
      const row = this.props.locationData[rowIndex];
      this.setState({
        rowId: row.id,
        redirect: true
      });
    }
  }

  rowGetter(i) {
    let newLocationData = this.props.locationData[i];
    if (newLocationData && this.props.computedColumns) {
      this.props.computedColumns.map(
        computeInfo => (newLocationData[computeInfo.columnKey] = computeInfo.compute(newLocationData))
      );
    }
    return newLocationData;
  }

  render() {
    if (this.state.redirect) {
      return <Redirect push to={`/location-summary/${this.state.rowId}`} />;
    }
    return (
      <div>
        <ReactDataGrid
          columns={this.props.columns}
          rowGetter={this.rowGetter.bind(this)}
          rowsCount={this.props.locationData ? this.props.locationData.length : 0}
          onRowClick={this.handleRowClick.bind(this)}
        />
      </div>
    );
  }
}

export default withRouter(LocationGrid);
