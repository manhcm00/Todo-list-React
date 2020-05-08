import React, { Component } from 'react'
import className from 'classnames'
import './todoItem.css'
import checkImg from './done.svg'
import checkedImg from './interfaces.svg'
import cross from './cross.svg'

export class TodoItem extends Component {
    render() {
        const {item, onClick, removeItem} = this.props;
        let url = checkImg;
        if (item.isCompleted) {
            url = checkedImg;
        }
        const crossStyle = {
            "marginLeft": "auto",
            "width": "10px",
            "height": "10px",
            "marginRight": "10px"
        }
        return (
            <div className={className('todoItem', {completed: item.isCompleted })} >
                <img src={url} onClick={onClick} alt="check"/>
                <p>{item.title}</p>
                <img src={cross} alt='cross' style={crossStyle} onClick={removeItem}/>
            </div>
        )
    }
}

export default TodoItem
