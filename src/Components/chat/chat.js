import React from 'react';
import PropTypes from 'prop-types';

import Pusher from 'pusher-js';
import slugify from 'slugify';
import randomAnimal from 'random-animal-name-generator';

import MessageList from './MessageList';
import './style.css';

class Chat extends React.Component {

  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.state = {
      message: '',
      messages: []
    }
  }

  componentWillMount() {
    this.pusher = new Pusher('265893c6bfd794702b82', {
      authEndpoint: 'http://localhost:4000/pusher/auth',
      cluster: 'us2',
      encrypted: true
    });

    var channel = 'private-' + slugify(this.props.title);
    this.post_channel = this.pusher.subscribe('message');
  }
  componentDidMount() {
    this.post_channel.bind('text', (message) => {
      console.log(message)
      message.time = new Date(message.time);
      if(message.by !== this.props.user){
        this.setState({
          messages: this.state.messages.concat(message)
        });
      }
    });
  }

  render() {
    return (
      <div className="chatbox">
        <div className="post-single">
          <div className="post-single__inner">
            <h1>CHAT</h1>
            <form onSubmit={this.onSubmit}>
              <input type="text" className="text-input" placeholder="Type your message here.."
                value={this.state.message}
                onChange={this.handleChange} />
            </form>
            {
              this.state.messages &&
              <MessageList messages={this.state.messages} />
            }
          </div>
        </div>
      </div>
    );
  }
  handleChange(e) {
    var message = e.target.value;
    this.setState({
      message: message
    });
  }

  onSubmit(e) {
    e.preventDefault();
    let text = this.state.message;
    let message = {
      by: this.props.user,
      body: text,
      time: new Date()
    };


    const req = fetch('http://localhost:4000/message', {
      method: 'post',
      body: JSON.stringify(message),
      headers: {
        'content-type': 'application/json',
      },
    });

    this.setState({
      message: '',
      messages: this.state.messages.concat(message)
    });
  }


}

Chat.propTypes = {
  title: PropTypes.string.isRequired
};

export default Chat;