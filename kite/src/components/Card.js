import React from 'react';
import axios from 'axios';
import { propTypes } from 'google-map-react';
export default function Card({changeFav,isFav,features,name})
{

    const api = axios.create({
        baseURL: `https://627e1ec9b75a25d3f3b21451.mockapi.io`});
    const [favourites,setFavourites] = React.useState([])
    const [tempFav,setTempFav] = React.useState(isFav)
    function reloadFav()
    {
        const api = axios.create({
            baseURL: `https://627e1ec9b75a25d3f3b21451.mockapi.io`
        })
        const fetch = async () =>{
            try{
                const response = await api.get('/favourites')
                setFavourites(response.data)
            } catch(err){
                if(err.response){
                    console.log(err.response.data)
                    console.log(err.response.status)
                    console.log(err.response.header)
                }
                else {
                    console.log(`Error: ${err.message}`)
                }
            }
        }
        fetch()
    }
    async function postFav(newFav)
    {
        const api = axios.create({
            baseURL: `https://627e1ec9b75a25d3f3b21451.mockapi.io`
        })
        const post = async () =>{
            try {
                const response = await api.post('/favourites',newFav);
              } catch (err) {
                console.log(`Error: ${err.message}`);
              }
        }
        post()
    }
    async function setFav(e)
    {
        if (!e) var e = window.event
        e.cancelBubble = true;
        if (e.stopPropagation) e.stopPropagation();
        setTempFav(prevState => !prevState)
        const newFav = {userName:name,spot:features.id}
        if(tempFav==false)
        {
            postFav(newFav)
        }
        else
        {
            reloadFav()
            const getId = favourites.filter(fav => fav.userName==name && fav.spot==features.id);
            try {
                const response = await api.delete(`/favourites/${getId[0].id}`,newFav);
              } catch (err) {
                console.log(`Error: ${err.message}`);
              }
        }
        changeFav()
    }
    return(
        <div className="card">
            <div className="card-container">
            <h3 >{features.name}</h3>
            <h4 className='h4-name'>{features.country}</h4>
            <h4 className='h4-description'>Wind Probability</h4>
            <h4 className='h4-feature'>{features.probability}</h4>
            <h4 className='h4-description'>Latitude</h4>
            <h4 className='h4-feature'>{features.lat}* N</h4>
            <h4 className='h4-description'>Longitude</h4>
            <h4 className='h4-feature'>{features.long}* W</h4>
            <h4 className='h4-description'>When to go</h4>
            <h4 className='h4-feature'>{features.month}</h4>
            </div>
            {tempFav == false ? <button className='fav-button' onClick={(e)=>setFav(e)}>+ ADD TO FAVORITES</button> : 
            <button className='unfav-button' onClick={(e)=>setFav(e)}>-REMOVE FROM FAVORITES</button>}
        </div>
    )
}