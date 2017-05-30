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
      <div className="layout-wrapper">
       <header className="header">
         <div>header</div>
       </header>


       <main className="main">
         <h1>Resources</h1>
         <div className="text-xs-right">
           <Link className="btn btn-primary" to="/resources/new">
             Add a Resource
           </Link>
         </div>
         <ul>
           {this.renderResources()}
         </ul>
       </main>
       <footer className="footer">
         <p>Copyright Andy Knolla 2017</p>
       </footer>
     </div>

    );
  }
}

function mapStateToProps(state) {
  console.log(state)
  return { resources: state.resources };
}

export default connect(mapStateToProps, { fetchResources })(ResourcesIndex);
