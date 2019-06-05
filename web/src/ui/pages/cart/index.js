import React, { Component } from 'react';
import CSSModules from "react-css-modules";
import { protectedRoute } from "../../../process/users/auth";
import * as axiosWrapper from "../../../utilities/axios/wrapper";
import css from "./index.css";


class Cart extends Component {

    drawCartOnScreen = () => {
        return this.props.items.map((cart, i) => (
            <div key={i}>
                <div>{cart.itemHandle}</div>
                <div>{cart.quantity}</div>
            </div>
        ));
    };

    render() {
        if (this.props.items.length) {
            return (
                <div>
                    Cart Items:
          <div>{this.drawCartOnScreen()}</div>
                </div>
            );
        }
        return null;
    }
}


export default protectedRoute(CSSModules(Cart, css));
