import {useEffect, useState} from "react";
import FilterModal from "./FilterModal.tsx";
import {Button, Grid} from "@mui/material";
import {Filters, FilterStore} from "../stores/filter-store.ts";
import FiltersTable from "./FiltersTable.tsx";

const store = new FilterStore();

function HomePage() {
    const [open, setOpen] = useState(false);
    const [filters, setFilters] = useState<Filters[]>([]);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    useEffect(() => {
        fetchFilters().then().catch(error => console.error('Error fetching data:', error));
    }, []);

    const fetchFilters = async () => {
        try {
            const fetchedFilters = await store.fetchFilters();
            setFilters(fetchedFilters);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    return (
        <Grid container>
            <Grid item xs={12}>
                <Button variant="contained" onClick={handleOpen}>Add new filter</Button>
            </Grid>
            <Grid item xs={12}>
                <h1>Filters List</h1>
                <FiltersTable filters={filters}/>
            </Grid>

            <FilterModal isOpen={open} closeModal={handleClose} filters={filters}/>
        </Grid>
    );
}

export default HomePage
