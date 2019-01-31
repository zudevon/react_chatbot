/* eslint-disable */
import React, { Component } from 'react';
import {connect} from 'react-redux';
import {sendMessage} from "./chat";


class App extends Component {
    // state = {
    //     text_field : ''
    // };
    //
    // handle_edit = e => {
    //     this.setState({text_field : e.target.value})
    // };
    //
    // onSubmit = e => {
    //     this.sendMessage(e.target.value);
    //     this.setState({text_field : ""})
    // };

  render() {
    const {feed, sendMessage} = this.props;
    return (
        <div>
          <ul>
              {feed.map(entry => <li>{entry.text}</li>)}
          </ul>
          <input type="text" onKeyDown={(e) => e.keyCode === 13 ? sendMessage(e.target.value) : null}/>
        </div>
    );
  }
}

const mapStateToProps = state => ({
  feed: state

});

export default connect(mapStateToProps, {sendMessage})(App);
