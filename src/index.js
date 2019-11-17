import getApexDomain from "./getApexDomain";
import cookieJar from "./cookieJar";

let apexDomain;

export default () => {
  if (!apexDomain) {
    apexDomain = getApexDomain(window, cookieJar);
  }

  return apexDomain;
};
