import {useState} from "react";
import FilterModal from "./FilterModal.tsx";
import {Button, Grid} from "@mui/material";

function HomePage() {
    const [open, setOpen] = useState(false);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <Grid container>
            <Button variant="contained" onClick={handleOpen}>Add new filter</Button>
            <FilterModal isOpen={open} closeModal={handleClose}/>
        </Grid>
    );
}

export default HomePage
