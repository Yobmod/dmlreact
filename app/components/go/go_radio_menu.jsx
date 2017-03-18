//============================================================
var GoMenu = React.createClass({
	getInitialState: function () {
    	return {selectedOption: "9"};
  	},

	handleOptionChange: function (changeEvent) {
  		this.setState({selectedOption: changeEvent.target.value});
	},
	handleFormSubmit: function (formSubmitEvent) {
  		formSubmitEvent.preventDefault();
		console.log('You have selected:', this.state.selectedOption);
		},
  	render: function () {
		return (
			<div>
		      <form onSubmit={this.handleFormSubmit}>
		        	<div className="radio">
		          		<label><input type="radio" value="9" checked={this.state.selectedOption === "9"}
						onChange={this.handleOptionChange}/>9</label>
		        	</div>
					<div className="radio">
						<label><input type="radio" value="13" checked={this.state.selectedOption === "13"}
						onChange={this.handleOptionChange}/>13</label>
					</div>
					<div className="radio">
						<label><input type="radio" value="19" checked={this.state.selectedOption === "19"}
						onChange={this.handleOptionChange}/>19</label>
					</div>
					<button className="btn btn-default" id="gomenubutton" type="submit">Resize</button>
					<p> Grid-size: {this.state.selectedOption}</p>
		      </form>
			  </div>
			  	)
			}
  		})

//=======================================================================

ReactDOM.render(
		<GoMenu />,
		    document.getElementById('gomenu')
);

$(document).ready(function() {
	$("#gomenubutton").click(function(e) {
		var strcont = "#gocontainer";
    	var gridsize = strcont.concat($('input:checked').val());
		$('.gocontain').not(gridsize).fadeOut(1000).delay(500)
		$(gridsize).delay(500).fadeIn(1000)
	});
})
