(function() {
    var Treat = React.createClass({
        render: function() {
            var src = 'static/img/icons/icon_' + this.props.type + '.png';
            return (
                <li>
                    <img src={src}/>
                </li>
            );
        }
    });

    var Treats = React.createClass({
        render: function() {
            var treats = this.props.data.map((treat, index) =>
			{return <ul key={index}>
			<Treat type={treat.type} />;
			</ul>
            });

            return (
              <ul className="inline treats">
                {treats}
              </ul>
            );
        }
    });

    var DogFooder = React.createClass({
        getInitialState: function() {
            return {
                treats: []
            }
        },

        giveTreat: function() {
            var treats = this.state.treats;

            var type;
            var rand = Math.random();
            if(rand > 0.80) {
                type = 'steak';
            } else if(rand > 0.4) {
                type = 'bacon';
            } else {
                type = 'bone';
            }

            treats.push({ type: type });

            this.setState({
                treats: treats,
            });
        },

        takeTreat: function() {
            var treats = this.state.treats;
            if(treats.length == 0) return;

            treats.pop();
            this.setState({
                treats: treats
            });
        },

        render: function() {
            var addButtonState = this.state.treats.length > 0 ? '' : ' disabled';

            return (
                <div>
                    <h3>Treats: {this.state.treats.length}</h3>
                    <Treats data={this.state.treats}/>
                    <br/>
                    <div>
                        <button className="btn btn-large btn-success" onClick={this.giveTreat}>Good dog!</button>
                        {'  '}
                        <button className={'btn btn-large btn-danger ' + addButtonState} onClick={this.takeTreat}>Bad dog!</button>
                    </div>
                </div>
            );
        }
    });

    ReactDOM.render(<DogFooder />, document.getElementById('dogfood'));
})();
