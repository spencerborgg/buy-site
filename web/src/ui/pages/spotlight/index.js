import React, { Component } from "react";
import CSSModules from "react-css-modules";

import css from "./style.css";

class Spotlight extends Component {
  render() {
    const { creator, updatedCreator } = this.props;
    if (creator && creator.firstName) {
      return (
        <div>
          <div>{creator.firstName}</div>
          <div>{creator.email}</div>
          <form
            onSubmit={event =>
              this.props.submitCreatorUpdate(event, creator.userHandle)
            }
          >
            <input
              type="text"
              value={updatedCreator.firstName}
              placeholder="First Name"
              onChange={this.props.updateCreator}
            />
            <button
              type="submit"
              onClick={event =>
                this.props.submitCreatorUpdate(event, creator.userHandle)
              }
            >
              Update
            </button>
          </form>
        </div>
      );
    }
    return null;
  }
}
export default CSSModules(Spotlight, css);
