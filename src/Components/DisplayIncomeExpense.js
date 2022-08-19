import React from 'react';

const DisplayIncomeExpense = () => {
    const totalIncome = localStorage.getItem("totalIncome");
    const totalExpense = localStorage.getItem("totalExpense");
    return (
        <section style={{"width": "100%", "height": "80px", "border": "2px solid black", "position": "fixed", "display": "flex", "flexDirection": "column", "justifyContent": "center", "alignItems": "center"}}>
            <div style={{"marginTop": "-30px", "position": "fixed"}}>
                <h1 style={{"textAlign": "center", "fontSize": "25px"}}>Personal Expense Tracker</h1>
            </div>
            <div style={{"width": "1000px", "height": "40px", "display": "flex", "border": "2px solid black", "borderRadius": "10px", "alignItems": "center", "justifyContent": "center", "fontSize": "22px", "backgroundColor": "#fff", "marginTop": "80px", "position": "fixed"}}>
                <p style={{"color": "green", "marginRight": "300px"}}>Income: ৳ {totalIncome}</p>
                <p style={{"color": "red"}}>Expense: ৳ {totalExpense}</p>
            </div>
        </section>
    );
};

export default DisplayIncomeExpense;