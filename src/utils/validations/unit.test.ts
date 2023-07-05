import { signInValidate, signUpValidate } from '.';

describe('validations', () => {
  describe('signInValidate', () => {
    it('should not validate empty fields', () => {
      const values = { email: '', password: '' };

      expect(signInValidate(values)).toMatchObject({
        email: '"email" is not allowed to be empty',
        password: '"password" is not allowed to be empty'
      });
    });

    it('should return an invalid email error', () => {
      const values = { email: 'invalid-email', password: '1234' };
      //? toMatchInlineSnapshot returns exactly what 'signInValidate(values).email' is returning
      expect(signInValidate(values).email).toMatchInlineSnapshot(
        `"\"email\" must be a valid email"`
      );
    });
  });

  describe('signUpValidate', () => {
    it('should not validate empty fields', () => {
      const values = {
        email: '',
        password: '',
        confirmPassword: '',
        username: ''
      };

      expect(signUpValidate(values)).toMatchObject({
        email: expect.any(String), //to expect any kind of error
        password: expect.any(String),
        username: expect.any(String)
      });
    });

    it('should return short username error', () => {
      const values = {
        email: 'anna@test.com',
        password: '123456',
        confirmPassword: '123456',
        username: 'Anna'
      };

      expect(signUpValidate(values).username).toMatchInlineSnapshot(
        `"\"username\" length must be at least 5 characters long"`
      );
    });

    it('should return invalid email error', () => {
      const values = {
        email: 'anna-invalid-email',
        password: '123456',
        confirmPassword: '123456',
        username: 'Anna Smith'
      };

      expect(signUpValidate(values).email).toMatchInlineSnapshot(
        `"\"email\" must be a valid email"`
      );
    });

    it('should return an error when password does not match confirm password', () => {
      const values = {
        email: 'anna@gamil.com',
        password: '123456',
        confirmPassword: '1234567',
        username: 'Anna Smith'
      };

      expect(signUpValidate(values).confirmPassword).toMatchInlineSnapshot(
        `"confirmed password does not match with password"`
      );
    });
  });
});
