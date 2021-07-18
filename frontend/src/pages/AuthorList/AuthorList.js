import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Table from 'react-bootstrap/Table';

import { ROUTE_AUTHOR_PREFIX, ROUTE_AUTHOR_CREATE } from '../../constants';
import { listAuthors } from '../../services/authors';

function ArticleList() {
    const [authors, setAuthors] = useState([]);

    useEffect(() => {
        const fetchAuthors = async () => {
            const data = await listAuthors();
            setAuthors(data);
        };

        fetchAuthors();
    }, []);

    const renderAuthors = () => authors.map((authors) => {
        const { id, firstName, lastName} = authors;

        return (
            <tr key={ id }>
                <td>
                    <Link to={ `${ROUTE_AUTHOR_PREFIX}/${id}` }>{ `${firstName} ${lastName}`}</Link>
                </td>
            </tr>
        );
    });

    return (
        <div className="AuthorList">
            <h1>Authors</h1>
            <Link className="d-block mb-3" to={ ROUTE_AUTHOR_CREATE }>
                Create Author
            </Link>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Authors List</th>
                    </tr>
                </thead>
                <tbody>
                    { renderAuthors() }
                </tbody>
            </Table>
        </div>
    );
}

export default ArticleList;
