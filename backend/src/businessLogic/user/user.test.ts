import { UserAccess } from '../../dataLayer/userAccess';
import { getUser, createUser, updateUser, deleteUser } from './user';
import { CreateUserRequest } from '../../requests/CreateUserRequest';
import { generatePassword } from '../../utils/encryption';
import { UpdateUserRequest } from '../../requests/UpdateUserRequest';

jest.mock('../../dataLayer/userAccess');
jest.mock('../../utils/encryption');

describe('User business logic - createUser()', () => {
  test('createUser() accesses the data layer once', async () => {
    expect(UserAccess.prototype.createUser).not.toHaveBeenCalled();
    await createUser({ username: 'username', password: 'password' });
    expect(UserAccess.prototype.createUser).toHaveBeenCalledTimes(1);
  });

  test('createUser() passes proper parameters to the data layer', async () => {
    const createUserRequest: CreateUserRequest = { username: 'username', password: 'password' };
    await createUser(createUserRequest);
    expect(UserAccess.prototype.createUser).toHaveBeenCalledWith(
      expect.objectContaining({ username: createUserRequest.username })
    );
  });

  test("createUser() encrypts user's password", async () => {
    const createUserRequest: CreateUserRequest = { username: 'username', password: 'password' };
    await createUser(createUserRequest);
    expect(generatePassword).toBeCalled();
    expect(generatePassword).toHaveBeenCalledWith(createUserRequest.password);
  });
});

describe('User business logic - getUser()', () => {
  test('getUser() accesses the data layer once', async () => {
    expect(UserAccess.prototype.getUser).not.toHaveBeenCalled();
    await getUser('username');
    expect(UserAccess.prototype.getUser).toHaveBeenCalledTimes(1);
  });

  test('getUser() passes proper parameters to the data layer', async () => {
    const username = 'username';
    await getUser(username);
    expect(UserAccess.prototype.getUser).toHaveBeenCalledWith(username);
  });
});

describe('User business logic - updateUser()', () => {
  test('updateUser() accesses the data layer once', async () => {
    expect(UserAccess.prototype.updateUser).not.toHaveBeenCalled();
    await updateUser({ currentPassword: 'currentPaswor', newPassword: 'newPassword' }, 'username');
    expect(UserAccess.prototype.updateUser).toHaveBeenCalledTimes(1);
  });

  test('updateUser() passes proper parameters to the data layer', async () => {
    const updateUserRequest: UpdateUserRequest = { currentPassword: 'currentPasword', newPassword: 'newPassword' };
    const username = 'username';
    await updateUser(updateUserRequest, username);
    expect(UserAccess.prototype.updateUser).toHaveBeenCalledWith(updateUserRequest, username);
  });

  test("updateUser() encrypts user's new password", async () => {
    const newPassword = 'newPassword';
    await updateUser({ currentPassword: 'currentPassword', newPassword: newPassword }, 'username');
    expect(generatePassword).toBeCalled();
    expect(generatePassword).toHaveBeenCalledWith(newPassword);
  });
});

describe('User business logic - deleteUser()', () => {
  test('deleteUser() accesses the data layer once', async () => {
    expect(UserAccess.prototype.deleteUser).not.toHaveBeenCalled();
    await deleteUser('username');
    expect(UserAccess.prototype.deleteUser).toHaveBeenCalledTimes(1);
  });

  test('deleteUser() passes proper parameters to the data layer', async () => {
    const username = 'username';
    await deleteUser(username);
    expect(UserAccess.prototype.deleteUser).toHaveBeenCalledWith(username);
  });
});
