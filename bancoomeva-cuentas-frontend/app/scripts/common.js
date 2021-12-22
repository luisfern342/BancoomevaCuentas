window.BASE_URL = 'http://localhost:8080/api';

function loadData(url) {
  return new Promise((resolve, reject) => {
    $.ajax({
      method: 'GET',
      url: url,
      dataType: 'json'
    }).done(data => {
      resolve(data);
    }).fail(error => {
      reject(error);
    });
  });
}


function loadDataWithPost(url, data) {
  return new Promise((resolve, reject) => {
    $.ajax({
      data: JSON.stringify(data),
      method: 'POST',
      url: url,
      dataType: 'json',
      headers: {
        'Content-Type': 'application/json'
      }
    }).done(data => {
      resolve(data);
    }).fail(error => {
      reject(error);
    });
  });
}

function sendData(url, data, method='POST') {
  return new Promise((resolve, reject) => {
    $.ajax({
      contentType: 'application/json; charset=UTF-8',
      data: JSON.stringify(data),
      dataType: 'json',
      method: method,
      url: url
    }).done(data => {
      resolve(data);
    }).fail(error => {
      reject(error);
    });
  });
}
