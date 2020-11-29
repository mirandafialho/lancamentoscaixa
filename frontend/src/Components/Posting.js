import React, { Component } from "react";

class Posting extends Component {
    render() {
        const {id, value, description, posting_date} = this.props.posting;

        return (
            <tr>
                <td style={{textAlign: "center"}}>{id}</td>
                <td>{value}</td>
                <td>{description}</td>
                <td>{posting_date}</td>
                <td>
                    <button className="mini ui blue button">Alterar</button>
                    <button className="mini ui red button">Excluir</button>
                </td>
            </tr>
        );
    }
}

export default Posting;
