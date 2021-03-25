const { expect } = require('chai');
const userInfoAndPreferences = require('../../lib/user-info-and-preferences');

describe('User Info And Preferences Test Suite', () => {
  it('should throw not implemented for getPreferences', () => {
    expect(userInfoAndPreferences.getPreferences.bind()).to.throw('Not Implemented!');
  });

  it('should throw not implemented for getStreamerSubscriptionKeys', () => {
    expect(userInfoAndPreferences.getStreamerSubscriptionKeys.bind()).to.throw('Not Implemented!');
  });

  it('should throw not implemented for getUserPrincipals', () => {
    expect(userInfoAndPreferences.getUserPrincipals.bind()).to.throw('Not Implemented!');
  });

  it('should throw not implemented for updatePreferences', () => {
    expect(userInfoAndPreferences.updatePreferences.bind()).to.throw('Not Implemented!');
  });
});
