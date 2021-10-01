import services from '@/_services';
import router from './router';

export function configureInterceptor() {
  let realFetch = window.fetch;

  window.fetch = function(url, opts) {

    if (!opts) {
      opts = { method: 'get' };
    }
    if (!opts.method) {
      opts = { ...opts, method: 'get' };
    }

    if (opts['Content-Type'] === 'multipart/form-data') {
      return sendFile(url, opts);
    }

    if (opts.download) {
      delete opts.download;
      return downloadFile(url, opts);
    }

    return sendJson(url, opts);
  };

  function sendJson(url, opts) {
    return realFetch(url, {
      ...opts,
      ...headers(),
    })
      .then((response) => response.text())
      .then((response) => {
        response = response? JSON.parse(response): {};
        if (response.statusCode && +response.statusCode > 400) {
          throw response;
        }
        return response;
      })
      .catch(handlerError);
  }

  function sendFile(url, opts) {
    const formData = new FormData();

    for (const name in opts.body) {
      formData.append(name, opts.body[name]);
    }

    return realFetch(url, {
      ...opts,
      body: formData,
      ...headers('multi'),
    })
      .then((response) => response.text())
      .then((response) => {
        response = JSON.parse(response);
        if (response.statusCode && +response.statusCode > 400) {
          throw response;
        }
        return response;
      })
      .catch(handlerError);
  }

  function downloadFile(url, opts) {
    return realFetch(url, {
      ...opts,
      ...headers(),
    })
      .then((response) => response.blob())
      .then((blob) => {
        return blob;
      })
      .catch(handlerError);
  }
}

function headers(type) {
  const currentUser = services.authenticationService.currentUserValue || {};
  const authHeader = currentUser.access_token
    ? { Authorization: 'Bearer ' + currentUser.access_token }
    : {};

  let headers = {
    ...authHeader,
    'Content-Type': 'application/json',
  };

  if (type === 'multi') {
    delete headers['Content-Type'];
  }

  return {
    headers,
  };
}

function handlerError(error) {
  if (error && [401, 403].includes(error.statusCode)) {
    localStorage.removeItem('currentUser');
    router.go('/enter');
  } else {
    throw error;
  }
}
