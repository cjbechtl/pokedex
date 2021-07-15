import React from 'react';
import styled from 'styled-components';
// Images
import ReactLogo from '../../images/react_logo.png';
import PokeApiLogo from '../../images/pokeapi.png'

const Wrapper = styled.div`
    background: #ef5350;
    padding: 0 20px;
    margin-bottom: 20px;
    margin-top: 0;
`;

const Content = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    max-width: 1280px;
    padding: 20px 0;
    margin: 0 auto;
`;

const ReactImage = styled.img`
    width: 60px;
    
`;

const PokeApiImage = styled.img`
    width: 100px;
    
`;

export default function NavBar() {
    return (
        <Wrapper>
        <Content>
            <ReactImage src={ReactLogo} alt='react-logo'/>
            
            <PokeApiImage src={PokeApiLogo} alt='pokeapi-logo'/>
        </Content>
    </Wrapper>
    )
}
