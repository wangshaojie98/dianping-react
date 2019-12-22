const headers = new Headers({
  "Accept": "application/json",
  "Context-Type": "application/json",
});

function get(url) {
  return fetch(url, {
    methods: "GET",
    headers: headers
  }).then(res => {
    return handleResponse(url, res);
  }).catch(err => {
    console.error(`Request failed. URL = ${url}.Message=${err}`);
    return Promise.reject({ err: { message: "Request failed." } });
  })
}

function post(url, data) {
  return fetch(url, {
    method: "POST",
    headers: headers,
    data: data
  }).then(res => {
    handleResponse(url, res);
  }).catch(err => {
    console.error(`Request failed. URL = ${url}.Message=${err}`);
    return Promise.reject({ err: { message: "Request failed." } })
  })
}

const handleResponse = (url, res) => {
  if (res.status === 200) {
    return res.json();
  } else {
    console.error(`Request failed. URL = ${url}`);
    return Promise.reject({ err: { message: "Request failed due to server error" } })
  }
}

export { get, post }