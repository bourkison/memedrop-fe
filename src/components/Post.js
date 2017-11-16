import React, { Component } from 'react';

class Post extends Component {

  render() {
    return (
      <div>
        <p>{this.props.content}</p>
      </div>
    )
  }

}

export default Post;
