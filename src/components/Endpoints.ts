// const base = 'https://citizenmata-staging.herokuapp.com:443/citizenmata/api';
// const base = 'https://citizenmata-preprod.herokuapp.com:443/citizenmata/api';
// const base = 'https://registration-center.herokuapp.com:443/citizenmata/api';
// const base2 = 'https://citizenmata-main.herokuapp.com:443/api/v1/civicdata/citizenstatus';
const base = "https://server.civily.africa/api"


export const EndPoints = {

  // get state
  getState: base + "/state/all",

  // get local government
  getlga: base + "/localgovernment/stateLgas?stateCode=",

  // submit add center
  addCenter: base + "/voter/registration/center/lga/registrationCenter/",

  // add waitlist
  waitlist: base + "/waitinglist/subscribe/",

  // citizen status
  getStatus: base + "/v1/civicdata/citizenstatus",
  
};
