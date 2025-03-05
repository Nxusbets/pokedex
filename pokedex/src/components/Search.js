import React, { useState } from 'react';
import axios from 'axios';
import PokemonCard from './PokemonCard';
import { Form, Button, Row, Col } from 'react-bootstrap';

const Search = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [pokemon, setPokemon] = useState(null);

    const handleSearch = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${searchTerm.toLowerCase()}`);
            setPokemon(response.data);
        } catch (error) {
            console.error('Error fetching Pokemon:', error);
            setPokemon(null);
        }
    };

    return (
        <div className="mb-4">
            <Row className="justify-content-center">
                <Col xs={12} md={6} lg={4}>
                    <Form onSubmit={handleSearch}>
                        <Form.Control type="text" placeholder="Buscar Pokémon" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
                        <Button className="mt-3 w-100" variant="danger" type="submit">Buscar</Button>
                    </Form>
                </Col>
            </Row>
            {pokemon && (
                <Row className="justify-content-center mt-3">
                    <Col xs={12} md={6} lg={4}>
                        <PokemonCard pokemon={pokemon} />
                    </Col>
                </Row>
            )}
        </div>
    );
};

export default Search;