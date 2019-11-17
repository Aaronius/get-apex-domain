import getApexDomain from "./getApexDomain";
import cookieJar from "./cookieJar";

let apexDomain;
let apexDomainRetrieved;

export default () => {
  if (!apexDomainRetrieved) {
    apexDomain = getApexDomain(window, cookieJar);
    apexDomainRetrieved = true;
  }

  return apexDomain;
};
