import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../componets/Header';
import { getUser } from '../services/userAPI';
import Carregando from '../componets/Carregando';

class Profile extends React.Component {
  constructor() {
    super();
    this.state = {
      login: {},
      estaCarregando: false,
    };
  }

  componentDidMount() {
    this.buscaDadosUsuario();
  }

  buscaDadosUsuario = async () => {
    this.setState({
      estaCarregando: true,
    });

    this.setState({
      estaCarregando: true,
      login: await getUser(),
    }, () => this.setState({
      estaCarregando: false }));
  }

  render() {
    const { estaCarregando, login } = this.state;
    return (

      <div data-testid="page-profile">
        Perfil
        <Header />

        {estaCarregando ? <Carregando estaCarregando={ estaCarregando } /> : (
          <div>
            <img data-testid="profile-image" src={ login.image } alt={ login.name } />
            <h2>{ login.name }</h2>
            <h3>{ login.email }</h3>
            <p>{ login.description }</p>
            <Link to="/profile/edit">
              <button type="button">
                Editar perfil
              </button>
            </Link>
          </div>

        )}
      </div>
    );
  }
}

export default Profile;
