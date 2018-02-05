// here, we approximate what redux's state managtement
// https://redux.js.org/
// ideally, posts and comments can be separated into multiple files especially if this file gets crowded

import {uniqueId} from './utils.js';

// action types
export const INCREASE_LIKE = 'INCREASE_LIKE';

export const ADD_COMMENT = 'ADD_COMMENT';

// actions
export const increaseLike = (postId) =>{
	return {
		type: INCREASE_LIKE,
		postId
	};
};

export const addComment = (postId, userId, text) =>{
	return {
    type: ADD_COMMENT,
    id: uniqueId('comment_'),
    postId,
    userId,
    text
	};
};



// reducer (never mutate state)
let posts = (state={}, action)=>{
  console.log(state);
  switch(action.type){
    case INCREASE_LIKE:
      return {// create a new state object
        ...state,// leave every other post as it is
        [action.postId]:{
          ...state[action.postId], // leave every other prop as it is,
          likes: state[action.postId].likes + 1
        }
      };
    default:
      return state;
  }
}


let comments = (state={}, action)=>{
  switch(action.type){
    case ADD_COMMENT:
    return {// create a new state object
      ...state,// leave every other post as it is
      [action.id]:{
        ...action
      }
    };
  default:
    return state;
  }
}
// root reducer
let root = (state={}, action) =>{
  return {
    posts: posts(state.posts, action),
    comments: comments(state.comments, action),
  };
}


export default function createStore(initState, updateState=root){
  let state = initState;
  let listeners = []

  function subscribe(listener){
    listeners.push(listener);
  }

  function dispatch(action){
    // update state using the action
    state  = updateState(state, action);

    // call listener whenever the state is updated
    for (let i=0; i<listeners.length; i++){
      listeners[i].call(null, state);
    }
  }
  return {
    dispatch,
    getState,
    subscribe
  }
}