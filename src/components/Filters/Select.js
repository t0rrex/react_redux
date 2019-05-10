import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';

class SelectFilter extends Component {
    state = {
        selected: []
    };

    static propTypes = {
        articles: PropTypes.array.isRequired
    };

    handleChange = selected => this.setState({ selected });

    render() {
        console.log(this.state.selected);
        const { selected } = this.state;
        const { articles } = this.props;

        const options = articles.map(article => ({
            label: article.title,
            value: article.id
        }));

        return <Select
            options={options}
            value={selected}
            onChange={this.handleChange}
            multi
        />
    }
}

export default SelectFilter