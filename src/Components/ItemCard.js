import React, { useState } from 'react';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import EditIcon from '@mui/icons-material/Edit';
import { Button, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';

const ItemCard = ({item}) => {
    const [updateValue, setUpdateValue] = useState(item);
    const [isDisplay, setIsDisplay] = useState(false);

    const handleDelete = () => {
        const userResponse = window.confirm("Are you Sure?");
        if(userResponse){
            const response = JSON.parse(localStorage.getItem("incomeExpenseData"));
            const filteredItemList = response.filter(responseItem => responseItem.id!==item.id);
            localStorage.setItem("incomeExpenseData", JSON.stringify(filteredItemList));
    
            const totalIncome = parseInt(localStorage.getItem("totalIncome"));
            const totalExpense = parseInt(localStorage.getItem("totalExpense"));
    
            if(item.type==="Income"){
                localStorage.setItem("totalIncome", totalIncome - parseInt(item.amount));
            }
            else{
                localStorage.setItem("totalExpense", totalExpense - parseInt(item.amount));
            }
        }
    }

    const handleChange = (e) => {
        const values = {...updateValue};
        values[e.target.name] = e.target.value;
        setUpdateValue(values);
    }

    const handleBlur = (e) => {
        const values = {...updateValue};
        values[e.target.name] = e.target.value;
        setUpdateValue(values);
    }

    const handleEdit = () => {
        (isDisplay)?setIsDisplay(false):setIsDisplay(true);
    }

    const handleUpdateEdit = () => {
        alert("Update Successful");
        const response = JSON.parse(localStorage.getItem("incomeExpenseData"));
        const filteredItemList = response.filter(responseItem => responseItem.id!==updateValue.id);
        const oldValues = [...filteredItemList];
        oldValues.push(updateValue);
        localStorage.setItem("incomeExpenseData", JSON.stringify(oldValues));
    
        const totalIncome = parseInt(localStorage.getItem("totalIncome"));
        const totalExpense = parseInt(localStorage.getItem("totalExpense"));
    
        if(item.type==="Income"){
            localStorage.setItem("totalIncome", totalIncome + parseInt(item.amount));
        }
        else{
            localStorage.setItem("totalExpense", totalExpense + parseInt(item.amount));
        }
    }

    return (
        <div style={{"width": "720px", "height": "auto", "border": "1px solid gray", "borderRadius": "5px", "marginBottom": "10px", "lineHeight": "1"}}>
            <div style={{"paddingLeft": "20px", "width": "690px"}}>
                {
                    (!isDisplay)?
                        <p style={{"fontWeight": "bold"}}>Description: <span style={{"fontWeight": "400"}}>{item.description}</span></p>:
                        <TextField
                            id="outlined-multiline-static"
                            multiline
                            rows={2}
                            fullWidth
                            name="description"
                            onChange={handleChange}
                            value={updateValue.description}
                            required
                            style={{"marginBottom": "20px", "marginTop": "5px"}}
                        />
                }
                {
                    (!isDisplay) &&
                    <button onClick={handleDelete} style={{"backgroundColor": "#fff", "border": "none", "cursor": "pointer"}}><DeleteOutlineIcon /></button>
                }
                {
                    (!isDisplay) &&
                    <button onClick={handleEdit} style={{"backgroundColor": "#fff", "border": "none", "cursor": "pointer"}}><EditIcon /></button>
                }
            </div>
            <div style={{"paddingLeft": "20px", "display": "flex", "flexDirection": "row", "alignItems": "center", "justifyContent": "space-between", "width": "690px"}}>
                <div>
                    {
                        (!isDisplay)?
                        <p style={{"fontWeight": "bold"}}>Category: <span style={{"fontWeight": "400"}}>{item.category}</span></p>:
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">Category</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                name="category"
                                label="Category"
                                onBlur={handleBlur}
                                required
                                style={{"marginBottom": "20px"}}
                            >
                                <MenuItem value="Food">Food</MenuItem>
                                <MenuItem value="Travel">Travel</MenuItem>
                                <MenuItem value="Salary">Salary</MenuItem>
                                <MenuItem value="Utilities">Utilities</MenuItem>
                                <MenuItem value="Personal">Personal</MenuItem>
                                <MenuItem value="Medical">Medical</MenuItem>
                            </Select>
                        </FormControl>
                    }
                    
                </div>
                {
                    (!isDisplay)?
                    <div>
                        {
                            (item.type==="Income")?<p style={{"color": "green"}}>+ ৳ {item.amount}</p>:<p style={{"color": "red"}}>- ৳ {item.amount}</p>
                        }
                    </div>
                    :
                    <div>
                        <TextField onChange={handleChange} name="amount" id="standard-basic" label="Amount" variant="standard" fullWidth type="number" value={updateValue.amount} required/>
                    </div>
                }

                {isDisplay && <Button onClick={handleUpdateEdit} variant="contained">Update Edit</Button>}
            </div>
        </div>
    );
};

export default ItemCard;