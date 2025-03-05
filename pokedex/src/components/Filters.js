import React from 'react';
import { Form, Row, Col } from 'react-bootstrap';

const Filters = ({ onTypeChange }) => {
    return (
        <Row className="justify-content-center mb-3">
            <Col xs={12} md={6} lg={4}>
                <Form.Control as="select" onChange={onTypeChange}>
                    <option value="">Todos los Tipos</option>
                    <option value="normal">Normal</option>
                    <option value="fire">Fuego</option>
                    <option value="water">Agua</option>
                    <option value="grass">Planta</option>
                    <option value="electric">Eléctrico</option>
                    <option value="psychic">Psíquico</option>
                    <option value="ice">Hielo</option>
                    <option value="dragon">Dragón</option>
                    <option value="dark">Siniestro</option>
                    <option value="fairy">Hada</option>
                    {/* Agrega más tipos según sea necesario */}
                </Form.Control>
            </Col>
        </Row>
    );
};

export default Filters;