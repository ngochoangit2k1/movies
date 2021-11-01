import {img_300, unavailable} from '../../config/Config'
import './SingleContent.css'
import {Badge} from '@material-ui/core'
import ContentModal from '../ContentModal/ContentModal'

export default function SingleContent({
    id,
    poster,
    title,
    date,
    media_type,
    vote_average
}){

    return(
        <ContentModal  media_type={media_type} id={id}>
        
            <Badge badgeContent={vote_average} color={vote_average>8?'secondary':'primary'} />
            <div className="poster1">
            <img className="poster" src={poster?`${img_300}/${poster}`: unavailable }  alt={title}
            />
            </div>
            
            <b className="title">{title}</b>
            <span className="date">
                {media_type==='tv'?"TV searies":"Movie"}
                <span className="date">{date}</span>
            </span>
            
    
        </ContentModal>
    )
}
