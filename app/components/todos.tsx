import * as ReactDOM from "react-dom"
import * as React from "react"
import * as createReactClass from "create-react-class"

export var Todos = createReactClass({
  getInitialState: function() {
    return {
      todos: [
        "I am done",
        "I am not done"
      ]
    }
  },

  addTodoItem: function(todoItem: any) {
    this.state.todos.push(todoItem);
    this.setState({todos: this.state.todos});
  },

  render: function() {
    var todos = this.state.todos.map(function(todo: any) {
      return <div>{todo}</div>
    });

    return <div>
      <h3>Todo(s)</h3>
      {todos}
      <TodoForm addItem={this.addTodoItem} />
    </div>
  }
});

var TodoForm: any = createReactClass({
  getInitialState: function() {
    return {
      todoInput: ""
    }
  },

  handleClick: function(e: any) {
    e.preventDefault();
    this.props.addTodoItem(this.state.todoInput);
    this.setState({todoInput: ""});
  },

  handleOnChange: function(e: any) {
    e.preventDefault();
    this.setState({todoInput: e.target.value});
  },

  render: function() {
    return <div>
      <br />
      <input type="text" value={this.state.todoInput} onChange={this.handleOnChange} />
      <button onClick={this.handleClick}>Add Todo</button>
    </div>;
  }
});
