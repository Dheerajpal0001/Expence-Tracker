import React from 'react'

const demo = () => {
    const [count , setcount] = React.useState(0);
    const [amo, setamo] = React.useState(0)

    const handlechange = ()=>{
        // setcount(count + +amo);
    }
  return (
    <>
    {/* <div>{count}</div>
    <input type="text" value={amo} onChange={(e)=> setamo(e.target.value)}/>
    <button onClick={()=> handlechange()}>incement</button> */}

    <div>Currently No data available</div>
    </>
  )
}

export default demo