import React, { Component } from 'react'
import className from 'classnames'
import './todoItem.css'
import checkImg from './done.svg'
import checkedImg from './interfaces.svg'

export class TodoItem extends Component {
    render() {
        const {item, onClick} = this.props;
        let url = checkImg;
        if (item.isCompleted) {
            url = checkedImg;
        }
        return (
            <div className={className('todoItem', {completed: item.isCompleted })} >
                <img src={url} onClick={onClick} alt="check"/>
                <p>{item.title}</p>
            </div>
        )
    }
}

export default TodoItem
