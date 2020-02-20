import React from 'react';
import ReactDOM from 'react-dom';
import mapboxgl from 'mapbox-gl';
import $ from 'jquery';
//import modules from './modules';
//import Navbar from 'react-bootstrap/Navbar'
import _NavBar from './modules/navbar';
import d from './modules/data';
import res from './res';

const http = require('http');

import "./style.css";

mapboxgl.accessToken = res.mapboxToken;


// class _NavBar extends React.Component {

//   constructor(props) {
//     super(props);
//     this.state = {
//       lng: 5,
//       lat: 34,
//       zoom: 2,

//       //
//       username:null,
//       data:null
//     };

//   }

//   render() {
//     return (
//       <div>
        
//         <Navbar bg="dark">
//           <Navbar.Brand>Brand text</Navbar.Brand>
//         </Navbar>
//         <br />
//       </div>
//     )
//   }

// }

class Application extends React.Component {
// Code from the next few steps will go here

	constructor(props) {
		super(props);
		this.state = {
			lng: 5,
			lat: 34,
			zoom: 2,

			_map:null,

			//
			userStatus:null,
			username:null,
			data:null
		};

		//this.userLogin();


		this.map=null;
		this.geodata=null;
		this.dailydata=null;

		const options = {
		  hostname: "localhost",
		  port: 3000,
		  path: "/api/getUserInfo",
		  method: 'GET'
		}

		const req = http.request(options, res => {
		  console.log(`statusCode: ${res.statusCode}`)

		  res.on('data', d => {
		    console.log(d);
		  })
		})

		req.on('error', error => {
		  console.error(error)
		})

		req.end()
	}

	componentDidMount() {

		var that=this;

		//this.checkUserStatus();

		const map = new mapboxgl.Map({
			container: this.mapContainer,
			style: 'mapbox://styles/mapbox/streets-v11',
			center: [this.state.lng, this.state.lat],
			zoom: this.state.zoom
		});

		//this.setState({_map:map});

		this.map=map;

		map.on('load', function(){
			that.loadData(new Date());
		});

		//d.getDailyData(null);

		
	}

	checkUserStatus(){

		var that=this;

		// $.get(res.backUrl+"api/getUserInfo", function( data ) {
		// 	if(data.username){
		// 		that.setState({userStatus:true, username:data.username});
		// 	}
		// 	else{
		// 		that.setState({userStatus:false, username:null});
		// 	}
		  
		// });
		d.getUserData(res.backUrl+"api/getUserInfo")
		.then(function(userData){
			console.log(userData);
		})
		.catch(function(error){
			console.log(error);
		});
	}

	userLogin(){
		const that=this;
		console.log("use google login as default");
		// $.get(res.backUrl+"auth/google", function( data ) {
		//   that.setState({data:data.msg});
		// });

		window.open(res.backUrl+"auth/google","_self");

		//that.setState({userStatus:true, username:"test"});
	}

	loadData(date){
		//var map=this.state._map;
		var map=this.map;
		var that = this;

		d.getGeoDataRequest("http://localhost:3000/data/china-province.geojson")
		    .then(function(geoData){
		   		d.getDailyDataRequest("http://localhost:3000/data/wuhan_virus_data/", new Date()).
		    	then(function(dailyData){
		    		var tempDailyData=JSON.parse(dailyData.data);
					var tempGeoData=geoData.features;
					//console.log(tempDailyData);
					var newGeoData=d.joinData(tempGeoData,tempDailyData);
					geoData.features=newGeoData;

					geoData.features.forEach(function(geo) {
					    geo.properties.total=geo.data.total.confirm;
					});

					console.log(geoData);
					
					map.addSource('china', {
					  type: 'geojson',
					  //data: './data/china-province.geojson'
					  data: geoData
					});	
					map.addLayer({
						'id': 'china',
						'type': 'fill',
						'source': 'china',
						'layout': {},
						'paint': {
							'fill-color': [
						        'interpolate',
								['linear'],
								['get', 'total'],
								0,
								['to-color', '#00ff00'],
								1000,
								['to-color', '#ff0000']
						    ],
							'fill-opacity': 0.8
						}
					});

					that.map=map;
		    	})
		    	.catch(function(error) {
			      console.log(error);
			    });
		    	
		    })
		    .catch(function(error) {
		      console.log(error);
		    });

		// d.getGeoData(res.backUrl+"data/china-province.geojson")
	 //    .then(function(geoData){
	 //    	d.getDailyData(res.backUrl+"data/wuhan_virus_data/", date).
	 //    	then(function(dailyData){
	 //    		var tempDailyData=JSON.parse(dailyData.data);
		// 		var tempGeoData=geoData.features;
		// 		//console.log(tempDailyData);
		// 		var newGeoData=d.joinData(tempGeoData,tempDailyData);
		// 		//console.log(newGeoData);
		// 		assert.equal('data' in newGeoData[0], true);
		// 		that.geodata=newGeoData;

		// 		map.addSource('china', {
		// 		  type: 'geojson',
		// 		  //data: './data/china-province.geojson'
		// 		  data: data
		// 		});	
		// 		map.addLayer({
		// 			'id': 'china',
		// 			'type': 'fill',
		// 			'source': 'china',
		// 			'layout': {},
		// 			'paint': {
		// 			'fill-color': '#088',
		// 			'fill-opacity': 0.8
		// 			}
		// 		});
		// 		//this.setState({_map:map});

		// 		// //load geo data
		// 		// d.getGeoData(geodataUrl).then((data) => {
		// 		// 	that.geodata=data;
		// 		// });
		// 		// //load daily data
		// 		// d.getGeoData(dailydataUrl, new Date()).then((data) => {
		// 		// 	that.dailydata=data;
		// 		// });

		// 		that.map=map;

	 //    		done();
	 //    	})
	 //    	.catch(function(error) {
		//       console.log(error);
		//     });
	    	
	 //    })
	 //    .catch(function(error) {
	 //      console.log(error);
	 //    });

		
	}

	render() {

		const username=this.state.data;

		var welcomeMsg=null;

		console.log(this.state);

		if(this.state.userStatus){
			welcomeMsg="Welcome, "+this.state.username;
		}
		else{
			welcomeMsg="login";
		}

		return (
			<div>
				<_NavBar msg={welcomeMsg} onClick={() => this.userLogin()}/>
				
				<div ref={el => this.mapContainer = el}   className="mapContainer"/>
			</div>
		)
	}
}
 
ReactDOM.render(<Application />, document.getElementById('app'));