import React, {FunctionComponent, useState} from 'react';
import {
    Button, FormControl,
    Grid, Menu,
    MenuItem,
    Pagination,
    TextField,
    Typography,
    IconButton,
    useMediaQuery, Tooltip
} from "@mui/material";
import SearchBar from "./SearchBar";
import FilterAltIcon from '@mui/icons-material/FilterAlt';

type Data = {
    title: string;
    desc: string;
    stars: number;
    forks: number;
    lang: string;
    author: string;
    url: string;
}

interface OwnProps {
    limit: number;
    perPage: number;
    page: number;
    setPage: React.Dispatch<React.SetStateAction<number>>;
    setPerPage: React.Dispatch<React.SetStateAction<number>>;
    sortBy: string;
    sortAs: string;
    lang: string;
    content: string;
    setLang: React.Dispatch<React.SetStateAction<string>>;
    setContent: React.Dispatch<React.SetStateAction<string>>;
    handleChange: (event: React.ChangeEvent<unknown>, value: number) => void;
    setSortBy: React.Dispatch<React.SetStateAction<string>>;
    setSortAs: React.Dispatch<React.SetStateAction<string>>;
    setFindBy: React.Dispatch<React.SetStateAction<string>>;
    setData: React.Dispatch<React.SetStateAction<Array<Data>>>;
}

type Props = OwnProps;

const FilterTools: FunctionComponent<Props> = (props) => {

    const matches = useMediaQuery('(min-width:480px)');

    const [page, setPage] = useState<string>('1');

    const [data1, setdata1] = useState<string>('Javascript');

    const [data2, setdata2] = useState<string>('');

    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

    const open = Boolean(anchorEl);

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleChange = () => {
        let k: number = parseInt(page, 10);
        if (k <= 0 || k > (props.limit / props.perPage)) {
            alert("Invalid page value");
            setPage("1");
        } else {
            props.setData([]);
            props.setPage(k);
        }
    }

    const change = () => {
        props.setLang(data1);
        props.setContent(data2);
    };

    return (
        <>
            <Grid sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItem: 'center',
                my: 1,
                flexDirection: matches ? 'row' : 'column'
            }}>
                <SearchBar setContent={setdata1} placeholder={"Find Language"} content={data1} make={change} />
                <Grid sx={{width: '100%', display: 'flex', alignItem: 'center', justifyContent: 'center'}}>
                    <SearchBar setContent={setdata2} placeholder={"Find Name"} content={data2} make={change} />
                    <Tooltip title={"Set filter for your search"} sx={{height: '1rem'}}>
                        <IconButton id="filter-type" sx={{ml: 1, my: 2}}
                                    aria-controls={open ? 'filter-menu' : undefined}
                                    aria-haspopup="true"
                                    aria-expanded={open ? 'true' : undefined}
                                    onClick={handleClick}><FilterAltIcon/></IconButton>
                    </Tooltip>
                    <Menu
                        id="filter-menu"
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleClose}
                        MenuListProps={{
                            'aria-labelledby': 'filter-type',
                        }}
                    >
                        <MenuItem>
                            <TextField value={props.sortBy} label={'Sort by'} sx={{width: '7rem'}} select
                                       onChange={(e) => props.setSortBy(e.target.value)}>
                                <MenuItem value={'name'}>Name</MenuItem>
                                <MenuItem value={'stars'}>Stars</MenuItem>
                            </TextField>
                        </MenuItem>
                        <MenuItem>
                            <TextField value={props.sortAs} label={'Sort as'} sx={{width: '7rem'}} select
                                       onChange={(e) => props.setSortAs(e.target.value)}>
                                <MenuItem value={'asc'}>Ascending</MenuItem>
                                <MenuItem value={'desc'}>Descending</MenuItem>
                            </TextField>
                        </MenuItem>
                    </Menu>
                </Grid>
            </Grid>
            <Grid sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: matches ? 'row' : 'column'
            }}>
                <FormControl size='small' sx={{display: 'flex', flexDirection: 'row', justifyContent: 'center'}}>
                    <TextField
                        size={'small'}
                        select
                        value={props.perPage}
                        sx={{width: "6rem", m: 1}}
                        label={"Page Size"}
                        onChange={(e) => props.setPerPage(parseInt(e.target.value, 10))}
                    >
                        <MenuItem value={10}>10</MenuItem>
                        <MenuItem value={50}>50</MenuItem>
                        <MenuItem value={100}>100</MenuItem>
                    </TextField>
                    <Typography sx={{my: 2, mx: 1}}>Goto: </Typography>
                    <TextField sx={{width: '4rem', m: 1}} value={page} size={'small'} label={'Page'}
                               onChange={(e) => setPage(e.target.value)}/>
                    <Tooltip title={"Go to page"}>
                        <Button variant={'contained'} sx={{m: 1}} onClick={handleChange}>Go</Button>
                    </Tooltip>
                </FormControl>
                <Pagination count={Math.ceil(props.limit / props.perPage)} page={props.page} siblingCount={0}
                            onChange={props.handleChange}/>
            </Grid>
        </>
    );
};

export default FilterTools;
