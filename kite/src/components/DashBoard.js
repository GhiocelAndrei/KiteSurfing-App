import React from 'react';
import Header from './Header';
import Main from './Main';
import Map from './Map';
export default function DashBoard(props)
{   
    const [addSpot,setAddSpot] = React.useState(false)
    function changeAddSpot()
    {
        setAddSpot(prevState => !prevState)
    }
    return(
        <div className="DashBoard">
            <Header changeAddSpot={changeAddSpot} Logout={props.Logout}/>
            <Main changeAddSpot={changeAddSpot} addSpot={addSpot} favourites={props.favourites} name={props.name}/>
        </div>
    )
}