"use strict";
const React = require("react");
const ReactDOM = require("react-dom");
const typscritpto_1 = require("./components/typscritpto");
//import Hello from "./components/typscritpto";
ReactDOM.render(React.createElement(typscritpto_1.Hello, { compiler: "TypeScript", framework: "React" }), document.getElementById("example"));
