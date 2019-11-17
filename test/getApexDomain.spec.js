import getApexDomain from "../src/getApexDomain";

const mockWindowWithHostname = hostname => {
  return {
    location: {
      hostname
    }
  };
};

let cookies;
const mockCookieJar = apexDomain => {
  return {
    get: jest.fn(name => {
      return cookies[name] || null;
    }),
    set: jest.fn((name, value, domain) => {
      if (domain !== ".localhost" && domain === `.${apexDomain}`) {
        cookies[name] = value;
      }
    }),
    remove: jest.fn((name, domain) => {
      if (domain === `.${apexDomain}`) {
        delete cookies[name];
      }
    })
  };
};

const runEtldTest = ({ hostname, apexDomain }) => {
  const window = mockWindowWithHostname(hostname);
  const cookieJar = mockCookieJar(apexDomain);
  expect(getApexDomain(window, cookieJar)).toBe(apexDomain);
  expect(Object.keys(cookies).length).toBe(0);
};

beforeEach(() => {
  cookies = {};
});

test("returns two segment apex domain when on subdomain", () => {
  runEtldTest({
    hostname: "a.b.c.example.com",
    apexDomain: "example.com"
  });
});

test("returns two segment apex domain when on apex domain", () => {
  runEtldTest({
    hostname: "example.com",
    apexDomain: "example.com"
  });
});

test("returns 3+ segment apex domain when on subdomain", () => {
  runEtldTest({
    hostname: "a.b.c.co.uk",
    apexDomain: "c.co.uk"
  });
});

test("returns 3+ segment apex domain when on apex domain", () => {
  runEtldTest({
    hostname: "c.co.uk",
    apexDomain: "c.co.uk"
  });
});

test("returns undefined when on localhost", () => {
  runEtldTest({
    hostname: "localhost",
    apexDomain: undefined
  });
});
