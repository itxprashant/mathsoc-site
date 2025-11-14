import React, { useState } from 'react';

interface FormData {
  email: string;
  subject: string;
  message: string;
}

const Contact: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');
  const [showMessage, setShowMessage] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const response = await fetch('https://formspree.io/xknqypqr', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          _replyto: formData.email,
          _subject: formData.subject,
          message: formData.message
        })
      });

      if (response.ok) {
        setSubmitMessage('Form submitted successfully.');
        setFormData({ email: '', subject: '', message: '' });
      } else {
        setSubmitMessage('Form submission failed. Please try again.');
      }
    } catch (error) {
      setSubmitMessage('Form submission failed. Please try again.');
    }

    setIsSubmitting(false);
    setShowMessage(true);
    
    // Hide message after 7.5 seconds
    setTimeout(() => {
      setShowMessage(false);
    }, 7500);
  };

  return (
    <div className="section" id="contact">
      <div className="container">
        <div className="row">
          <div className="col-12">
            <h2>Contact Us</h2>

            <div className="row">
              <div className="col-md-4" style={{ marginBottom: '49px' }}>
                <h3 style={{ marginTop: '36px', marginBottom: '9px' }}>
                  <i className="fa fa-user-plus"></i>&nbsp;Follow us
                </h3>
                <a href="https://www.facebook.com/maths.society.iitd" target="_blank" rel="noopener noreferrer">
                  <i className="fa fa-facebook social fb"></i>
                </a>
                <a href="https://www.instagram.com/mathsociitd/" target="_blank" rel="noopener noreferrer">
                  <i className="fa fa-instagram social insta"></i>
                </a>
                <a href="https://www.youtube.com/mathsociitd/" target="_blank" rel="noopener noreferrer">
                  <i className="fa fa-youtube-play social youtube"></i>
                </a>
                <br />
                <h3 style={{ marginTop: '36px' }}>
                  <i className="fa fa-envelope-open-o"></i>&nbsp;Drop a line
                </h3>
                <p>
                  <i className="fa fa-at" style={{ marginRight: '9px' }}></i>
                  <a href="mailto:maths.society.iitd@gmail.com" className='link-normal' target="_blank" rel="noopener noreferrer">
                    maths.society.iitd@gmail.com
                  </a>
                </p>
              </div>
              
              <div className="col-md-7 offset-md-1">           
                <h3><i className="fa fa-edit"></i>&nbsp;Write to us</h3>
                <center>
                  <form id="contact-form" onSubmit={handleSubmit}>
                    <input 
                      type="email" 
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="Your email" 
                      required 
                    />
                    <input 
                      type="text" 
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      placeholder="Subject" 
                      required 
                    />
                    <textarea 
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      placeholder="Your message" 
                      required
                    ></textarea>
                    <button type="submit" disabled={isSubmitting}>
                      {isSubmitting ? 'Sending...' : 'Send'}
                    </button>
                    {showMessage && (
                      <div className="submit-msg" style={{ display: 'block' }}>
                        {submitMessage}
                      </div>
                    )}
                  </form>
                </center>
              </div>
            </div>
      
          </div>  
        </div>    
      </div>         
    </div>
  );
};

export default Contact;