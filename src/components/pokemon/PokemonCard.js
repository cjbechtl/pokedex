import React, {useState, useEffect} from 'react'
import styled from 'styled-components';
import {Link} from 'react-router-dom'

const Sprite = styled.img`
    width: 5em;
    height: 5em;
    display: none;
`;

const Card = styled.div`
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
    transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
    &:hover {
        box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22); 
    }
    -moz-user-select: none;
    -website-user-select: none;
    user-select: none;
    -o-user-select: none;
`;

const StyledLink = styled(Link)`
    text-decoration: none;
    color: black;
    &:focus,
    &:hover,
    &:visited,
    &:link,
    &:active {
        text-decoration: none;
    }

`;

export default function PokemonCard({pokemon}) {

    const [imageLoading, setImageLoading] = useState(true);
    const [tooManyRequests, setTooManyRequests] = useState(false);
    const [name, setName] = useState(pokemon.name);
    const [url, setUrl] = useState(pokemon.url)
    const [pokemonIndex, setPokemonIndex] = useState(pokemon.url.split('/')[pokemon.url.split('/').length - 2]);
    const [imageUrl, setImageUrl] = useState(`https://github.com/PokeAPI/sprites/blob/master/sprites/pokemon/${pokemonIndex}.png?raw=true`);


    return (
        <div className="col-md-3 col-sm-6 mb-5">
            <StyledLink to={`pokemon/${pokemonIndex}`}>
                <Card className="card">
                <h5 className="card-header">{pokemonIndex}</h5>
                <Sprite 
                    className="card-img-top rounded mx-auto mt-2" 
                    src={imageUrl}
                    style={
                        tooManyRequests ? {display: 'none'} :
                        imageLoading ? null : {display: 'block'}
                    }
                    onLoad={() => setImageLoading(false)}
                    onError={() => setTooManyRequests(true)}/>

                {tooManyRequests ? (
                <h6 className="mx-auto">
                    <span className="badge badge-danger">Too Many Requests</span>
                </h6>
                ) : null}
                
                <div className="card-body mx-auto">
                    <h6 className="card-title">
                        {name.toLowerCase().split(' ').map(s => s.charAt(0).toUpperCase() + s.substring(1)).join(' ')}
                    </h6>
                </div>
            </Card>
            </StyledLink>
            
            
        </div>
    )
}
