import React from 'react'
import './App.css';

class PokemonCard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            pokemon: this.props.pokemon,
            pokemonDetail: null,
            fetched: false
        }
    }

    componentDidMount() {
        fetch("http://localhost:4000/pokemon/"+this.props.pokemon.name)
            .then(res => res.json())
            .then(res => {
                this.setState({ pokemonDetail: res, fetched: true });
            })
    }
    render() {

        if (this.state.fetched) {
            
            return (

                <div className="card col-3" onClick={() => this.props.onPokeSelected(this.state.pokemonDetail)}>
                    <img className="card-img-top" src={this.state.pokemonDetail.sprites.front_default} alt={this.state.pokemonDetail.name} />
                    <div className="card-body">
                        <div className="justify">
                            <h3 text-align="center">{this.state.pokemonDetail.name}</h3>
                        </div>
                        <h6>Type(s)</h6>
                        <ul className="list-group list-group-horizontal">
                            {this.state.pokemonDetail.types.map((e, i) =>
                                <li className="list-group-item">{e.type.name}</li>)}
                        </ul>
                        <h6>Abilities</h6>
                        <ul className="list-group">
                            {this.state.pokemonDetail.abilities.map((e, i) =>
                                <li className="list-group-item">{e.ability.name}</li>)}
                        </ul>
                        <h6 className="card-title"> Weight: {this.state.pokemonDetail.weight}</h6>
                    </div>
                </div>


            );
        }


        return (
            <div className="card">
                <div className="card-body">
                    <h5 className="card-title">Loading</h5>
                </div>
            </div>
        );

    }

}

export default PokemonCard