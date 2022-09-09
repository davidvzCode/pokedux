import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { setLoading } from './uiSlice'
import { getPokemon, getPokemonDetails } from '../api'

const initialState = {
    pokemons: [],
    pokemonsFilter: [],
}

export const fetchPokemonsWithDetails = createAsyncThunk(
    'data/fetchPokemonsWithDetails',
    async (_, { dispatch }) => {
        // dispatch loader
        //fetxh
        // dispatch loader
        dispatch(setLoading(true))
        const pokemonRes = await getPokemon()
        const pokemonDetailed = await Promise.all(
            pokemonRes.map((pokemon) => getPokemonDetails(pokemon))
        )
        dispatch(setPokemons(pokemonDetailed))
        dispatch(setLoading(false))
    }
)

export const dataSlice = createSlice({
    name: 'data',
    initialState,
    reducers: {
        setPokemons: (state, action) => {
            state.pokemons = action.payload
        },
        setFavorite: (state, action) => {
            const currentPokemonIndex = state.pokemons.findIndex((pokemon) => {
                return pokemon.id === action.payload.pokemonId
            })

            const filterPokemonIndex = state.pokemonsFilter.findIndex(
                (pokemon) => {
                    return pokemon.id === action.payload.pokemonId
                }
            )

            if (currentPokemonIndex >= 0) {
                const isFavorite = state.pokemons[currentPokemonIndex].favorite
                if (filterPokemonIndex >= 0) {
                    state.pokemonsFilter[filterPokemonIndex].favorite =
                        !isFavorite
                }
                state.pokemons[currentPokemonIndex].favorite = !isFavorite
            }
        },
        setSearch: (state, action) => {
            if (action.payload.length > 0) {
                const filter = state.pokemons.filter((pokemon) => {
                    return pokemon.name.includes(action.payload.toLowerCase())
                })
                state.pokemonsFilter = filter
            } else {
                state.pokemonsFilter = []
            }
        },
    },
})

export const { setPokemons, setFavorite, setSearch } = dataSlice.actions

export default dataSlice.reducer
