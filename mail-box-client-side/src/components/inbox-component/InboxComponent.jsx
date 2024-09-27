import React, { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import ListGroup from 'react-bootstrap/ListGroup';
import Spinner from 'react-bootstrap/Spinner';
import Alert from 'react-bootstrap/Alert';
import NavbarComponent from '../navbar-component/NavbarComponent';
import FormCheck from 'react-bootstrap/FormCheck';
import Button from 'react-bootstrap/Button';
import { MdDelete } from 'react-icons/md';
import { IoMdMailUnread } from "react-icons/io";
import axios from 'axios';
import './inbox.css'; // Add necessary custom styles for further refinement
import { useNavigate } from 'react-router-dom';
import Modal from 'react-bootstrap/Modal';
import Badge from 'react-bootstrap/Badge'; // For displaying unread count badge

const InboxComponent = () => {
  const [emails, setEmails] = useState([]);
  const [selectedEmails, setSelectedEmails] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false); 
  const [modalEmailBody, setModalEmailBody] = useState(''); 
  const [readStatus, setReadStatus] = useState({}); 
  const [unreadCount, setUnreadCount] = useState(0); // To track unread emails count

  const navigate = useNavigate();

  // Load emails and read status from Firebase on component mount
  useEffect(() => {
    const fetchEmails = async () => {
      try {
        const response = await axios.get(
          'https://sharpner-practice-project-default-rtdb.firebaseio.com/userEmails.json'
        );
        const emailsData = response.data || {};
        setEmails(emailsData);
  
        // Set read status based on emails read field from Firebase
        const readStatusFromFirebase = Object.entries(emailsData).reduce((acc, [key, email]) => {
          acc[key] = email.read || false;
          return acc;
        }, {});
  
        setReadStatus(readStatusFromFirebase);
  
        // Calculate unread count
        const unreadEmails = Object.values(readStatusFromFirebase).filter((status) => !status).length;
        setUnreadCount(unreadEmails);
      } catch (err) {
        setError(err.message || 'Failed to load emails');
      } finally {
        setLoading(false);
      }
    };
  
    // Fetch emails immediately, then every 2 seconds
    fetchEmails();
    const intervalId = setInterval(fetchEmails, 2000); // Call the fetch function every 2 seconds
  
    return () => clearInterval(intervalId); // Cleanup interval on component unmount
  }, []);
  

  const handleSelectEmail = (index) => {
    setSelectedEmails((prevSelectedEmails) =>
      prevSelectedEmails.includes(index)
        ? prevSelectedEmails.filter((i) => i !== index)
        : [...prevSelectedEmails, index]
    );
  };

  const handleSelectAll = () => {
    setSelectAll(!selectAll);
    if (!selectAll) {
      setSelectedEmails(Object.keys(emails).map((_, index) => index));
    } else {
      setSelectedEmails([]);
    }
  };

  const handleDeleteSelected = async () => {
    if (selectedEmails.length === 0) {
      alert('Please select at least one email to delete');
      return;
    }

    try {
      for (const index of selectedEmails) {
        const emailToDelete = Object.keys(emails)[index];
        await axios.delete(
          `https://sharpner-practice-project-default-rtdb.firebaseio.com/userEmails/${emailToDelete}.json`
        );
      }

      const updatedEmails = { ...emails };
      selectedEmails.forEach((index) => {
        const emailToDelete = Object.keys(updatedEmails)[index];
        delete updatedEmails[emailToDelete];
      });

      setEmails(updatedEmails);
      setSelectedEmails([]);
      setSelectAll(false);
      alert('Selected emails deleted successfully');
    } catch (error) {
      console.error('Error deleting emails', error.message);
      alert('Failed to delete selected emails');
    }
  };

  // Function to handle tapping the email and marking it as read
  const handleEmailTap = async (emailId, emailBody) => {
    setShowModal(true);
    setModalEmailBody(emailBody);

    // Mark email as read in local state
    setReadStatus((prevStatus) => ({
      ...prevStatus,
      [emailId]: true,
    }));

    // Update unread count
    setUnreadCount((prevCount) => prevCount - 1);

    // Update read status in Firebase
    try {
      await axios.put(
        `https://sharpner-practice-project-default-rtdb.firebaseio.com/userEmails/${emailId}.json`,
        {
          ...emails[emailId],
          read: true,
        }
      );
    } catch (error) {
      console.error('Failed to update read status in Firebase', error.message);
    }
  };

  const handleModalClose = () => setShowModal(false);

  return (
    <div>
      <Container fluid>
        <NavbarComponent />
        <div className="d-flex align-items-center">
          <h1 className="me-2">INBOX</h1>
          <div className="position-relative">
            <IoMdMailUnread size={30} />
            {unreadCount > 0 && (
              <Badge pill bg="danger" className="position-absolute top-0 start-100 translate-middle">
                {unreadCount}
              </Badge>
            )}
          </div>
        </div>
        
        <Button variant="primary" onClick={() => navigate('/emailSender')}>
          Compose
        </Button>
        <hr />
        <div className="d-flex justify-content-between align-items-center mb-3">
          <FormCheck
            type="checkbox"
            label="Select All"
            checked={selectAll}
            onChange={handleSelectAll}
          />
          <Button
            variant="danger"
            onClick={handleDeleteSelected}
            disabled={selectedEmails.length === 0}
          >
            <MdDelete size={20} /> Delete Selected
          </Button>
        </div>

        <hr />

        {loading ? (
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        ) : error ? (
          <Alert variant="danger">{error}</Alert>
        ) : Object.keys(emails).length === 0 ? (
          <Alert variant="info">No emails to display</Alert>
        ) : (
          <ListGroup>
            {Object.entries(emails).map(([key, email], index) => (
              <ListGroup.Item
                key={key}
                className={`email-item d-flex justify-content-between align-items-center ${selectedEmails.includes(index) ? 'selected' : ''}`}
                action
              >
                <FormCheck
                  type="checkbox"
                  checked={selectedEmails.includes(index)}
                  onChange={() => handleSelectEmail(index)}
                />

                <div
                  className="email-content d-flex align-items-center"
                  onClick={() => handleEmailTap(key, email.body)}
                >
                  {!readStatus[key] && (
                    <div
                      className="blue-dot"
                      style={{
                        marginRight: '8px',
                        width: '8px',
                        height: '8px',
                        backgroundColor: 'blue',
                        borderRadius: '50%',
                      }}
                    ></div>
                  )}
                  <div className="email-subject">{email.subject}</div>
                  <div className="email-body" dangerouslySetInnerHTML={{ __html: email.body.slice(0, 250) }} />
                </div>

                <span className="email-time">{email.timeSent || 'Unknown time'}</span>
              </ListGroup.Item>
            ))}
          </ListGroup>
        )}
      </Container>

      <Modal show={showModal} onHide={handleModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>Email Content</Modal.Title>
        </Modal.Header>
        <Modal.Body dangerouslySetInnerHTML={{ __html: modalEmailBody }} />
        <Modal.Footer>
          <Button variant="secondary" onClick={handleModalClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default InboxComponent;
