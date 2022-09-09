import { Input } from 'antd'

const Searcher = ({ handleOnSearch }) => {
    return (
        <Input.Search
            placeholder="Buscar..."
            style={{ marginBottom: '10px' }}
            onChange={(event) => handleOnSearch(event.target.value)}
        />
    )
}

export default Searcher
