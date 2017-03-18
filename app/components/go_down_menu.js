var Dropdown = React.createClass({
	getInitialState: function() {
		return {
			listVisible: false,
			display: ""
		};
	},

	select: function(item) {
		this.props.selected = item;
	},

	show: function() {
		this.setState({ listVisible: true });
		document.addEventListener("click", this.hide);
	},

	hide: function() {
		this.setState({ listVisible: false });
		document.removeEventListener("click", this.hide);
	},
	chosenSize: function() {
     return this.props.selected.value;
 },

	render: function() {
		return <div className={"dropdown-container" + (this.state.listVisible ? " show" : "")}>
			<div className={"dropdown-display" + (this.state.listVisible ? " clicked": "")} onClick={this.show}>
				<span>{this.props.selected.name}</span>
				<i className="fa fa-angle-down"></i>
			</div>
			<div className="dropdown-list">
				<div>
					{this.renderListItems()}
				</div>
			</div>
		</div>;
	},

	renderListItems: function() {
		var items = [];
		for (var i = 0; i < this.props.list.length; i++) {
			var item = this.props.list[i];
			items.push(<div onClick={this.select.bind(null, item)}>
				<span>{item.name}</span>
				<i className="fa fa-check"></i>
			</div>);
		}
		return items;
	}
});

var colours = [{
	name: "5",
	value: 5
}, {
	name: "9",
	value: 9
}, {
	name: "19",
	value: 19
}];
React.renderComponent(
	<Dropdown list={colours} selected={colours[0]} />,
	document.getElementById("container"));
