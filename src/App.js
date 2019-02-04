/* eslint-disable */
import React, { Component } from 'react';
import {connect} from 'react-redux';
import {sendMessage} from "./chat";


class App extends Component {

    constructor(props) {
        super(props)
        this.state = {textField: ''}
    }

    _enterText = e => this.setState({textField: e.target.value})

    _handleKeyDown = e => {
        if(e.keyCode === 13) {
                         this.props.sendMessage(e.target.value)
            this.setState({textField: ''})

        }
    }


  render() {
    const {feed, sendMessage} = this.props;

    return (
        <div>
          <ul>
              {feed.map(entry => <li>{entry.text}</li>)}
          </ul>
          <input type="text" onChange={this._enterText}
                 value={this.state.textField}
                 onKeyDown={this._handleKeyDown}
          />
        </div>
    );
  }
}

const mapStateToProps = state => ({
  feed: state

});

export default connect(mapStateToProps, {sendMessage})(App);
