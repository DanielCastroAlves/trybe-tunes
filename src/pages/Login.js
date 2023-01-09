import React from 'react';
import PropTypes from 'prop-types';
import { SiItunes } from 'react-icons/si';
import { createUser } from '../services/userAPI';
import Carregando from '../componets/Carregando';
import './aquivos.css/login.css';

class Login extends React.Component {
  constructor() {
    super();

    this.state = {
      disabled: true,
      user: '',
      estaCarregando: false,
    };
    this.handleChange = this.handleChange.bind(this);
    /* this.handleClick = this.handleClick.bind(this); */
  }

  handleChange(event) {
    const numMinCarcter = 3;
    this.setState({ user: event.target.value });

    if (event.target.value.length >= numMinCarcter) {
      this.setState({
        disabled: false,

      });
    } else {
      this.setState({
        disabled: true,
      });
    }
  }

  handleClick = async (event) => {
    event.preventDefault();
    this.setState({
      estaCarregando: true,
    });
    const { user } = this.state;
    console.log('clicando');

    await createUser({ name: user });
    this.setState({
      estaCarregando: false,
    });
    const { history } = this.props;
    history.push('/search');
  }

  render() {
    const {
      user,
      disabled,
      estaCarregando,
    } = this.state;

    return (
      <div data-testid="page-login" className="div-login">
        <div className="div-img-login">
          <h1>TrybeTUNES</h1>
          <SiItunes />
        </div>
        <section className="campo-login">
          <form onSubmit={ this.handleClick }>
            <label
              htmlFor="login"
            >

              <input
                data-testid="login-name-input"
                type="text"
                name="login"
                id="login"
                value={ user }
                onChange={ this.handleChange }
                placeholder="Email"
              />
            </label>
            <div className="div-button-login">

              <button
                data-testid="login-submit-button"
                type="submit"
                disabled={ disabled }
                onClick={ this.handleClick }
              >
                Entrar

              </button>
            </div>
          </form>
        </section>
        {estaCarregando === true
        && <Carregando />}
      </div>
    );
  }
}
Login.propTypes = {
  history: PropTypes.arrayOf(PropTypes.func).isRequired,
};
export default Login;
