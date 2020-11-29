import React, { Component } from "react";
import axios from "axios";
import Form from "./Form";
import PostingList from "./PostingList";
import Loader from "./Loader";
import "./app.css";

class App extends Component {
    state = {
        postings: [],
        loader: false,
        url: 'http://127.0.0.1:8080/api/postings'
    };

    getPostings = async () => {
        this.setState({ loader: true });
        const postings = await axios.get(this.state.url);
        this.setState({
            postings: postings.data,
            loader: false
        })
    }

    componentDidMount() {
        this.getPostings();
    };

    render() {
        return (
            <div>
                <div className="ui fixed inverted menu">
                    <div className="ui container">
                        <a href="" className="header item">
                            Lançamento de Caixa
                        </a>
                    </div>
                </div>
                <div className="ui main container">
                    <Form />
                    { this.state.loader ? <Loader /> : '' }
                    <PostingList postings={this.state.postings} />
                </div>
            </div>
        );
    }
}

export default App;
