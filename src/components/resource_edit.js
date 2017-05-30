import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { fetchResource, deleteResource, editResource } from '../actions';
import { Link } from 'react-router-dom';

class ResourceEdit extends Component {
    renderField(field) {
        const { meta: { touched, error } } = field; // destructures meta from field, then touched and error properties from meta
        const className=`form-group ${touched && error ? 'has-danger' : ''}`;

        return(
        <div className={className}>
            <label>{field.label}</label>
            <input
            className="form-control"
            type="text"
            {...field.input}
            />
            {touched ? error : ""}
        </div>
        );
    }

    componentDidMount() {
       const { id } = this.props.match.params; // provided by React-router
        this.props.fetchResource(id);

    }

    handleInitialize() {
        const initData = {
            title: this.props.resource.title,
            categories: this.props.resource.categories,
            content: this.props.resource.content
        };
        this.props.initialize(initData);
    }
    

    onDeleteClick() {
        const { id } = this.props.match.params; // provided by React-router
        this.props.deleteResource(id, () => {
            this.props.history.push('/');
        });
    }

    onSubmit(values) {
      this.props.editResource(values, () => {
        this.props.history.goBack();
      });
    }

    render() {
        const { resource, handleSubmit } = this.props;
console.log('edit page props ', this.props);
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
                <div>Edit</div>
                <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
                  <Field
                    label="Title"
                    name="title"
                    component={this.renderField}
                  />
                  <Field
                    label="Categories"
                    name="categories"
                    component={this.renderField}
                  />
                  <Field
                    label="Post Content"
                    name="content"
                    component={this.renderField}
                  />
                  <button type="submit" className="btn btn-primary">Submit</button>
                  <Link to="/" className="btn btn-danger">Cancel</Link>
                  </form>

                <h3>{resource.title}</h3>
                <h6>Categories: {resource.categories}</h6>
                <p>{resource.content}</p>
            </div>
        );
    }
}

function validate(values) {
  const errors = {};

  if(!values.title) { // Has to match the "name" attribute in an input
    errors.title = "Enter a title";
  }
  if(!values.categories) { // Has to match the "name" attribute in an input
    errors.categories = "Enter a title";
  }
  if(!values.content) { // Has to match the "name" attribute in an input
    errors.postcontent = "Enter a title";
  }
  // If errors is empty, the form is fine to submit
  // If it has ANY properties, redux assumes form is invalid
  return errors;
}

function mapStateToProps({resources}, ownProps) {
    return { resource: resources[ownProps.match.params.id] };
};

export default reduxForm({
    validate,
    form: 'ResourceEditForm'
})(
    connect(mapStateToProps, { fetchResource, deleteResource })(ResourceEdit)
);