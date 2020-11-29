import React, { Component } from "react";
import Posting from "./Posting";

class PostingList extends Component {
    render() {
        const postings = this.props.postings;

        return(
            <div className="data">
                <table className="ui celled table">
                    <thead>
                        <tr>
                            <th style={{ width: "50px", textAlign: "center" }}>#</th>
                            <th>Valor</th>
                            <th>Descrição</th>
                            <th>Data do Lançamento</th>
                            <th style={{ width: "175px" }}>Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            postings.map((posting) => {
                                return <Posting posting={ posting } key={ posting.id } />;
                            })
                        }
                    </tbody>
                </table>
            </div>
        )
    }
}

export default PostingList;
