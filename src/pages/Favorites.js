import React from 'react';
import Header from '../componets/Header';
/* import { addSong, getFavoriteSongs } from '../services/favoriteSongsAPI';
 */import Carregando from '../componets/Carregando';
import MusicCard from '../componets/MusicCard';

class Favorites extends React.Component {
  constructor() {
    super();
    this.state = {
      isChecked: false,
      listaDeFavoritas: [],
    };
  }

  /* componentDidMount() {
    getFavoriteSongs().then((valor) => this.setState({
      listaDeFavoritas: valor,
    }));
  }

  atualizarListaFav = () => {
    getFavoriteSongs().then((favoritas) => this.setState({
      listaDeFavoritas: favoritas,
      isChecked: false,
    }));
  }

  verificaCheck = ({ target }) => {
    const { listaDeFavoritas } = this.state;
    this.setState({
      isChecked: true,
    }, () => {
      if (target.checked) {
        addSong(listaDeFavoritas.find((track) => track.trackName === Number(track.id)))
          .then(() => this.atualizarListaFav());
      }
    });
  } */

  render() {
    const { isChecked, listaDeFavoritas } = this.state;
    return (

      <div data-testid="page-favorites">
        <Header />

        <div>

          { isChecked ? <Carregando />
            : listaDeFavoritas.map((musica) => listaDeFavoritas.length
    && (<MusicCard
      { ...musica }
      key={ musica.trackName }
      isChecked={
        listaDeFavoritas.some((musicaFavorita) => musica.trackName
        === musicaFavorita.trackName)
      }
      verificaCheck={ this.verificaCheck }
    />
    ))}
        </div>
      </div>
    );
  }
}

export default Favorites;
