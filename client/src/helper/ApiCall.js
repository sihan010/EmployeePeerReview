const host = "https://localhost:44355";

const get = (endpoint, token) => {
  let options = {
    method: "GET",
    headers: new Headers({
      Authorization: `bearer ${token}`,
      "Content-Type": "application/json",
    }),
  };
  return fetch(`${host}/api/${endpoint}`, options)
    .then((response) => {
      if (response.status === 200) {
        return response.json();
      } else throw new Error({ errorCode: response.status });
    })
    .then((data) => {
      //console.log(data);
      return data;
    });
};

const post = (endpoint, token, requestBody) => {
  let options = {
    method: "POST",
    headers: new Headers({
      Authorization: `bearer ${token}`,
      "Content-Type": "application/json",
    }),
    body: JSON.stringify(requestBody),
  };
  return fetch(`${host}/api/${endpoint}`, options)
    .then((response) => {
      if (response.status === 200 || response.status === 201) {
        return response.json();
      } else throw new Error({ errorCode: response.status });
    })
    .then((data) => {
      //console.log(data);
      return data;
    });
};

const put = (endpoint, token, requestBody) => {
  let options = {
    method: "PUT",
    headers: new Headers({
      Authorization: `bearer ${token}`,
      "Content-Type": "application/json",
    }),
    body: JSON.stringify(requestBody),
  };
  return fetch(`${host}/api/${endpoint}`, options)
    .then((response) => {
      if (response.status === 200) {
        return response.json();
      } else throw new Error({ errorCode: response.status });
    })
    .then((data) => {
      //console.log(data);
      return data;
    });
};

const Delete = (endpoint, token) => {
  let options = {
    method: "DELETE",
    headers: new Headers({
      Authorization: `bearer ${token}`,
      "Content-Type": "application/json",
    }),
  };
  return fetch(`${host}/api/${endpoint}`, options)
    .then((response) => {
      if (response.status === 200) {
        return response.json();
      } else throw new Error({ errorCode: response.status });
    })
    .then((data) => {
      //console.log(data);
      return data;
    });
};

const postLogin = (endpoint, requestBody) => {
  let options = {
    method: "POST",
    headers: new Headers({
      "Content-Type": "application/json",
    }),
    body: JSON.stringify(requestBody),
  };
  return fetch(`${host}/api/${endpoint}`, options)
    .then((response) => {
      if (response.status === 200) {
        return response.json();
      } else throw new Error({ errorCode: response.status });
    })
    .then((data) => {
      //console.log(data);
      return data;
    });
};

export { get, post, put, Delete, postLogin };
