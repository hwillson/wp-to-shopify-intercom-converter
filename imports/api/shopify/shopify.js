import { HTTP } from 'meteor/http';
import winston from 'winston';

const Shopify = {
  getAllCustomers() {
    winston.info('Loading shopify customers ...');
    let customers = [];

    let page = 1;
    let customerBatch = [];
    do {
      const response = HTTP.get(
        `${process.env.SHOPIFY_ADMIN_URL}/customers.json`,
        {
          auth: `${process.env.SHOPIFY_API_KEY}:${process.env.SHOPIFY_API_PASS}`,
          query: `page=${page}`,
          // query: `ids=4298155208&page=${page}`,

        }
      );
      if (response && response.data && (response.data.customers.length > 0)) {
        customerBatch = response.data.customers;
        customers = customers.concat(customerBatch);
        page += 1;
        winston.info(`${customers.length} customers loaded ...`);
      }
    } while (customerBatch.length > 0);

    winston.info('Done loading shopify customers.');
    return customers;
  },
};

export default Shopify;
