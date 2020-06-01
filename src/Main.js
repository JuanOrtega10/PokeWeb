import React from 'react'
import PokemonCard from './PokemonCard'
import Pagination from '@material-ui/lab/Pagination';
import PokemonDetail from './PokemonDetail'
import './App.css';

export default class Main extends React.Component {

    state = {
        res: this.props.state,
        api: this.props.API,
        pag: 1,
        fetched: false,
        pokeSelected: null
    }

    componentDidMount() {
        this.fetchPage(null, 1)
    }
    fetchPage = (event, page) => {
        fetch("https://pokeapi.co/api/v2/pokemon/?offset=" + (page - 1) * 20 + "&limit=20")
            .then(res => res.json())
            .then(res => {
                this.setState({ res: res, fetched: true, pag: page });
                console.log(this.state);
            })

    }

    onPokeCardSelected = (pokemon) => {
        
        this.setState({pokeSelected:pokemon})
        
    }

    render() {

        if (this.state.fetched) {
            console.log(this.state.pokeSelected)
            return (
                <div className="row">
                    <div className="col-8" id="pokemons">
                        <div className="row row-cols-1 row-cols-md-2">
                            {this.state.res.results.map((e, i) =>
                                <PokemonCard API={this.props.API} key={i + (20 * (this.state.pag - 1))} pokemon={e} onPokeSelected={(this.onPokeCardSelected.bind(this))} />)}
                            <div >
                                <Pagination count={Math.ceil(this.state.res.count / 20)} color="secondary" onChange={(this.fetchPage)} />
                            </div>
                        </div>
                    </div>

                    <div className="col-4" id="detail">
                    <PokemonDetail  poke={this.state.pokeSelected} />
                    </div>
                </div>

            );
        }

        return (
            <div className="row row-cols-1 row-cols-md-2">
                <h1>Loading</h1>
            </div>
        );

    }


}
