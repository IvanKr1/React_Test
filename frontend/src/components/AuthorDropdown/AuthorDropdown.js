import React, { useState, useEffect } from 'react';
import Select from 'react-select'

import { listAuthors } from '../../services/authors';

function AuthorDropdown({ value, onChange }) {
    const [authors, setAuthors] = useState([]);

    useEffect(() => {
        const fetchAuthors = async () => {
            const data = await listAuthors();
            let newData = data.map(author => {
                return {
                    value: author.id,
                    label: `${author.firstName} ${author.lastName}`
                }
            })

            newData = [{value: "", label: ""}, ...newData]
            setAuthors(newData)
        };

        fetchAuthors();
    }, []);

    return (
        <div className="AuthorDropdown">
            <Select
                options={authors}
                onChange={onChange}
            />
        </div>
    );
}

export default AuthorDropdown;
