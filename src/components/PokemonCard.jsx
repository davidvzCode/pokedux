import { Card } from 'antd'
import Meta from 'antd/lib/card/Meta'
import StartButton from './StartButton'
import React from 'react'
import { useDispatch } from 'react-redux'
//import { setFavorite } from '../actions'
import { setFavorite } from '../slices/dataSlice'

const PokemonCard = ({ name, image, abilities, id, favorite }) => {
    const dispatch = useDispatch()
    const handleOnFavorite = () => {
        dispatch(setFavorite({ pokemonId: id }))
    }
    return (
        <Card
            title={name}
            cover={<img src={image} alt={name}></img>}
            extra={
                <StartButton isFavorite={favorite} onClick={handleOnFavorite} />
            }
        >
            <Meta
                description={abilities
                    .map((abilitie) => abilitie.ability.name)
                    .join(', ')}
            />
        </Card>
    )
}

export default PokemonCard
