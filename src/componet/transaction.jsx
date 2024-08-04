import React from 'react'

const transaction = ({ description, amount, type, id, onDelete}) => {

  return (
      <div style={{ display: 'flex', width: '80vw', alignItems: 'center', justifyContent: 'space-around' }}>
        {/* <span>{id}</span> */}
        <h3>{amount}</h3>
        <p>{description}</p>
        <h3>{type}</h3>
        <button onClick={()=>onDelete(id)}>Delete</button>
      </div>
  )
}

export default transaction
