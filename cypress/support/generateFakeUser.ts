import { build } from '@jackfranklin/test-data-bot';
import { faker } from '@faker-js/faker';

export type User = {
  username: string;
  email: string;
  password: string;
};

export const createFakeUser = build<User>('User', {
  fields: {
    // -- adding 'e2e' to the end of the username to make it sure
    // -- it has at least 5 characters long
    username: faker.internet.userName() + 'e2e',
    password: faker.internet.password(),
    email: ''
  },
  postBuild: (user) => ({
    ...user,
    email: `${user.username.toLowerCase()}` + '@e2e.com'
  })
});
