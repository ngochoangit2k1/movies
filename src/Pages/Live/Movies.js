import axios from "axios"
import { useEffect } from "react";
import { useState } from "react";
import Paging from "../../components/Paging/Paging";
import Generes from "../../components/SingleContent/Generes";
import SingleContent from "../../components/SingleContent/SingleContent";
import './Movies.css';
import useGenres from "../../hooks/useGenre";

function Movies() {

    const [page, setPage] = useState(1);
    const [content, setContent] = useState([]);
    
    const [selectedGenres, setSelectedGenres] = useState([]);
    const [genres, setGenres] = useState([]);
    const [numOfPages, setNumOfPages] = useState();
    const genreforURL=useGenres(selectedGenres);

    const fetchMovies = async function () {
        const { data } = await axios.get(
            `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}&with_genres=${genreforURL}`
            );
        setContent(data.results);
        setNumOfPages(data.total_pages);
       
    };

    useEffect(() => {
        window.scroll(0, 0);
        fetchMovies();
        // eslint-disable-next-line
    }, [page, genreforURL])

    return (
        <div>
            <span className="pageTitle">Movies</span>
            <Generes
                type='movie'
                selectedGenres = {selectedGenres}
                setSelectedGenres = {setSelectedGenres}
                genres = {genres}
                setGenres = {setGenres}
                setPage = {setPage}
            />
            <div className="movie">
                {
                    content && content.map((c) =>(
                        <SingleContent
                            key={c.id}
                            id={c.id}
                            poster={c.poster_path}
                            title={c.title || c.name}
                            date={c.release_date || c.first_air_date}
                            media_type="movie"
                            vote_average={c.vote_average} />
                    ))
                }
            </div>
            {numOfPages > 1 && (
                <Paging setPage={setPage} numOfPages={numOfPages} />
            )}
        </div>
    )
}

export default Movies;
