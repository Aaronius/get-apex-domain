const cookieToken = `__apex_test__`;
const getLastArrayItems = (arr, itemCount) => arr.slice(-itemCount);

/**
 * Retrieves the apex domain.
 * @param {Object} window The browser's window object
 * @param {Object} cookieJar An object with get, set, and remove methods
 * for cookie manipulation.
 * @returns {string} The apex domain.
 */
export default (window, cookieJar) => {
  if (!window.navigator.cookieEnabled) {
    throw new Error("Unable to detect apex domain without cookies enabled.");
  }

  let domain = "";

  const hostname = window.location.hostname;
  const hostParts = hostname.toLowerCase().split(".");

  for (let i = 1; i < hostParts.length + 1; i++) {
    domain = getLastArrayItems(hostParts, i).join(".");
    cookieJar.set(cookieToken, cookieToken, `.${domain}`);
    if (cookieJar.get(cookieToken)) {
      cookieJar.remove(cookieToken, `.${domain}`);
      return domain;
    }
  }

  // If we get to this point, it's likely the hostname is
  // "localhost", which is a reserved top-level domain name.
};
