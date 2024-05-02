import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import DetailsController from '../controllers/details.controller';
import '../css/details.css';

const DetailsPage = () => {
    const { id } = useParams();
    const [university, setUniversity] = useState(null);

    useEffect(() => {
        const selectedUniversity = DetailsController.getUniversityById(id);
        setUniversity(selectedUniversity);
    }, [id]);

    return (
        <div className="container">
            <div className="header">
                <Link to="/" className="back-button">Back</Link>
            </div>
            <div className="details">
                {university ? (
                    <>
                        <h2>{university.name}</h2>
                        <p><strong>State:</strong> {university['state-province'] ?? 'N/A'}</p>
                        <p><strong>Country:</strong> {university.country}</p>
                        <p><strong>Web Pages:</strong></p>
                        <ul>
                            {university.web_pages.map((page, index) => (
                                <li key={index}><a href={page} target="_blank" rel="noreferrer">{page}</a></li>
                            ))}
                        </ul>
                        <p><strong>Domains:</strong></p>
                        <ul>
                            {university.domains.map((domain, index) => (
                                <li key={index}>{domain}</li>
                            ))}
                        </ul>
                    </>
                ) : (
                        <p>University not found</p>
                    )}
            </div>
        </div>
    );
};

export default DetailsPage;
