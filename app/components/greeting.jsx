
var Greeting = function Welcome(props) {
  return <h1>Hello, {props.name}</h1>;
}

ReactDOM.render(
		<Greeting name='RandoLName' />,
		document.getElementById('greeting')
    );
