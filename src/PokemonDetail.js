import React from 'react'

export default class PokemonDetail extends React.Component {



    render() {
        console.log(this.props.poke)
        if (this.props.poke != null) {
            console.log(this.props.poke)
            return (

                <div className="card col-12">
                    <img className="card-img-top" src={this.props.poke.sprites.front_default} alt={this.props.poke.name} />

                    <div className="card-body">
                        <h3 className="card-title">{this.props.poke.name}</h3>
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
