import React, { useState, useRef } from 'react';
import axios from 'axios';
import { Form, Button, Container, Row, Col, Alert } from 'react-bootstrap';
import '../styles.css';

const ImageUpload = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showCamera, setShowCamera] = useState(false);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);

    // Create a preview URL for the selected image
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setPreviewUrl(null);
    }
  };

  const handleCapture = () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    context.drawImage(video, 0, 0, canvas.width, canvas.height);

    canvas.toBlob(blob => {
      if (blob) {
        const file = new File([blob], 'captured-image.jpg', { type: 'image/jpeg' });
        setSelectedFile(file);
        setPreviewUrl(URL.createObjectURL(file));
        setShowCamera(false);
      } else {
        console.error('Failed to capture image.');
        setError('Failed to capture image.');
      }
    }, 'image/jpeg');
  };

  const handleFileUpload = async () => {
    if (!selectedFile) {
      setError('Please select or capture a file first.');
      return;
    }

    setLoading(true);
    setError(null);
    setPrediction(null);

    const formData = new FormData();
    formData.append('file', selectedFile);

    axios.post('http://127.0.0.1:5000/predict', formData)
      .then(response => {
        const { predicted_class, probability } = response.data;

        if (predicted_class && typeof probability === 'number') {
          const formattedPrediction = {
            predicted_class: predicted_class,
            probability: (probability * 100).toFixed(2) + '%',
            imageUrl: previewUrl // Store the image URL
          };
          setPrediction(formattedPrediction);

          // Save to local storage
          const history = JSON.parse(localStorage.getItem('history')) || [];
          history.push(formattedPrediction);
          localStorage.setItem('history', JSON.stringify(history));
        } else {
          setError('Unexpected response format.');
        }
      })
      .catch(error => {
        console.error('There was an error uploading the file!', error);
        setError('There was an error uploading the file.');
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleCameraToggle = () => {
    setShowCamera(!showCamera);

    if (!showCamera) {
      navigator.mediaDevices.getUserMedia({ video: true })
        .then(stream => {
          const video = videoRef.current;
          video.srcObject = stream;
          video.play();
        })
        .catch(err => {
          console.error('Error accessing camera: ', err);
        });
    } else {
      const video = videoRef.current;
      if (video.srcObject) {
        video.srcObject.getTracks().forEach(track => track.stop());
      }
    }
  };

  return (
    <Container className="mt-5">
      <Row>
        <Col md={{ span: 6, offset: 3 }}>
          <h2 className="text-center">Upload an Image for Diagnosis</h2>
          <Form>
            <Form.Group controlId="formFile" className="mb-3">
              <Form.Label>Choose Image</Form.Label>
              <Form.Control type="file" onChange={handleFileChange} />
            </Form.Group>
            <div className="d-flex justify-content-between mb-3">
              <Button variant="secondary" onClick={handleCameraToggle}>
                {showCamera ? 'Cancel' : 'Capture Live Image'}
              </Button>
              <Button variant="primary" onClick={handleFileUpload} disabled={loading}>
                {loading ? 'Uploading...' : 'Predict'}
              </Button>
            </div>
            {showCamera && (
              <div className="camera-container mb-3">
                <video ref={videoRef} width="100%" height="auto" />
                <Button variant="primary" className="mt-2" onClick={handleCapture}>Capture</Button>
                <canvas ref={canvasRef} style={{ display: 'none' }} width="640" height="480" />
              </div>
            )}
            {previewUrl && (
              <div className="text-center mb-3">
                <h4>Image Preview:</h4>
                <img src={previewUrl} alt="Selected" className="preview-image" />
              </div>
            )}
          </Form>
          {error && <Alert variant="danger" className="mt-3">{error}</Alert>}
          {prediction && (
            <Alert variant="success" className="mt-3">
              <div>Prediction:</div>
              <div>{prediction.predicted_class}</div>
              <div>{prediction.probability}</div>
            </Alert>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default ImageUpload;
