import * as React from 'react';
import ReactDOM from 'react-dom/client';
import { StyledEngineProvider } from '@mui/material/styles';
import list from './list';

ReactDOM.createRoot(document.querySelector("#root")).render(
    <StyledEngineProvider injectFirst>
    <list />
    </StyledEngineProvider>
);