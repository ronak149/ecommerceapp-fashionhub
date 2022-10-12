import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';


const SearchBox = () => {

    const [query, setQuery] = useState('');
    const navigate = useNavigate();

    const submitHandler = (e) => {
        e.preventDefault();
        navigate(query ? `/search?query=${query}` : '/search')
    }

    return (
        <form className="d-flex" role="search" onSubmit={submitHandler}>
            <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" onChange={(e) => setQuery(e.target.value)} />
            <button className="btn text-indigo p-0" type="submit"><i className="bi bi-search"></i></button>
      </form>
    );
}

export default SearchBox;