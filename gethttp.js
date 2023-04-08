var xhr = new XMLHttpRequest();
xhr.open("GET", "https://example.com/api/data", true);
xhr.onreadystatechange = function() {
  if (xhr.readyState === 4 && xhr.status === 200) {
    var response = xhr.responseText;
    console.log(response);
  }
};
xhr.send();
