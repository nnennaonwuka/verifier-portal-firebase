import { UserLoginDTO } from 'src/types/user';
import { clearUserAuth, setUser } from 'src/redux/user/reducer';
import { user } from 'src/api';
import { store } from 'src/redux';
import { Axios } from 'src/api/axios';
import { queryClient } from 'src';
import { useMutation, useQuery } from '@tanstack/react-query';
import { ShowAlert } from 'src/providers/toast';

export function useVerifierLogin() {
  return useMutation(
    (payload: UserLoginDTO) => {
      return user.login(payload); 
      // return user.mockLogin(payload); //comment this line 
    },
    {
      onSuccess: (response, variables, context) => {
        ShowAlert({ type: 'success', message: 'Sign In success' });

        Axios.defaults.headers.common[
          'Authorization'
        ] = `${response.data.token}`; //depends on the data comes

        //set Users
        store.dispatch(
          setUser({
            userId: response.data.data[0].id,
            authInfo: response.data.data[0],
            isLoggedIn: true,
            token: response.data.token,
          })
        );
      },
    }
  );
}

export const logout = () => {
  //clear all saved cache for user
  store.dispatch(clearUserAuth()); // clear user auth from redux

  //wait for route switch before clearing cache to prevent api calls
  setTimeout(() => {
    queryClient.invalidateQueries();
    delete Axios.defaults.headers.common['Authorization'];
  }, 1000);

  ShowAlert({ type: 'success', message: 'Log out successfully' });
};
