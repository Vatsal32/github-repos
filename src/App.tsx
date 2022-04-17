import React, {FunctionComponent} from 'react';
import {PaletteMode} from "@mui/material";
import {Routes, Route} from "react-router-dom";
import NavBar from "./components/NavBar";
import Home from "./components/Home";

interface OwnProps {
    colorMode: { toggleColorMode: () => void };
    mode: PaletteMode;
    theme: { palette: { background: { paper: string } } };
}

type Props = OwnProps;

const App: FunctionComponent<Props> = (props) => {

    return (
        <>
            <NavBar colorMode={props.colorMode} mode={props.mode} theme={props.theme} />
            <Routes>
                <Route path={'/'} element={<Home />}/>
            </Routes>
        </>
    );
};

export default App;
