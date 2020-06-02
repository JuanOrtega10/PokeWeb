import React from 'react'
import PokemonCard from './PokemonCard'
import Pagination from '@material-ui/lab/Pagination';
import PokemonDetail from './PokemonDetail'
import './App.css';
import logo from './logo.png'
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
        fetch("http://localhost:4000/pokemon/?offset=" + (page - 1) * 20 + "&limit=20", {crossDomain:true})
            .then(res => res.json())
            .then(res => {
                this.setState({ res: res, fetched: true, pag: page });
                console.log(this.state);
            })

    }

    onPokeCardSelected = (pokemon) => {

        this.setState({ pokeSelected: pokemon })

    }

    render() {

        if (this.state.fetched) {

            return (
               <div>
                <nav class="navbar navbar-expand-sm bg-dark navbar-dark sticky-top">
                    <img id="logo" src={logo} alt="xd"/>
                    <a class="navbar-brand" href="#"> {"PokeWeb"}
                    
                    </a>
                    
                      <ul class="navbar-nav">
                        <li class="nav-item">
                        <a class="nav-link" href="https://github.com/JuanOrtega10/pokeAPI">Backend Repository</a>
                        </li>
                        <li class="nav-item">
                        <a class="nav-link" href="https://github.com/JuanOrtega10/PokeWeb">Frontend Repository</a>
                        </li>
                     </ul>

                </nav>
               
                <div className="row">
                        <div className="col-8" id="pokemons">
                            <div className="row row-cols-1 row-cols-md-2">
                                {this.state.res.results.map((e, i) =>
                                    <PokemonCard API={this.props.API} key={i + (20 * (this.state.pag - 1))} pokemon={e} onPokeSelected={(this.onPokeCardSelected.bind(this))} />)
                                }
                            </div>
                            <div     style={{
                                       display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        
                                        
                                    }}>
                                <Pagination count={Math.ceil(this.state.res.count / 20)} color="secondary" onChange={(this.fetchPage)} />
                            </div>
                        </div>
                        {this.state.pokeSelected != null ?
                            <div className="col-4" id="detail">
                                <PokemonDetail key={this.state.pokeSelected.id} poke={this.state.pokeSelected} />
                            </div>
                        : 
                            <div style={{
                                       display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        
                                        
                                    }} className="col-4" >
                                <h3>Select a Pokemon!</h3>
                            </div>
                        }
                        
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
