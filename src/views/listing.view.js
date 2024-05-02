import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { ReactComponent as DeleteIcon } from '../assets/delete.svg';
import listingController from '../controllers/listing.controller';
import '../css/listing.css';

const ListingPage = () => {
    const navigate = useNavigate();
    const [filteredRows, setFilteredRows] = useState([]);
    const [sortBy, setSortBy] = useState(null);
    const [asc, setAsc] = useState(true);

    useEffect(() => {
        (async () => {
            const unisData = await listingController.fetchData();
            setFilteredRows([...unisData]);
        })();
    }, []);

    const sortTable = (columnIndex) => {
        const unisData = listingController.sortTable(columnIndex);
        setFilteredRows([...unisData]);
        setSortBy(columnIndex);
        setAsc(!asc);
    };

    const searchTable = (event) => {
        const filter = event.target.value;
        const unisData = listingController.searchTable(filter);
        setFilteredRows([...unisData]);
    };

    const deleteRow = (index) => {
        const unisData = listingController.deleteRow(index);
        setFilteredRows([...unisData]);
    };

    const toDetailsPage = (event, uniId) => {
        navigate("/details/" + uniId);
    };

    return (
        <div className="container">
            <div className="title">Universities</div>
            <div className="search-container">
                <input type="text" id="searchInput" onChange={searchTable} placeholder="Search by name" />
            </div>
            <div className="table-container">
                <table id="myTable">
                    <thead>
                        <tr>
                            <th onClick={() => sortTable(0)}>
                                Name {sortBy === 0 && <span className={asc ? "sort-icon asc" : "sort-icon desc"}></span>}
                            </th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody className="scrollable-table">
                        {filteredRows.map((row, index) => (
                            <tr key={index}>
                                <td className="align-left" onClick={(e) => toDetailsPage(e, row.id)}>{row.name}</td>
                                <td style={{ textAlign: 'right' }}><DeleteIcon className="delete-icon" onClick={() => deleteRow(index)} /></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ListingPage;