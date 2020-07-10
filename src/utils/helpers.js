/////
// Helper functions
/////

// To get variable/params from URL
// Eg. getQueryVariable("table") retrieves "A1" form "localhost:3000/?table=A1&status=open"
const getQueryVariable = (variable) => {
  var query = window.location.search.substring(1);
  var vars = query.split('&');

  for (var i = 0; i < vars.length; i++) {
    var pair = vars[i].split('=');
    if (pair[0] === variable) {
      return pair[1];
    }
  }

  return;
};

module.exports = { getQueryVariable };
