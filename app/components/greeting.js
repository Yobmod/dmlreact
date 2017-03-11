(function() {
    var Greeting = React.createClass({
        render: function() {
            return (
                React.DOM.h1({}, 'Hello, ' + this.props.name + '!')
            );
        }
    });

    ReactDOM.render(
		<Greeting name='RandoName' />, 
		document.getElementById('greeting'));
})();
