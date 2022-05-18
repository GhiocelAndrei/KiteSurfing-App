import React from 'react';

require("es6-promise").polyfill();
require("isomorphic-fetch")
export default function Tabel({setData,dataCopy,data})
{
    const [nameFilt,setNameFilt] = React.useState(false)
    function changeNameFilt()
    {
        setNameFilt( prevState => !prevState)
    }
    const [countryFilt,setCountryFilt] = React.useState(false)
    function changeCountryFilt()
    {
        setCountryFilt( prevState => !prevState)
    }
    const [latFilt,setLatFilt] = React.useState(false)
    function changeLatFilt()
    {
        setLatFilt( prevState => !prevState)
    }
    const [longFilt,setLongFilt] = React.useState(false)
    function changeLongFilt()
    {
        setLongFilt( prevState => !prevState)
    }
    const [windFilt,setWindFilt] = React.useState(false)
    function changeWindFilt()
    {
        setWindFilt( prevState => !prevState)
    }
    const [whenFilt,setWhenFilt] = React.useState(false)
    function changeWhenFilt()
    {
        setWhenFilt( prevState => !prevState)
    }
    const columns = ["Name","Country","Latitude","Longitude","Wind Prob.","When to go"]
    const rows = data.map(dat => ({
        name : dat.name,
        country : dat.country,
        lat : dat.lat,
        long : dat.long,
        wind : dat.probability,
        month : dat.month
    })
    );
    const [q,setQ] = React.useState("");
    function sortTabel(after)
    { 
            if(after.target.innerHTML=="Name")
            {
                if(nameFilt==false)
                {
                const tempData = data.sort((a,b) => { return a.name.localeCompare(b.name)})     
                setData(tempData)
                changeNameFilt()
                }
                else
                {
                    setData(dataCopy)
                    changeNameFilt()
                }
            }
            if(after.target.innerHTML=="Country")
            {
                if(countryFilt==false)
                {
                const tempData = data.sort((a,b) => { return a.country.localeCompare(b.country)})     
                setData(tempData)
                changeCountryFilt()
                }
                else
                {
                    setData(dataCopy)
                    changeCountryFilt()
                }
            }
            if(after.target.innerHTML=="Latitude")
            {
                if(latFilt==false)
                {
                const tempData = data.sort((a,b) => { return a.lat - b.lat})     
                setData(tempData)
                changeLatFilt()
                }
                else
                {
                    setData(dataCopy)
                    changeLatFilt()
                }
            }
            if(after.target.innerHTML=="Longitude")
            {
                if(longFilt==false)
                {
                const tempData = data.sort((a,b) => { return a.long - b.long})     
                setData(tempData)
                changeLongFilt()
                }
                else
                {
                    setData(dataCopy)
                    changeLongFilt()
                }
            }
            if(after.target.innerHTML=="Wind Prob.")
            {
                if(windFilt==false)
                {
                const tempData = data.sort((a,b) => { return a.probability - b.probability})     
                setData(tempData)
                changeWindFilt()
                }
                else
                {
                    setData(dataCopy)
                    changeWindFilt()
                }
            }
            if(after.target.innerHTML=="When to go")
            {
                if(whenFilt==false)
                {
                const tempData = data.sort((a,b) => { return (new Date(a.month+"1, 2012").getMonth()) -  (new Date(b.month+"1, 2012").getMonth())})     
                setData(tempData)
                changeWhenFilt()
                }
                else
                {
                    setData(dataCopy)
                    changeWhenFilt()
                }
            }
    }
    return(
    <div>
        
        <div className="table-style">
        <table cellPadding={0} cellSpacing={1}>
            <thead>
                <tr>{columns.map((heading) => <th key={heading} onClick={(heading)=>sortTabel(heading)}>{heading}</th>)}</tr>
            </thead>
            <tbody>
               {rows.map(
                   row => <tr>
                       <td>{row.name}</td>
                       <td>{row.country}</td>
                       <td>{row.lat}</td>
                       <td>{row.long}</td>
                       <td>{row.wind}</td>
                       <td>{row.month}</td>
                       </tr>
               )}
            </tbody>
        </table>
        </div>
    </div>
    )
}