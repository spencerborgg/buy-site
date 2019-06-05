import React, { Component } from "react";
import CSSModules from "react-css-modules";
import * as axiosWrapper from "../../../utilities/axios/wrapper";
import { Link } from "react-router-dom";
import css from "./index.css";
import { protectedRoute } from "../../../process/users/auth";
// import Link from 'react-router-dom';

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
        <div key={i}>
          <Link to={`/items/${item.itemHandle}`}>{item.itemName} </Link>
          <span>{item.itemPrice}</span>
        </div>
      ));
    }
  };

  render() {
    if (this.state.allTheItems.length) {
      return (
        <div>
          items:
          <div>{this.drawItemsOnScreen()}</div>
        </div>
      );
    } else if (this.state.error) {
      return <div> Why did you break me?</div>;
    }
    return null;
  }
}

export default protectedRoute(CSSModules(LandingPage, css));
