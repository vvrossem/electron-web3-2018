import React from "react";
import ReactDOM from "react-dom";
import NewMessageContainer from "../react/components/new_message/new_message_container";

import 'bootstrap/dist/css/bootstrap.css';
import "../style/application.scss";


// react
const rootElem = document.body.querySelector('#root');
const reactMainElem = React.createElement(NewMessageContainer, {});
ReactDOM.render(reactMainElem, rootElem );
