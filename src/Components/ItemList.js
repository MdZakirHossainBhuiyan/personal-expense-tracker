import React, { useState } from 'react';
import ItemCard from './ItemCard';
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';

const ItemList = () => {
    let pageNumber = parseInt(localStorage.getItem("pageNumber"));
    if(pageNumber!==pageNumber){
        pageNumber = 1;
    }

    //get and check order type
    let orderType = localStorage.getItem("orderType");
    if(orderType===null) orderType = "Descending";

    const searchKey = localStorage.getItem("searchValue");
    const minValue = parseInt(localStorage.getItem("minValue"));
    const maxValue = parseInt(localStorage.getItem("maxValue"));
    const type = localStorage.getItem("type");
    const category = localStorage.getItem("category");

    let response;
    let getDataDescending;

    if((searchKey===null || searchKey==="All") && minValue!==minValue && maxValue!==maxValue && type===null && category===null){
        const getData = JSON.parse(localStorage.getItem("incomeExpenseData"));
        const getDataDes = JSON.parse(localStorage.getItem("incomeExpenseDataDes"));
        const startingIndexValue = (pageNumber*5)-5;
        const lastIndexValue = pageNumber*5;
        (getData!==null) && (response = getData.slice(startingIndexValue, lastIndexValue));
        (getDataDes!==null) && (getDataDescending = getDataDes.slice(startingIndexValue, lastIndexValue));
        localStorage.setItem("pageNumber", pageNumber);
    }
    else if((searchKey!==null || searchKey==="All") && minValue!==minValue && maxValue!==maxValue && type===null && category===null){
        const res = JSON.parse(localStorage.getItem("incomeExpenseData"));
        const resDes = JSON.parse(localStorage.getItem("incomeExpenseDataDes"));
        const getData = res.filter(item => item.type===searchKey);
        const getDataDes = resDes.filter(item => item.type===searchKey);
        const startingIndexValue = (pageNumber*5)-5;
        const lastIndexValue = pageNumber*5;
        response = getData.slice(startingIndexValue, lastIndexValue);
        getDataDescending = getDataDes.slice(startingIndexValue, lastIndexValue);
        localStorage.setItem("pageNumber", pageNumber);
    }
    else if(searchKey===null && minValue>0 && maxValue===maxValue && type===null && category===null){
        const res = JSON.parse(localStorage.getItem("incomeExpenseData"))
        const resDes = JSON.parse(localStorage.getItem("incomeExpenseDataDes"));
        const getData = res.filter(item => (item.amount>=minValue && item.amount<=maxValue));
        const getDataDes = resDes.filter(item => (item.amount>=minValue && item.amount<=maxValue));
        const startingIndexValue = (pageNumber*5)-5;
        const lastIndexValue = pageNumber*5;
        response = getData.slice(startingIndexValue, lastIndexValue);
        getDataDescending = getDataDes.slice(startingIndexValue, lastIndexValue);
        localStorage.setItem("pageNumber", pageNumber);
    }
    else if(searchKey===null && minValue!==minValue && maxValue!==maxValue && type!==null && category===null){
        const res = JSON.parse(localStorage.getItem("incomeExpenseData"));
        const resDes = JSON.parse(localStorage.getItem("incomeExpenseDataDes"));
        const getData = res.filter(item => item.type===type);
        const getDataDes = resDes.filter(item => item.type===type);
        const startingIndexValue = (pageNumber*5)-5;
        const lastIndexValue = pageNumber*5;
        response = getData.slice(startingIndexValue, lastIndexValue);
        getDataDescending = getDataDes.slice(startingIndexValue, lastIndexValue);
        localStorage.setItem("pageNumber", pageNumber);
    }
    else if(searchKey===null && minValue!==minValue && maxValue!==maxValue && type===null && category!==null){
        const res = JSON.parse(localStorage.getItem("incomeExpenseData"));
        const resDes = JSON.parse(localStorage.getItem("incomeExpenseDataDes"));
        const getData = res.filter(item => item.category===category);
        const getDataDes = resDes.filter(item => item.category===category);
        const startingIndexValue = (pageNumber*5)-5;
        const lastIndexValue = pageNumber*5;
        response = getData.slice(startingIndexValue, lastIndexValue);
        getDataDescending = getDataDes.slice(startingIndexValue, lastIndexValue);
        localStorage.setItem("pageNumber", pageNumber);
    }

    const handleLeftShift = () => {
        localStorage.setItem("pageNumber", pageNumber-1);
        window.location.reload(true);
    }

    const handleRightShift = () => {
        localStorage.setItem("pageNumber", pageNumber+1);
        window.location.reload(true);
    }

    return (
        <div style={{"width": "765px", "height": "450px", "position": "fixed", "marginTop": "200px", "marginLeft": "420px", "overflow": "scroll"}}>
            {
                (response!==null && orderType==="Ascending") && response?.map(item => <ItemCard key={item.id} item={item} />)
            }
            {
                (response!==null && orderType==="Descending") && getDataDescending?.map(item => <ItemCard key={item.id} item={item} />)
            }

            <div style={{"width": "400px", "height": "30px", "border": "1px solid gray", "borderRadius": "5px", "marginLeft": "130px", "display": "flex", "flexDirection": "row", "alignItems": "center", "justifyContent": "center"}}>
                {
                    (pageNumber>1) && 
                    <button onClick={handleLeftShift} style={{"border": "none", "backgroundColor": "#fff", "cursor": "pointer"}}><ArrowLeftIcon /></button>
                }
                <p>Page {(pageNumber>0)?pageNumber:1}</p>
                <button onClick={handleRightShift} style={{"border": "none", "backgroundColor": "#fff", "cursor": "pointer"}}><ArrowRightIcon /></button>
            </div>
        </div>
    );
};

export default ItemList;