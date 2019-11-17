const get = name => {
  var v = document.cookie.match("(^|;) ?" + name + "=([^;]*)(;|$)");
  return v ? v[2] : null;
};

const set = (name, value, domain) => {
  document.cookie = `${name}=${value};domain=${domain}`;
};

const remove = (name, domain) => {
  set(name, "", domain, new Date(0));
};

export default {
  get,
  set,
  remove
};
