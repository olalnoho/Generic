import React from 'react'

const ProfileHobbies = ({ hobbies }) => {
   return hobbies &&
      <>
         <h2>Some of my hobbies</h2>
         <ul className="profile__hobbies--items">
            {hobbies.map((hobby, i) =>
               <li key={i}> <i className="fas fa-caret-right"></i> {hobby} </li>)}
         </ul>
      </>
}

export default ProfileHobbies


// fas fa-angle-right