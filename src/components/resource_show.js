import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchResource, deleteResource, editResource } from '../actions';
import { Link } from 'react-router-dom';

class ResourceShow extends Component {
    componentDidMount() {
        const { id } = this.props.match.params; // provided by React-router
        this.props.fetchResource(id);
    }

    onDeleteClick() {
        const { id } = this.props.match.params; // provided by React-router
        this.props.deleteResource(id, () => {
            this.props.history.push('/');
        });
    }

    render() {
        const { resource } = this.props;

        if(!resource) {
            return <div>loading...</div>;
        }
console.log('resource', resource);
        return (
          <div className="layout-wrapper">
            <header className="header">
              <Link to="/">
                <div className="site-title">Dev Hub</div>
              </Link>
            </header>
            <main className="main">
              <div className="single-resource-container">
                <img className="img" src="http://placehold.it/90x90"></img>
                <div className="title">
                  <h3>{resource.title}</h3>
                  <div className="category">{resource.categories}</div>
                  <div className="rating">rating</div>
                </div>
                  <div className="summary">
                    <p>{resource.content}</p>
                    <div className="card-buttons">
                      <button
                          className="btn"
                          onClick={this.onDeleteClick.bind(this)}
                      >
                      Delete
                      </button>

                      <Link to={`/resource/edit/${resource.id}`}className="padding-left-5">
                        <button className="btn">
                          Edit Post
                        </button>
                      </Link>
                    </div>
                  </div>
                  <div className="comments">Comments:</div>
                  <h6 className="tags">Tags:</h6>
                </div>
            </main>
            <footer className="footer">
              <p>Copyright Andy Knolla 2017</p>
            </footer>
          </div>
        );
    }
}

function mapStateToProps({resources}, ownProps) {
    return { resource: resources[ownProps.match.params.id] };
};

export default connect(mapStateToProps, { fetchResource, deleteResource })(ResourceShow);
