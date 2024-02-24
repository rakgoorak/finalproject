import React from 'react';
import { Triangle } from 'react-loader-spinner'

export default function NotFound404() {
    return (
        <div className="centered">
            <Triangle
                visible={true}
                height="100"
                width="100"
                color="aqua"
                ariaLabel="triangle-loading"
                wrapperStyle={{}}
                wrapperClass=""
            />
        </div>
    );
}