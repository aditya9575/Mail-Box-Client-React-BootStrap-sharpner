import React, { useRef, useState } from "react";
import { Editor } from '@tinymce/tinymce-react';
import axios from "axios";
import { MdOutlineFileUpload } from "react-icons/md";
import "./emailSender.css";  

const EmailSenderComponent = () => {
  const editorRef = useRef(null);
  const [to, setTo] = useState('');
  const [subject, setSubject] = useState('');
  const [attachments, setAttachments] = useState([]);

  const handleSend = async () => {
    if (editorRef.current) {
      const timestamp = new Date().toLocaleString(); // Get current time
      const emailContent = {
        to,
        subject,
        body: editorRef.current.getContent(),
        attachments,
        timeSent: timestamp, // Add the timeSent field
        emailRead:false,
        emailStarred:false,
      };
      console.log("Sending Email", emailContent);
      try {
        const response = await axios.post(
            "https://sharpner-practice-project-default-rtdb.firebaseio.com/userEmails.json",
            emailContent
          );
          console.log("Email sent successfully", response.data);
          alert("Email sent");
          setAttachments([]);
          setSubject("");
          setTo("");
          editorRef.current.setContent("");
      } catch (error) {
        console.error("Error sending email", error.message);
        alert(error.message);
      }
    }
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files); // Convert file list to array
    setAttachments((prevAttachments) => [...prevAttachments, ...files]);
  };

  const removeAttachment = (index) => {
    setAttachments(attachments.filter((_, i) => i !== index));
  };

  return (
    <div className="escontainer">
    <h2>Compose Mail</h2>
      {/* Email Header */}
      <div className="esheader">
        <input
          type="email"
          placeholder="To"
          value={to}
          onChange={(e) => setTo(e.target.value)}
          className="esinputField"
        />
        <input
          type="text"
          placeholder="Subject"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          className="esinputField"
        />
      </div>

      {/* Email Body (Editor) */}
      <Editor
        apiKey='2hijkyx9f954diacg0n7oliw7f3st07bp4jk15n6j9yimboz'
        onInit={(_evt, editor) => editorRef.current = editor}
        init={{
          height: 300,
          menubar: false,
          toolbar_location: 'bottom', // Toolbar at the bottom
          plugins: [
            'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
            'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
            'insertdatetime', 'media', 'table', 'code', 'help', 'wordcount'
          ],
          toolbar: 'undo redo | bold italic underline | alignleft aligncenter alignright | ' +
            'bullist numlist outdent indent | link image | forecolor backcolor',
          content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
        }}
      />

      {/* Attachments Display */}
      <div className="esattachmentList">
        {attachments.map((file, index) => (
          <div key={index} className="esattachmentItem">
            {file.name}
            <button onClick={() => removeAttachment(index)} className="esremoveButton">Remove</button>
          </div>
        ))}
      </div>

      {/* Email Footer */}
      <div className="esfooter">
        <button onClick={handleSend} className="essendButton">Send</button>
        <div className="esiconBar">
          <label className="esicon">
            <MdOutlineFileUpload />
            <input
              type="file"
              multiple
              onChange={handleFileChange}
              style={{ display: 'none' }}
            />
          </label>
        </div>
      </div>
    </div>
  );
};

export default EmailSenderComponent;
