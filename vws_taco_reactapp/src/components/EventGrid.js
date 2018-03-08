import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import {Redirect} from 'react-router';
import ReactDataGrid from 'react-data-grid';

class EventGrid extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rowId: null,
      redirect: false
    };
  }

  handleRowClick(rowIndex) {
    if (rowIndex >= 0) {
      const row = this.props.eventData[rowIndex];
      this.setState({
        rowId: row.id,
        redirect: true
      });
    }
  }

  rowGetter(i) {
    return this.props.eventData[i];
  }

  render() {
    if (this.state.redirect) {
      return <Redirect push to={`/event-summary/${this.state.rowId}`} />;
    }
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

export default withRouter(EventGrid);
