var react = require('react');
var reactDOM = require('react-dom');

var App = require ('./components/App');

reactDOM.render(
	<App />,
	document.getElementById('app')
);

var Hello = react.createClass ({
	render: function(){
		return (
			<h1>Hello yall!</h1>
		)
	}
});

reactDOM.render(
	<Hello />,
	document.getElementById('container')
);

reactDOM.render(
	<App />,
	document.getElementById('app')
);
