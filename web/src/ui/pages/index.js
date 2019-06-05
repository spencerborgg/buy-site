// import omit from 'lodash/omit'
import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import CSSModules from "react-css-modules";
import * as axiosWrapper from "../../utilities/axios/wrapper";


import css from "./index.css";
import Header from "../components/header";
import Footer from "../components/footer";

import Landing from "./landing";
import Home from "./homepage/";
import Login from "./login/";
import SignOut from "./sign-out";
import AboutPage from "./aboutpage";
import ItemDiscript from "./itemDiscript";
import ProfilePage from "./profilepage";
import Cart from "./cart";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      numOfItemsInCart: 0,
      cartItems: []
    };
  }

  componentDidMount() {
    axiosWrapper
      .get(`/cart/user`)
      .then(response => {
        console.log("did i do anything", response);
        const { cartItems } = response.data
        this.setState({
          cartItems: cartItems,
          numOfItemsInCart: cartItems.length
        });
      })
      .catch(err => {
        console.log("Error fetching Your Items");
      });
  }

  updateCart = (itemHandle, quantity) => {
    axiosWrapper
      .post("/cart/add", { items: [{ itemHandle: itemHandle, quantity }] })
      .then(res => {
        this.setState({ numOfItemsInCart: res.data.cart.numOfItemsInCart });
      })
      .catch(err => {
        console.log("error")
      })
  }

  render() {
    return (
      <div styleName="App">
        <div styleName="header-container">
          <Header numOfItemsInCart={this.state.numOfItemsInCart} />
        </div>
        <div styleName="content-container">
          <Switch>
            <Route exact path="/" component={Home} />,
            <Route exact path="/login" component={Login} />,
            <Route exact path="/landing" component={Landing} />
            <Route exact path="/sign-out" component={SignOut} />
            <Route exact path="/about-us" component={AboutPage} />
            <Route
              exact path="/items/:id"
              render={({ match }) => (
                <ItemDiscript match={match} updateCart={this.updateCart} />
              )} />
            <Route exact path="/profile" component={ProfilePage} />
            <Route exact path="/cart" render={() => <Cart items={this.state.cartItems} />} />
            <Route component={() => (<div>Page not found!</div>)} />
          </Switch>
        </div>
        <div styleName="footer-container">
          <Footer />
        </div>
      </div>
    );
  }
}

export default CSSModules(App, css);
