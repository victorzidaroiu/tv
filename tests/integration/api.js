/* global describe, it */

import restler from 'restler';
import _debug from 'debug';
import dotenv from 'dotenv';

dotenv.config({ silent: true });
const debug = _debug('api-test');
const serverUrl = `http://localhost:${process.env.PORT}`;
const locations = ['LONDON', 'LIVERPOOL'];
let customerID = null;
let locationID = null;

describe('TV API', () => {
  this.timeout(5000);
  it('should create a customer', (done) => {
    locationID = locations[Date.now() % 2 === 0 ? 0 : 1];

    restler.post(`${serverUrl}/api/customer`, {
      data: {
        locationID,
      },
    }).on('success', (response) => {
      debug('Returned Data: ', response);

      if (response.error === false) {
        customerID = response.data.customerID;
        done();
      }
    });
  });

  it('should update a customer', (done) => {
    restler.put(`${serverUrl}/api/customer/${customerID}`, {
      data: {
        basket: {},
      },
    }).on('success', (response) => {
      debug('Returned Data: ', response);

      if (response.error === false) {
        done();
      }
    });
  });

  it('should get the locationID of a customer', (done) => {
    restler.get(`${serverUrl}/api/customer-location/${customerID}`).on('success', (response) => {
      debug('Returned Data: ', response);

      if (response.error === false) {
        locationID = response.data.locationID;
        done();
      }
    });
  });

  it('should get a list of products from the catalogue', (done) => {
    restler.get(`${serverUrl}/api/catalogue/${locationID}`).on('success', (response) => {
      debug('Returned Data: ', response);

      if (response.error === false) {
        done();
      }
    });
  });
});
