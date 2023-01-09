import React from 'react';
import PropTypes from 'prop-types';
import Header from '../componets/Header';
import getMusics from '../services/musicsAPI';
import MusicCard from '../componets/MusicCard';
import './aquivos.css/album.css';

class Album extends React.Component {
  constructor() {
    super();
    this.state = {
      listaMusicas: [],

    };
  }

  componentDidMount() {
    this.handleChange();
  }

  handleChange = async () => {
    const { match: { params: { id } } } = this.props;
    const musicas = await getMusics(id);
    this.setState({
      listaMusicas: musicas,
    });
  }

  render() {
    const { listaMusicas } = this.state;
    return (
      <div className="container">
        <Header />
        <div data-testid="page-album" className="page-album" />
        { listaMusicas.length > 0 ? (
          <section className="container-album">
            <section className="descricao-album">
              <img
                src={ listaMusicas[0].artworkUrl100 }
                alt={ listaMusicas[0].artistName }
                width="100px"
              />
              <h3 data-testid="artist-name">{listaMusicas[0].artistName}</h3>
            </section>
            <div className="nome-albumelista">

              <h4 data-testid="album-name">{listaMusicas[0].collectionName}</h4>

            </div>
            <ul>
              {listaMusicas.filter((musica) => musica.kind).map((musica) => (
                <li key={ musica.trackid }>

                  <MusicCard infoMusica={ musica } />
                </li>
              ))}
            </ul>
          </section>

        ) : null}
      </div>

    );
  }
}

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }),
}.isRequired;

export default Album;
