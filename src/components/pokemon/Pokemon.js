import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {useParams} from 'react-router-dom';


export default function Pokemon({props}) {
    const [name, setName] = useState('');
    const params = useParams()
    const [imageUrl, setImageUrl] = useState('');
    const [pokemonIndex, setPokemonIndex] = useState(params.pokemonIndex)
    const [types, setTypes] = useState([])
    const [description, setDescription] = useState('')
    const [stats, setStats] = useState({hp: '', attack: '', defense: '', speed: '', specialAttack:'', specialDefense:''})
    const [height, setHeight] = useState('')
    const [weight, setWeight] = useState('')
    const [eggGroup, setEggGroup] = useState('')
    const [abilities, setAbilities] = useState('')
    const [genderRatioMale, setGenderRatioMale] = useState('')
    const [genderRatioFemale, setGenderRatioFeMale] = useState('')
    const [evs, setEvs] = useState('')
    const [hatchSteps, setHatchSteps] = useState('')
    const [catchRate, setCatchRate] = useState('')

    useEffect(() => {
        
        async function getData() {
            const pokemonUrl = `https://pokeapi.co/api/v2/pokemon/${pokemonIndex}/`;
            const pokemonSpeciesUrl = `https://pokeapi.co/api/v2/pokemon-species/${pokemonIndex}/`;

            const pokemonRes = await axios.get(pokemonUrl);
            setName(pokemonRes.data.name.toLowerCase().split(' ').map(s => s.charAt(0).toUpperCase() + s.substring(1)).join(' '));
            setImageUrl(pokemonRes.data.sprites.front_default);
            let hp, attack, defense, speed, specialAttack, specialDefense = '';

            pokemonRes.data.stats.map(stat => {
                switch(stat.stat.name){
                    case 'hp':
                        hp = stat['base_stat'];
                        break;
                    case 'attack':
                        attack = stat['base_stat'];
                        break;
                    case 'defense':
                        defense = stat['base_stat'];
                        break;
                    case 'speed':
                        speed = stat['base_stat'];
                        break;
                    case 'special-attack':
                        specialAttack = stat['base_stat'];
                        break;
                    case 'special-defense':
                        specialDefense = stat['base_stat'];
                        break;
                    default:
                        break;
                }
            });

            setStats({hp, attack, defense, speed, specialAttack, specialDefense});

            // convert decimeters to feet... The + 0.0001*100)/100 is for rounding
            setHeight(Math.round((pokemonRes.data.height *0.328084 + 0.0001)*100)/100);

            // convert hectograms to lbs
            setWeight(Math.round((pokemonRes.data.weight *0.220462 + 0.0001)*100)/100);

            setTypes(pokemonRes.data.types.map(type => type.type.name.toLowerCase().split('-').map(s => s.charAt(0).toUpperCase() + s.substring(1)).join(' ')));

            setAbilities(pokemonRes.data.abilities.map(ability => {
                return ability.ability.name
                .toLowerCase()
                .split('-')
                .map(s => s.charAt(0).toUpperCase() + s.substring(1))
                .join(' ');
            }));

            setEvs(pokemonRes.data.stats.filter(stat => stat.effort > 0).map(stat => {
                return `${stat.effort} ${stat.stat.name.toLowerCase().split('-').map(s => s.charAt(0).toUpperCase() + s.substring(1)).join(' ')}`;
            }).join(', '));

            await axios.get(pokemonSpeciesUrl).then(res => {
                setDescription(res.data.flavor_text_entries.find(f => f.language.name === 'en').flavor_text);
                setGenderRatioFeMale(res.data['gender_rate'] * 12.5);
                setGenderRatioMale(100 - genderRatioFemale);
                setCatchRate(Math.round(100/255 * res.data['capture_rate']));
                setEggGroup(res.data['egg_groups'].map(g => {
                    return g.name.toLowerCase().split(' ').map(s => s.charAt(0).toUpperCase() + s.substring(1)).join(' ');
                }).join(', '));

                setHatchSteps(255 * (res.data['hatch_counter']) + 1)
                
                console.log(stats)
            })

        }
        getData();

    }, [pokemonIndex]);


    return (
        <div>
            <div className="col">
                <div className="card-header">
                    <div className="row">
                        <div className="col-5">
                            <h5>{pokemonIndex}</h5>
                        </div>
                        <div className="col-7">
                            <div className="float-right">
                                {types.map(type => {
                                    return <span key={type} className="badge badge-primary badge-pill mr-1">{type}</span>
                                })}
                            </div>
                        </div>
                    </div>
                    <div className="card-body">
                        <div className="row align-items-center">
                            <div className="col-md-3">
                                <img src={imageUrl} className="card-img-top rounded mx-auto mt-2" alt="pokemon"/>
                            </div>
                            <div className="col-md-9">
                                <h4 className="mx-auto">{name}</h4>
                                <div className="row align-items-center">
                                    <div className="col-12 col-md-3">
                                        HP
                                    </div>
                                    <div className="col-12 col-md-9">
                                        <div className="progress">
                                            <div className="progress-bar" 
                                            role="progressBar" 
                                            style={{width: `${stats.hp}%`}}
                                            aria-valuenow="25"
                                            aria-valuemin="0"
                                            aria-valuemax="100">
                                                <small>{stats.hp}</small>
                                                
                                            </div>
                                        </div>
                                    </div>

                                </div>
                                <div className="row align-items-center">
                                    <div className="col-12 col-md-3">
                                        Attack
                                    </div>
                                    <div className="col-12 col-md-9">
                                        <div className="progress">
                                            <div className="progress-bar" 
                                            role="progressBar" 
                                            style={{width: `${stats.attack}%`}}
                                            aria-valuenow="25"
                                            aria-valuemin="0"
                                            aria-valuemax="100">
                                                <small>{stats.attack}</small>
                                                
                                            </div>
                                        </div>
                                    </div>

                                </div>
                                <div className="row align-items-center">
                                    <div className="col-12 col-md-3">
                                        Defense
                                    </div>
                                    <div className="col-12 col-md-9">
                                        <div className="progress">
                                            <div className="progress-bar" 
                                            role="progressBar" 
                                            style={{width: `${stats.defense}%`}}
                                            aria-valuenow="25"
                                            aria-valuemin="0"
                                            aria-valuemax="100">
                                                <small>{stats.defense}</small>
                                                
                                            </div>
                                        </div>
                                    </div>

                                </div>
                                <div className="row align-items-center">
                                    <div className="col-12 col-md-3">
                                        Speed
                                    </div>
                                    <div className="col-12 col-md-9">
                                        <div className="progress">
                                            <div className="progress-bar" 
                                            role="progressBar" 
                                            style={{width: `${stats.speed}%`}}
                                            aria-valuenow="25"
                                            aria-valuemin="0"
                                            aria-valuemax="100">
                                                <small>{stats.speed}</small>
                                                
                                            </div>
                                        </div>
                                    </div>

                                </div>
                                <div className="row align-items-center">
                                    <div className="col-12 col-md-3">
                                        Special Attack
                                    </div>
                                    <div className="col-12 col-md-9">
                                        <div className="progress">
                                            <div className="progress-bar" 
                                            role="progressBar" 
                                            style={{width: `${stats.specialAttack}%`}}
                                            aria-valuenow="25"
                                            aria-valuemin="0"
                                            aria-valuemax="100">
                                                <small>{stats.specialAttack}</small>
                                                
                                            </div>
                                        </div>
                                    </div>

                                </div>
                                <div className="row align-items-center">
                                    <div className="col-12 col-md-3">
                                        Special Defense
                                    </div>
                                    <div className="col-12 col-md-9">
                                        <div className="progress">
                                            <div className="progress-bar" 
                                            role="progressBar" 
                                            style={{width: `${stats.specialDefense}%`}}
                                            aria-valuenow="25"
                                            aria-valuemin="0"
                                            aria-valuemax="100">
                                                <small>{stats.specialDefense}</small>
                                                
                                            </div>
                                        </div>
                                    </div>

                                </div>
                                <div className="row mt-1">
                                    <div className="col">
                                        <p className="p-2">{description}</p>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                    <hr/>
                    <div className="card-body">
                        <h5 className="card-title text-center">Profile</h5>
                        <div className="row">
                            <div className="col-md-6">
                                <h6 className="float-right">Height</h6>
                            </div>
                            <div className="col-md-6">
                                <h6 className="float-left">{height}</h6>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}