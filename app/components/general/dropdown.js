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

	render: function() {
		return <div className={"dropdown-container" + (this.state.listVisible ? " show" : "")}>
			<div className={"dropdown-display" + (this.state.listVisible ? " clicked": "")} onClick={this.show}>
				<span style={{ color: this.props.selected.hex }}>{this.props.selected.name}</span>
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
				<span style={{ color: item.hex }}>{item.name}</span>
				<i className="fa fa-check"></i>
			</div>);
		}
		return items;
	}
});

var colours = [{
	name: "red",
	hex: "#F21B1B"
}, {
	name: "blue",
	hex: "#1B66F2"
}, {
	name: "green",
	hex: "#07BA16"
}];
React.renderComponent(
	<Dropdown list={colours} selected={colours[0]} />,
	document.getElementById("container"));
