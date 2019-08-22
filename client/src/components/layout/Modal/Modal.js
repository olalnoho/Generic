import React from 'react'
const Modal = ({ show, children }) => {
   return show && (
      <div onClick={e => e.stopPropagation()} className="modal">
         {children}
      </div>
   )
}

export default Modal
