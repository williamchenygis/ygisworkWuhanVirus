(this["webpackJsonpreact-tutorial"]=this["webpackJsonpreact-tutorial"]||[]).push([[0],{10:function(e,t,a){e.exports=a(11)},11:function(e,t,a){"use strict";a.r(t);var n=a(9),r=a(1),s=a(2),i=a(3),u=a(6),c=a(4),l=a(5),o=a(0),h=a.n(o),m=a(8),f=a.n(m);a(16);function d(e){return h.a.createElement("button",{className:"square",onClick:e.onClick},e.value)}var v=function(e){function t(){return Object(s.a)(this,t),Object(u.a)(this,Object(c.a)(t).apply(this,arguments))}return Object(l.a)(t,e),Object(i.a)(t,[{key:"handleClick",value:function(e){var t=this.state.squares.slice();p(t)||t[e]||(t[e]=this.state.xIsNext?"X":"O",this.setState({squares:t,xIsNext:!this.state.xIsNext}))}},{key:"renderSquare",value:function(e){var t=this;return h.a.createElement(d,{value:this.props.squares[e],onClick:function(){return t.props.onClick(e)}})}},{key:"render",value:function(){return h.a.createElement("div",null,h.a.createElement("div",{className:"board-row"},this.renderSquare(0),this.renderSquare(1),this.renderSquare(2)),h.a.createElement("div",{className:"board-row"},this.renderSquare(3),this.renderSquare(4),this.renderSquare(5)),h.a.createElement("div",{className:"board-row"},this.renderSquare(6),this.renderSquare(7),this.renderSquare(8)))}}]),t}(h.a.Component),b=function(e){function t(e){var a;return Object(s.a)(this,t),(a=Object(u.a)(this,Object(c.a)(t).call(this,e))).getList=function(){var e=Object(r.a)(a);fetch("/api/test").then((function(e){return e.json()})).then((function(t){console.log(t),e.setState({msg:t.msg})}))},a.getUserInfo=function(){Object(r.a)(a);fetch("/api/getUserInfo").then((function(e){return e.json()})).then((function(e){console.log(e)}))},a.state={history:[{squares:Array(9).fill(null)}],xIsNext:!0,stepNumber:0,msg:null,username:null},a.getList(),a.getUserInfo(),a}return Object(l.a)(t,e),Object(i.a)(t,[{key:"handleClick",value:function(e){var t=this.state.history.slice(0,this.state.stepNumber+1),a=t[t.length-1].squares.slice();p(a)||a[e]||(a[e]=this.state.xIsNext?"X":"O",this.setState({history:t.concat([{squares:a}]),stepNumber:t.length,xIsNext:!this.state.xIsNext}))}},{key:"jumpTo",value:function(e){this.setState({stepNumber:e,xIsNext:e%2===0})}},{key:"render",value:function(){var e,t=this,a=this.state.history,n=a[this.state.stepNumber],r=p(n.squares),s=this.state.msg,i=a.map((function(e,a){var n=a?"Go to move #"+a:"Go to game start";return h.a.createElement("li",{key:a},h.a.createElement("button",{onClick:function(){return t.jumpTo(a)}},n))}));return e=r?"Winner: "+r:"Next player: "+(this.state.xIsNext?"X":"O"),h.a.createElement("div",{className:"game"},h.a.createElement("div",{className:"msg"},h.a.createElement("h3",null,"welcome: ",s)),h.a.createElement("div",{className:"game-board"},h.a.createElement(v,{squares:n.squares,onClick:function(e){return t.handleClick(e)}})),h.a.createElement("div",{className:"game-info"},h.a.createElement("div",null,e),h.a.createElement("ol",null,i)))}}]),t}(h.a.Component);function p(e){for(var t=[[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]],a=0;a<t.length;a++){var r=Object(n.a)(t[a],3),s=r[0],i=r[1],u=r[2];if(e[s]&&e[s]===e[i]&&e[s]===e[u])return e[s]}return null}f.a.render(h.a.createElement(b,null),document.getElementById("root"))},16:function(e,t,a){}},[[10,1,2]]]);
//# sourceMappingURL=main.a0a9ce23.chunk.js.map