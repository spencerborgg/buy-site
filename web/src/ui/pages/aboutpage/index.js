import React, { Component } from "react";
import CSSModules from "react-css-modules";
import * as axiosWrapper from "../../../utilities/axios/wrapper";
import Spotlight from "../spotlight";

import css from "./index.css";

class AboutPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      creators: [],
      creator: {},
      updateCreator: {}
    };
  }
  // life cycle method
  componentDidMount() {
    axiosWrapper
      .get("/creators") //http verb <--look up more info on them
      .then(response => {
        console.log("here are the Creators", response.data.creators);
        this.setState({ creators: response.data.creators });
      })
      .catch(err => {
        console.log("Error fetching Creators");
      });
  }

  creatorsList = () => {
    if (this.state.creators) {
      return this.state.creators.map((creator, i) => {
        return (
          <li
            key={i}
            onClick={event => this.fetchInfo(event, creator.userHandle)}
          >
            {creator.firstName}
          </li>
        );
      });
    }
  };

  fetchInfo = (event, userHandle) => {
    event.preventDefault();
    axiosWrapper
      .get(`/creators/${userHandle}`)
      .then(response => {
        console.log("here are the Creators", response);
        this.setState({
          creator: response.data.creator,
          updatedCreator: response.data.creator
        });
      })
      .catch(err => {
        console.log("Error fetching Creators");
      });
  };
  updateCreator = event => {
    event.preventDefault();
    this.setState({
      updatedCreator: {
        ...this.state.updatedCreator,
        firstName: event.target.value
      }
    });
  };

  submitCreatorUpdate = (event, userHandle) => {
    event.preventDefault();
    console.log("here-->>>>>>>>>>>>>>>>>>>>>>", this.state.updatedCreator);
    axiosWrapper
      .put(`/creators/${userHandle}`, { creator: this.state.updatedCreator })
      .then(response => {
        console.log("here are the updates on creator", response);
        const { creator } = response.data;
        this.setState({ creator: creator, updateCreator: creator });
      })
      .catch(err => {
        console.log("Error fetching Creators");
      });
  };

  render() {
    return (
      <div styleName="container">
        <aside styleName="left-side">
          Creators:
          <ol>{this.creatorsList()}</ol>
        </aside>
        <div styleName="right-side">
          Details:
          <Spotlight
            creator={this.state.creator}
            updatedCreator={this.state.updatedCreator}
            updateCreator={this.updateCreator}
            submitCreatorUpdate={this.submitCreatorUpdate}
          />
        </div>
      </div>
    );
  }
}

export default CSSModules(AboutPage, css);
