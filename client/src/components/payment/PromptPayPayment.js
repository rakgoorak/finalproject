import React, { useState } from 'react';
import axios from 'axios';

function PromptPayPayment() {
    const [promptPayNumber, setPromptPayNumber] = useState('');
    const [amount, setAmount] = useState('');
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const [response, setResponse] = useState(null);

    const handlePayment = async () => {
        setLoading(true);
        try {
            const response = await axios.post('YOUR_PROMPTPAY_API_ENDPOINT', {
                promptPayNumber,
                amount,
                message
            });
            setResponse(response.data);
        } catch (error) {
            console.error('Error making payment:', error);
            setResponse(null);
        }
        setLoading(false);
    };

    return (
        <div>
            <input type="text" placeholder="PromptPay Number" value={promptPayNumber} onChange={e => setPromptPayNumber(e.target.value)} />
            <input type="number" placeholder="Amount" value={amount} onChange={e => setAmount(e.target.value)} />
            <input type="text" placeholder="Message" value={message} onChange={e => setMessage(e.target.value)} />
            <button onClick={handlePayment} disabled={loading}>Make Payment</button>
            {loading && <p>Loading...</p>}
            {response && (
                <div>
                    <p>Payment Status: {response.status}</p>
                    <p>Transaction ID: {response.transactionId}</p>
                </div>
            )}
        </div>
    );
}

export default PromptPayPayment;
