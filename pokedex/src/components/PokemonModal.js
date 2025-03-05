import React, { useState, useEffect } from 'react';
import { Modal, Button } from 'react-bootstrap';
import axios from 'axios';

const PokemonModal = ({ show, onHide, pokemon }) => {
    const [evolutionChain, setEvolutionChain] = useState(null);

    useEffect(() => {
        const fetchEvolutionChain = async () => {
            if (pokemon) {
                try {
                    const speciesResponse = await axios.get(`https://pokeapi.co/api/v2/pokemon-species/${pokemon.id}`);
                    const evolutionChainResponse = await axios.get(speciesResponse.data.evolution_chain.url);
                    setEvolutionChain(evolutionChainResponse.data.chain);
                } catch (error) {
                    console.error('Error fetching evolution chain:', error);
                }
            }
        };

        fetchEvolutionChain();
    }, [pokemon]);

    const getEvolutionNames = async (chain) => {
        const evolutions = [];
        let currentChain = chain;

        while (currentChain) {
            const pokemonName = currentChain.species.name;
            try {
                const pokemonResponse = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
                const imageUrl = pokemonResponse.data.sprites.front_default;
                evolutions.push({ name: pokemonName, imageUrl });
            } catch (error) {
                console.error(`Error fetching image for ${pokemonName}:`, error);
                evolutions.push({ name: pokemonName, imageUrl: null });
            }
            currentChain = currentChain.evolves_to[0];
        }

        return evolutions;
    };

    if (!pokemon) return null;

    const [evolutionNames, setEvolutionNames] = useState([]);

    useEffect(() => {
        const fetchEvolutionData = async () => {
            if (evolutionChain) {
                const evolutions = await getEvolutionNames(evolutionChain);
                setEvolutionNames(evolutions);
            }
        };

        fetchEvolutionData();
    }, [evolutionChain]);

    return (
        <Modal show={show} onHide={onHide}>
            <Modal.Header closeButton className="bg-danger text-white"> 
                <Modal.Title>{pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <img src={pokemon.sprites.front_default} alt={pokemon.name} />
                <p>ID: {pokemon.id}</p>
                {/* ... más detalles del Pokémon ... */}
                {evolutionNames.length > 1 && (
                    <div>
                        <h4>Evoluciones:</h4>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            {evolutionNames.map((evolution, index) => (
                                <div key={index} style={{ textAlign: 'center', margin: '0 10px' }}>
                                    <img src={evolution.imageUrl} alt={evolution.name} style={{ width: '100px', height: '100px' }} />
                                    <p>{evolution.name.charAt(0).toUpperCase() + evolution.name.slice(1)}</p>
                                    {index < evolutionNames.length - 1 && <span style={{ margin: '0 5px' }}>-></span>}
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onHide}>Cerrar</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default PokemonModal;