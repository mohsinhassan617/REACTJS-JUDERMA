import React from 'react';
import { Alert } from 'react-bootstrap';

const PredictionResult = ({ prediction }) => {
  if (!prediction) return null;

  return (
    <Alert variant="success" className="mt-3">
      <h4>Prediction Result</h4>
      <p>Predicted Class: {prediction.predicted_class}</p>
      <p>Probability: {prediction.probability.toFixed(2)}%</p>
    </Alert>
  );
};

export default PredictionResult;