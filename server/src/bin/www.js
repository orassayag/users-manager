import server from '../app.js';
import CONSTANTS from '../config/constants.config.js';
import NetworksUtils from '../utils/networks.utils.js';
import CustomEventEmitter from '../custom/event.emitter.custom.js';
import UsersController from '../controllers/users.controller.js';

// Perform here all the one-time events after the server initiated successfully.
CustomEventEmitter.on(CONSTANTS.EVENTS.SERVER_UP, async () => {
  // Load all the users and the products (Simulate to initiate the database connection).
  const users = await NetworksUtils.sendRequest({
    url: `${CONSTANTS.DATA.BASE_URL}?page=0&results=100`,
    method: 'GET',
    headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
  });
  UsersController.initiate(users.results);
});

export default server;
