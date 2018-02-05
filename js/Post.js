import Component from './Component.js';
import Comment from './Comment.js';
import {timespan} from './utils.js';
import { increaseLike, addComment } from './store.js';
export default class Post extends Component{
    constructor(props, store){
        super(props); // call parent constructor
        this.state = {
            store: store
        };
    }

    increaseLike (){
        this.state.store.dispatch(increaseLike(this.props.id));
    }
    addComment (elem){
        // console.log(elem);

        // console.log(document.querySelector(`.textarea-${this._id}`))
        this.state.store.dispatch(addComment(this.props.id, 'kgajos', elem.value));
        elem.value = '';
    }
    render(){
        return `<div class="post">
            <header class="header">
                <a class="photo" href="/">
                    <img src="${this.props.userImg}">
                </a>
                <a class="id" href="/">${this.props.userId}</a>
            </header>
            <div class="content">
                <img class="image" src="${this.props.img}" ondblclick="document.componentRegistry[${this._id}].increaseLike()"/>
            </div>
            <div class="footer">
            <div class="action">   
                <a class="icon ${this.props.likes>0?'heart':'like'}" href="/">Like</a>  
                <a class="icon comment" href="/">Comment</a>  
                <a class="icon save" href="/">Save</a>  
            </div>
            <div class="likes">      
                ${this.props.likes} likes
            </div>
            <div class="comments">
                ${this.props.comments.map(Comment).join('')}      
            </div>
            <time class="time">          
                ${timespan(this.props.datetime).toUpperCase()} AGO
            </time>
            <div class="add-comment">
                <input type="text" placeholder="Add a comment…" onchange="document.componentRegistry[${this._id}].addComment(this)"></input>
            </div>
            </div>
        </div>`
    }

}