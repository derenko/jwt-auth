/** 
  @param message = not authorized
*/

class NotAuthtorizedError extends Error {
  constructor() {
    super();

    this.status = 401;
    this.message = "not authorized";
  }

  toString() {
    return this.message;
  }
}

/** 
  @param message = user or email is not valid
*/

class AuthorizationError extends Error {
  constructor() {
    super();

    this.status = 401;
    this.message = "user or email is not valid";
  }

  toString() {
    return this.message;
  }
}

/** 
  @param message = refresh token is not valid
*/

class InvalidTokenError extends Error {
  constructor() {
    super();

    this.status = 401;
    this.message = "refresh token is not valid";
  }

  toString() {
    return this.message;
  }
}

module.exports = {
  NotAuthtorizedError,
  AuthorizationError,
  InvalidTokenError,
};
