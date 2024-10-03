import { createContext, useEffect, useReducer } from 'react';

// third-party
import { Chance } from 'chance';
import { jwtDecode } from 'jwt-decode';

// reducer - state management
import { LOGIN, LOGOUT } from 'store/reducers/actions';
import authReducer from 'store/reducers/auth';
import { GetWarehouseUrl } from 'api/gama';

// project-imports
import Loader from 'components/Loader';
import axios from 'utils/axios';

const chance = new Chance();

// constant
const initialState = {
  isLoggedIn: false,
  isInitialized: false,
  user: null
};

const verifyToken = (serviceToken) => {
  return true;
  // if (!serviceToken) {
  //   return false;
  // }
  // const decoded = jwtDecode(serviceToken);

  // /**
  //  * Property 'exp' does not exist on type '<T = unknown>(token: string, options?: JwtDecodeOptions | undefined) => T'.
  //  */
  // return decoded.exp > Date.now() / 1000;
};

const setSession = (serviceToken) => {
  if (serviceToken) {
    localStorage.setItem('serviceToken', serviceToken);
    axios.defaults.headers.common.Authorization = `Bearer ${serviceToken}`;
  } else {
    localStorage.removeItem('serviceToken');
    delete axios.defaults.headers.common.Authorization;
  }
};

// ==============================|| JWT CONTEXT & PROVIDER ||============================== //

const JWTContext = createContext(null);

export const JWTProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  useEffect(() => {
    const init = async () => {
      try {
        const serviceToken = localStorage.getItem('serviceToken');
        if (serviceToken && verifyToken(serviceToken)) {
          setSession(serviceToken);
          // const response = localStorage.getItem('loginnedUser');  // BURAYI KAPATTIM
          const storedUser = JSON.parse(localStorage.getItem('loginnedUser'));
          const { user } = storedUser; // burada response vardı şimdi storedUser var

          dispatch({
            type: LOGIN,
            payload: {
              isLoggedIn: true,
              user
            }
          });
        } else {
          dispatch({
            type: LOGOUT
          });
        }
      } catch (err) {
        console.error(err);
        dispatch({
          type: LOGOUT
        });
      }
    };

    init();
  }, []);

  const login = async (userName, password) => {
    const data = {
      id: 0,
      userName: userName,
      password: password,
      yetki: '',
      isActive: true
    };
    await axios
      .post(`${GetWarehouseUrl()}/api/Auth/Login`, data, {
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then((response) => {
        const { user } = response.data;
        // localStorage.setItem('loginnedUser', response.data);   // BURAYI KAPATTIM
        localStorage.setItem('loginnedUser', JSON.stringify(response.data));
        const serviceToken = 'bayram';
        setSession(serviceToken);
        dispatch({
          type: LOGIN,
          payload: {
            isLoggedIn: true,
            user
          }
        });
        return response;
      })
      .catch((err) => {
        console.log('JWT CONTEXT LOGIN', err);
      });
  };

  const register = async (email, password, firstName, lastName) => {
    // todo: this flow need to be recode as it not verified
    const id = chance.bb_pin();
    const response = await axios.post('/api/account/register', {
      id,
      email,
      password,
      firstName,
      lastName
    });
    let users = response.data;

    if (window.localStorage.getItem('users') !== undefined && window.localStorage.getItem('users') !== null) {
      const localUsers = window.localStorage.getItem('users');
      users = [
        ...JSON.parse(localUsers),
        {
          id,
          email,
          password,
          name: `${firstName} ${lastName}`
        }
      ];
    }

    window.localStorage.setItem('users', JSON.stringify(users));
  };

  const logout = () => {
    setSession(null);
    dispatch({ type: LOGOUT });
  };

  const resetPassword = async (email) => {
    console.log('email - ', email);
  };

  const updateProfile = () => {};

  if (state.isInitialized !== undefined && !state.isInitialized) {
    return <Loader />;
  }

  return <JWTContext.Provider value={{ ...state, login, logout, register, resetPassword, updateProfile }}>{children}</JWTContext.Provider>;
};

export default JWTContext;
