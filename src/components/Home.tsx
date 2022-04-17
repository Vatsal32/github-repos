import React, {FunctionComponent, useEffect, useState} from 'react';
import {Box, CircularProgress, Grid, useMediaQuery} from "@mui/material";
import Panel from "./Panel";
import FilterTools from "./FilterTools";

interface OwnProps {
}

type Props = OwnProps;

type Data = {
    title: string;
    desc: string;
    stars: number;
    forks: number;
    lang: string;
    author: string;
    url: string;
}

const Home: FunctionComponent<Props> = (props) => {

    const [limit, setLimit] = useState<number>(1000);

    const [page, setPage] = useState<number>(1);

    const [perPage, setPerPage] = useState<number>(10);

    const [toSearch, setToSearch] = useState<string>("");

    const [langSearch, setLang] = useState<string>("Javascript");

    const [sortBy, setSortBy] = useState<string>("");

    const [sortAs, setSortAs] = useState<string>("asc");

    const [findBy, setFindBy] = useState<string>("language");

    const [data, setData] = useState<Array<Data>>([]);

    const matches = useMediaQuery('(min-width:480px)');

    const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
        setPage(value);
    };

    useEffect(() => {
        if (toSearch === '' && langSearch === '') {
            alert("Enter at least one from Repo name or language to search.");
        } else {
            (async () => {
                setData([]);
                const temp: Array<Data> = [];

                let uri = `https://api.github.com/search/repositories?q=${toSearch === '' ? ' ' : toSearch}+language:${langSearch}`;

                if (sortBy !== '') {
                    uri = uri + `&sort=${sortBy}&order=${sortAs}`
                }

                uri = uri + `&page=${page}&per_page=${perPage}`;

                await fetch(uri, {
                        headers: {
                            'Authorization': 'token ' + process.env.REACT_APP_KEY,
                        }
                    }
                ).then(res => res.json()).then(res => {
                    if (Boolean(res.errors)) {
                        alert("Something is wrong. Please refresh the page.");
                    } else {
                        setLimit(Math.min(1000, res.total_count));
                        res.items.forEach((myData: any) => {
                            temp.push({
                                title: myData.name,
                                desc: myData.description,
                                stars: myData.stargazers_count,
                                forks: myData.forks_count,
                                lang: myData.language,
                                author: myData.owner.login,
                                url: myData.svn_url,
                            });
                        });
                    }
                }).catch(console.log);

                setData(temp);

            })();
        }
    }, [langSearch, findBy, page, perPage, sortAs, sortBy, toSearch]);

    return (
        <Grid sx={{px: matches ? 10 : 5, width: '100%', height: '100%'}}>
            <FilterTools perPage={perPage} page={page} setPage={setPage} setPerPage={setPerPage} lang={langSearch}
                         setLang={setLang} limit={limit} setData={setData}
                         sortBy={sortBy} sortAs={sortAs} content={toSearch} setContent={setToSearch}
                         handleChange={handleChange} setSortAs={setSortAs} setSortBy={setSortBy} setFindBy={setFindBy}/>
            {
                data.length === 0 ? <Box sx={{
                    alignItems: 'center',
                    justifyContent: 'center',
                    display: 'flex',
                    my: '15%'
                }}>
                    <CircularProgress/>
                </Box> : <Panel data={data}/>
            }
        </Grid>
    );
};

export default Home;
