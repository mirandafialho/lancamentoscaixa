import React, { Component } from "react";

class Form extends Component {
    state = {
        form: { value: '', description: '', isEdit: false },
        btnName: 'Enviar',
        btnClass: 'fluid ui green button submit-button'
    }

    isEmpty(obj) {
        return Object.entries(obj).length === 0 && obj.constructor === Object;
    }

    componentDidUpdate(prevProps) {
        if (prevProps !== this.props && !this.isEmpty(this.props.posting)) {
            this.setState({
                form: { ...this.props.posting, isEdit: true },
                btnName: 'Atualizar',
                btnClass: 'fluid ui blue button submit-button'
            });
        }
    }

    handleChange = (event) => {
        const { name, value } = event.target;
        let form = this.state.form;
        form[name] = value;
        this.setState({ form });
    };

    onFormSubmit = (event) => {
        event.preventDefault();

        if (this.formValidation()) {
            this.props.onFormSubmit(this.state.form);
        };

        this.clearFormFields();
    };

    formValidation = () => {
        if (document.getElementsByName('value')[0].value === '') {
            alert('Incluir valor de lançamento!');
            return false;
        }

        return true;
    };

    clearFormFields = () => {
        this.setState({
            form: { value: '', description: '', isEdit: false },
            btnName: 'Enviar',
            btnClass: 'fluid ui green button submit-button'
        });

        document.querySelector('.form').reset();
    };

    render() {
        return(
            <form className="ui form">
                <div className="fields">
                    <div className="four wide field">
                        <label>Valor</label>
                        <input type="text" name="value" value={ this.state.form.value } onChange={ this.handleChange } />
                    </div>
                    <div className="eight wide field">
                        <label>Descrição</label>
                        <input type="text" name="description" value={ this.state.form.description } onChange={ this.handleChange } />
                    </div>
                    <div className="four wide field">
                        <button className={ this.state.btnClass } onClick={ this.onFormSubmit }>{ this.state.btnName }</button>
                    </div>
                </div>
            </form>
        );
    }
}

export default Form;
