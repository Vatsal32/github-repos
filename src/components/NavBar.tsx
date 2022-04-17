import React, {FunctionComponent} from 'react';
import {AppBar, Container, Grid, IconButton, PaletteMode, Typography, useMediaQuery} from "@mui/material";
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import {Link} from "react-router-dom";

interface OwnProps {
    colorMode: { toggleColorMode: () => void };
    mode: PaletteMode;
    theme: { palette: { background: { paper: string } } };
}

type Props = OwnProps;

const NavBar: FunctionComponent<Props> = (props) => {
    const matches = useMediaQuery('(min-width:480px)');

    return (
        <AppBar position="static">
            <Container maxWidth="xl" sx={{display: 'flex', padding: '1rem'}}>
                <Typography variant={matches ? "h4" : "h5"}
                            sx={{flexGrow: 1, display: 'flex', alignItems: 'center', textDecoration: 'none'}}>
                    <Link to={'/'} style={{textDecoration: 'none', color: 'inherit'}}>GitHub Repos</Link>
                </Typography>

                <Grid sx={{
                    flexGrow: 0,
                    display: 'flex',
                    alignContent: 'center',
                    justifyContent: 'center',
                    flexDirection: 'row'
                }}>
                    <IconButton sx={{ml: 1}} onClick={props.colorMode.toggleColorMode} color="inherit">
                        {props.mode === 'dark' ? <Brightness7Icon/> : <Brightness4Icon/>}
                    </IconButton>
                </Grid>
            </Container>
        </AppBar>
    );
};

export default NavBar;