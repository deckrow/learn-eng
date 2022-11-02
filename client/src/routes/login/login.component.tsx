import { ChangeEvent, FC, FormEvent, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLoginMutation } from '../../app/services/auth/auth.service';

const Login: FC = () => {
  const navigate = useNavigate();
  const [login, { isSuccess }] = useLoginMutation();

  const [email, setEmail] = useState('admin@gmail.com');
  const [password, setPassword] = useState('12345678');

  useEffect(() => {
    if (isSuccess) {
      navigate('/words');
    }
  }, [isSuccess, navigate]);

  const onEmailChanged = (e: ChangeEvent<HTMLInputElement>) =>
    setEmail(e.target.value);
  const onPasswordChanged = (e: ChangeEvent<HTMLInputElement>) =>
    setPassword(e.target.value);

  const onFormSubmited = async (e: FormEvent) => {
    e.preventDefault();

    await login({ email, password });
  };

  return (
    <div>
      <h1>Some title</h1>

      <form onSubmit={onFormSubmited}>
        <input
          type='text'
          name='email'
          placeholder='Your email'
          value={email}
          onChange={onEmailChanged}
        />

        <input
          type='text'
          name='password'
          placeholder='Your password'
          value={password}
          onChange={onPasswordChanged}
        />

        <button type='submit'>Login</button>
      </form>
    </div>
  );
};

export default Login;
