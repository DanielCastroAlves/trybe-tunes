import React from 'react';
import PropTypes from 'prop-types';
import {
  addSong,
  getFavoriteSongs,
  removeSong,
} from '../services/favoriteSongsAPI';
import Carregando from './Carregando';
import './arquivos-componets.css/musicCard.css';

class MusicCard extends React.Component {
  constructor() {
    super();
    this.state = {
      estaCarregando: false,
      isChecked: false,
    };
  }

  componentDidMount() {
    this.musicasFavoritas();
  }

  handleClick = (event) => {
    if (event.target.checked) {
      this.addMusicasFav();
    } else {
      this.removeMusicasFav();
    }
  };

  addMusicasFav = () => {
    const { infoMusica } = this.props;
    this.setState({ estaCarregando: true, isChecked: true }, () => {
      console.log(infoMusica);
      addSong(infoMusica).then(() => {
        this.setState({ estaCarregando: false });
      });
    });
  };

  removeMusicasFav = () => {
    const { infoMusica } = this.props;
    this.setState({ estaCarregando: true, isChecked: false }, () => {
      removeSong(infoMusica).then(() => {
        this.setState({ estaCarregando: false });
      });
    });
  };

  musicasFavoritas = () => {
    const { infoMusica } = this.props;
    this.setState({ estaCarregando: true }, () => {
      getFavoriteSongs().then((data) => {
        this.setState({
          isChecked: data.some(({ trackId }) => trackId === infoMusica.trackId),
          estaCarregando: false,
        });
      });
    });
  };

  render() {
    const { infoMusica } = this.props;
    const { isChecked, estaCarregando } = this.state;

    return (
      <>
        <section className="container-card">

          <h2>{infoMusica.trackName}</h2>
          <div className="container-music">
            <audio
              data-testid="audio-component"
              src={ infoMusica.previewUrl }
              controls
            >
              <track kind="captions" />
              O seu navegador não suporta o elemento
              <code>audio</code>
            </audio>

            <label htmlFor="favorita">
              Favorita
              <input
                className="star"
                data-testid={ `checkbox-music-${infoMusica.trackId}` }
                type="checkbox"
                onChange={ this.handleClick }
                checked={ isChecked }
              />
            </label>
          </div>
        </section>
        {estaCarregando === true ? <Carregando /> : null}
      </>
    );
  }
}

MusicCard.propTypes = {
  infoMusica: PropTypes.objectOf(PropTypes.string),
}.isRequired;
export default MusicCard;
