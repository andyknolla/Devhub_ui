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
        <label>

          <span>{field.label} <span className="required">*</span></span>

          <input
            type="text"
            className="input-field"
            {...field.input}
          />
        </label>
        {touched ? error : ""}
      </div>
    );
  }
  renderRadioField(field) {

    return(
      <div>
        <label>
          <span>{field.label} <span className="required">*</span></span>

          <input
            type="checkbox"
            {...field.input}
          />
        </label>
      </div>
    );
  }
  renderTextField(field) {
    const { meta: { touched, error } } = field; // destructures meta from field, then touched and error properties from meta
    const className=`${touched && error ? 'has-danger' : ''}`;

    return(
      <div className={className}>
        <label>

          <span>{field.label} <span className="required">*</span></span>

          <textarea
            className="textarea-field"
            {...field.input}
          />
        </label>
        {touched ? error : ""}
      </div>
    );
  }

  onSubmit(values) {
    console.log('values ', values)
    this.props.createResource(values, () => {
      this.props.history.goBack();
    });
  }

  render() {
    const { handleSubmit } = this.props;
console.log('props', this.props);
    return (
      <div className="layout-wrapper">
        <header className="header">
          <Link to="/">
            <div className="site-title">Dev Hub</div>
          </Link>
        </header>
        <div className="main">
          <div className="form-style">
            <div className="form-style-heading">Enter Resource Information</div>
            <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
              <Field
                label="Title"
                name="title"
                component={this.renderField}
              />
              <Field
                label="Category"
                name="category_id"
                component={this.renderField}
              />
              <Field
                label="Url"
                name="url"
                component={this.renderField}
              />
              <Field
                label="Free?"
                name="free"
                component={this.renderRadioField}
              />
              <Field
                label="Resource Type"
                name="resource_type_id"
                component={this.renderField}
              />
              <Field
                label="Description"
                name="description"
                component={this.renderTextField}
              />
              <button type="submit" className="btn">Submit</button>
              <Link to="/" className="padding-left-5"><button className="btn">Cancel</button></Link>
            </form>
          </div>
        </div>
        <footer className="footer">
          <p>Copyright Andy Knolla 2017</p>
        </footer>
      </div>
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
