import { Meteor } from 'meteor/meteor';
import winston from 'winston';

import Shopify from '../shopify/shopify';
import Intercom from '../intercom/intercom';

const Converter = {
  run() {
    winston.info('Converting Intercom users ...');
    const shopifyCustomers = Shopify.getAllCustomers();
    shopifyCustomers.forEach((customer) => {
      Intercom.updateUser({ email: customer.email, newUserId: customer.id });
      Meteor._sleepForMs(1000);
    });
    winston.info('Done!');
  },
};

export default Converter;
