import React from 'react';

const DisplayErrorMessage = ({errCode, quoterCurrencyComponent}) => {
    return (
        <div className="d-flex align-items-center">
            {errCode === "tooMuch" &&
                <div className="quoter-text">is more than can be processed in one transaction for</div>}
            {errCode === "tooLittle" &&
                <div className="quoter-text">is less than the min threshold required for</div>}
            {errCode === "notEnoughAvailable" &&
                <div className="quoter-text">is more than the max required for</div>}

            <div className="quoter-currency">
                {quoterCurrencyComponent}
            </div>
        </div>
    )
};

export default DisplayErrorMessage;