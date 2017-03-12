var TweetBox = React.createClass({
  getInitialState: function() {return {
      text: "",
      photoAdded: false,
      };
	  
  },
  handleChange: function(event) {
  this.setState({ text: event.target.value });
},
  handleClick: function(event) {
  this.setState({ photoAdded: !this.state.photoAdded });
},
	remainingChars: function() {
  if (this.state.photoAdded) {
    return 140 - 23 - this.state.text.length;
  } else {
    return 140 - this.state.text.length;
  }
},
overflowAlert: function() {
  if (this.remainingChars() < 0) {
	  if (this.state.photoAdded) {
	    var beforeOverflowText = this.state.text.substring(140 - 23 - 10, 140 - 23);
	    var overflowText = this.state.text.substring(140 - 23);
	  } else {
	    var beforeOverflowText = this.state.text.substring(140 - 10, 140);
	    var overflowText = this.state.text.substring(140);
	  }
    return (
    <div className="alert alert-warning">
        <strong>Oops! Too Long:</strong>&nbsp;...{beforeOverflowText}
      	<strong className="bg-danger">{overflowText}</strong>
    </div>
    );
  } else {
    return "";
  }
},
  render: function() {return (
      <div className="well clearfix">
      <textarea onChange={this.handleChange} className="form-control tweet_text"></textarea>
	  { this.overflowAlert() }
      <br/>
      <span><p onChange={this.handleChange}>{ this.remainingChars() }</p></span>
      <button disabled={this.state.text.length === 0 && !this.state.photoAdded} className="btn btn-primary pull-right tweet_submit">Tweet</button>
      <button onClick={this.handleClick} className="btn btn-save pull-right">{this.state.photoAdded ? "✓ Photo Added" : "Add Photo" }</button>
      </div>
                              );}
});


ReactDOM.render(
  <TweetBox />,
  document.getElementById("tweetbox")

);
