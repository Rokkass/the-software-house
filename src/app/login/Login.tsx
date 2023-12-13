import logo from 'assets/images/logo.svg';
import './Login.css';

export const Login = () => {
  return (
    <div className="login__container">
      <div className="login__image-container" />
      <div className="login__form-container">
        <a
          href="/products"
          style={{
            alignSelf: 'flex-start',
          }}
        >
          <img src={logo} className="login__logo" alt="logo" />
        </a>
        <div className="login__form">
          <h2 className="login__header" style={{ marginBottom: '29px' }}>
            Login
          </h2>
          <form style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
            <label htmlFor="username" style={{ marginBottom: '8px' }}>
              Username
            </label>
            <input name="username" style={{ marginBottom: '22px' }} placeholder="Enter username" />
            <label htmlFor="password" style={{ marginBottom: '8px' }}>
              Password
            </label>
            <input name="password" style={{ marginBottom: '56px' }} placeholder="Enter password" />
            <button className="login__form-button">Log in</button>
          </form>
          <a href="/login" className="login__forgot-password">
            Forgot password?
          </a>
        </div>
      </div>
    </div>
  );
};
