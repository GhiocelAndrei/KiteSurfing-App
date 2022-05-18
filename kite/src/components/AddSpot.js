import React from 'react';
import axios from 'axios';
export default function AddSpot({reloadData,features,changeAddSpot})
{
    const [spot,setSpot] = React.useState({name:"",country:"",lat:"",long:"",probability:""})
    function handleChange(event)
    {
        setSpot( prevSpot => ({
            ...prevSpot,
            [event.target.name] : event.target.value
        }))
    }
    async function postSpot()
    {
        changeAddSpot()
        const api = axios.create({
            baseURL: `https://627e1ec9b75a25d3f3b21451.mockapi.io`
        })
        try {
            const response = await api.post('/spot',spot);
          } catch (err) {
            console.log(`Error: ${err.message}`);
          }
        reloadData()
    }
    return(
        <div className="add-spot">
             <input className="spot-input" placeholder="Name" type="text" name="name" value={spot.name} onChange={handleChange}/>
             <input className="spot-input" placeholder="Country" type="text" name="country" value={spot.country} onChange={handleChange}/>
             <input className="spot-input" placeholder="Latitude" type="text" name="lat" value={spot.lat} onChange={handleChange}/>
             <input className="spot-input" placeholder="Longitude" type="text" name="long" value={spot.long} onChange={handleChange}/>
             <input className="spot-input" placeholder="Wind Probability" type="text" name="probability" value={spot.probability} onChange={handleChange}/>
             <button className='spot-button' onClick={postSpot}>CONFIRM</button>
        </div>
    )
}