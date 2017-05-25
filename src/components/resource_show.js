import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchResource, deleteResource } from '../actions';
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

        return (
            <div>
                <Link to="/">Back to index</Link>
                <button 
                    className="btn btn-danger pull-xs-right"
                    onClick={this.onDeleteClick.bind(this)}
                >
                Delete Post
                </button>
                <h3>{resource.title}</h3>
                <h6>Categories: {resource.categories}</h6>
                <p>{resource.content}</p>
            </div>
        );
    }
}

function mapStateToProps({resources}, ownProps) {
    return { resource: resources[ownProps.match.params.id] };
};

export default connect(mapStateToProps, { fetchResource, deleteResource })(ResourceShow);