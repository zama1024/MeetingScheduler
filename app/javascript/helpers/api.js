export const get = (url, params, onSuccess) => {
  let urlWithParams = url + '?' + new URLSearchParams(params)

  fetch(urlWithParams, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      throw new Error("Network response was not ok.");
    })
    .then((response) => onSuccess(response))
    .catch((error) => console.log(error.message));
};

export const post = (url, params, onSuccess, onError) => {
  const token = document.querySelector('meta[name="csrf-token"]').content;

  fetch(url, {
    method: "POST",
    headers: {
      "X-CSRF-Token": token,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(params),
  })
    .then((response) => {
        return response.json();
    })
    .then((response) => {
      if(response.errors) {
        onError(response.errors)
      } else {
        onSuccess(response)
      }
    })
    .catch((error) => onError(error.message));
};

export const put = (url, params, onSuccess, onError) => {
  const token = document.querySelector('meta[name="csrf-token"]').content;

  fetch(url, {
    method: "PUT",
    headers: {
      "X-CSRF-Token": token,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(params),
  })
    .then((response) => {
      return response.json();
    })
    .then((response) => {
      if(response.errors) {
        onError(response.errors)
      } else {
        onSuccess(response)
      }
    })
    .catch((error) => onError(error.message));
};

export const USERS_URL = '/api/v1/users'
export const SLOTS_URL = '/api/v1/slots'
export const BOOKINGS_URL = '/api/v1/bookings'