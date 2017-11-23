import React from 'react';
import Loading from "../../universal/Loading";

const ChooseCurrencySelect = ({currencies, currentKey, onChange})=> {
    if (!currentKey) {
        return <Loading />;
    }
    return (
        <select
            className="form-control"
            id="quoteCurrenciesList"
            value={currentKey}
            onChange={onChange}
        >
            {currencies.map(currency => {
                return (
                    <option
                        key={currency}
                        value={currency}
                    >
                        {currency.toUpperCase()}
                    </option>
                )
            })}
        </select>
    )
};

export default ChooseCurrencySelect;