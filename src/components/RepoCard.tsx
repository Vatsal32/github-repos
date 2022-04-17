import React, {FunctionComponent} from 'react';
import {Box, Card, CardContent, Grid, Typography} from "@mui/material";

interface OwnProps {
    title: string;
    desc: string;
    stars: number;
    forks: number;
    lang: string;
    author: string;
    url: string;
}

type Props = OwnProps;

const RepoCard: FunctionComponent<Props> = (props) => {
    return (
        <Grid sx={{
            mx: 'auto', width: '30%', my: 5,
            ['@media (max-width:780px)']: { // eslint-disable-line no-useless-computed-key
                width: '100%'
            },
            textDecoration: 'none',
        }} component={'a'} href={props.url}>
            <Card sx={{
                py: '1rem', px: '1rem',
                border: 1,
                width: '100%', height: '100%',
            }}>
                <CardContent sx={{flexGrow: 2, mx: 2, display: 'block'}}>
                    <Typography variant={'body2'}>Title:</Typography>
                    <Typography variant={'h6'}>{props.title}</Typography>
                    <br/>
                    <Typography variant={'body2'}>Description:</Typography>
                    <Box component="div"
                         overflow="hidden"
                         whiteSpace="pre-line"
                         textOverflow="ellipsis"
                         height={'5rem'}>
                        <Typography sx={{fontSize: '18px'}}>{props.desc}</Typography>
                    </Box>
                    <br/>
                    <Typography variant={'body2'}>Author:</Typography>
                    <Typography variant={'body1'} sx={{fontSize: '18px'}}>{props.author}</Typography>
                    <br/>
                    <Typography variant={'body2'}>Stars:</Typography>
                    <Typography variant={'body1'} sx={{fontSize: '18px'}}>{props.stars}</Typography>
                    <br/>
                    <Typography variant={'body2'}>Forks:</Typography>
                    <Typography variant={'body1'} sx={{fontSize: '18px'}}>{props.forks}</Typography>
                    <br/>
                    <Typography variant={'body2'}>Language:</Typography>
                    <Box>
                        <Typography variant={'body1'} sx={{fontSize: '18px'}}>{props.lang}</Typography>
                    </Box>
                </CardContent>
            </Card>
        </Grid>
    );
};

export default RepoCard;
