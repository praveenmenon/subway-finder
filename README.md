# New York City Subway Finder

## Usage

### Basic Usage

Run the index.html file in the root folder on default browser. The form consists of two fields, Latitude and Longitude. Enter a valid latitude and longitude and submit the form. On submission of the form, the algorithm calculates the closest 5 subways from the given cordinates inside New York City. 

### Functionality

The core logic is written inside the javascript/script.js file. The javacript file takes the data from html form using jquery (form submit) and calls the fetchSubways javascript function. 
* This javascript function calls the https://data.cityofnewyork.us API to fetch all subway coordinates. 
* It calls the calculateDistance function to fetch the distance between the given source and destination. The calculateDistance returns distance in killometers. 
* The fetchSubways function also calculates and sorts the subways in ascending order of distance calculated.
* Once the distances are sorted, it calls the displaydata function to display the top 5 subways in raw and pretty format.

## Bugs and Issues

* The page has to be refreshed before form is resubmitted with new data. 
* The UI is not completely responsive. Might look odd on bigger screen.

## Enhancement

* data.cityofnewyork provides query option to tweek the API response. This option could be used to improve the time complexity of the function.
* Google maps can be added to the page to provide details of subway on map with actuall distance by road.
