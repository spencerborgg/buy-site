import React, { Component } from 'react';
import CSSModules from "react-css-modules";
import { protectedRoute } from "../../../process/users/auth";
import * as axiosWrapper from "../../../utilities/axios/wrapper";
import css from "./index.css";


class ProfilePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            orders: []
        };
    }

    componentDidMount() {
        axiosWrapper
            .get(`/orders/user`)
            .then(response => {
                console.log("did i do anything", response);
                this.setState({ orders: response.data.orders });
            })
            .catch(err => {
                console.log("Error fetching Your Items");
            });
    }


    drawOrderOnScreen = () => {
        if (this.state.orders) {
            return this.state.orders.map((order, i) => (
                <div key={i}>
                    <span>{order.soldDate}</span>
                    {order.items.map((item, index) => (
                        <div key={index}>
                            <div>{item.itemName}</div>
                            <div>{item.quantity}</div>
                        </div>
                    ))}
                </div>
            ));
        }
    };

    render() {
        if (this.state.orders.length) {
            return (
                <div>
                    Order History:
                  <div>{this.drawOrderOnScreen()}</div>
                </div>
            );
        } else if (this.state.error) {
            return <div> Why did you break me?</div>;
        }
        return null;
    }
}
export default protectedRoute(CSSModules(ProfilePage, css));