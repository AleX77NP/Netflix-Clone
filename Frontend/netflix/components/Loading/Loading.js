import React from 'react'

const Loading = () => {
    return (
        <div style={{height: '100vh', backgroundColor: 'black', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
            <img src="/images/loading.gif" alt="loading" style ={{ width: '100px', display: 'block'}} />
        </div>
    )
}

export default Loading
