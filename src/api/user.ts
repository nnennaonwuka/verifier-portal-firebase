import { Axios } from 'src/api/axios';
import { UserLoginDTO } from 'src/types/user';


const mockUser = {
  data: [
    {
      "id": "2",
      "username": "rejoicedaniels51@gmail.com",
      "password": "$2b$10$EDn8eaJN9TSGTVoOFf/RZO4iVXcCaqLMxQHn7RoEd7VE5aIp64JFu",
      "hub": "\"not applic\"",
      "staffId": "T-1XX0000000001777"
  }
  ],
  // Replace with the desired user ID
   // User is logged in
  token: 'mockToken', // Replace with the desired token data
  
}; 


const mockLogin =  async (payload: UserLoginDTO) => {
    // Simulate a delay to mimic API response time
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Simulate a successful login response
    return {
      data: mockUser,
    };
  }

const login = async (data: UserLoginDTO) => {
  const datas = await Axios.post('/login', data);
  return datas
};

export const user = {
  login,
  mockLogin
};
