import React from 'react';

const DisplayErrorMessage = ({action, errCode, quoterCurrencyComponent}) => {
    return (
        <div className="d-flex align-items-center">

            {errCode === "tooMuch" && (
                <div className="quoter-text">
                    is more than can be {action === "buy" ? "bought" : "sold"} in one transaction for
                </div>
            )}

            {errCode === "tooLittle" &&
                <div className="quoter-text">is not enough to {action} any</div>}

            {errCode === "notEnoughAvailable" &&
                <div className="quoter-text">is more than this calculator has data to process for </div>}

            <div className="quoter-currency">
                {quoterCurrencyComponent}
            </div>
        </div>
    )
};

export default DisplayErrorMessage;