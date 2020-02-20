var mongoose = require('mongoose');
var getJSON = require('get-json');
const fs = require('fs');

mongoose.connect('mongodb://localhost/data', {useNewUrlParser: true})
  .then(() =>  console.log('connection successful'))
  .catch((err) => console.error(err));

var db = mongoose.connection;

const saveGeoData = function(){
	db.once('open', function(){
	

		let rawdata = fs.readFileSync('./china-province.geojson');
		let json = JSON.parse(rawdata);
		console.log(json);
		db.collection('china_geo').insertOne(json, function(error, record){
		    if (error) throw error;
		    console.log("data saved");
		    db.close();

		});
		//.catch((err)=>console.error(err));
	})
}

const saveWuhanVirusData = function(filename){
	db.once('open', function(){
	

		let rawdata = fs.readFileSync('./wuhan_virus_data/'+filename+'.json');
		//console.log(rawdata);
		let json = JSON.parse(JSON.parse(rawdata).data);
		json.date=filename;
		console.log(json);
		db.collection('wuhan_virus').insertOne(json, function(error, record){
		    if (error) throw error;
		    console.log("data saved");
		    db.close();
		});
		//.catch((err)=>console.error(err));
	})
};

const getGeoData = function(){
	db.once('open', function(){
		db.collection('china_geo').findOne({}, function(error, record){
		    //console.log(record);

		    fs.writeFileSync('newGeo.geojson',JSON.stringify(record));

		    db.close();
		});
		//.catch((err)=>console.error(err));
	})
};

const getWuhanVirusData = function(filename){
	db.once('open', function(){
		db.collection('wuhan_virus').findOne({'date':filename}, function(error, record){
		    console.log(record);
		    db.close();
		});
		//.catch((err)=>console.error(err));
	})
};

const joinData = async function(filename){
	db.once('open', function(){

		var geoData, virusData;

		db.collection('china_geo').findOne({},function(error,record){
			geoData=record;

			console.log("load GeoData");

			db.collection('wuhan_virus').findOne({'date':filename}, function(error, record2){
			    virusData=record2;

			    console.log("load virus data");

			    var tempData = {};
				var tempDailyData=virusData.areaTree[0].children;
				//console.log(dailyData.areaTree[0]);
				tempDailyData.forEach(function(daily) {

					tempData[daily.name] = daily;
					console.log(tempData[daily.name].today);
				});

				// now do the "join":
				console.log("start join");

				var newFeatures=[];
				geoData.features.forEach(function(geo) {

					//console.log(tempData[geo.properties.NAME].today);
					if(geo.properties.newlyAdd){
						console.log(tempData[geo.properties.NAME].today);
						geo.properties.newlyAdd[filename]=tempData[geo.properties.NAME].today;
						geo.properties.total[filename]=tempData[geo.properties.NAME].total;
					}
					else{
						console.log("create new array");
						geo.properties.newlyAdd={};
						geo.properties.total={};
						geo.properties.newlyAdd[filename]=tempData[geo.properties.NAME].today;
						geo.properties.total[filename]=tempData[geo.properties.NAME].total;
					}

					geo.properties.t=tempData[geo.properties.NAME].total;

					console.log(geo.properties);
					newFeatures.push(geo);
				    
				});

				//geoData.features=newFeatures;
				//geoData.modified=true;

				var newGeoData = {"type": "FeatureCollection"};
				newGeoData.features=newFeatures;

				// Delete the document so Mongoose won't be able to save changes
				db.collection('china_geo').deleteOne({ _id: geoData._id },function(error, record){

				});

				db.collection('china_geo').insertOne(newGeoData, function(error, record){
				    if (error) throw error;
				    console.log("data saved");
				    db.close();

				});

			});
		});

	});
}

//saveGeoData();
//saveWuhanVirusData('02_13');
getGeoData();
//getWuhanVirusData('02_12');
//joinData('02_13');

//db.close();