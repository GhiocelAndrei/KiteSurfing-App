import React from 'react';

export default function Header(props)
{
    const [logOut,setLogOut] = React.useState(false);
    function changeLogOut()
    {
        setLogOut(prevState => !prevState)
    }
    return(
        <header className="header">
        <h1 className="header-title">Kite</h1>
        <button className='button-add-spot' onClick={props.changeAddSpot}>ADD SPOT</button>
        {logOut ? <button onClick={props.Logout} className="logout-button">Logout</button> : <div></div>}
        <img src="https://png.pngtree.com/element_our/md/20180517/md_5afd2b1f0ced7.jpg" alt="" className="header-img" onClick={changeLogOut}/>
        </header>
    )
}