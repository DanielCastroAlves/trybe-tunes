import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../componets/Header';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import Carregando from '../componets/Carregando';
import './aquivos.css/search.css';

class Search extends React.Component {
  constructor() {
    super();
    this.state = {
      nomePesquisado: '',
      estaCarregando: false,
      disabled: true,
      listaAlbuns: [],
      pesquisou: false,
      nomePesquisadoSalvado: '',
    };
  }

handleChange = (e) => {
  const numMinCarcter = 2;
  const tamanhoDoValue = e.target.value.length;
  if (tamanhoDoValue >= numMinCarcter) {
    this.setState({
      disabled: false,
    });
  } else {
    this.setState({
      nomePesquisado: e.target.value,
    });
  }
  this.setState({
    nomePesquisado: e.target.value,

  });
}

handleClick = async (event) => {
  event.preventDefault();
  const { nomePesquisado } = this.state;
  this.setState({
    estaCarregando: true,
  });

  const albuns = await searchAlbumsAPI(nomePesquisado);
  this.setState({
    nomePesquisado: '',
    estaCarregando: false,
    listaAlbuns: albuns,
    nomePesquisadoSalvado: nomePesquisado,
    pesquisou: true,
  });
}

render() {
  const {
    nomePesquisado,
    disabled,
    estaCarregando,
    listaAlbuns,
    pesquisou,
    nomePesquisadoSalvado,
  } = this.state;
  return (
    <div>
      <Header />

      <div data-testid="page-search" className="container-search">

        <form className="form-search">
          <label htmlFor="login">
            <input
              data-testid="search-artist-input"
              type="text"
              value={ nomePesquisado }
              placeholder="Nome do artista"
              onChange={ this.handleChange }
            />
          </label>
          <button
            data-testid="search-artist-button"
            type="submit"
            disabled={ disabled }
            onClick={ this.handleClick }
          >
            <h3>Pesquisa</h3>
          </button>
        </form>
        <section className="container-musicCard-search">
          <div className="carregando">

            {estaCarregando === true ? <Carregando /> : null }
          </div>

          {listaAlbuns.length === 0 && pesquisou === true ? (
            <span>Nenhum álbum foi encontrado</span>
          ) : null }

          {listaAlbuns.length > 0 ? (
            <>
              <div className="title-resultado-pesquisa">

                <h3>
                  Resultado de álbuns de
                  {' '}
                  {nomePesquisadoSalvado }
                  {':'}
                </h3>
              </div>
              <div className="container-cards">
                <ul className="container-card-albuns">

                  {listaAlbuns.map((album) => (

                    <li key={ album.collectionId }>

                      <Link
                        style={ { textDecoration: 'none' } }
                        to={ `/album/${album.collectionId}` }
                        data-testid={ `link-to-album-${album.collectionId}` }
                      >
                        <div className="card">

                          <img
                            src={ album.artworkUrl100 }
                            alt={ album.collectionName }
                            width="100px"
                          />
                          <h3>{ album.collectionName }</h3>
                        </div>
                      </Link>
                    </li>
                  ))}

                </ul>
              </div>
            </>
          ) : null }
        </section>
      </div>
    </div>
  );
}
}

export default Search;
