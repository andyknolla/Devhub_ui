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
              <h3>{resource.title}</h3>
              <div className="category">Javascript</div>
              <div className="rating">rating</div>
            </div>
              <div className="summary">
                <p>{resource.content}</p>
              </div>
              <div className="comments">Comments</div>
              <div className="tags">Categories: {resource.categories}</div>

          </li>
         </Link>
      )
    });
  }
  render() {
    return (
      <div className="layout-wrapper">
       <header className="header">
         <div className="site-title">Dev Hub</div>
       </header>
       <div className="landing">
          <p>Do less Googling and more learning.  Find the best resources for web development. If it sucks, vote it down, if it rocks, vote it up.  Share your own favorites.</p>
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
