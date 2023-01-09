import React from 'react';
import PropTypes from 'prop-types';
import Header from '../componets/Header';
import { getUser, updateUser } from '../services/userAPI';
import Carregando from '../componets/Carregando';

class ProfileEdit extends React.Component {
  constructor() {
    super();
    this.state = {
      estaCarregando: false,
      isDisabled: true,
      name: '',
      email: '',
      image: '',
      description: '',

    };
  }

  async componentDidMount() {
    await this.dadosUser();
    this.validateButton();
  }

  handleChange = ({ target }) => {
    const { id, value } = target;
    this.setState({ [id]: value });
    this.validateButton();
  };

  verificaEmail = (email) => {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  };

  // codigo para validaçao do email tirado de:
  // https://www.horadecodar.com.br/2020/09/13/como-validar-email-com-javascript/
  validateButton = () => {
    const { email, name, image, description } = this.state;
    if (this.verificaEmail(email) && name && email && image && description) {
      this.setState({
        isDisabled: false,
      });
    } else {
      this.setState({
        isDisabled: true,
      });
    }
  }

  dadosUser = async () => {
    this.setState({ estaCarregando: false });
    const user = await getUser();
    const { name, email, image, description } = user;
    this.setState({ estaCarregando: true, name, email, image, description });
  };

  editarPerfil = async () => {
    const { history } = this.props;
    this.setState({ estaCarregando: false });
    const { name, email, image, description } = this.state;
    const obj = { name, email, image, description };
    await updateUser(obj);
    history.push('/profile');
  };

  handleClick = (event) => {
    const { history } = this.props;
    updateUser(event).then(() => {
      history.push('/profile');
    });
  }

  render() {
    const {
      isDisabled,
      estaCarregando,
      name,
      email,
      image,
      description } = this.state;

    return (
      <>
        <Header />
        <div data-testid="page-profile-edit" />

        {estaCarregando === true ? <Carregando /> : null}
        <form>
          <label htmlFor="name">
            Name:
            <input
              data-testid="edit-input-name"
              type="text"
              name="name"
              id="name"
              value={ name }
              onChange={ this.handleChange }
            />
          </label>
          <label htmlFor="email">
            Email:
            <input
              data-testid="edit-input-email"
              type="email"
              name="email"
              id="email"
              value={ email }
              onChange={ this.handleChange }
            />
          </label>
          <label htmlFor="description">
            Description:
            <input
              data-testid="edit-input-description"
              type="text"
              name="description"
              id="description"
              value={ description }
              onChange={ this.handleChange }
            />
          </label>
          <label htmlFor="image">
            Image
            <input
              data-testid="edit-input-image"
              type="text"
              name="image"
              id="image"
              value={ image }
              onChange={ this.handleChange }
            />
          </label>

          <button
            data-testid="edit-button-save"
            type="submit"
            disabled={ isDisabled }
            onClick={ this.editarPerfil }
          >
            Editar perfil

          </button>

        </form>
      </>
    );
  }
}

ProfileEdit.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,

  }),
}.isRequired;
export default ProfileEdit;
