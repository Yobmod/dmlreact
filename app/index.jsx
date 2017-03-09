
var React = require('react');
var ReactDOM = require('react-dom');

var App = require ('./components/parp');
//var Main = require ('./components/main');

ReactDOM.render(
	<parp />,
	document.getElementById('parp')
);

var realPython = React.createClass({
  render: function() {
	return (<h2>Greetings, from Real Python!</h2>);
  }
});

ReactDOM.render(
  React.createElement(realPython, null),
  document.getElementById('content')
);
