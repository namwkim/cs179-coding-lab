import Post from './Post.js';
// pure functional component
export default (posts,store) =>{
    console.log(store);
    return `<div class="posts">
              ${posts.map(p=>(new Post(p,store).render())).join('')}
            </div>`
}