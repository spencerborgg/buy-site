import React, { Component } from "react";
import CSSModules from "react-css-modules";
import * as axiosWrapper from "../../../utilities/axios/wrapper";
import { protectedRoute } from "../../../process/users/auth";

import css from "./index.css";

class ItemDiscript extends Component {
  constructor(props) {
    super(props);
    this.state = {
      itemDetails: {},
      amount: 1
    };
  }
  componentDidMount() {
    axiosWrapper
      .get(`/items/${this.props.match.params.id}`)
      .then(response => {
        this.setState({ itemDetails: response.data.items });
      })
      .catch(err => {
        console.log("Error fetching Your Items");
      });
  }

  addItemToCart = event => {
    event.preventDefault();
    this.props.updateCart(
      this.state.itemDetails.itemHandle,
      this.state.amount
    );
  };

  updateAmount = event => {
    event.preventDefault();
    this.setState({ amount: event.target.value });
  };


  render() {
    const { itemDetails } = this.state;
    if (!itemDetails.itemName)
      return <div> Loading </div>;
    return (
      <div>{itemDetails.itemName} {itemDetails.itemPrice} {itemDetails.itemDiscript}
        <button onClick={this.addItemToCart}>Add To Cart</button>
      </div>
    );
  }
}

export default protectedRoute(CSSModules(ItemDiscript, css));
