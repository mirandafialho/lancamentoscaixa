import React, { Component } from "react";

class Form extends Component {
    render() {
        return(
            <form className="ui form">
                <div>
                    <div className="four wide field">
                        <label>Valor</label>
                        <input type="text" name="valor" />
                    </div>
                    <div className="four wide field">
                        <label>Descrição</label>
                        <input type="text" name="descricao" />
                    </div>

                    <div className="four wide field">
                        <button className="ui success button submit-button">Enviar</button>
                    </div>
                </div>
            </form>
        );
    }
}

export default Form;
