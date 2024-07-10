import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import {Filters} from "../stores/filter-store.ts";

interface FiltersTableProps {
    filters: Filters[];
}

const FiltersTable: React.FC<FiltersTableProps> = ({ filters }) => {
    return (
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>ID</TableCell>
                        <TableCell>Name</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {filters.map((filter) => (
                        <TableRow key={filter.id}>
                            <TableCell>{filter.id}</TableCell>
                            <TableCell>{filter.name}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default FiltersTable;
