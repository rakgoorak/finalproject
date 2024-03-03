import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setSearchQuery } from '../store/SearchSlice';
import { useNavigate } from 'react-router-dom';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search'; // เพิ่ม import สำหรับ icon ที่จะใช้

const Search = () => {
    const dispatch = useDispatch();
    const { search } = useSelector((state) => state);
    const { text } = search;
    const navigate = useNavigate();

    const handleChange = (e) => {
        const searchText = e.target.value;
        dispatch(setSearchQuery(searchText));
    };

    const handleSubmit = (e) => {
        e.preventDefault();  // Fix the typo here
        navigate("/shop?" + text);
    };

    return (
        <form onSubmit={handleSubmit} style={{ display: 'flex', alignItems: 'center' }}>
            <IconButton type="submit" aria-label="search">
                <SearchIcon style={{ color: 'white' }} />
            </IconButton>
            <input
                type='search'
                className='form-control'
                value={text}
                onChange={handleChange}
                style={{ marginRight: '8px' }}
            />
        </form>
    );
};

export default Search;
