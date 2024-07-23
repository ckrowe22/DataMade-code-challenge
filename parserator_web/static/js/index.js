
   document.getElementById("submit").addEventListener("click", function() {
      var address = document.getElementById("address").value;
      fetch('/api/parse/?address=' + encodeURIComponent(address))
        .then(response => response.json())
        .then(data => displayResults(data))
        .catch(error => console.error('Error:', error));
  });

   function displayResults(data) {
      document.getElementById("parse-type").innerHTML = data.address_type;
      document.getElementById("address-results").style.display="block";
      
      var addressComponents = data.address_components;
      var tableBody = document.getElementById("outputTable").getElementsByTagName('tbody')[0];
      tableBody.innerHTML = '';
      
      var addresshtmlhead = `<thead>
        <tr>
          <th>Address part</th>
          <th>Tag</th>
        </tr>`
      
      var addressHtmlBody = '';
      for (var key in addressComponents) {
          if (addressComponents.hasOwnProperty(key)) {
              addressHtmlBody += '<tr>' +
                  '<td>' + addressComponents[key] + '</td>' +
                  '<td>' + key + '</td>' +
                  '</tr>';
          }
      }
      
      var addresshtmlfooter = 
      `</thead>
      <tbody>
      </tbody>`;
      
      document.getElementById("outputTable").innerHTML = addresshtmlhead + addressHtmlBody + addresshtmlfooter;
  }
