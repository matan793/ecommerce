import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { ParfumeGenderType } from '../../utils/types/types';

interface FilterBarProps {
    lable: string;
    options: string[];
    changeCallback?: (value: string) => void;

}

const FilterBar: React.FC<FilterBarProps> = ({ options, lable, changeCallback }) => {

    return (
        <Autocomplete
            disablePortal
            options={["All", ...options]}
            sx={{ width: 300 }}
             onChange={(_, value) => {
                if (changeCallback) changeCallback(value || "All");
            }}
            renderInput={(params) => <TextField {...params} label={lable} />}
        />
    );
};

export default FilterBar;