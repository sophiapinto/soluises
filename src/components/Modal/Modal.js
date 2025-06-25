import React from 'react';
import './Modal.css';


export default function Modal({ isOpen, setModalOpen, children, title }) {
  if (isOpen) {
    return (
      <div className='modal-container'>
      <div className='modal-style'>
        <div className='modal-header'>
         
          <button onClick={() => setModalOpen(false)} className="close-button">×</button>
        </div>

        <div className='modal-body'>
           <h2>{title}</h2>
          {children}
        </div>
      </div>
    </div>
    )
  }
  return null

}

