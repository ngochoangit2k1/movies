import React from "react";
import Pagination from '@material-ui/lab/Pagination';
import './Paging.css';
import { createTheme, ThemeProvider } from "@material-ui/core";

const darkTheme = createTheme({
    palette: {
        type: 'dark',
       
    }
})

export default function Paging({ setPage  , numOfPages = 20 }) {
   
    const handleChange = (page) => {
        
        setPage(page);
        window.scroll(0, 0);
    };
    return (
        <div className="Paging">
            <ThemeProvider theme={darkTheme}>
                <Pagination
                    onChange={(e) => handleChange(e.target.textContent)}
                    count={numOfPages}
                    hideNextButton
                    hidePrevButton
                     />
            </ThemeProvider>
        </div>
    );
}

