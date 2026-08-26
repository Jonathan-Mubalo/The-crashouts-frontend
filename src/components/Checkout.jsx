import React, { useState } from "react";
import PaystackPop from "@paystack/inline-js";
import axios from "axios";
import './Checkout.css'

const Checkout = () => {
  const publicKey = "pk_test_2c7fa0027b2eb549818e537b4750b0258a2d7bd3"; // Paystack Public Key, do not touch
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [amount, setAmount] = useState(50000); 

  const handlePayment = (e) => {
    e.preventDefault();
    
    if (!email || !name) {
      alert("Please fill in all fields.");
      return;
    }

    const paystack = new PaystackPop();
    
    paystack.newTransaction({
      key: publicKey,
      email: email,
      amount: amount,
      metadata: {
        custom_fields: [{ display_name: "Customer Name", variable_name: "customer_name", value: name }]
      },
      onSuccess: (transaction) => {
        // Verify transaction on your Node.js backend
        axios.get(`http://localhost:5173/api/paystack/verify/${transaction.reference}`)
          .then((response) => {
            alert(`Payment successful! Reference: ${response.data.data.reference}`);
          })
          .catch((error) => {
            console.error("Verification error:", error);
            alert("Payment was successful, but verification failed.");
          });
      },
      onCancel: () => {
        alert("Transaction was cancelled.");
      }
    });
  };

  return (
    <div className="containerCheck">
      <h2>Confirm Checkout</h2>
      <form onSubmit={handlePayment}>
        <div>
          <label>Name:</label>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
        </div>
        <div>
          <label>Email Address:</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <button type="submit"> Pay Now</button>
      </form>
    </div>
  );
};

export default Checkout;