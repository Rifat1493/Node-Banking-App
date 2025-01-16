// loginController.test.js
import { loginController } from '../src/controllers/authController';
import { loginService } from '../src/services/authService.js';

// const  loginController  = require('../src/controllers/authController.js');
// const  loginService   = require('../src/services/authService.js');


// jest.mock('../src/services/authService.js'); // Mock the service

jest.mock('../src/services/authService.js', () => ({
  loginService: jest.fn(),
}));

describe('loginController', () => {
  let req, res;

  beforeEach(() => {
    // Mock request and response
    req = {
      body: {
        email: 'test@example.com',
        password: 'securepassword',
      },
    };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
  });

  it('should return a 200 response and token on successful login', async () => {
    const mockToken = 'mocked_token';
    loginService.mockResolvedValue(mockToken); // Mock loginService success

    await loginController(req, res);

    // Assertions
    expect(loginService).toHaveBeenCalledWith('test@example.com', 'securepassword');
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ message: 'Login successful', token: mockToken });
  });

  it('should return a 500 response and error message on login failure', async () => {
    const mockError = new Error('Invalid credentials');
    loginService.mockRejectedValue(mockError); // Mock loginService failure

    await loginController(req, res);

    // Assertions
    expect(loginService).toHaveBeenCalledWith('test@example.com', 'securepassword');
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      error: 'Login failed',
      details: mockError.message,
    });
  });
});

