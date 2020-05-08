import React, { Component } from 'react';
import TodoItem from '../TodoItems/TodoItem';
import tick from './checks.svg';
import './todoList.css';

export class TodoList extends Component {
	constructor() {
		super();
		this.state = {
			newItem: '',
			currentFliter: 'All',
			checkAll: false,
			todoList: [
				{ title: 'Hang out', isCompleted: true },
				{ title: 'Go shopping', isCompleted: false },
				{ title: 'Running', isCompleted: false },
				{ title: 'Sleeping', isCompleted: false }
			]
		};
		this.clickCheckBoxHandler = this.clickCheckBoxHandler.bind(this);
		this.onKeyUpHandler = this.onKeyUpHandler.bind(this);
		this.onChange = this.onChange.bind(this);
		this.onClick = this.onClick.bind(this);
		this.selectAll = this.selectAll.bind(this);
		this.removeItem = this.removeItem.bind(this);
	}

	clickCheckBoxHandler(item) {
		const { todoList } = this.state;
		return (event) => {
			const isCompleted = item.isCompleted;
			const index = todoList.indexOf(item);
			//const fakeList = [...this.state.todoList];
			this.setState({
				todoList: [
					...todoList.slice(0, index),
					{ ...item, isCompleted: !isCompleted },
					...todoList.slice(index + 1)
				]
			});
		};
	}

	onKeyUpHandler(event) {
		let text = event.target.value;
		if (event.keyCode === 13) {
			// enter key
			if (!text) {
				return;
			}
			text = text.trim();
			if (!text) {
				return;
			}
			this.setState({
				todoList: [ { title: text, isCompleted: false }, ...this.state.todoList ],
				newItem: ''
			});
		}
	}

	onChange(event) {
		this.setState({
			newItem: event.target.value
		});
	}

	onClick(e) {
		console.log(e.target.innerHTML);
		this.setState({
			currentFliter: e.target.innerHTML
		});
	}

	selectAll() {
		let checkAll = !this.state.checkAll;
		if (checkAll === true) {
			this.setState({
				checkAll: checkAll,
				todoList: [
					...this.state.todoList.map((item) => {
						return { title: item.title, isCompleted: true };
					})
				]
			});
		} else {
			this.setState({
				checkAll: checkAll,
				todoList: [
					...this.state.todoList.map((item) => {
						return { title: item.title, isCompleted: false };
					})
				]
			});
		}
	}

	removeItem(item) {
		const { todoList } = this.state;
		return (e) => {
			const index = todoList.indexOf(item);
			this.setState({
				todoList: [ ...todoList.slice(0, index), ...todoList.slice(index + 1) ]
			});
		};
	}

	render() {
		const { todoList, newItem, currentFliter } = this.state;
		let currentList = todoList;
		if (currentFliter === 'All') {
			currentList = todoList;
		} else if (currentFliter === 'Active') {
			currentList = todoList.filter((item) => {
				return !item.isCompleted;
			});
		} else {
			currentList = todoList.filter((item) => {
				return item.isCompleted;
			});
		}
		return (
			<div className="todoList">
				<h1>Todo List</h1>
				<div className="Header">
					<img src={tick} alt="tick" onClick={this.selectAll} />
					<input
						type="text"
						placeholder="Add a new item"
						onKeyUp={this.onKeyUpHandler}
						value={newItem}
						onChange={this.onChange}
					/>
				</div>
				{currentList.map((item, index) => (
					<TodoItem
						key={index}
						item={item}
						onClick={this.clickCheckBoxHandler(item)}
						removeItem={this.removeItem(item)}
					/>
				))}
				<div className="Footer">
					<div>{todoList.filter((item) => !item.isCompleted).length} items left</div>
					<div>
						<span onClick={this.onClick}>All</span>
						<span onClick={this.onClick}>Active</span>
						<span onClick={this.onClick}>Completed</span>
					</div>
				</div>
			</div>
		);
	}
}

export default TodoList;
