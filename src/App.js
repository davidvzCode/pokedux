import { Col, Spin } from 'antd'
import Searcher from './components/Searcher'
import PokemonList from './components/PokemonList'
import Logo from './static/logo.svg'
// import { getPokemon } from './api/index'
// import { getPokemonWithDetails, setLoading } from './actions'
import { shallowEqual, useDispatch, useSelector } from 'react-redux'

import './App.css'
import React from 'react'
import { fetchPokemonsWithDetails } from './slices/dataSlice'

function App() {
    const pokemons = useSelector((state) => state.data.pokemons, shallowEqual)

    // const pokemons = useSelector((state) =>
    //     state.getIn(['data', 'pokemons'], shallowEqual)
    // ).toJS()
    const loading = useSelector((state) => state.ui.loading)

    // const loading = useSelector((state) => state.getIn(['data', 'loading']))

    const dispatch = useDispatch()

    React.useEffect(() => {
        // const fetchPokemons = async () => {
        //     dispatch(setLoading(true))
        //     const pokemonRes = await getPokemon()
        //     dispatch(getPokemonWithDetails(pokemonRes))
        //     dispatch(setLoading(false))
        // }
        // fetchPokemons()
        dispatch(fetchPokemonsWithDetails())
    }, [])

    return (
        <div className="App">
            <Col span={4} offset={10}>
                <img src={Logo} alt="Pokedux" />
            </Col>
            <Col span={8} offset={8}>
                <Searcher />
            </Col>
            {loading ? (
                <Col offset={12}>
                    <Spin spinning size="large" />
                </Col>
            ) : (
                <PokemonList pokemons={pokemons} />
            )}
        </div>
    )
}

export default App
