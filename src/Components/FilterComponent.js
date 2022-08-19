import { Button } from '@mui/material';
import React, { useState } from 'react';

const FilterComponent = () => {

    const handleMinValue = (e) => {
        localStorage.setItem("minValue", e.target.value);
    }
    const handleMaxValue = (e) => {
        localStorage.setItem("maxValue", e.target.value);
        localStorage.removeItem("searchValue");
        localStorage.removeItem("type");
        localStorage.removeItem("category");
        window.location.reload(true);
    }
    const handleType = (e) => {
        localStorage.setItem("type", e.target.value);
        localStorage.removeItem("searchValue");
        localStorage.removeItem("minValue");
        localStorage.removeItem("maxValue");
        localStorage.removeItem("category");
        window.location.reload(true);
    }
    const handleCategory = (e) => {
        localStorage.setItem("category", e.target.value);
        localStorage.removeItem("searchValue");
        localStorage.removeItem("minValue");
        localStorage.removeItem("maxValue");
        localStorage.removeItem("type");
        window.location.reload(true);
    }

    return (
        <section style={{"width": "200px", "height": "75vh","position": "fixed", "marginTop": "120px", "marginLeft": "185px", "border": "2px solid black", "borderRadius": "10px", "padding": "5px 10px", "lineHeight": "2px"}}>
            <h4>Filter</h4>
            <h5>Range</h5>
            <div style={{"display": "flex", "flexDirection": "column", "alignItems": "center", "justifyContent": "center", "width": "180px", "height": "70px", "marginLeft": "10px", "lineHeight": "2px", "border": "1px solid black"}}>
                <div style={{"width": "170px", "display": "flex", "flexDirection": "row", "alignItems": "center", "justifyContent": "center"}}>
                    <label>min :</label>
                    <input onBlur={handleMinValue} width="1" type="number" />
                </div>
                <div style={{"width": "170px", "display": "flex", "flexDirection": "row", "alignItems": "center", "justifyContent": "center"}}>
                    <label>max :</label>
                    <input onBlur={handleMaxValue} width="1" type="number" />
                </div>
            </div>

            <h5>Type</h5>
            <div style={{"display": "flex", "flexDirection": "column", "alignItems": "center", "justifyContent": "center", "width": "180px", "height": "70px", "marginLeft": "10px", "lineHeight": "2px", "border": "1px solid black"}}>

                <div style={{"width": "170px", "display": "flex", "flexDirection": "row", "alignItems": "center"}}>
                    <input onBlur={handleType} type="radio" id="income" name="type" value="Income"/>  
                    <label for="income">Income</label>
                </div>
                <div style={{"width": "170px", "display": "flex", "flexDirection": "row", "alignItems": "center"}}>
                    <input onBlur={handleType} type="radio" id="expense" name="type" value="Expense"/>  
                    <label for="expense">Expense</label>
                </div>
                
            </div>

            <h5>Category</h5>
            <div style={{"display": "flex", "flexDirection": "column", "width": "180px", "height": "auto", "marginLeft": "10px", "lineHeight": "2px", "border": "1px solid black"}}>

                <div style={{"width": "170px", "display": "flex", "flexDirection": "row", "alignItems": "center"}}>
                    <input onBlur={handleCategory} type="radio" id="food" name="category" value="Food"/>  
                    <label for="cricket">Food</label>
                </div>
                <div style={{"width": "170px", "display": "flex", "flexDirection": "row", "alignItems": "center"}}>
                    <input onBlur={handleCategory} type="radio" id="travel" name="category" value="Travel"/>  
                    <label for="cricket">Travel</label>
                </div>
                <div style={{"width": "170px", "display": "flex", "flexDirection": "row", "alignItems": "center"}}>
                    <input onBlur={handleCategory} type="radio" id="salary" name="category" value="Salary"/>  
                    <label for="cricket">Salary</label>
                </div>
                <div style={{"width": "170px", "display": "flex", "flexDirection": "row", "alignItems": "center"}}>
                    <input onBlur={handleCategory} type="radio" id="utilities" name="category" value="Utilities"/>  
                    <label for="cricket">Utilities</label>
                </div>
                <div style={{"width": "170px", "display": "flex", "flexDirection": "row", "alignItems": "center"}}>
                    <input onBlur={handleCategory} type="radio" id="medical" name="category" value="Medical"/>  
                    <label for="cricket">Medical</label>
                </div>
                <div style={{"width": "170px", "display": "flex", "flexDirection": "row", "alignItems": "center"}}>
                    <input onBlur={handleCategory} type="radio" id="personal" name="category" value="Personal"/>  
                    <label for="cricket">Personal</label>
                </div>
            </div>
        </section>
    );
};

export default FilterComponent;