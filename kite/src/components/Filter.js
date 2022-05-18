import React from 'react';
export default function Filter(props)
{
    const [opened,setOpened] = React.useState(false)
    const [filtru,setFiltru] = React.useState({country:"",wind:""})
    function changeOpened()
    {
        setOpened(prevState => !prevState)
        setFiltru({country:"",wind:""})
    }
    function stopPropagate(e)
    {
        if (!e) var e = window.event
        e.cancelBubble = true;
        if (e.stopPropagation) e.stopPropagation();
    }
    function handleChange(event)
    {
        setFiltru( prevFiltru => ({
            ...prevFiltru,
            [event.target.name] : event.target.value
        }))
    }
    function applyFilter(e)
    {
        if (!e) var e = window.event
        e.cancelBubble = true;
        if (e.stopPropagation) e.stopPropagation();
        changeOpened()
        setFiltru({country:"",wind:""})
        props.changeFilterApplied();
        props.filter(filtru.country,filtru.wind)
    }
    function removeFilter()
    {
        props.changeFilterApplied();
        props.removeFilter()
    }
    if(opened==false)
    return(
        <div className="filter-closed" onClick={changeOpened}>
             <img src="https://cdn-icons.flaticon.com/png/128/2516/premium/2516722.png?token=exp=1652817675~hmac=e3b181bc009a2ac0e711c3e5ecb85679"
              alt="" className="filter-img"/>
             <h3 className='h3-filter'>FILTERS</h3>
        </div>
    )
    else
    {
    if(props.filterApplied==false)
    return(
        <div className="filter-opened" onClick={changeOpened}>
             <img src="https://cdn-icons.flaticon.com/png/128/3024/premium/3024525.png?token=exp=1652819147~hmac=2ab8aed92215b3c49adf6392ce26f716"
              alt="" className="filter-opened-img"/>
             <input className="filter-input-first" placeholder="Country" type="text" onClick={(e)=>stopPropagate(e)}
             name="country" value={filtru.country} onChange={handleChange}/>
             <input className="filter-input-second" placeholder="Wind Probability" type="text" onClick={(e)=>stopPropagate(e)}
             name="wind" value={filtru.wind} onChange={handleChange}/>
             <button className='filter-button' onClick={(e)=>applyFilter(e)}>APPLY FILTER</button>
        </div>
    )
    else return(
        <div className='filter-remove' onClick={changeOpened}>
            <button className='remove-filter-button' onClick={removeFilter}>REMOVE FILTER</button>
        </div>
    )
    }
}