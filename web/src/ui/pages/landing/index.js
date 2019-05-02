import React, { Component } from "react";
import CSSModules from "react-css-modules";
import * as axiosWrapper from "../../../utilities/axios/wrapper";

import css from "./index.css";
import { protectedRoute } from "../../../process/users/auth";

class LandingPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allTheItems: []
    };
  }

  componentDidMount() {
    axiosWrapper
      .get("/items")
      .then(response => {
        console.log("did i do anything", response);
        this.setState({ allTheItems: response.data.items });
      })
      .catch(err => {
        console.log(
          "Error fetching Your Items",
          this.setState({ error: true })
        );
      });
  }

  drawItemsOnScreen = () => {
    if (this.state.allTheItems) {
      return this.state.allTheItems.map((item, i) => (
        <li key={i}>
          <span>{item.itemName}</span>
          <span>{item.itemPrice}</span>
        </li>
      ));
    }
  };

  render() {
    if (this.state.allTheItems.length) {
      return (
        <div>
          items:
          <ol>{this.drawItemsOnScreen()}</ol>
        </div>
      );
    } else if (this.state.error) {
      return <div> Why did you break me?</div>;
    }
    return null;
  }
}

export default protectedRoute(CSSModules(LandingPage, css));
