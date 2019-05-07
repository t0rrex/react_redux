import React from 'react'

function Comment({comment}) {
    return (
        <div>
            <p>{comment.user}</p>
            <p>{comment.text}</p>
        </div>
    )
}

export default Comment