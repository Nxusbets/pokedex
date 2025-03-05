import React, { useState } from 'react';
import Card from 'react-bootstrap/Card';
import { Button } from 'react-bootstrap';
import PokemonModal from './PokemonModal';

const PokemonCard = ({ pokemon }) => {
    const [showModal, setShowModal] = useState(false);

    const handleShow = () => setShowModal(true);
    const handleClose = () => setShowModal(false);

    const getTypeColor = (type) => {
        // ... (función getTypeColor como antes)
    };

    const typeColors = pokemon.types.map(type => getTypeColor(type.type.name));

    return (
        <div>
            <Card style={{
                width: '18rem',
                margin: '1rem',
                border: '4px solid',
                borderColor: typeColors[0],
                borderRadius: '15px',
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
                transition: 'transform 0.3s ease-in-out',
            }}
                onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
            >
                <Card.Img variant="top" src={pokemon.sprites.front_default} style={{ backgroundColor: '#f0f0f0', padding: '20px' }} />
                <Card.Body>
                    <Card.Title style={{ textAlign: 'center', fontWeight: 'bold', fontSize: '1.5rem' }}>
                        {pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}
                    </Card.Title>
                    <Card.Text style={{ textAlign: 'center' }}>
                        <strong>ID:</strong> {pokemon.id}<br />
                        <strong>Type:</strong> {pokemon.types.map((type, index) => (
                            <span
                                key={index}
                                style={{
                                    backgroundColor: typeColors[index],
                                    color: 'white',
                                    padding: '0.3rem 0.7rem',
                                    borderRadius: '20px',
                                    margin: '0.2rem',
                                    fontWeight: 'bold',
                                }}
                            >
                                {type.type.name.charAt(0).toUpperCase() + type.type.name.slice(1)}
                            </span>
                        ))}
                        <p style={{ marginTop: '10px', fontStyle: 'italic' }}>{pokemon.description}</p>
                    </Card.Text>
                    <div className="d-grid"> {/* Agrega un contenedor d-grid */}
                        <Button variant="danger" onClick={handleShow}>Ver Detalles</Button>
                    </div>
                </Card.Body>
            </Card>
            <PokemonModal show={showModal} onHide={handleClose} pokemon={pokemon} />
        </div>
    );
};

export default PokemonCard;