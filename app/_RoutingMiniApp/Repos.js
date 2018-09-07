import React, { Component } from "react";
import "whatwg-fetch";
import { Link, Route } from "react-router-dom";
import RepoDetails from "./RepoDetails";

class Repos extends Component {
  constructor(props) {
    super(props);
    this.state = {
      repositories: []
    };
  }

  componentDidMount() {
    fetch("https://api.github.com/users/pro-react/repos")
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Server response wasn't OK");
        }
      })
      .then(responseData => {
        this.setState({ repositories: responseData });
      })
      .catch(error => {
        this.props.history.push("/error");
      });
  }

  render() {
    let repos = this.state.repositories.map(repo => (
      <li key={repo.id}>
        <Link to={`${this.props.match.url}/details/${repo.name}`}>
          {repo.name}
        </Link>
      </li>
    ));

    return (
      <div>
        <h1>Github Repos</h1>
        <ul>{repos}</ul>
        <Route
          path={`${this.props.match.url}/details/:repo_name`}
          render={props => (
            <RepoDetails {...props} repositories={this.state.repositories} />
          )}
        />
      </div>
    );
  }
}

export default Repos;
