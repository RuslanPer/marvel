import {useState, useEffect, useRef} from 'react'; 
import useMarvelService from '../../services/MarvelService';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import './comicsList.scss';


const ComicsList = (props) => {
    const [comicsList, setComicsList] = useState([]);
    const [newItemLoading, setNewItemLoading] = useState(false);
    const [offset, setOffset] = useState(210);
    const [comicsEnded, setComicsEnded] = useState(false);
    const {loading, error, getAllComics} = useMarvelService();

    useEffect( () => {
        onRequest(offset, true);
    }, [])

    const onRequest = (offset, initial) => {
        initial ? setNewItemLoading(false) : setNewItemLoading(true);
        getAllComics(offset)
            .then(onComicsListLoaded);
    }

    const onComicsListLoaded = (newComicsList) => {

        let ended = false;
        if (newComicsList.length < 9) {
            ended = true;
        }

        setComicsList(comicsList => [...comicsList, ...newComicsList]);
        setNewItemLoading(newItemLoading => false);
        setOffset(offset => offset + 9);
        setComicsEnded(comicsEnded => ended);
    }

    const itemRefs = useRef([]);


    function renderItems(arr) {
        const items = arr.map((item, i) => {
            let imgStyle = {'objectFit' : 'cover'};
            if (item.thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
                imgStyle = {'objectFit' : 'unset'};
            }

            return (
                <li 
                    className="comics__item"
                    ref={el => itemRefs.current[i] = el}
                    key={item.id}>
                        <a href="#">
                            <img src={item.thumbnail} alt={item.name} style={imgStyle} className="comics__item-img"/>
                            <div className="comics__item-name">{item.name}</div>
                            <div className="comics__item-price">{item.price}</div>
                        </a>
                </li>
            )
        });

        return (
            <ul className="comics__grid">
                {items}
            </ul>
        )
    }

    const items = renderItems(comicsList);

    const errorMessage = error ? <ErrorMessage/> : null;
    const spinner = loading && !newItemLoading ? <Spinner/> : null;
   

    return (
        <div className="comics__list">
            {errorMessage}
            {spinner}
            {items}
            <button 
                className="button button__main button__long"
                disabled={newItemLoading}
                style={{'display': comicsEnded ? 'none' : 'block'}}
                onClick={ () => onRequest(offset)}>
                <div className="inner">load more</div>
            </button>
        </div>
    )


    // return (
    //     <div className="comics__list">
    //         <ul className="comics__grid">
    //             <li className="comics__item">
    //                 <a href="#">
    //                     <img src={uw} alt="ultimate war" className="comics__item-img"/>
    //                     <div className="comics__item-name">ULTIMATE X-MEN VOL. 5: ULTIMATE WAR TPB</div>
    //                     <div className="comics__item-price">9.99$</div>
    //                 </a>
    //             </li>
    //             <li className="comics__item">
    //                 <a href="#">
    //                     <img src={xMen} alt="x-men" className="comics__item-img"/>
    //                     <div className="comics__item-name">X-Men: Days of Future Past</div>
    //                     <div className="comics__item-price">NOT AVAILABLE</div>
    //                 </a>
    //             </li>
    //             <li className="comics__item">
    //                 <a href="#">
    //                     <img src={uw} alt="ultimate war" className="comics__item-img"/>
    //                     <div className="comics__item-name">ULTIMATE X-MEN VOL. 5: ULTIMATE WAR TPB</div>
    //                     <div className="comics__item-price">9.99$</div>
    //                 </a>
    //             </li>
    //             <li className="comics__item">
    //                 <a href="#">
    //                     <img src={xMen} alt="x-men" className="comics__item-img"/>
    //                     <div className="comics__item-name">X-Men: Days of Future Past</div>
    //                     <div className="comics__item-price">NOT AVAILABLE</div>
    //                 </a>
    //             </li>
    //             <li className="comics__item">
    //                 <a href="#">
    //                     <img src={uw} alt="ultimate war" className="comics__item-img"/>
    //                     <div className="comics__item-name">ULTIMATE X-MEN VOL. 5: ULTIMATE WAR TPB</div>
    //                     <div className="comics__item-price">9.99$</div>
    //                 </a>
    //             </li>
    //             <li className="comics__item">
    //                 <a href="#">
    //                     <img src={xMen} alt="x-men" className="comics__item-img"/>
    //                     <div className="comics__item-name">X-Men: Days of Future Past</div>
    //                     <div className="comics__item-price">NOT AVAILABLE</div>
    //                 </a>
    //             </li>
    //             <li className="comics__item">
    //                 <a href="#">
    //                     <img src={uw} alt="ultimate war" className="comics__item-img"/>
    //                     <div className="comics__item-name">ULTIMATE X-MEN VOL. 5: ULTIMATE WAR TPB</div>
    //                     <div className="comics__item-price">9.99$</div>
    //                 </a>
    //             </li>
    //             <li className="comics__item">
    //                 <a href="#">
    //                     <img src={xMen} alt="x-men" className="comics__item-img"/>
    //                     <div className="comics__item-name">X-Men: Days of Future Past</div>
    //                     <div className="comics__item-price">NOT AVAILABLE</div>
    //                 </a>
    //             </li>
    //         </ul>
    //         <button className="button button__main button__long">
    //             <div className="inner">load more</div>
    //         </button>
    //     </div>
    // )
}

export default ComicsList;