import {uniqueId, loadState, saveState} from './utils.js';
import createStore from './store.js';
import PostList from './PostList.js';

function render(state, store){
    // restructure the state for presentation (i.e., integrate comments to posts)
    let posts = Object.values(state.posts).map(post=>{
        return {
            ...post,
            comments: Object.values(state.comments).filter(c=>c.postId==post.id)
        }
    })
    // console.log(posts);
    document.querySelector('.main').innerHTML = PostList(posts,store);
}


function initialize(){
    // load data from local storge
    let initstate = loadState();

    let initStore = function(state){
        let store = createStore(state);
        console.log(store);
        store.subscribe((state)=>{ // this will be called whenever state changed
            saveState(state); //save to local storage
            render(state, store);
        })
        // initial render (pass down the store to connect to child components)
        render(state, store);
        
    }

    if (initstate == null){
        fetch('/data/state.json')
            .then((res)=>res.json())
            .then(res=>initStore(res))
            .catch(error => console.error('error:', error));
    }else{
        initStore(initstate);
    }

    // if not read from the file to populate initial data
    
    for (let i=0; i<5; i++){
        console.log(uniqueId('post_'));
    }
    
}


initialize();// call init