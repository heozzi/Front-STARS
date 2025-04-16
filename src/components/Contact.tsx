import React from 'react';

// 자기소개 페이지
const Contact: React.FC = () => {
  return (
    <section>
      <h1>Contact Me</h1>
      <div className="space-y-4 text-lg text-gray-700">
        <p>
          <a href="mailto:prnsslcn@gmail.com" className="text-gray-600">
            📧 Email
          </a>
        </p>
        {/* <p>
          💼 LinkedIn: <a href="https://linkedin.com/in/gamma" target="_blank" className="text-blue-600 underline">linkedin.com/in/gamma</a>
        </p> */}
        <p>
          <a
            href="https://github.com/prnsslcn"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-600"
          >
            💻 GitHub
          </a>
        </p>
      </div>
    </section>  
  );
};

export default Contact;
