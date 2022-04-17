import React, {ChangeEvent, FunctionComponent} from 'react';
import {Grid, IconButton, TextField, Tooltip, useMediaQuery} from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';

type Props = {
    content: string;
    setContent: React.Dispatch<React.SetStateAction<string>>;
    placeholder: string;
    make: () => void;
}

const SearchBar: FunctionComponent<Props> = (props) => {

    const matches = useMediaQuery('(min-width:480px)');

    return (
        <Grid sx={{width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
            <TextField sx={{
                '.MuiInput-underline:before': {
                    borderBottom: 'none'
                },
                '&& .MuiInput-underline:hover:before': {
                    borderBottom: 'none'
                },
                '.MuiInput-underline:after': {
                    borderBottom: 'none',
                },
                height: '50px',
                my: 2,
                mx: matches ? 4 : 0,
                outline: 'none',
                fontSize: '1rem',
                border: 1,
                width: '100%',
                borderRadius: '50px',
                paddingLeft: '2rem',
                paddingTop: '.25rem',
                paddingBottom: '.25rem',
                justifyContent: 'center',
            }} variant={'standard'} {...props} placeholder={props.placeholder} value={props.content}
                       onChange={(e: ChangeEvent<HTMLInputElement>) => props.setContent(e.target.value)} InputProps={{
                endAdornment:
                    <Tooltip title={'Search'}>
                        <IconButton sx={{mr: 2}} onClick={props.make}>
                            <SearchIcon/>
                        </IconButton>
                    </Tooltip>
            }}/>
        </Grid>
    );
};

export default SearchBar;