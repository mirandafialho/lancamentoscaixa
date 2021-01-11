import React, { Component } from "react";
import axios from "axios";
import Form from "./Form";
import PostingList from "./PostingList";
import Loader from "./Loader";
import "./app.css";

class App extends Component {
    state = {
        postings: [],
        posting: {},
        loader: false,
        url: 'http://127.0.0.1:8000/api/postings'
    };

    getPostings = async () => {
        this.setState({ loader: true });
        const postings = await axios.get(this.state.url);
        this.setState({
            postings: postings.data,
            loader: false
        })
    }

    deletePosting = async (id) => {
        this.setState({ loader: true });
        await axios.delete(`${this.state.url}/${id}`);
        this.getPostings();
    }

    editPosting = async (data) => {
        this.setState({ posting: {}, loader: true });
        await axios.put(`${this.state.url}/${data.id}`, {
            value: data.value,
            description: data.description
        });

        this.getPostings();
    }

    createPosting = async (data) => {
        this.setState({ loader: true });
        await axios.post(this.state.url, {
            value: data.value,
            description: data.description
        });

        this.getPostings();
    }

    componentDidMount() {
        this.getPostings();
    }

    onDelete = (id) => {
        this.deletePosting(id);
    }

    onEdit = (data) => {
        this.setState({ posting: data });
    }

    onFormSubmit = (data) => {
        if (data.isEdit) {
            this.editPosting(data);
        } else {
            this.createPosting(data);
        }
    }

    render() {
        return (
            <div>
                <div className="ui fixed inverted menu">
                    <div className="ui container">
                        <a href="#" className="header item">
                            Lançamento de Caixa
                        </a>
                    </div>
                </div>
                <div className="ui main container">
                    <Form posting={ this.state.posting } onFormSubmit={ this.onFormSubmit } />
                    { this.state.loader ? <Loader /> : '' }
                    <PostingList postings={ this.state.postings } onDelete={ this.onDelete } onEdit={ this.onEdit } />
                </div>
            </div>
        );
    }
}

export default App;
