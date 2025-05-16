  import React, { useEffect, useState } from 'react';

  const SwapRequests = () => {
    const [requests, setRequests] = useState([]);

    useEffect(() => {
      const fetchRequests = async () => {
        const response = await fetch('/api/swap/pending');
        const data = await response.json();
        setRequests(data);
      };

      fetchRequests();
    }, []);

    const handleApprove = async (requestId) => {
      await fetch(`/api/swap/${requestId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: 'approved' }),
      });
      setRequests(requests.filter((r) => r._id !== requestId));
    };

    const handleReject = async (requestId) => {
      await fetch(`/api/swap/${requestId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: 'rejected' }),
      });
      setRequests(requests.filter((r) => r._id !== requestId));
    };

    return (
      <div>
        <h1>Pending Swap Requests</h1>
        <ul>
          {requests.map((request) => (
            <li key={request._id}>
              {request.bookName} by {request.bookAuthor} (Requested by {request.user.username})
              <button onClick={() => handleApprove(request._id)}>Approve</button>
              <button onClick={() => handleReject(request._id)}>Reject</button>
            </li>
          ))}
        </ul>
      </div>
    );
  };

  export default SwapRequests;
