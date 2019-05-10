import React, {Component, PureComponent} from 'react';
import PropTypes from 'prop-types';
import CommentList from '../CommentList';
import { CSSTransitionGroup } from 'react-transition-group';
import './style.css';

class Article extends PureComponent {
    static propTypes = {
        article: PropTypes.shape({
            id: PropTypes.string.isRequired,
            title: PropTypes.string.isRequired,
            text: PropTypes.string
        }).isRequired,
        isOpen: PropTypes.bool,
        toggleOpen: PropTypes.func
    };

    state = {
        updateIndex: 0
    };

    /*
        shouldComponentUpdate(nextProps, nextState) {
            return nextProps.isOpen !== this.props.isOpen
        }
    */

    render() {
        const {article, isOpen, toggleOpen} = this.props;
        return (
            <div ref = {this.setContainerRef}>
                <h3>{article.title}</h3>
                <button onClick = {toggleOpen}>
                    {isOpen ? 'close' : 'open'}
                </button>
                {this.getBody()}
            </div>
        )
    }

    setContainerRef = ref => {
        // this.container = ref
//        console.log('---', ref)
    };

    getBody() {
        const {article, isOpen} = this.props;
        console.log('---', 'update');
        if (!isOpen) return null;
        return (
            <section>
                {article.text}
                <button onClick = {() => this.setState({updateIndex: this.state.updateIndex + 1})}>update</button>
                <CommentList comments = {article.comments} key = {this.state.updateIndex}/>
            </section>
        )
    }

}

export default Article