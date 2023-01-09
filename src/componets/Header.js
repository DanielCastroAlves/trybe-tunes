import React from 'react';
import { SiItunes } from 'react-icons/si';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Carregando from './Carregando';
import './arquivos-componets.css/header.css';

class Header extends React.Component {
  constructor() {
    super();
    this.state = {
      user: '',
      estaCarregando: false,
    };
  }

  componentDidMount() {
    this.getUserName();
  }
  // criei a funcao getUserName para poder usar dentro da componetDidMount

  getUserName = () => {
    this.setState({
      estaCarregando: true,
    });
    getUser().then((login) => {
      this.setState({
        user: login.name,
        estaCarregando: false,
      });
    });
  }

  render() {
    const { user, estaCarregando } = this.state;
    return (
      <>
        <div className="header">
          <header data-testid="header-component" className="header-logo-email">

            <section className="nome-logo">
              <h1>TrybeTUNES</h1>
              <SiItunes />
            </section>
            <div className="email">

              <h2 data-testid="header-user-name">{ user }</h2>
              {estaCarregando === true
        && <Carregando />}
            </div>
          </header>
        </div>
        <div className="menu">

          <div className="menu-link">

            <Link
              style={ { textDecoration: 'none' } }
              data-testid="link-to-search"
              to="/search"
            >

              <h3>

                Pesquisa
              </h3>

            </Link>
          </div>
          <div className="menu-link">

            <Link
              style={ { textDecoration: 'none' } }
              data-testid="link-to-favorites"
              to="/favorites"
            >

              <h3>

                Favoritas
              </h3>

            </Link>
          </div>
          <div className="menu-link">

            <Link
              style={ { textDecoration: 'none' } }
              data-testid="link-to-profile"
              to="/profile"
            >

              <h3>
                Perfil

              </h3>

            </Link>
          </div>
        </div>
      </>
    );
  }
}

export default Header;
