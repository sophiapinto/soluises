import React, { useEffect } from 'react';
import './Modal.css';

export default function Modal({ isOpen, setModalOpen, children, title, isLoading  }) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    // Limpeza ao desmontar o componente
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className='modal-container'>
      <div className='modal-style'>
        <div className='modal-header'>
          {!isLoading && (
            <button onClick={() => setModalOpen(false)} className="close-button">×</button>
          )}
        </div>

        <div className='modal-body'>
          <h2>{title}</h2>
          {children}
          
          {/*{isLoading && <p className="loading-text">Enviando dados...</p>}*/}

        </div>
      </div>
    </div>
  );
}