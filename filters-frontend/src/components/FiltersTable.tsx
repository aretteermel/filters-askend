import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import {Filter} from '../stores/filter-store.ts';

interface FiltersTableProps {
    filters: Filter[];
}

const FiltersTable: React.FC<FiltersTableProps> = ({ filters }) => {
    return (
        <TableContainer>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell><strong>ID</strong></TableCell>
                        <TableCell><strong>Filter name</strong></TableCell>
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
