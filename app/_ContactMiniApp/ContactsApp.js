import React, { Component } from 'react';
import SearchBar from './SearchBar';
import ContactsList from './ContactList'
import PropTypes from 'prop-types'

class ContactsApp extends Component {
    constructor() {
        super()
        this.state = {
            filterText: ''
        }
    }

    handleUserInput(searchTerm) {
        this.setState({ filterText: searchTerm })
    }

    render() { 
        return ( 
            <div>
                <SearchBar onUserInput={this.handleUserInput.bind(this)} filterText={this.state.filterText} />
                <ContactsList filterText={this.state.filterText} contacts={this.props.contacts} />
            </div>
         )
    }
}

ContactsApp.propTypes = {
    contacts: PropTypes.arrayOf(PropTypes.object)
}
 
export default ContactsApp;