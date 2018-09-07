import React, { Component } from "react";
import ReactDOM from "react-dom";
import { Container } from "flux/utils";
import AutoSuggest from "react-autosuggest";
import AirportActionCreators from "./actions/AirportActionCreators";
import AirportStore from "./stores/AirportStore";
import RouteStore from "./stores/RouteStore";
import TicketStore from "./stores/TicketStore";
import TicketItem from "./components/TicketItem";

const getSuggestionValue = airport =>
  `${airport.city} - ${airport.country} (${airport.code})`;

const renderSuggestion = airport => (
  <div>
    {airport.city} - {airport.country} ({airport.code})
  </div>
);

class App extends Component {
  constructor() {
    super();

    // Autosuggest is a controlled component.
    // This means that you need to provide an input value
    // and an onChange handler that updates this value (see below).
    // Suggestions also need to be provided to the Autosuggest,
    // and they are initially empty because the Autosuggest is closed.
    this.state = {
      asOrigin: "",
      asDestination: "",
      suggestions: []
    };
  }

  componentDidMount() {
    AirportActionCreators.fetchAirports();
  }

  handleSelect(target, event, value) {
    AirportActionCreators.chooseAirport(target, value.suggestion.code);
    let originAndDestinationSelected =
      this.state.route.get("origin") && this.state.route.get("destination");
    if (originAndDestinationSelected) {
      AirportActionCreators.fetchTickets(
        this.state.route.get("origin"),
        this.state.route.get("destination")
      );
    }
  }

  getSuggestions(input) {
    const escapedInput = input.trim().toLowerCase();
    const airportMatchRegex = new RegExp("\\b" + escapedInput, "i");
    return this.state.airports
      .filter(airport => airportMatchRegex.test(airport.city))
      .sort((airport1, airport2) => {
        airport1.city.toLowerCase().indexOf(escapedInput) -
          airport2.city.toLowerCase().indexOf(escapedInput);
      })
      .slice(0, 7);
    // .map(airport => `${airport.city} - ${airport.country} (${airport.code})`);
  }

  // Autosuggest will call this function every time you need to update suggestions.
  // You already implemented this logic above, so just use it.
  onSuggestionsFetchRequested({ value }) {
    this.setState({
      suggestions: this.getSuggestions(value)
    });
  }

  // Autosuggest will call this function every time you need to clear suggestions.
  onSuggestionsClearRequested() {
    this.setState({
      suggestions: []
    });
  }

  render() {
    const { asOrigin, asDestination, suggestions } = this.state;
    let ticketList = this.state.tickets.map(ticket => (
      <TicketItem key={ticket.id} ticket={ticket} />
    ));
    return (
      <div>
        <header>
          <div className="header-brand">
            <img src="logo.png" height="35" />
            <p>
              Check discount ticket prices and pay using your AirCheap points
            </p>
          </div>
          <div className="header-route">
            <AutoSuggest
              inputProps={{
                id: "origin",
                placeholder: "From",
                value: asOrigin,
                onChange: (event, { newValue }) => {
                  this.setState({
                    asOrigin: newValue
                  });
                }
              }}
              suggestions={suggestions}
              onSuggestionSelected={this.handleSelect.bind(this, "origin")}
              onSuggestionsFetchRequested={this.onSuggestionsFetchRequested.bind(
                this
              )}
              onSuggestionsClearRequested={this.onSuggestionsClearRequested.bind(
                this
              )}
              getSuggestionValue={getSuggestionValue}
              renderSuggestion={renderSuggestion}
            />
            <AutoSuggest
              inputProps={{
                id: "destination",
                placeholder: "To",
                value: asDestination,
                onChange: (event, { newValue }) => {
                  this.setState({
                    asDestination: newValue
                  });
                }
              }}
              onSuggestionSelected={this.handleSelect.bind(this, "destination")}
              suggestions={suggestions}
              onSuggestionsFetchRequested={this.onSuggestionsFetchRequested.bind(
                this
              )}
              onSuggestionsClearRequested={this.onSuggestionsClearRequested.bind(
                this
              )}
              getSuggestionValue={getSuggestionValue}
              renderSuggestion={renderSuggestion}
            />
          </div>
        </header>
        <div>{ticketList}</div>
      </div>
    );
  }
}

App.getStores = () => [AirportStore, RouteStore, TicketStore];
App.calculateState = prevState => ({
  airports: AirportStore.getState(),
  route: RouteStore.getState(),
  tickets: TicketStore.getState()
});

const AppContainer = Container.create(App);

ReactDOM.render(<AppContainer />, document.getElementById("root"));
