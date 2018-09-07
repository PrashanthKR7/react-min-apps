import React, { Component } from 'react';
import PropTypes from 'prop-types';

class SearchBar extends Component {

   handleChange(event){
       this.props.onUserInput(event.target.value)
   }

    render() {
        return (
            <input onChange={this.handleChange.bind(this)}  value={this.props.filterText} type="search" placeholder="Search" />
        )
    }
}

SearchBar.propTypes = {
    onUserInput: PropTypes.func.isRequired,
    filterText: PropTypes.string.isRequired
}

export default SearchBar;