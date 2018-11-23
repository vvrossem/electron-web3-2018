import React from "react";
import TodoAppComponent from "./todo_app_component";

class TodoAppContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = { items: [], text: "" };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);


  }

  handleChange(e) {
    this.setState({ text: e.target.value });
  }

  handleSubmit(e) {
    e.preventDefault();
    const newItem = {
      text: this.state.text,
      id: Date.now()
    };
    this.setState(state => ({
      items: state.items.concat(newItem),
      text: ""
    }));

    //const electron = window.require('electron');
    //const fs = electron.remote.require('fs');

    //const ipcRenderer  = electron.ipcRenderer;
    //const Notification = electron.remote.Notification

    let myNotification = new Notification('TODO', {
      body: this.state.text,
    })
    myNotification.onclick = () => {
      console.log('Notification clicked')
    }
    //myNotification.click();

  }

  render() {
    return (
      <TodoAppComponent
        currentText={this.state.text}
        items={this.state.items}
        handleSubmit={this.handleSubmit}
        handleChange={this.handleChange}
      />
    );
  }
}

export default TodoAppContainer;
