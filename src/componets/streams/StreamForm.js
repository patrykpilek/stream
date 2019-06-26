import React from 'react';
import { Field, reduxForm } from 'redux-form';

class StreamForm extends React.Component {

    renderError({error, touched}) {
        if(touched && error) {
            return (
                <div className="ui error message">
                    <div className="header">{error}</div>
                </div>
            );
        }
    };

    renderInput = ({ input, label, meta }) => {
        const className = `field ${meta.error && meta.touched ? 'error' : ''}`;
        return (
            <div className={className}>
                <label>{label}</label>
                <input {...input} autoComplete="off"/>
                {this.renderError(meta)}
            </div>
        );
    };

    onSubmit = (formValues) => {
        this.props.onSubmit(formValues);
    };

    render() {
        return (
            <form onSubmit={this.props.handleSubmit(this.onSubmit)} className="ui form error">
                <Field name="title" component={this.renderInput} label="Enter Title" />
                <Field name="description" component={this.renderInput} label="Enter Description" />
                <button className="ui button primary" type="submit">Submit</button>
            </form>
        );
    }
}

const validate = (formValues) => {
    const errors = {};
    if (!formValues.title) {
        errors.title = 'Required'
    } else if (formValues.title.length> 15) {
        errors.title = 'Must be 15 characters or less'
    }
    if (!formValues.description) {
        errors.description = 'Required'
    } else if (formValues.description.length > 20) {
        errors.description = 'Must be 20 characters or less'
    }
    return errors
};

export default reduxForm({
    form: 'streamForm',
    validate
})(StreamForm);