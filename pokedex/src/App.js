import React from 'react';
import PokemonList from './components/PokemonList';
import Search from './components/Search';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {
    return (
        <div className="container">
            <h1 className="text-center">Pokedex</h1>
            <h5 className='text-center'>¡Encuentra tu pokemon!</h5>
            <Search />
            <PokemonList />
        </div>
    );
}

export default App;