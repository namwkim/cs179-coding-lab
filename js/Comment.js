// pure functional component
export default (comment) =>{
    return `<div class="comment">
                <a class="id" href="/">${comment.userId}</a><span>${comment.text}</span>
            </div>`
}

