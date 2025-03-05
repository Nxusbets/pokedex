import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PokemonCard from './PokemonCard';
import Filters from './Filters';
import { Row, Col, Pagination } from 'react-bootstrap';

const PokemonList = () => {
    const [pokemonList, setPokemonList] = useState([]);
    const [filteredPokemon, setFilteredPokemon] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 15;
    const [selectedType, setSelectedType] = useState('');

    useEffect(() => {
        const fetchPokemonList = async () => {
            try {
                const response = await axios.get(`https://pokeapi.co/api/v2/pokemon?limit=151`);
                const results = response.data.results;
                const pokemonData = await Promise.all(results.map(async (pokemon) => {
                    const pokemonResponse = await axios.get(pokemon.url);
                    const speciesResponse = await axios.get(`https://pokeapi.co/api/v2/pokemon-species/${pokemonResponse.data.id}`);
                    const spanishFlavorText = speciesResponse.data.flavor_text_entries.find(entry => entry.language.name === 'es');
                    return {
                        ...pokemonResponse.data,
                        description: spanishFlavorText ? spanishFlavorText.flavor_text : 'No description available',
                    };
                }));
                setPokemonList(pokemonData);
            } catch (error) {
                console.error('Error fetching Pokemon list:', error);
            }
        };

        fetchPokemonList();
    }, []);

    useEffect(() => {
        applyFilters();
    }, [pokemonList, selectedType]);

    const applyFilters = () => {
        let filtered = pokemonList;

        if (selectedType) {
            filtered = filtered.filter(pokemon =>
                pokemon.types.some(type => type.type.name === selectedType)
            );
        }

        setFilteredPokemon(filtered);
        setCurrentPage(1);
    };

    const indexOfLastPokemon = currentPage * itemsPerPage;
    const indexOfFirstPokemon = indexOfLastPokemon - itemsPerPage;
    const currentPokemon = filteredPokemon.slice(indexOfFirstPokemon, indexOfLastPokemon);

    const goToNextPage = () => {
        setCurrentPage(currentPage + 1);
        window.scrollTo(0, 0);
    };

    const goToPreviousPage = () => {
        setCurrentPage(currentPage - 1);
        window.scrollTo(0, 0);
    };

    return (
        <div>
            <Filters onTypeChange={(e) => setSelectedType(e.target.value)} />
            <Row>
                {currentPokemon.map((pokemon) => (
                    <Col key={pokemon.id} xs={12} sm={6} md={4} lg={3}>
                        <PokemonCard pokemon={pokemon} />
                    </Col>
                ))}
            </Row>
            <Pagination>
                <Pagination.Prev disabled={currentPage === 1} onClick={goToPreviousPage} />
                <Pagination.Next disabled={indexOfLastPokemon >= filteredPokemon.length} onClick={goToNextPage} />
            </Pagination>
        </div>
    );
};

export default PokemonList;