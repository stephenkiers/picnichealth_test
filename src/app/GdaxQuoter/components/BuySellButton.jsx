import React from 'react';

const BuySellButton = ({action, onClick}) => (
    <button
        className={`btn btn-${action === "buy" ? "success" : "danger"}`}
        onClick={onClick}
    >
        {action === "buy" ? "Buying" : "Selling"}
    </button>
);

export default BuySellButton;