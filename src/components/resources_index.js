import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchResources } from '../actions';
import _ from 'lodash';

class ResourcesIndex extends Component {
  componentDidMount() {
    this.props.fetchResources();
  }

  renderResources() {
    return _.map(this.props.resources, resource => {
      return (
        <li className="list-group-item" key={resource.id}>
          <Link to={`/resource/${resource.id}`}>
          {resource.title}
          </Link>
          </li>
      )
    });
  }
  render() {
    return (
      <div>
        <div className="text-xs-right"></div>
          <Link className="btn btn-primary" to="/resources/new">
            Add a Resource
          </Link>
        <h1>Resources</h1>
        <ul>
          {this.renderResources()}
        </ul>
      </div>
    );
  }
}

function mapStateToProps(state) {
  console.log(state)
  return { resources: state.resources };
}

export default connect(mapStateToProps, { fetchResources })(ResourcesIndex);
