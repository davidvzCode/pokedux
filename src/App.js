import { Col } from 'antd'
import Searcher from './components/Searcher'
import PokemonList from './components/PokemonList'
import Logo from './static/logo.svg'
import { getPokemon } from './api/index'
import { setPokemons } from './actions'
import { useDispatch, useSelector } from 'react-redux'

import './App.css'
import React from 'react'

function App() {
    const pokemons = useSelector((state) => state.pokemons)
    const dispatch = useDispatch()

    React.useEffect(() => {
        const fetchPokemons = async () => {
            const pokemonRes = await getPokemon()
            dispatch(setPokemons(pokemonRes))
        }
        fetchPokemons()
    }, [])

    return (
        <div className="App">
            <Col span={4} offset={10}>
                <img src={Logo} alt="Pokedux" />
            </Col>
            <Col span={8} offset={8}>
                <Searcher />
            </Col>
            <PokemonList pokemons={pokemons} />
        </div>
    )
}

export default App
