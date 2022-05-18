import React from 'react';
import {OverlayView} from '@react-google-maps/api'
import Card from './Card';
export default function CustomMarker({favourites,features,name})
{
    const [isFav, setIsFav] = React.useState(false)
    
    React.useEffect(()=>{
        function debateFav()
        {
            if(favourites.filter(fav => fav.userName === name && features.id == fav.spot).length>0)setIsFav(true)
        }
        debateFav()
    },[])
    function changeFav()
    {
        setIsFav(prevState => !prevState)
    }
    const center = { lat: features.lat, lng: features.long }
    const [info,setInfo] = React.useState(false);
    function changeInfo()
    {
        setInfo(prevInfo => !prevInfo)
    }
    if(isFav==false)
    return(
        <OverlayView
            position={center}
            mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET} 
            zIndex={2}>
            <div>
            <div className="marker">
                <img src="https://cdn-icons-png.flaticon.com/128/684/684908.png" alt="" className="header-img" onClick={changeInfo}/>
            </div>
            {info && <div  onClick={changeInfo}>
                    <Card changeFav={changeFav} isFav={isFav} name={name} features={features}/>
                </div> }
            </div>
        </OverlayView>
        )
    else
    return(
        <OverlayView
            position={center}
            mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET} 
            zIndex={1}>
            <div>
            <div className="marker">
                <img src="https://cdn-icons-png.flaticon.com/128/1502/1502944.png" alt="" className="header-img" onClick={changeInfo}/>
            </div>
            {info && <div  onClick={changeInfo}>
                    <Card changeFav={changeFav} isFav={isFav} name={name} features={features}/>
                </div> }
            </div>
        </OverlayView>
        )
}