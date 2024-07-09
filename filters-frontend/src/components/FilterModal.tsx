import {Box, Button, FormControl, Grid, Input, InputLabel, MenuItem, Modal, Select} from "@mui/material";

import ModalStyle from "../styles/ModalStyle.ts";
import {FilterStore, Types} from "../stores/filter-store.js";
import React, {useEffect, useState} from 'react';

const store = new FilterStore();

interface FilterModalProps {
    isOpen: boolean;
    closeModal: () => void;
}

const FilterModal: React.FC<FilterModalProps> = ({ isOpen, closeModal }) => {
    const [typesData, setTypesData] = useState<Types[]>([]);
    const [type, setType] = useState<string>('');
    const [criteria, setCriteria] = useState<string>('');
    const [value, setValue] = useState<string>('');

    const handleTypeChange = (event: any) => setType(event.target.value);
    const handleCriteriaChange = (event: any) => setCriteria(event.target.value);
    const handleValueChange = (event: any) => setValue(event.target.value);

    useEffect(() => {
        store.fetchTypes()
            .then((json: Types[]) => {
                setTypesData(json);
                if (json.length > 0) {
                    setType(json[0].type);
                }
            })
            .catch((error) => console.error('Error fetching types:', error));
    }, []);

    return (
        <Modal
            open={isOpen}
            onClose={closeModal}
            aria-labelledby="modal-title"
        >
            <Box sx={{...ModalStyle}}>
                <Grid container rowSpacing={2}>

                    <Grid item xs={12}>
                        <Button variant="contained" onClick={closeModal}>X</Button>
                    </Grid>

                    <Grid item xs={12}>
                        <Grid container>
                            <Grid item xs={2}>
                                <InputLabel>Filter name</InputLabel>
                            </Grid>
                            <Grid item xs={10}>
                                <Input placeholder={'Name'}/>
                            </Grid>
                        </Grid>
                    </Grid>

                    <Grid item xs={12}>
                        <Grid container>
                            <Grid item xs={2}>
                                <InputLabel>Criteria</InputLabel>
                            </Grid>
                            <Grid item xs={10}>
                                <Grid container columnSpacing={2}>
                                    <Grid item xs={3}>
                                        <FormControl variant="outlined" fullWidth>
                                            <InputLabel id="type-select-label">Type</InputLabel>
                                            <Select
                                                id="type-select"
                                                value={type}
                                                onChange={handleTypeChange}
                                                label="Type"
                                                defaultValue={'Amount'}
                                            >
                                                {typesData.map((type) => (
                                                    <MenuItem key={type.type} value={type.type}>
                                                        {type.type}
                                                    </MenuItem>
                                                ))}
                                            </Select>
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={3}>
                                        <FormControl variant="outlined" fullWidth>
                                            <InputLabel id="criteria-select-label">Criteria</InputLabel>
                                            <Select
                                                id="criteria-select"
                                                value={criteria}
                                                onChange={handleCriteriaChange}
                                                label="Criteria"
                                            >
                                                <MenuItem value={10}>Ten</MenuItem>
                                                <MenuItem value={20}>Twenty</MenuItem>
                                                <MenuItem value={30}>Thirty</MenuItem>
                                            </Select>
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={3}>
                                        <FormControl variant="outlined" fullWidth>
                                            <InputLabel id="value-select-label">Value</InputLabel>
                                            <Select
                                                id="value-select"
                                                value={value}
                                                onChange={handleValueChange}
                                                label="Value"
                                            >
                                                <MenuItem value={10}>Ten</MenuItem>
                                                <MenuItem value={20}>Twenty</MenuItem>
                                                <MenuItem value={30}>Thirty</MenuItem>
                                            </Select>
                                        </FormControl>
                                    </Grid>
                                    <Grid item minWidth={'min-content'}>
                                        <Button variant="contained">-</Button>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>

                </Grid>
            </Box>
        </Modal>
    );
}

export default FilterModal
