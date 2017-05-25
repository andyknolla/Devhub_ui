import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { createResource } from '../actions';

class ResourceNew extends Component {

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

  onSubmit(values) {
    this.props.createResource(values, () => {
      this.props.history.push('/');
    });
  }

  render() {
    const { handleSubmit } = this.props;

    return (
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
    )
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

export default reduxForm({
  validate,
  form: 'ResourceNewForm'
})(
  connect(null,{ createResource })(ResourceNew)
);
