import React, { Component } from "react";
import ReactDOM from "react-dom";
import BankBalanceStore from "./BankAccountStore";
import BankActions from "./BankActions";
import { Container } from "flux/utils";
import BankRewardsStore from "./BankRewardsStore";

class App extends Component {
  constructor(props) {
    super(props);
    BankActions.createAccount();
  }

  deposit() {
    BankActions.depositIntoAccount(Number(this.refs.amount.value));
    this.refs.amount.value = "";
  }
  withdraw() {
    BankActions.withdrawFromAccount(Number(this.refs.amount.value));
    this.refs.amount.value = "";
  }

  render() {
    return (
      <div>
        <header>FluxTrust Bank</header>
        <h1>Your balance is ${this.state.balance.toFixed(2)}</h1>
        <h2>Your Points Rewards Tier is {this.state.rewardsTier}</h2>
        <div className="atm">
          <input type="text" placeholder="Enter Amount" ref="amount" />
          <br />
          <button onClick={this.withdraw.bind(this)}>Withdraw</button>
          <button onClick={this.deposit.bind(this)}>Deposit</button>
        </div>
      </div>
    );
  }
}

App.getStores = () => [BankBalanceStore, BankRewardsStore];
App.calculateState = prevState => ({
  balance: BankBalanceStore.getState(),
  rewardsTier: BankRewardsStore.getState()
});

const AppContainer = Container.create(App);

ReactDOM.render(<AppContainer />, document.getElementById("root"));
