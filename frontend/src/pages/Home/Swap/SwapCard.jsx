import React from 'react';

const statusColors = {
  pending: 'bg-orange-100 text-orange-800',
  accepted: 'bg-green-100 text-green-800',
  rejected: 'bg-red-100 text-red-800'
};

const SwapCard = ({ swap, onStatusChange }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-4 mb-4 border-l-4 border-blue-500">
      <div className="flex justify-between items-start mb-2">
        <h3 className="font-bold text-lg text-blue-700">{swap.title}</h3>
        <span className={`text-xs px-2 py-1 rounded-full ${statusColors[swap.status]}`}>
          {swap.status}
        </span>
      </div>
      <p className="text-gray-600 mb-3">{swap.description}</p>
      
      <div className="grid grid-cols-2 gap-2 mb-3">
        <div>
          <p className="text-sm text-gray-500">From</p>
          <p className="font-medium">{swap.fromDate} at {swap.fromTime}</p>
        </div>
        <div>
          <p className="text-sm text-gray-500">To</p>
          <p className="font-medium">{swap.toDate} at {swap.toTime}</p>
        </div>
      </div>
      
      {swap.status === 'pending' && (
        <div className="flex space-x-2">
          <button 
            onClick={() => onStatusChange(swap.id, 'accepted')}
            className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600 text-sm"
          >
            Accept
          </button>
          <button 
            onClick={() => onStatusChange(swap.id, 'rejected')}
            className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 text-sm"
          >
            Reject
          </button>
        </div>
      )}
    </div>
  );
};

export default SwapCard;