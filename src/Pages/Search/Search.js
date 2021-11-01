import {
    Button,
    createTheme,
    Tab,
    Tabs,
    TextField,
    ThemeProvider,
} from "@material-ui/core";
import "./Search.css";
import SearchIcon from "@material-ui/icons/Search";
import { useEffect, useState } from "react";
import axios from "axios";
import Paging from "../../components/Paging/Paging";
import SingleContent from "../../components/SingleContent/SingleContent";


function Search() {
    const [type, setType] = useState(0);
    const [page, setPage] = useState(1);
    const [searchText, setSearchText] = useState("");
    const [content, setContent] = useState();
    const [numOfPages, setnumOfPages] = useState();


    const darkTheme = createTheme({
        palette: {
            type: 'dark',
            primary: {
                main: '#fff'
            }
        }
    })

    const fetchSearch = async () => {
        const { data } = await axios.get(
            `https://api.themoviedb.org/3/search/${type ? "tv" : "movie"}?api_key=${process.env.REACT_APP_API_KEY
            }&language=en-US&query=${searchText}&page=${page}&include_adult=false`
        );
        setContent(data.results);
        setnumOfPages(data.total_pages)
    }


    useEffect(() => {
        window.scroll(0, 0);
        fetchSearch();
        // eslint-disable-next-line
    }, [page, type]);
    return (
        <div>
            <ThemeProvider theme={darkTheme}>
                <div style={{ display: 'flex' }}>
                    <TextField
                        style={{ flex: 1 }}
                        className="searchBox"
                        label="Search"
                        variant="filled"
                        onChange={(e) => setSearchText(e.target.value)}
                    />

                    <Button
                        variant="contained"
                        style={{ marginLeft: 10 }}
                        onClick={fetchSearch}>
                        {""}
                        <SearchIcon />
                    </Button>
                </div>
                <Tabs
                    value={type}
                    indicatorColor='primary'
                    textColor='primary'
                    onChange={(event, newValue) => {
                        setType(newValue);
                        setType(1);
                    }}
                >
                    <Tab style={{ width: "50%" }} label="Search Movies" />
                    <Tab style={{ width: "50%" }} label="Search TV" />

                </Tabs>
            </ThemeProvider>
            <div className="movie">
                {
                    content && content.map((c) => (
                        <SingleContent
                            key={c.id}
                            id={c.id}
                            poster={c.poster_path}
                            title={c.title || c.name}
                            date={c.release_date || c.first_air_date}
                            media_type={type ? "tv" : "movie"}
                            vote_average={c.vote_average} />
                    ))
                }
                {searchText &&
                    !content &&
                    (type ? <h2>No Series Found</h2> : <h2>No Movies Found</h2>)}
            </div>
            {numOfPages > 1 && (
                <Paging setPage={setPage} numOfPages={numOfPages} />
            )}

        </div>
    )
}

export default Search
