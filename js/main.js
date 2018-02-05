// import utility functions
import {uniqueId, loadState, saveState} from './utils.js'; 
// import
import createStore from './store.js';
import PostList from './PostList.js';

function render(state, store){
    // restructure the state for presentation (i.e., integrate comments to posts)
    let posts = Object.values(state.posts).map(post=>{
        return {
            ...post, // spread the properties of post
            // add a new property, comments
            comments: Object.values(state.comments).filter(c=>c.postId==post.id) // find comments for this post
        }
    })
    // 
    document.querySelector('.main').innerHTML = PostList(posts,store);
}


function initStore(state){
    let store = createStore(state);
    console.log(store);
    store.subscribe((state)=>{ // this will be called whenever state changed
        saveState(state); //save to local storage
        render(state, store);
    })
    // initial render (pass down the store to connect to child components)
    render(state, store);  
}

function initialize(){
    // load data from local storge
    let initstate = loadState();


    if (initstate == null){
        fetch('/data/state.json')
            .then((res)=>res.json())
            .then(res=>initStore(res))
            .catch(error => console.error('error:', error));
    }else{
        initStore(initstate);
    }    
}


initialize();// call init