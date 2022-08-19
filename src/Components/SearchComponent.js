import React, { useState } from 'react';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import { Box, Button, FormControl, FormControlLabel, FormLabel, InputLabel, MenuItem, Modal, Radio, RadioGroup, Select, TextField } from '@mui/material';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import SwapVertOutlinedIcon from '@mui/icons-material/SwapVertOutlined';
import { v4 as uuid } from 'uuid';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
};

const SearchComponent = () => {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [inputValue, setInputValue] = useState(null);

    const handleSearchBlur = (e) => {
        const searchValue = e.target.value;
        localStorage.setItem("searchValue", searchValue);
        localStorage.removeItem("minValue");
        localStorage.removeItem("maxValue");
        localStorage.removeItem("type");
        localStorage.removeItem("category");
        window.location.reload(true);
    }

    const handleChange = (e) => {
        updateInputValue(e);
    }

    const handleBlur = (e) => {
        updateInputValue(e);
    }

    const updateInputValue = (e) => {
        const newValue = { ...inputValue };
        newValue[e.target.name] = e.target.value;
        setInputValue(newValue);
    }

    const handleOrder = () => {
        let orderType = localStorage.getItem("orderType");
        (orderType==="Ascending")?localStorage.setItem("orderType", "Descending"):localStorage.setItem("orderType", "Ascending");
        window.location.reload(true);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const unique_id = uuid();
        const values = { ...inputValue };
        values['id'] = unique_id;
        const res = JSON.parse(localStorage.getItem("incomeExpenseData"));
        const resDes = JSON.parse(localStorage.getItem("incomeExpenseDataDes"));
        if(res===null){
            let incomeExpenseArray = [];
            let incomeExpenseArrayDes = [];
            incomeExpenseArray.push(values);
            incomeExpenseArrayDes.unshift(values);
            localStorage.setItem("incomeExpenseData", JSON.stringify(incomeExpenseArray));
            localStorage.setItem("incomeExpenseDataDes", JSON.stringify(incomeExpenseArrayDes));
            let totalIncome = 0;
            let totalExpense = 0;
            if(inputValue.type==="Income"){
                localStorage.setItem("totalIncome", totalIncome + parseInt(inputValue.amount));
            }
            else{
                localStorage.setItem("totalExpense", totalExpense + parseInt(inputValue.amount));
            }
        }
        else{
            let incomeExpenseArray = [...res];
            let incomeExpenseArrayDes = [...resDes];
            incomeExpenseArray.push(values);
            incomeExpenseArrayDes.unshift(values);
            localStorage.setItem("incomeExpenseData", JSON.stringify(incomeExpenseArray));
            localStorage.setItem("incomeExpenseDataDes", JSON.stringify(incomeExpenseArrayDes));
            const totalIncome = parseInt(localStorage.getItem("totalIncome"));
            const totalExpense = parseInt(localStorage.getItem("totalExpense"));

            if(inputValue.type==="Income"){
                if(totalIncome>0){
                    localStorage.setItem("totalIncome", totalIncome + parseInt(inputValue.amount));
                }
                else{
                    localStorage.setItem("totalIncome", parseInt(inputValue.amount));
                }
            }
            else{
                if(totalExpense>0){
                    localStorage.setItem("totalExpense", totalExpense + parseInt(inputValue.amount));
                }
                else{
                    localStorage.setItem("totalExpense", parseInt(inputValue.amount));
                }
            }
        }
    }

    return (
        <div style={{"width": "765px", "height": "50px", "position": "fixed", "marginTop": "120px", "marginLeft": "420px", "display": "flex", "flexDirection": "row", "alignItems": "center", "justifyContent": "space-between"}}>
            <div style={{"display": "flex", "flexDirection": "row", "alignItems": "center", "justifyContent": "center"}}>
                <TextField onBlur={handleSearchBlur} id="outlined-basic" variant="outlined" placeholder='by Income, Expense, All' />
                <button style={{"border": "none", "backgroundColor": "#fff", "marginLeft": "-35px", "marginRight": "5px"}}><SearchOutlinedIcon /></button>
                <button onClick={handleOrder}><SwapVertOutlinedIcon /></button>
            </div>
            <div>
                <button onClick={handleOpen} style={{"border": "none", "backgroundColor": "#fff", "width": "50px", 'height': "50px", "color": "blue", "cursor": "pointer"}}><AddCircleOutlineOutlinedIcon /></button>

                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={style}>
                        <h2 id="parent-modal-title">Add New Entry</h2>
                        <form onSubmit={handleSubmit}>
                            <div style={{"marginBottom": "20px"}}>
                                <TextField onChange={handleChange} name="title" id="standard-basic" label="Title" variant="standard" fullWidth type="text" required/>
                            </div>
                            <div style={{"marginBottom": "20px"}}>
                                <TextField
                                    id="outlined-multiline-static"
                                    label="Description"
                                    multiline
                                    rows={4}
                                    fullWidth
                                    name="description"
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div style={{"marginBottom": "20px"}}>
                                <FormControl fullWidth>
                                    <InputLabel id="demo-simple-select-label">Category</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        name="category"
                                        label="Category"
                                        onBlur={handleBlur}
                                        required
                                    >
                                        <MenuItem value="Food">Food</MenuItem>
                                        <MenuItem value="Travel">Travel</MenuItem>
                                        <MenuItem value="Salary">Salary</MenuItem>
                                        <MenuItem value="Utilities">Utilities</MenuItem>
                                        <MenuItem value="Personal">Personal</MenuItem>
                                        <MenuItem value="Medical">Medical</MenuItem>
                                    </Select>
                                </FormControl>
                            </div>
                            <div style={{"marginBottom": "20px"}}>
                                <FormControl style={{"display": "flex", "flexDirection": "row","alignItems": "center", "justifyContent": "center"}}>
                                    <FormLabel id="demo-row-radio-buttons-group-label"> Type <span style={{"paddingRight": "10px"}}></span> </FormLabel>
                                    <RadioGroup
                                        row
                                        aria-labelledby="demo-row-radio-buttons-group-label"
                                        defaultValue="Income"
                                        name="type"
                                        onBlur={handleBlur}
                                        required
                                    >
                                        <FormControlLabel value="Income" control={<Radio />} label="Income" />
                                        <FormControlLabel value="Expense" control={<Radio />} label="Expense" />
                                    </RadioGroup>
                                </FormControl>
                            </div>
                            <div style={{"marginBottom": "20px"}}>
                                <TextField onChange={handleChange} name="amount" id="standard-basic" label="Amount" variant="standard" fullWidth type="number" required/>
                            </div>

                            <Button style={{"marginRight": "10px"}} type="submit" variant="contained">Add</Button>
                            <Button onClick={handleClose} variant="outlined">Close</Button>
                        </form>
                    </Box>
                </Modal>
            </div>
        </div>
    );
};

export default SearchComponent;