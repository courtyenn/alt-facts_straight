import React, {Component} from 'react';
import DraggableStyles from '../styles/Draggable';
import LineItem from '../LineItem';

export default class Draggable extends Component{
	constructor(){
		super();

		this.style={
			"position": "absolute",
			"left": 0,
			"top": 0
		};

		var body = document.getElementsByTagName('html')[0];
		body.addEventListener('mousemove', this.setMousePosition.bind(this), false);

		this.currentPosition = {x: 30, y: 10};
		this.nextPosition = {x: 30, y: 10};
		this.clicked = false;
		this.dragging = false;

		this.handleMouseDown = this.handleMouseDown.bind(this);
		this.handleMouseUp = this.handleMouseUp.bind(this);
	}

	render(){
		let style = {
			"left": this.currentPosition.x,
			"top": this.currentPosition.y
		};
		var draggableClone = React.Children.map(this.props.children, (child) => {
			var childStyle = child.props.style || "";
			return React.createElement('div',
			{
				style: Object.assign({}, this.style, style, childStyle),
				key: this.props.id,
				onMouseDown: this.handleMouseDown,
				onMouseUp: this.handleMouseUp
			}, this.props.children);
		});

		return (
			<div>
				{draggableClone}
			</div>
		);
	}

	setMousePosition(ev){
		this.localNextPosition.x = (ev.clientX);
		this.localNextPosition.y = (ev.clientY);

		if(this.props.children.props.style){
			var dimensions = this.props.children.props.style;
			this.localNextPosition.x -= (dimensions.width / 2);
			this.localNextPosition.y -= (dimensions.height / 2);
		}
		else{
			this.localNextPosition.x -= 10;
			this.localNextPosition.y -= 10;
		}

		if(this.clicked){
			this.dragging = true;
			this.currentPosition = this.localNextPosition;
			this.setState({
				currentPosition: this.localNextPosition
			});
		}
	}

	handleMouseDown(ev){
		this.clicked = true;
		this.dragging = true;
		// this.props.handleMouseDown(ev);
	}

	handleMouseUp(ev){
		this.clicked = false;
		// this.originPosition = this.nextPosition;
	}
};

Draggable.prototype.localNextPosition = {x: 0, y: 0};
Draggable.prototype.localOriginPosition = {x: 0, y: 0};
