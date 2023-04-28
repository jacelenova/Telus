const API_BASE = "https://localhost:7265";

const getToken = () => {
  return localStorage.getItem("token");
}


export const getData = async (endpoint) => {
  return await callApi(endpoint, null, null);
}

export const deleteData = async (endpoint) => {
  return await callApi(endpoint, null, 'DELETE');
}

export const postData = async (endpoint, payload) => {
  return await callApi(endpoint, payload, 'POST');
}

export const callApi = async (endpoint, payload, method) => {
  const token = getToken();
  const config = {
    method: method ?? 'GET',
    headers: {
      "Content-Type": "application/json",
    }
  }
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }

  if (payload != null) config.body = JSON.stringify(payload);
  
  const response = await fetch(`${API_BASE}/${endpoint}`, config);
  const result = await response.json();

  return { status: 200, value: result };
}