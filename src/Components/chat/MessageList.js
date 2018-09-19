import React from 'react';
import ReactDOM from 'react-dom';
import TimeAgo from 'react-timeago';

class MessageList extends React.Component {

    constructor(props) {
        super(props);
        this.renderMessages = this.renderMessages.bind(this);
    }

    render() {

        return (
            <div className="messages">
                {this.renderMessages()}
                <div ref={(el) => { this.messagesEnd = el; }}></div>
            </div>
        );

    }

    renderMessages() {
        return this.props.messages.map((msg, index) => {
            return (
                <div className="msg" key={index}>
                    <div className="msg-from">{msg.by}</div>
                    <div className="msg-body">{msg.body}</div>
                    <div className="msg-time">
                        <TimeAgo date={msg.time} minPeriod={60} />
                    </div>
                </div>
            );
        });
    }
    scrollToBottom() {
        const node = ReactDOM.findDOMNode(this.messagesEnd);
        node.scrollIntoView({ behavior: "smooth" });
    }

    componentDidUpdate() {
        this.scrollToBottom();
    }
}



export default MessageList;