import React, { Component } from "react";
import CSSModules from "react-css-modules";
import * as axiosWrapper from "../../../utilities/axios/wrapper";

import css from "./index.css";

class AboutPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      creators: []
      // usersinfo: []
    };
  }

  componentDidMount() {
    axiosWrapper
      .get("/creators")
      .then(response => {
        console.log("here are the Creators", response.data.creators);
        this.setState({ creators: response.data.creators });
      })
      .catch(err => {
        console.log("Error fetching Creators");
      });
  }

  // UserinfoDidMount() {
  //   axiosWrapper
  //     .get("/creators/user_handle")
  //     .then(response => {
  //       console.log("here is the info", response.data.creators);
  //       this.setState({ creators: response.data.creators });
  //     })
  //     .catch(err => {
  //       console.log("Error fetching info");
  //     });
  // }

  creatorsList = () => {
    if (this.state.creators) {
      return this.state.creators.map((creator, i) => {
        return <li key={i}>{creator.firstName}</li>;
      });
    }
  };

  render() {
    return (
      <div>
        Creators:
        <ol>{this.creatorsList()}</ol>
      </div>
    );
  }
}

export default CSSModules(AboutPage, css);
