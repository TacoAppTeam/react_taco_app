import React, {Component} from 'react';
import {browserHistory} from 'react-router';
import ReactDataGrid from 'react-data-grid';

export default class EventGrid extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  handleRowClick(rowIndex) {
    if (rowIndex >= 0) {
      const row = this.props.eventData[rowIndex];
      browserHistory.push('/event-summary?event=' + row.id);
    }
  }

  rowGetter(i) {
    return this.props.eventData[i];
  }

  render() {
    return (
      <div>
        <ReactDataGrid
          columns={this.props.columns}
          rowGetter={this.rowGetter.bind(this)}
          rowsCount={this.props.eventData ? this.props.eventData.length : 0}
          onRowClick={this.handleRowClick.bind(this)}
        />
      </div>
    );
  }
}
