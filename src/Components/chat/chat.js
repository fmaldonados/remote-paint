import React from 'react';
import PropTypes from 'prop-types';

import Pusher from 'pusher-js';
import slugify from 'slugify';
import randomAnimal from 'random-animal-name-generator';

import MessageList from './MessageList'; // the component for listing messages
import './style.css';

class Chat extends React.Component {

    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this); // for updating the message being typed by the user
        this.onSubmit = this.onSubmit.bind(this);
        this.state = {
            message: '', // the message being typed by the user
            messages: [] // the messages that will be displayed by the MessageList component
        }

        this.user = randomAnimal(); // generate random animal name
    }

    componentWillMount() {
        this.pusher = new Pusher('265893c6bfd794702b82', {
            authEndpoint: 'http://localhost:4000/pusher/auth',
            cluster: 'us2',
            encrypted: true
        });

        var channel = 'private-' + slugify(this.props.title);
        this.post_channel = this.pusher.subscribe(channel);
    }
    componentDidMount() {
        this.post_channel.bind('client-on-message', (message) => {
            console.log(message)
            message.time = new Date(message.time); // convert to a date object since its converted to a string when sending the message
            // update the state to include the new message
            this.setState({
                messages: this.state.messages.concat(message)
            });
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
            by: this.user,
            body: text,
            time: new Date()
        };

        this.post_channel.trigger('client-on-message', message);
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