import React, {useState, useEffect} from 'react';
import PokemonCard from './PokemonCard';
import axios from 'axios';

export default function PokemonList() {
    //TODO: need to add some pagination to see all pokemon. Right now just returning first page
    const [url, setUrl] = useState('https://pokeapi.co/api/v2/pokemon/')
    const [pokemonList, setPokemonList] = useState(null);

    useEffect(() => {
        let cancel;
        axios.get(url, {
            cancelToken: new axios.CancelToken(c => cancel = c)
        }).then(res => {
            setPokemonList(res.data.results);
        });

        return () => cancel()
    }, [url]);

    return (
        <>
        {pokemonList ? < div className = "row" > {pokemonList.map(p => ( < PokemonCard key={p.url} pokemon={p} /> ))} </div> : <h1>Loading...</h1>}
        </>
    )


    
}
