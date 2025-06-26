import React, { useContext, useState } from 'react';
import { ThemeContext } from '../../contexts/ThemeContext';
import { AiOutlineSend, AiOutlineCheckCircle } from 'react-icons/ai';
import './QueroSerMembro.css';
import Modal from '../Modal/Modal';


        function getFormData(form) {
          var elements = form.elements;
          var honeypot;
      
          var fields = Object.keys(elements).filter(function(k) {
            if (elements[k].name === "honeypot") {
              honeypot = elements[k].value;
              return false;
            }
            return true;
          }).map(function(k) {
            if(elements[k].name !== undefined) {
              return elements[k].name;
            // special case for Edge's html collection
            }else if(elements[k].length > 0){
              return elements[k].item(0).name;
            }
          }).filter(function(item, pos, self) {
            return self.indexOf(item) == pos && item;
          });
      
          var formData = {};
          fields.forEach(function(name){
            var element = elements[name];
            
            // singular form elements just have one value
            formData[name] = element.value;
      
            // when our element has multiple items, get their values
            if (element.length) {
              var data = [];
              for (var i = 0; i < element.length; i++) {
                var item = element.item(i);
                if (item.checked || item.selected) {
                  data.push(item.value);
                }
              }
              formData[name] = data.join(', ');
            }
          });
      
          // add form-specific values into the data
          formData.formDataNameOrder = JSON.stringify(fields);
          formData.formGoogleSheetName = form.dataset.sheet || "responses"; // default sheet name
          formData.formGoogleSendEmail
            = form.dataset.email || ""; // no email by default
      
          return {data: formData, honeypot: honeypot};
        }
      
        function handleFormSubmit(event) {  // handles form submit without any jquery
          event.preventDefault();           // we are submitting via xhr below
          var form = event.target;
          var formData = getFormData(form);
          var data = formData.data;
      
          // If a honeypot field is filled, assume it was done so by a spam bot.
          if (formData.honeypot) {
            return false;
          }
      
          disableAllButtons(form);
          var url = form.action;
          var xhr = new XMLHttpRequest();
          xhr.open('POST', url);
          // xhr.withCredentials = true;
          xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
          xhr.onreadystatechange = function() {
              if (xhr.readyState === 4 && xhr.status === 200) {
                form.reset();
                var formElements = form.querySelector(".form-elements")
                if (formElements) {
                  formElements.style.display = "none"; // hide form
                }
                var thankYouMessage = form.querySelector(".thankyou_message");
                if (thankYouMessage) {
                  thankYouMessage.style.display = "block";
                }
              }
          };
          // url encode form data for sending as post data
          var encoded = Object.keys(data).map(function(k) {
              return encodeURIComponent(k) + "=" + encodeURIComponent(data[k]);
          }).join('&');
          xhr.send(encoded);
        }
        
        function loaded() {
          // bind to the submit event of our form
          var forms = document.querySelectorAll("form.contact__form");
          for (var i = 0; i < forms.length; i++) {
            forms[i].addEventListener("submit", handleFormSubmit, false);
          }
        };
        document.addEventListener("DOMContentLoaded", loaded, false);

function handleFormSubmit(event, setSuccess) {
  event.preventDefault();
  const form = event.target;
  const formData = getFormData(form);
  const data = formData.data;

  if (formData.honeypot) return false;

  disableAllButtons(form);

  const xhr = new XMLHttpRequest();
  xhr.open('POST', form.action);
  xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

  xhr.onreadystatechange = () => {
    if (xhr.readyState === 4 && xhr.status === 200) {
      form.reset();
      const thankYouMessage = form.querySelector('.thankyou_message');
      if (thankYouMessage) thankYouMessage.style.display = 'block';
      setSuccess(true);
    }
  };

  const encoded = Object.keys(data)
    .map((k) => encodeURIComponent(k) + '=' + encodeURIComponent(data[k]))
    .join('&');
  xhr.send(encoded);
}

function disableAllButtons(form) {
  const buttons = form.querySelectorAll('button');
  buttons.forEach((btn) => (btn.disabled = true));
}

function QueroSerMembro() {
  const { theme } = useContext(ThemeContext);
  const [success, setSuccess] = useState(false);
  const [openModal, setOpenModal] = useState(false)

return (
    <section className="queroser-container" id="queroser">
      <h1>Quero ser membro</h1>


     <Modal isOpen={openModal} setModalOpen={() => setOpenModal(!openModal)} title={'Quero ser Membro'}>
          <form
        method="POST"
        data-email="sarahsophiapinto@gmail.com"
        action="https://script.google.com/macros/s/AKfycbzdvf1Xbl5bRXm_zdlN_OwhmgvOzcHCReyPjxEiD-8zU7jzxndfMWwMgng_sZJ6D2xL/exec"
        className="queroser-form"
        onSubmit={(e) => handleFormSubmit(e, setSuccess)}
      >
        <div className="input-container">
          <label for="name">Nome</label>
          <input
            required
            placeholder="Digite seu nome"
            type="text"
            name="Name"
            id="name"
          />
        </div>

        <div className="input-container">
          <label htmlFor="phone">Telefone</label>
          <input
            required
            placeholder="(00) 00000-0000"
            type="tel"
            name="Phone"
            id="phone"
          />
        </div>

        <div className="input-container">
          <label for="email">E-mail</label>
          <input
            required
            placeholder="Digite seu e-mail"
            type="email"
            name="Email"
            id="email"
          />
        </div>

        <div className="input-container checkbox-group">
          <input
            type="checkbox"
            required
            name="AcceptedTerms"
            id="terms"
          />
          <span>
            Declaro que li e aceito os{' '}
            <a href="/termos" target="_blank" rel="noopener noreferrer">
              termos de conduta
            </a>
          </span>
        </div>

        <div className="thankyou_message" style={{ display: 'none' }}>
          <p>Obrigada por se inscrever! Em breve entraremos em contato.</p>
        </div>

        <div className="submit-btn">
          <button type="submit" onClick={() => setOpenModal(true)}>
            <p>{!success ? 'Enviar' : 'Enviado'}</p>
            {!success ? (
              <AiOutlineSend className="send-icon" />
            ) : (
              <AiOutlineCheckCircle className="success-icon" />
            )}
          </button>
        </div>
      </form>
          
      </Modal>
    </section>
  );
}

export default QueroSerMembro;