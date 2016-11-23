import { HTTP } from 'meteor/http';
import winston from 'winston';

const Intercom = {
  updateUser({ email, newUserId }) {
    winston.info(`Updating Intercom user ${email} ...`);

    if (email && newUserId) {
      let userId;
      try {
        const findResponse = HTTP.get(
          this._intercomUrl,
          {
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
            auth: `${process.env.INTERCOM_PAT}:`,
            query: `email=${email}`,
          }
        );
        if (findResponse && findResponse.data) {
          const user = findResponse.data;
          userId = user.id;
        }
      } catch (error) {
        winston.info(error.message);
      }

      if (userId) {
        const updateResponse = HTTP.post(
          this._intercomUrl,
          {
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
            auth: `${process.env.INTERCOM_PAT}:`,
            data: {
              id: userId,
              user_id: newUserId,
            },
          }
        );
        if (updateResponse && updateResponse.data) {
          winston.info('Done updating Intercom user.');
        }
      }
    }
  },

  _intercomUrl: 'https://api.intercom.io/users',
};

export default Intercom;
