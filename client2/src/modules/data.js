const getJSON = require('get-json');
const fetch = require('node-fetch');

//get administrative boundary data in geojson
const getGeoData = (url) => {
	console.log("get geo data");

	// let getGeoDataPromise = new Promise((resolve, reject) => {
	//   	// We call resolve(...) when what we were doing asynchronously was successful, and reject(...) when it failed.
	//   	// In this example, we use setTimeout(...) to simulate async code. 
	//   	// In reality, you will probably be using something like XHR or an HTML5 API.
	//   	getJSON(url, function(data) {
	// 	    //data is the JSON string
	// 	    resolve(data);
	// 	});
	// })

	return getJSON(url);

	
}

const getUserData = (url) =>{
	let getUserDataPromise = new Promise((resolve, reject) => {
		fetch(url)
	    .then(res => res.json())
	    .then(json => resolve(json));
	});

	return getUserDataPromise;
}

const getGeoDataRequest = (url) => {
	let getGeoDataPromise = new Promise((resolve, reject) => {
		fetch(url)
	    .then(res => res.json())
	    .then(json => resolve(json));
	});

	return getGeoDataPromise;
}

//get daily update virus data
const getDailyData = (url, date) => {
	console.log("get daily data");

	const dateStr=(date.getMonth()<9?"0":"")+(date.getMonth()+1)+"_"+date.getDate();

	var new_url=url+""+dateStr+".json";

	// let getDailyDataPromise = new Promise((resolve, reject) => {
	// 	getJSON(new_url, function(data) {
	//     	//data is the JSON string
	//     	resolve(data);
	// 	});
	// });

	return getJSON(new_url);
}

const getDailyDataRequest = (url,date) => {

	console.log("get daily data");

	const dateStr=(date.getMonth()<9?"0":"")+(date.getMonth()+1)+"_"+date.getDate();

	var new_url=url+""+dateStr+".json";

	let getDailyDataPromise = new Promise((resolve, reject) => {
		fetch(new_url)
	    .then(res => res.json())
	    .then(json => resolve(json));
	});

	return getDailyDataPromise;
}

const joinData = (geoData, dailyData) => {
	var tempData = {};
	var tempDailyData=dailyData.areaTree[0].children;
	//console.log(dailyData.areaTree[0]);
	tempDailyData.forEach(function(daily) {tempData[daily.name] = daily;});

	// now do the "join":
	geoData.forEach(function(geo) {
	    geo.data = tempData[geo.properties.NAME];
	});

	return geoData;

}

const testFunc = (testVar) => {
	return testVar;
}

exports.getUserData=getUserData;
exports.getGeoData = getGeoData;
exports.getGeoDataRequest=getGeoDataRequest;
exports.getDailyData = getDailyData;
exports.getDailyDataRequest = getDailyDataRequest;
exports.testFunc=testFunc;
exports.joinData=joinData;
