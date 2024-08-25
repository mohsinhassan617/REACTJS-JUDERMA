import React, { useEffect, useState, useRef } from 'react';
import { FaTrashAlt } from 'react-icons/fa';
import { Button, Modal } from 'react-bootstrap';

const History = () => {
  const [history, setHistory] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [clearedHistory, setClearedHistory] = useState(null);
  const [showUndo, setShowUndo] = useState(false);
  const undoTimeoutRef = useRef(null);

  // Load history from localStorage when the component mounts
  useEffect(() => {
    const storedHistory = JSON.parse(localStorage.getItem('history')) || [];
    setHistory(storedHistory);
  }, []);

  // Delete a single entry from history
  const handleDelete = (index) => {
    const updatedHistory = history.filter((_, i) => i !== index);
    setHistory(updatedHistory);
    localStorage.setItem('history', JSON.stringify(updatedHistory));
  };

  // Show modal to confirm clearing all history
  const handleClearAll = () => {
    setShowModal(true);
  };

  // Confirm and clear all history
  const confirmClearAll = () => {
    setShowModal(false);
    setClearedHistory([...history]); // Backup history in case of undo
    localStorage.removeItem('history');
    setHistory([]);
    setShowUndo(true);

    // Start a timer to hide the undo option after 10 seconds
    undoTimeoutRef.current = setTimeout(() => {
      setShowUndo(false);
      setClearedHistory(null);
    }, 10000);
  };

  // Undo the clear all action
  const handleUndo = () => {
    clearTimeout(undoTimeoutRef.current); // Clear the timeout if undo is clicked
    setHistory(clearedHistory);
    localStorage.setItem('history', JSON.stringify(clearedHistory));
    setShowUndo(false);
    setClearedHistory(null);
  };

  return (
    <div>
      <h2>History</h2>
      {history.length === 0 ? (
        <p>No history available.</p>
      ) : (
        <>
          {history.map((item, index) => (
            <div key={index} className="history-item">
              <img 
                src={item.imageUrl} 
                alt={`Prediction ${index}`} 
                className="history-image" 
                onError={(e) => e.target.src = 'fallback-image.png'} // Set fallback image on error
              />
              <div className="history-details">
                <div className="history-prediction">
                  <strong>Prediction:</strong> {item.predicted_class}
                </div>
                <div className="history-probability">
                  <strong>Probability:</strong> {item.probability}
                </div>
              </div>
              <FaTrashAlt onClick={() => handleDelete(index)} className="delete-icon" />
            </div>
          ))}
          <Button variant="danger" className="mt-3" onClick={handleClearAll}>
            Clear All
          </Button>
        </>
      )}

      {/* Modal for Clear All Confirmation */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Clear All</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to clear all history? This action cannot be undone.
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={confirmClearAll}>
            Clear All
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Undo Button */}
      {showUndo && (
        <div className="undo-container mt-3">
          <Button variant="warning" onClick={handleUndo}>
            Undo Clear All
          </Button>
        </div>
      )}
    </div>
  );
};

export default History;
