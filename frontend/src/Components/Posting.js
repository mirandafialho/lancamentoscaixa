import React, { Component } from "react";

class Posting extends Component {
    onDelete = () => {
        this.props.onDelete(this.props.posting.id);
    };

    onEdit = () => {
        this.props.onEdit(this.props.posting);
    };

    render() {
        const {id, value, description, posting_date} = this.props.posting;

        return (
            <tr>
                <td style={{textAlign: "center"}}>{id}</td>
                <td>{value}</td>
                <td>{description}</td>
                <td>{posting_date}</td>
                <td>
                    <button className="mini ui blue button" onClick={ this.onEdit }>Alterar</button>
                    <button className="mini ui red button" onClick={ this.onDelete }>Excluir</button>
                </td>
            </tr>
        );
    }
}

export default Posting;
