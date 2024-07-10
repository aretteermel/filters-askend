import {
    Box,
    Button,
    FormControl, FormControlLabel,
    Grid,
    InputLabel,
    MenuItem,
    Modal, Radio,
    RadioGroup,
    Select,
    TextField
} from '@mui/material';

// @ts-ignore
import ModalStyle from '../styles/ModalStyle.ts';
import CriteriaStyle from "../styles/CriteriaStyle.ts";
import {Comparisons, CriteriaRow, FilterData, FilterStore, Types} from '../stores/filter-store.js';
// @ts-ignore
import React, {useEffect, useState} from 'react';
import {DatePicker, LocalizationProvider} from '@mui/x-date-pickers';
import {AdapterDateFns} from '@mui/x-date-pickers/AdapterDateFns';
import CloseButtonStyle from "../styles/CloseButtonStyle.ts";
import AddRowStyle from "../styles/AddRowStyle.ts";
import RadioStyle from "../styles/RadioStyle.ts";

const store = new FilterStore();

interface FilterModalProps {
    isOpen: boolean;
    closeModal: () => void;
    filters: FilterData[];
}

const FilterModal: React.FC<FilterModalProps> = ({isOpen, closeModal, filters}) => {
    const [typesData, setTypesData] = useState<Types[]>([]);
    const [comparisonsData, setComparisonsData] = useState<Comparisons[]>([]);
    const [rows, setRows] = useState<CriteriaRow[]>([{type: '', comparison: '', value: ''}]);
    const [filterName, setFilterName] = useState<string>('')
    const [selectedFilterIndex, setSelectedFilterIndex] = React.useState<number>(-1);

    useEffect(() => {
        fetchData().then().catch(error => console.error('Error fetching data:', error));
    }, []);

    const fetchData = async () => {
        try {
            const comparisons = await store.fetchComparisons();
            setComparisonsData(comparisons);

            const types = await store.fetchTypes();
            setTypesData(types);
            if (types.length > 0) {
                setRows([{type: types[0].type, comparison: comparisons[0].comparison, value: ''}]);
            }

        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const prefillComparison = (selectedType: string, comparisons: Comparisons[]) => {
        if (selectedType === 'Amount') {
            return comparisons.find(c => c.comparison === 'Equal')?.comparison || '';
        } else if (selectedType === 'Title') {
            return comparisons.find(c => c.comparison === 'Starts with')?.comparison || '';
        } else if (selectedType === 'Date') {
            return comparisons.find(c => c.comparison === 'From')?.comparison || '';
        }
        return '';
    };

    const handleTypeChange = (index: number) => (event: any) => {
        const newRows = [...rows];
        newRows[index].type = event.target.value as string;
        newRows[index].comparison = prefillComparison(event.target.value as string, comparisonsData); // Set prefill comparison
        setRows(newRows);
    };

    const handleComparisonChange = (index: number) => (event: any) => {
        const newRows = [...rows];
        newRows[index].comparison = event.target.value as string;
        setRows(newRows);
    };

    const handleValueChange = (index: number) => (event: any) => {
        const newRows = [...rows];
        newRows[index].value = event.target.value as string;
        setRows(newRows);
    };

    const handleFilterNameChange = (event: any) => {
        setFilterName(event.target.value)
    }

    const handleDateChange = (index: number) => (date: Date | null) => {
        const newRows = [...rows];
        newRows[index].value = date ? date.toISOString() : '';
        setRows(newRows);
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const filteredCriteria = rows.filter(criterion => criterion.type && criterion.comparison && criterion.value);

        if (filteredCriteria.length === 0) {
            console.error('Filter must contain at least one criteria');
            return;
        }

        const filterData: FilterData = {
            name: filterName,
            criteria: filteredCriteria.map(criterion => ({
                type: criterion.type,
                comparison: criterion.comparison,
                value: criterion.value
            }))
        };

        try {
            await store.saveNewFilter(filterData);

            console.log('Filter data submitted successfully');
            setFilterName('');
            setRows([{type: 'Amount', comparison: 'Equal', value: ''}]);
            closeModal();
            window.location.reload();
        } catch (error) {
            console.error('Error submitting filter data:', error);
        }
    };

    const handleClose = () => {
        setFilterName('');
        setRows([{type: 'Amount', comparison: 'Equal', value: ''}]);
        setSelectedFilterIndex(-1);
        closeModal();
    };

    const addRow = () => {
        const initialType = typesData[0]?.type || '';
        const initialComparison = prefillComparison(initialType, comparisonsData);
        setRows([...rows, {type: initialType, comparison: initialComparison, value: ''}]);
    };

    const removeRow = (index: number) => {
        if (rows.length === 1) {
            return;
        }
        const newRows = rows.filter((_, i) => i !== index);
        setRows(newRows);
    };

    const filteredComparisons = (type: string) => {
        const selectedType = typesData.find(t => t.type === type);
        if (selectedType) {
            return comparisonsData.filter(c => c.typeId === selectedType.id);
        }
        return [];
    };

    const renderValueInput = (type: string, value: string, index: number) => {
        if (type === 'Amount') {
            return (
                <TextField
                    type="number"
                    value={value}
                    onChange={handleValueChange(index)}
                    label="Value"
                    fullWidth
                    variant="outlined"
                />
            );
        } else if (type === 'Title') {
            return (
                <TextField
                    type="text"
                    value={value}
                    onChange={handleValueChange(index)}
                    label="Value"
                    fullWidth
                    variant="outlined"
                />
            );
        } else if (type === 'Date') {
            return (
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DatePicker
                        label="Value"
                        value={value ? new Date(value) : null}
                        onChange={(date) => handleDateChange(index)(date)}
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
            />
        );
    };

    const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const selectedIndex = parseInt(event.target.value, 10);
        setSelectedFilterIndex(selectedIndex);
        const selectedFilter = filters[selectedIndex];
        if (selectedFilter) {
            setFilterName(selectedFilter.name);
            setRows(selectedFilter.criteria.map(criterion => ({
                type: criterion.type,
                comparison: criterion.comparison,
                value: criterion.value
            })));
        }
    };

    return (
        <Modal open={isOpen} onClose={closeModal} aria-labelledby="modal-title">
            <Box sx={{...ModalStyle}}>
                <form onSubmit={handleSubmit}>
                    <Grid container rowSpacing={2}>
                        <Grid item minWidth={'min-content'} sx={{...CloseButtonStyle}}>
                            <Button variant="contained" onClick={closeModal}>X</Button>
                        </Grid>
                        <Grid item xs={12}>
                            <Grid container>
                                <Grid item xs={2}>
                                    <InputLabel>Filter name</InputLabel>
                                </Grid>
                                <Grid item xs={10}>
                                    <TextField
                                        type="text"
                                        value={filterName}
                                        onChange={handleFilterNameChange}
                                        label="Name"
                                        fullWidth
                                        variant="outlined"
                                    />
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={12}>
                            <Grid container>
                                <Grid item xs={2}>
                                    <InputLabel>Criteria</InputLabel>
                                </Grid>
                                <Grid item xs={10}>
                                    {rows.map((row, index) => (
                                        <Grid container columnSpacing={2} key={index} sx={{...CriteriaStyle}}
                                              alignItems="center">
                                            <Grid item xs={3}>
                                                <FormControl variant="outlined" fullWidth>
                                                    <InputLabel id={`type-select-label-${index}`}>Type</InputLabel>
                                                    <Select
                                                        id={`type-select-${index}`}
                                                        value={row.type}
                                                        onChange={handleTypeChange(index)}
                                                        label="Type"
                                                    >
                                                        {typesData.map((type) => (
                                                            <MenuItem key={type.id} value={type.type}>
                                                                {type.type}
                                                            </MenuItem>
                                                        ))}
                                                    </Select>
                                                </FormControl>
                                            </Grid>
                                            <Grid item xs={3}>
                                                <FormControl variant="outlined" fullWidth>
                                                    <InputLabel
                                                        id={`comparison-select-label-${index}`}>Comparison</InputLabel>
                                                    <Select
                                                        id={`comparison-select-${index}`}
                                                        value={row.comparison}
                                                        onChange={handleComparisonChange(index)}
                                                        label="Comparison"
                                                    >
                                                        {filteredComparisons(row.type).map((comp) => (
                                                            <MenuItem key={comp.comparison} value={comp.comparison}>
                                                                {comp.comparison}
                                                            </MenuItem>
                                                        ))}
                                                    </Select>
                                                </FormControl>
                                            </Grid>
                                            <Grid item xs={3}>
                                                <FormControl variant="outlined" fullWidth>
                                                    {renderValueInput(row.type, row.value, index)}
                                                </FormControl>
                                            </Grid>
                                            <Grid item minWidth="min-content">
                                                <Button variant="contained" onClick={() => removeRow(index)}
                                                        disabled={rows.length === 1}>-</Button>
                                            </Grid>
                                        </Grid>
                                    ))}
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={12} sx={{...AddRowStyle}}>
                            <Button variant="contained" onClick={addRow}>+ Add row</Button>
                        </Grid>
                        <Grid item xs={2}>
                            <InputLabel>Selection</InputLabel>
                        </Grid>
                        <Grid item xs={10} sx={{...RadioStyle}}>
                            <RadioGroup row aria-label="filter-template" name="filter-template"
                                        value={selectedFilterIndex.toString()} onChange={handleRadioChange}>
                                {filters.slice(0, 3).map((filter, index) => (
                                    <FormControlLabel key={index} value={index.toString()} control={<Radio/>}
                                                      label={filter.name}/>
                                ))}
                            </RadioGroup>
                        </Grid>
                    </Grid>
                    <Grid container justifyContent="center" sx={{mt: 2}}>
                        <Button variant="contained" onClick={handleClose} sx={{mr: 2}}>Close</Button>
                        <Button type="submit" variant="contained">Save</Button>
                    </Grid>
                </form>
            </Box>
        </Modal>
    );
};

export default FilterModal
