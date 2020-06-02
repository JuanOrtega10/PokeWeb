import React from 'react'
import './App.css';
export default class PokemonDetail extends React.Component {


    constructor(props) {
        super(props);
       
        this.state = 
        { pokemonSpecie: null, fetched: false, description: null,
         evolution_chain: null, evolution_chain_names : null, evolution_chain_pokemons: null}
    }
    fetchSpecie = () => {
        if (this.props.poke != null) {
            fetch("http://localhost:4000/species/"+this.props.poke.species.name)
                .then(res => res.json())
                .then(res => {
                    let descr = this.getDescription(res)
                    
                    this.setState({ pokemonSpecie: res, fetched: true, description: descr });
                })
        }
    }

    fetchEvolutionChain = () => {
        
        if (this.state.pokemonSpecie != null) {
            fetch("http://localhost:4000/evolution-chain/"+this.state.pokemonSpecie.evolution_chain.url.split("/evolution-chain/")[1])
                .then(res => res.json())
                .then(res => {
                    let chainNames = this.getChainPokemonNames(res);
                    let pokemons = this.getPokemonsInChain(chainNames);          
                    this.setState({ evolution_chain: res, evolution_chain_names:chainNames, evolution_chain_pokemons:pokemons});    
                }

                ) 
                    
                }
        }

    

    getChainPokemonNames = (fetchedChain) => {
        let names = []
        if(fetchedChain != null && this.state.evolution_chain_names==null){
            let chain = fetchedChain.chain;
            while(chain !=null &&chain.evolves_to[0]!=[]){
                names.push(chain.species.name)
                chain = chain.evolves_to[0];
            }
        }
        console.log(names)
        return names;
    }

    getPokemonsInChain =  (names) => {
       
        var pokemons = []
        var all = names.forEach(element => {
            fetch("http://localhost:4000/pokemon/"+element)
            .then(res => res.json())
            .then(res => {
                pokemons.push(res);
                this.setState({update: true})
                
            })
        });

        return pokemons
    }

    


    getDescription = (pokemonSpecie) => {

        let description = null;
        let found = false;
        let i = 0;
        while (this.props.poke!=null && !found) {
            if (pokemonSpecie.flavor_text_entries[i].language.name === "en") {
                found = true;
                description = pokemonSpecie.flavor_text_entries[i].flavor_text
            }
            i++;
        }
        return description;
    }
    render() {
        console.log(this.state)
        if(this.state.pokemonSpecie==null){
            this.fetchSpecie();
        }
        
        if(this.state.evolution_chain_pokemons==null){
            this.fetchEvolutionChain();
        }
        

        if (this.props.poke != null) {

            return (

                <div onChange={this.fetchSpecie} className="card col-12">
                    <div className="card-header">
                        <div  className="text-center">
                            <h3  >{this.props.poke.name}</h3>
                        </div>
                    </div>
                    <img className="card-img-top" src={this.props.poke.sprites.front_default} alt={this.props.poke.name} />
                    <div className="card-body">

                        {this.state.description != null && <div className="justify">
                            <h5>Description: </h5>
                            <p>{this.state.description} </p>

                        </div>
                        }
                        {this.state.evolution_chain_pokemons != null &&
                            <div >
                                <h5>Evolution Chain </h5>
                                
                                <div className="card-group">
                                {
                                    this.state.evolution_chain_pokemons.map((pokemon)=>
                                    <div class="card" >
                                        <div className="card-header">
                                            <div  className="text-center" id="pokemonName">
                                                <h6>{pokemon.name}</h6>
                                            </div>
                                        </div>
                                        <img className="card-img-top" src={pokemon.sprites.front_default} alt={pokemon.name} />
                                        <div class="card-body">
                                        
                                        </div>
                                    </div>
                                    )}

                                </div>
                            </div>
                        }
                        <h6>Default:</h6>
                                <div className="row">
                                    <div className="col-6">
                                        <img class="rounded mx-auto d-block" src={this.props.poke.sprites.front_default} alt="Not available"></img>
                                    </div>
                                    <div className="col-6">
                                        <img class="rounded mx-auto d-block" src={this.props.poke.sprites.back_default} alt="Not available"></img>
                                    </div>
                                </div>

                                {this.props.poke.sprites.front_female != null &&
                                    <div >
                                        <h6>Female:</h6>
                                        <div className="row">
                                            <div className="col-6">
                                                <img class="rounded mx-auto d-block" src={this.props.poke.sprites.front_female} alt="Not available"></img>
                                            </div>
                                            <div className="col-6">
                                                <img class="rounded mx-auto d-block" src={this.props.poke.sprites.back_female} alt="Not available"></img>
                                            </div>
                                        </div>
                                    </div>
                                }
                                {this.props.poke.sprites.front_shiny != null &&
                                    <div >
                                        <h6>Shiny:</h6>
                                        <div className="row">
                                            <div className="col-6">
                                                <img class="rounded mx-auto d-block" src={this.props.poke.sprites.front_shiny} alt="Not available"></img>
                                            </div>
                                            <div className="col-6">
                                                <img class="rounded mx-auto d-block" src={this.props.poke.sprites.back_shiny} alt="Not available"></img>
                                            </div>
                                        </div>
                                    </div>
                                }
                                {this.props.poke.sprites.front_shiny_female != null &&
                                    <div >
                                        <h6>Shiny Female:</h6>
                                        <div className="row">
                                            <div className="col-6">
                                                <img class="rounded mx-auto d-block" src={this.props.poke.sprites.front_shiny_female} alt="Not available"></img>
                                            </div>
                                            <div className="col-6">
                                                <img class="rounded mx-auto d-block" src={this.props.poke.sprites.back_shiny_female} alt="Not available"></img>
                                            </div>
                                        </div>
                                    </div>
                                }


                                <h6>Type(s)</h6>
                                <ul className="list-group list-group-horizontal">
                                    {this.props.poke.types.map((e, i) =>
                                        <li className="list-group-item">{e.type.name}</li>)}
                                </ul>
                                <h6>Abilities</h6>
                                <ul className="list-group">
                                    {this.props.poke.abilities.map((e, i) =>
                                        <li className="list-group-item">{e.ability.name}</li>)}
                                </ul>
                                <h6 className="card-title"> Weight: {this.props.poke.weight}</h6>
                            </div>
                </div>

            );
        }

        return (
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title">Select a Pokemon!</h5>
                        </div>
                    </div>
        );
    }

}
