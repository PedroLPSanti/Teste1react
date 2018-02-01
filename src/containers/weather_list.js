import React, {Component} from 'react';
import {connect} from 'react-redux';
import Chart from '../components/chart';
import GoogleMap from '../components/google_map';

class WeatherList extends Component{
	renderWeather(cityData){
		const name = cityData.city.name;
		const temp = _.map(cityData.list.map(weather => weather.main.temp),(temp)=>temp-273);
		const pressure = cityData.list.map(weather => weather.main.pressure);
		const humiditie = cityData.list.map(weather => weather.main.humidity);
		const {lon,lat} = cityData.city.coord;

		return(
			<tr key={name}>
			 	<td><GoogleMap lon={lon} lat={lat}/></td>
			 	<td>
			 		<Chart data={temp} color="red" />
			 	</td>
			 	<td>
			 		<Chart data={pressure} color="green" />
			 	</td>
			 	<td>
			 		<Chart data={humiditie} color="blue" />
			 	</td>
			</tr>
		);
	}

	render(){
		return(
			<table className="table table_hover">
				<thead>
					<tr>
						<th>City</th>
						<th>Temp</th>
						<th>Pres</th>
						<th>Humi</th>
					</tr>
				</thead>
				<tbody>
					{this.props.weather.map(this.renderWeather)}
				</tbody>
			</table>
		);
	}
}

function mapStateToProps({weather}){
	return {weather};
}

export default connect(mapStateToProps)(WeatherList);