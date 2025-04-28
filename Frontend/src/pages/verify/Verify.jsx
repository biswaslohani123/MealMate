import React, { useContext, useEffect, useState } from 'react'
import './Verify.css'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { StoreContext } from '../../context/StoreContext'
import axios from 'axios'
import confetti from 'canvas-confetti'

const Verify = () => {
    const [searchParams] = useSearchParams();
    const success = searchParams.get("success")
    const orderId = searchParams.get("orderId")
    const { url } = useContext(StoreContext)
    const navigate = useNavigate();
    const [status, setStatus] = useState("loading");

    const launchConfetti = () => {
        confetti({
            particleCount: 150,
            spread: 80,
            origin: { y: 0.6 },
        });
    }

    const verifyPayment = async () => {
        try {
            const response = await axios.post(url + "/api/order/verify", { success, orderId });
            if (response.data.success) {
                setStatus("success");
                launchConfetti();
                setTimeout(() => {
                    navigate('/myorders');
                }, 2000);
            } else {
                setStatus("failed");
                setTimeout(() => {
                    navigate('/');
                }, 2000);
            }
        } catch (err) {
            setStatus("error");
            setTimeout(() => {
                navigate('/');
            }, 3000);
        }
    }

    useEffect(() => {
        verifyPayment();
    }, [])

    return (
        <div className="verify">
            {status === "loading" && <div className="spinner"></div>}

            {status === "success" && (
                <div className="party-box animate">
                    <h1>🎉 Congratulations!</h1>
                    <h2>Payment Successful</h2>
                    <p>Your Order has be Paid Successfully 🚀</p>
                </div>
            )}

            {status === "failed" && (
                <div className="party-box failed animate">
                    <h2> Payment Failed</h2>
                    <p>Redirecting to homepage</p>
                </div>
            )}

            {status === "error" && (
                <div className="party-box failed animate">
                    <h2>Something Went Wrong</h2>
                    <p>Redirecting to homepage</p>
                </div>
            )}
        </div>
    )
}

export default Verify
