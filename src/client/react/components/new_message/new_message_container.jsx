import React from "react";
import { HashRouter } from "react-router-dom";
import NewMessageComponent from "./new_message_component";

class NewMessageContainer extends React.Component {
  constructor(props) {

    super(props);
    this.state = {
      content:"",
      author:this.name,
     };
    this.addMessage = this.addMessage.bind(this);
    this.onFieldChange = this.onFieldChange.bind(this);
  }

  addMessage(e){
    e.preventDefault();
    console.log(this.state.author);
    console.log(this.state.content);

    const electron = window.require('electron');
    const fs = electron.remote.require('fs');
    const ipcRenderer  = electron.ipcRenderer;

    //let mainWindow = electron.remote.getGlobal('mainWindow');
    //console.log(mainWindow);
    //if (mainWindow){
    console.log("sent message from window");
    ipcRenderer.send('new_message_from_window', {author:this.state.author, content:this.state.content});
    //}
    //ipcRenderer.send('close-new-message-window');
  }

  onFieldChange(event){
      this.setState({
          [event.target.name]: event.target.value,
      })
  }

  render() {
    return (
      <HashRouter>
      <div>
      <NewMessageComponent
        addMessage={this.addMessage}
        onFieldChange={this.onFieldChange}
      />
      </div>
      </HashRouter>
    );
  }
}

export default NewMessageContainer;
