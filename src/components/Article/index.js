import React, {Component, PureComponent} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import CommentList from '../CommentList';
import {CSSTransitionGroup} from 'react-transition-group';
import {deleteArticle, loadArticle} from '../../AC';
import Loader from '../Loader';
import './style.css';

class Article extends PureComponent {
    static propTypes = {
        id: PropTypes.string.isRequired,
        isOpen: PropTypes.bool,
        toggleOpen: PropTypes.func,
        //from connect
        article: PropTypes.shape({
            id: PropTypes.string,
            title: PropTypes.string,
            text: PropTypes.string
        })
    };

    state = {
        updateIndex: 0,
        areCommentsOpen: false
    };

    componentDidMount() {
        const {loadArticle, article, id} = this.props;
        if (!article  || (!article.text && !article.loading)) loadArticle(id)
    }

    /*
        shouldComponentUpdate(nextProps, nextState) {
            return nextProps.isOpen !== this.props.isOpen
        }
    */

    render() {
        const {article, isOpen, toggleOpen} = this.props;
        if (!article) return null;
        return (
            <div ref = {this.setContainerRef}>
                <h3>{article.title}</h3>
                <button onClick = {toggleOpen}>
                    {isOpen ? 'close' : 'open'}
                </button>
                <button onClick={this.handleDelete}>delete me</button>
                {this.getBody()}
            </div>
        )
    }

    handleDelete = () => {
        const {deleteArticle, article} = this.props;
        deleteArticle(article.id);
        console.log('---', 'deleting article')
    };

    setContainerRef = ref => {
        this.container = ref
//        console.log('---', ref)
    };

    getBody() {
        const {article, isOpen} = this.props;
        if (!isOpen) return null;
        if (article.loading) return <Loader/>;
        return (
            <section>
                {article.text}
                <button onClick = {() => this.setState({updateIndex: this.state.updateIndex + 1})}>update</button>
                <CommentList article = {article} ref = {this.setCommentsRef} key = {this.state.updateIndex}/>
            </section>
        )
    }

    setCommentsRef = ref => {
        this.comments = ref
//        console.log('---', ref)
    }
}

export default connect((state, ownProps) => ({
    article: state.articles.entities.get(ownProps.id)
}), { deleteArticle, loadArticle })(Article)