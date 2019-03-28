var frm = $('#inputform');
frm.submit(function (ev) {
  const inputLatitude = parseFloat(document.getElementById("latitude").value);
  const inputLongitude = parseFloat(document.getElementById("longitude").value);

  fetchSubways(inputLatitude, inputLongitude);
  ev.preventDefault();
});

function fetchSubways(inputLat, inputLong){
    var request = new XMLHttpRequest();
    request.open('GET', 'https://data.cityofnewyork.us/api/views/he7q-3hwy/rows.json?', true);
    request.onload = function () {
        // Begin accessing JSON data here
        var data = JSON.parse(this.response);
        if (request.status >= 200 && request.status < 400) {
            var map = new Object();
            data.data.forEach(location => {
                const subwayLat = parseFloat(location[11].match(/[^\(\}]+(?=\))/)[0].split(" ")[1]); 
                const subwayLong = parseFloat(location[11].match(/[^\(\}]+(?=\))/)[0].split(" ")[0]);
                const distance = calculateDistance(inputLat, inputLong, subwayLat, subwayLong);
                map[distance] = location;
                // append to the html
            });

            // sort the distance in ascending order
            const sorted_distance = Object.keys(map).sort();

            displaydata(sorted_distance, map);

        } else {
            const textContent = "Gah, it's not working!";
            console.log("error message", textContent);
        }
    };
    request.send();
}

function displaydata(sorted_distance, map) {

  const app = document.getElementById('output-container');
  const jsonContent = document.getElementById('json-section');

  const container = document.createElement('div');
  container.setAttribute('class', 'container');

  const jsoncontainer = document.createElement('div');
  jsoncontainer.setAttribute('class', 'json-section');

  app.appendChild(container);
  jsonContent.appendChild(jsoncontainer);

  const total = 5;
  for(i=0; i< total; i++){
    var sub = map[sorted_distance[i]];

    const address = document.createElement('div');
    address.setAttribute('class', 'address');

    const jsonSection = document.createElement('div');
    jsonSection.setAttribute('class', 'address');

    // Create html tags to be append
    const longitude_ele = document.createElement('label');
    const latitude_ele = document.createElement('label');
    const distance_ele = document.createElement('label');
    const p = document.createElement('p');
    const linebreak = document.createElement("br");
    const breakline = document.createElement("br");
    const pre_ele = document.createElement("pre");
    const bold_ele = document.createElement("b");

    // Add data using above tags
    p.textContent = `Adddress: ${sub[10]}`;
    const subwayLat = parseFloat(sub[11].match(/[^\(\}]+(?=\))/)[0].split(" ")[1]); 
    const subwayLong = parseFloat(sub[11].match(/[^\(\}]+(?=\))/)[0].split(" ")[0]);

    // Adds the API data to the right container in pretty format
    longitude_ele.textContent = `Longitude: ${parseFloat(sub[11].match(/[^\(\}]+(?=\))/)[0].split(" ")[0])}`;
    latitude_ele.textContent = `Latitude: ${parseFloat(sub[11].match(/[^\(\}]+(?=\))/)[0].split(" ")[1])}`;
    distance_ele.textContent = `Distance: ${sorted_distance[i]}`;
    pre_ele.textContent = JSON.stringify(map[sorted_distance[i]], undefined, 2);
    bold_ele.textContent = `${i + 1}  `;


    container.appendChild(address);
    address.appendChild(bold_ele);
    address.appendChild(p);
    address.appendChild(longitude_ele);
    address.appendChild(linebreak);
    address.appendChild(latitude_ele);
    address.appendChild(breakline);
    address.appendChild(distance_ele);

    // updates teh data in the left section of the website in raw format
    jsoncontainer.appendChild(jsonSection);
    jsonSection.appendChild(pre_ele);

  }
}

function calculateDistance (sourceLat, sourceLong, destLat, destLong) {
  const deg2rad = 0.017453292519943295; // === Math.PI / 180
  
  const cos = Math.cos;
  sourceLat *= deg2rad;
  sourceLong *= deg2rad;
  destLat *= deg2rad;
  destLong *= deg2rad;

  const diam = 12742; // Diameter of the earth in km (2 * 6371)
  const dLat = destLat - sourceLat;
  const dLon = destLong - sourceLong;
  const a = (
    (1 - cos(dLat)) +
    (1 - cos(dLon)) * cos(sourceLat) * cos(destLat)
    ) / 2;

  return diam * Math.asin(Math.sqrt(a));
}