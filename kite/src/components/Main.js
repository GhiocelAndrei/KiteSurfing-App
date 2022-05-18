import React from 'react';
import axios from 'axios';
import Map from './Map';
import Tabel from './Tabel';
export default function Main({changeAddSpot,addSpot,favourites,name})
{
   const [data,setData] = React.useState([])
   const [dataCopy,setDataCopy] = React.useState([])
   const [filterApplied,setFilterApplied] = React.useState(false)
    React.useEffect(()=>{
        const api = axios.create({
            baseURL: `https://627e1ec9b75a25d3f3b21451.mockapi.io`
        })
        const fetch = async () =>{
            try{
                const response = await api.get('/spot')
                setData(response.data)
                setDataCopy(response.data)
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
        fetch();
    },[])
    async function reloadData()
    {
        const api = axios.create({
            baseURL: `https://627e1ec9b75a25d3f3b21451.mockapi.io`
        })
        
        try {
            const response = await api.get('/spot');
            setData(response.data)
            setDataCopy(response.data)
          } catch (err) {
            console.log(`Error: ${err.message}`);
          }
        
    }
    function search(rows){
        return rows.filter(row => row.country.toLowerCase().indexOf(q) > -1  
        || row.country.toUpperCase().indexOf(q) > -1 
        ||  row.country.indexOf(q) > -1)
    }
    function filter(country,wind)
    {
        if(country=="")setData(prevData => prevData.filter(data => data.probability == wind))
        else if(wind=="")setData(prevData => prevData.filter(data => data.country.toLowerCase() == country.toLowerCase()))
        else setData(prevData => prevData.filter(data => data.country == country && data.probability==wind))
    }
    function removeFilter()
    {
        setData(dataCopy)
    }
    function changeFilterApplied()
    {
        setFilterApplied(prevState => !prevState)
    }
    const [q,setQ] = React.useState("");
    return(
        <div className="Main">
            <Map
            reloadData={reloadData}
            changeFilterApplied={changeFilterApplied} 
            removeFilter={removeFilter} 
            filterApplied={filterApplied} 
            filter={filter} 
            changeAddSpot={changeAddSpot} 
            addSpot={addSpot} 
            favourites={favourites} 
            data={data} 
            name={name}/>
            <div className="search-filt">
            <h2>Locations</h2>
            <input type="text" value={q} onChange={ (e) => setQ(e.target.value)} />
            </div>
            <Tabel setData={setData} dataCopy={dataCopy} data={search(data)}/>
        </div>
    )
}