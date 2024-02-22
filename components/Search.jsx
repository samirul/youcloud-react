import React from 'react'
import { FaSearch } from "react-icons/fa";

const Search = () => {
  return (
    <div>
          <div className="wrap-one">
              <div className="search-one">
                  <input type="text" className="searchTerm-one" placeholder=""/>
                      <button type="submit" className="searchButton-one">
                        <FaSearch />
                      </button>
              </div>
          </div>
          
    </div>
  )
}

export default Search
