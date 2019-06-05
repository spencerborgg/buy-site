import React, { Component } from "react";
import CSSModules from "react-css-modules";
import { array, arrayOf, shape, string } from 'prop-types';

import { Link } from "react-router-dom";
import css from "./index.css";
import * as axiosWrapper from "../../../utilities/axios/wrapper";
import { arrayOfDeffered } from "redux-saga/utils";

class MapLinks extends Component {

    static propTypes = {
        items: arrayOf(shape({
            name: string.isRequired
        }))
    }

    render() {
        if (!this.props.items.length) {
            return <div>loading...</div>
        }
        return (
            <div>
                hello
        </div>
        );
    }
}

export default CSSModules(MapLinks, css);
