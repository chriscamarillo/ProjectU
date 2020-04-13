import React, { Component, createContext, useContext } from "react";
import { auth } from "../services/firebase";
import { generateUserDocument } from '../services/firebase'

export const UserContext = createContext({ user: null });
class UserProvider extends Component {
  state = {
    user: JSON.parse(localStorage.getItem('userAuth')),
  };

  componentDidMount = async () => {
    auth.onAuthStateChanged(async userAuth => {
      localStorage.setItem('userAuth', JSON.stringify(userAuth));
      const user = await generateUserDocument(userAuth);
      this.setState({ user });
    })
  };
  
  render() {
    return (
      <UserContext.Provider value={this.state.user}>
        {this.props.children}
      </UserContext.Provider>
    );
  }
}
export const useUser = () => useContext(UserContext)

export default UserProvider
