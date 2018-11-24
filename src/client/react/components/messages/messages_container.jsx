import React from "react";
import MessagesComponent from "./messages_component";
import sendApiRequest from "react/utils/api";
import openSocket from 'socket.io-client';
import { Redirect, withRouter } from "react-router-dom";


class MessagesContainer extends React.Component {
  _isMounted = false;

  constructor(props) {
    super(props);
    this.state = {
      messages: [],
      messages_to_send: [],
     };

    this.deleteMessage = this.deleteMessage.bind(this);
    this.newMessageWindow = this.newMessageWindow.bind(this);
  }


  fetchMessages(){
    sendApiRequest({ url: "/api/messages" })
      .then((messages) => {
        this.setState({
          messages: messages,
        })
      })
      .catch((error) => {
        console.error(error);
        this.setState({
          messages: [],
        })
      })
  }

  deleteMessage(message){
    const url = `/api/messages/${message._id}`
    sendApiRequest({
        url,
        method: "DELETE",
      })
      .then((_ignored) => {
        const {messages} = this.state;

        const messageIndex = messages.indexOf(message);
        if (messageIndex > -1) {
          messages.splice(messageIndex, 1);
        }
        this.setState({
          messages: messages,
        })
      })
      .catch((error) => {
        console.error(error);
        this.setState({
          messages: [],
        })
      })
  }

  sendMessage(message){
    const url = `/api/messages/`
    sendApiRequest({
        url,
        method: "POST",
        params: {body:message.content, author:message.author}
      })
      .then((addedMessage) => {
       /* const {messages} = this.state;
        messages.push(addedMessage)
        this.setState({
          messages: messages,
        })*/
        //this.state.socket.emit('new_message', {message : addedMessage});
      })
      .catch((error) => {
        console.log(error);
      })
  }

  componentWillUnmount() {
    this._isMounted = false;
  }


  componentDidMount(){
    this._isMounted =true;
    this.fetchMessages();

    const socket = openSocket('http://localhost:3031');
    socket.on('new_message', (message) => {
        if(this._isMounted){
          let myNotification = new Notification(message.message.author, {
            body: message.message.body,
          })
          myNotification.onclick = () => {
            this.props.history.push(`/message/${message.message._id}`);
          }
          const {messages} = this.state;
          messages.push(message.message)
          this.setState({
            messages: messages,
          })
        }
    });

    const alertOnlineStatus = () => {
      if(this._isMounted){
        window.alert(navigator.onLine ? 'online' : 'offline')
      }
    }
    const sendMessagesToSend = () => {
      if(this._isMounted){
        console.log("sending unsent messages");
        this.state.messages_to_send.map((message) => this.sendMessage(message));
        this.setState({
          messages_to_send: [],
        })
      }
    }

    window.addEventListener('online',  alertOnlineStatus)
    window.addEventListener('online', sendMessagesToSend)
    window.addEventListener('offline',  alertOnlineStatus)

    const electron = window.require('electron');
    const fs = electron.remote.require('fs');
    const ipcRenderer  = electron.ipcRenderer;
    ipcRenderer.on('new_message_from_ipc_main', (event, message) => {
      if(this._isMounted){
        if(navigator.onLine){
          this.sendMessage(message);
        }
        else{
          console.log("storing message to send");
          const {messages_to_send} = this.state;
          messages_to_send.push(message)
          this.setState({
            messages_to_send: messages_to_send,
          })
        }
      }
    });
  }

  newMessageWindow(){
    const electron = window.require('electron');
    const fs = electron.remote.require('fs');
    const ipcRenderer  = electron.ipcRenderer;
    ipcRenderer.send('show-new-message-window');
  }

  render() {
    return (
      <MessagesComponent
        messages={this.state.messages}
        deleteMessage={this.deleteMessage}
        newMessageWindow={this.newMessageWindow}
      />
    );
  }
}

export default MessagesContainer;
