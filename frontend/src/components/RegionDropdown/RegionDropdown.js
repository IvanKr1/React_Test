import React, { useState, useEffect } from 'react';
import Multiselect from 'react-widgets/lib/Multiselect'

import { listRegions } from '../../services/regions';

function RegionDropdown({ value, onChange, width }) {
    const [regions, setRegions] = useState([]);

    useEffect(() => {
        const fetchRegions = async () => {
            const data = await listRegions();
            setRegions(data);
        };

        fetchRegions();
    }, []);

    return (
        <div style={{width: width}} className="RegionDropdown">
            <Multiselect
            placeholder="Select Region"
                value={ value }
                data={ regions }
                textField="name"
                valueField="id"
                onChange={ onChange }
                allowCreate={ false }
            />
        </div>
    );
}

export default RegionDropdown;
