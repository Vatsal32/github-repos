import React, {FunctionComponent} from 'react';
import RepoCard from "./RepoCard";
import {Grid} from "@mui/material";

interface OwnProps {
    title: string;
    desc: string;
    stars: number;
    forks: number;
    lang: string;
    url: string;
    author: string;
}

type Props = { data: Array<OwnProps> };

const Panel: FunctionComponent<Props> = (props) => {
    let i = 1;

    return (
        <Grid sx={{display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', width: '100%', height: '100%'}}>
            {
                props.data.map(item => (
                    <RepoCard {...item} key={i++} />
                ))
            }
        </Grid>
    );
};

export default Panel;
