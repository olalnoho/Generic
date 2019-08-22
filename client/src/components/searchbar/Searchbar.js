import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { getUsers } from '../../redux/actions/user'
const Searchbar = ({ user, getUsers }) => {
   const [search, setSearch] = useState('')
   let results
   useEffect(() => {
      getUsers()
   }, [getUsers])
   if (search && user && !user.loading) {
      results = user.users.filter(usr => usr.name.toLowerCase().includes(search.toLowerCase()))
      console.log(results)
   }
   return (
      <div className="searchbar">
         <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            type="text"
            placeholder="Search for other members" />
         {<ul className="searchbar__dropdown">
            {results && results.map(res =>
               <li key={res._id}>
                  <Link to={`/profile/${res._id}`}>{res.name} </Link>
               </li>
            )}
         </ul>}
      </div>
   )
}

const mapStateToProps = state => ({
   user: state.user
})
export default connect(mapStateToProps, { getUsers })(Searchbar)
