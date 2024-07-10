import React from 'react';
import { TextField } from '@mui/material';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

interface InputRendererProps {
    type: string;
    value: string;
    index: number;
    handleValueChange: (index: number) => (event: React.ChangeEvent<HTMLInputElement>) => void;
    handleDateChange: (index: number) => (date: Date | null) => void;
    typesData: any;
}

const InputRenderer: React.FC<InputRendererProps> = ({
                                                         type,
                                                         value,
                                                         index,
                                                         handleValueChange,
                                                         handleDateChange,
                                                         typesData
                                                     }) => {
    if (type === typesData[0].type || type === typesData[1].type) {
        return (
            <TextField
                type={type === typesData[0].type ? 'number' : 'text'}
                value={value}
                onChange={handleValueChange(index)}
                label="Value"
                fullWidth
                variant="outlined"
                required
            />
        );
    } else if (type === typesData[2].type) {
        return (
            <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                    label="Value"
                    value={value ? new Date(value) : null}
                    onChange={handleDateChange(index)}
                    slotProps={{ textField: { required: true } }}
                />
            </LocalizationProvider>
        );
    }
    return (
        <TextField
            type="text"
            value={value}
            onChange={handleValueChange(index)}
            label="Value"
            fullWidth
            variant="outlined"
            required
        />
    );
};

export default InputRenderer;
