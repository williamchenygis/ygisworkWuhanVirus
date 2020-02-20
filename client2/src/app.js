import React from 'react';
import ReactDOM from 'react-dom';
import mapboxgl from 'mapbox-gl';
import $ from 'jquery';
//import modules from './modules';
//import Navbar from 'react-bootstrap/Navbar'
import _NavBar from './modules/navbar';
import d from './modules/data';

import "./style.css";

mapboxgl.accessToken = 'pk.eyJ1IjoieWl5YW5nZ2lzIiwiYSI6ImEyM2M0YmE5MWNiMTFkOWViNDFmMjY2NzM2NmE4NmJjIn0.vtR53ah0_BF1iqMoOZWMrg';

const geodataUrl="./data/china-province.geojson";
const dailydataUrl="./data/wuhan_virus_data/";

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
			username:null,
			data:null
		};

		this.userLogin();

		this.map=null;
		this.geodata=null;
		this.dailydata=null;
	}

	componentDidMount() {

		var that=this;
		const map = new mapboxgl.Map({
			container: this.mapContainer,
			style: 'mapbox://styles/mapbox/streets-v11',
			center: [this.state.lng, this.state.lat],
			zoom: this.state.zoom
		});

		//this.setState({_map:map});

		this.map=map;

		map.on('load', function(){
			that.loadData();
		});

		//d.getDailyData(null);

		
	}

	userLogin(){
		const that=this;
		$.get( "http://localhost:3000/api/test", function( data ) {
		  that.setState({data:data.msg});
		});
	}

	loadData(){
		//var map=this.state._map;
		var map=this.map;
		var that = this;
		map.addSource('china', {
		  type: 'geojson',
		  //data: './data/china-province.geojson'
		  data: data
		});	
		map.addLayer({
			'id': 'china',
			'type': 'fill',
			'source': 'china',
			'layout': {},
			'paint': {
			'fill-color': '#088',
			'fill-opacity': 0.8
			}
		});
		//this.setState({_map:map});

		// //load geo data
		// d.getGeoData(geodataUrl).then((data) => {
		// 	that.geodata=data;
		// });
		// //load daily data
		// d.getGeoData(dailydataUrl, new Date()).then((data) => {
		// 	that.dailydata=data;
		// });

		this.map=map;
	}

	render() {

		const username=this.state.data;

		return (
			<div>
				<_NavBar/>
				
				<div ref={el => this.mapContainer = el}   className="mapContainer"/>
			</div>
		)
	}
}
 
ReactDOM.render(<Application />, document.getElementById('app'));