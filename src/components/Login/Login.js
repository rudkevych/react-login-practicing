import React, {
  useEffect,
  useState,
  useReducer,
  useContext,
  useRef,
} from 'react';

import Card from '../UI/Card/Card';
import classes from './Login.module.css';
import Button from '../UI/Button/Button';
import Input from '../UI/Input/Input';
import AuthContext from '../../store/auth-context';

const emailReducer = (state, action) => {
  if (action.type === 'USER_INPUT') {
    return { value: action.value, isValid: action.value.includes('@') };
  }
  if (action.type === 'INPUT_BLUR') {
    return { value: state.value, isValid: state.value.includes('@') };
  }
  return { value: '', isValid: false };
};

const passwordReducer = (state, action) => {
  if (action.type === 'USER_INPUT') {
    return { value: action.value, isValid: action.value.trim().length > 6 };
  }
  if (action.type === 'INPUT_BLUR') {
    return { value: state.value, isValid: state.value.trim().length > 6 };
  }
  return { value: '', isValid: false };
};

const Login = (props) => {
  // const [enteredEmail, setEnteredEmail] = useState('');
  // const [emailIsValid, setEmailIsValid] = useState();
  // const [enteredPassword, setEnteredPassword] = useState('');
  // const [passwordIsValid, setPasswordIsValid] = useState();
  const [formIsValid, setFormIsValid] = useState(false);

  const [emailState, dispatchEmail] = useReducer(emailReducer, {
    value: '',
    isValid: null,
  });

  const [passwordState, dispatchPassword] = useReducer(passwordReducer, {
    value: '',
    isValid: null,
  });

  useEffect(() => {
    const validityCheck = setTimeout(() => {
      console.log('validity check');
      setFormIsValid(emailState.isValid && passwordState.isValid);
    }, 500);

    return () => {
      console.log('cleanup');
      clearTimeout(validityCheck);
    };
  }, [emailState.isValid, passwordState.isValid]);

  const context = useContext(AuthContext);
  const emailInputRef = useRef();
  const passwordInputRef = useRef();

  const emailChangeHandler = (event) => {
    dispatchEmail({ type: 'USER_INPUT', value: event.target.value });

    // setFormIsValid(
    //   emailState.value.includes('@') && enteredPassword.trim().length > 6
    // );
  };

  const passwordChangeHandler = (event) => {
    dispatchPassword({ type: 'USER_INPUT', value: event.target.value });

    // setFormIsValid(
    //   emailState.value.includes('@') && event.target.value.trim().length > 6
    // );
  };

  const validateEmailHandler = () => {
    dispatchEmail({ type: 'INPUT_BLUR' });
  };

  const validatePasswordHandler = () => {
    dispatchPassword({ type: 'INPUT_BLUR' });
  };

  const submitHandler = (event) => {
    event.preventDefault();
    if (formIsValid) {
      context.onLogin(emailState.value, passwordState.value);
    } else if (!emailState.isValid) {
      emailInputRef.current.focus();
    } else {
      passwordInputRef.current.focus();
    }
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <Input
          ref={emailInputRef}
          isValid={emailState.isValid}
          id='email'
          type='email'
          value={emailState.value}
          onChange={emailChangeHandler}
          onBlur={validateEmailHandler}
          label='Email'
        />
        <Input
          ref={passwordInputRef}
          isValid={passwordState.isValid}
          id='text'
          type='password'
          value={passwordState.value}
          onChange={passwordChangeHandler}
          onBlur={validatePasswordHandler}
          label='Password'
        />
        <div className={classes.actions}>
          <Button type='submit' className={classes.btn}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
