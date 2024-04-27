import React, { useState } from "react";
import styles from "./Verification.module.css";

const Verification = () => {
    const [inputs, setInputs] = useState(Array.from({ length: 6 }, () => ""));
    const [buttonDisabled, setButtonDisabled] = useState(true);

    const handleInputChange = (index, value) => {
        const newInputs = [...inputs];
        newInputs[index] = value;
        setInputs(newInputs);

        const filledInputs = newInputs.filter((input) => input !== "").length;
        setButtonDisabled(filledInputs !== 6);
    };

    const handleResendCode = () => {
        // Implement resend functionality
    };

    const handleVerifyClick = () => {
        const code = inputs.join(""); 
        fetch("your-backend-url", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ code }),
        })
        .then((response) => {
            // Handle response
            // If successful, reset inputs to empty strings
            setInputs(Array.from({ length: 6 }, () => ""));
            setButtonDisabled(true);
        })
        .catch((error) => {
            console.error("Error sending verification code:", error);
        });
    };

    return (
        <div className={styles.Container}>
            <head>
                <title>Account Verification</title>
            </head>
            <div className={styles.optCard}>
                <h1>Account Verification</h1>
                <p>Code has been sent to your E-Mail</p>
                <div className={styles.optCard_inputs}>
                    {inputs.map((value, index) => (
                        <input
                            key={index}
                            type="text"
                            maxLength={1}
                            value={value}
                            onChange={(e) => handleInputChange(index, e.target.value)}
                        />
                    ))}
                </div>
                <p>
                    Didn't get the Code! <a href="#" onClick={handleResendCode}>Resend</a>
                </p>
                <button disabled={buttonDisabled} className={styles.button} onClick={handleVerifyClick}>Verify</button>
            </div>
        </div>
    );
};

export default Verification;
