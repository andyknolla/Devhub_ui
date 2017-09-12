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
        <Link to={`/resource/${resource.id}`}>
          <li className="single-resource-container" key={resource.id}>

            <img className="img" src="http://placehold.it/90x90"></img>
            <div className="title">
              <div className="title-row">
                <h3>{resource.title}</h3>
                <div className="category">{resource.category_name}</div>
                <div className="resource_type">{resource.type_name}</div>
                <div className="rating">Rating: {resource.rating}</div>
              </div>
              <div className="sub-title">
                <span className="url">{resource.url}</span>
                <span className="padding-left-5">{resource.free ? 'Free' : '$'}</span>
              </div>
            </div>
            <div className="summary">
              <p>{resource.description}</p>
            </div>
            <div className="comments">Comments:</div>
            <div className="tags">Tags:</div>

          </li>
         </Link>
      )
    });
  }
  render() {
    console.log('render', this.props.resources)
    return (
      <div className="layout-wrapper">
       <header className="header">
         <div className="site-title">Dev Hub</div>
       </header>
       <div className="landing">
          <p>Less Googling, more learning. Find the best resources for web development.</p>
       </div>


       <main className="main">
         <div className="top-bar">
           <div>Filter</div>
           <div className="add-resource">
             <Link to="/resources/new">
               Add a Resource
             </Link>
           </div>
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
