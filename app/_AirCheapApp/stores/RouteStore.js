import AppDispatcher from "./../AppDispatcher";
import { ReduceStore } from "flux/utils";
import constants from "./../constants";

class RouteStore extends ReduceStore {
  getInitialState() {
    return new Map([["origin", ""], ["destination", ""]]);
  }
  reduce(state, action) {
    switch (action.type) {
      case constants.CHOOSE_AIRPORT:
         state.set(action.payload.target, action.payload.code);
         console.log(state)
         return state;
      default:
        return state;
    }
  }
}

export default new RouteStore(AppDispatcher);
