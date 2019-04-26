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
        console.log("did i do anything", response.data.items);
        this.setState({ allTheItems: response.data.items });
      })
      .catch(err => {
        console.log("Error fetching Your Items");
      });
  }

  render() {
    if (this.state.allTheItems.length) {
      return <div>items: {this.state.allTheItems.length}</div>;
    }
    return null;
  }
}

export default protectedRoute(CSSModules(LandingPage, css));
