// @flow
import React, { useState, useEffect } from 'react';
import Leaflet from 'leaflet';
import { Map, TileLayer, Marker, Popup, GeoJSON } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import 'semantic-ui-css/semantic.min.css';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Button, Header } from 'semantic-ui-react';
import { getSimulationSagaAction } from './index';
import { ButtonWrapper, Content, MapWrapper } from './style';

Leaflet.Icon.Default.imagePath = '../node_modules/leaflet';
delete Leaflet.Icon.Default.prototype._getIconUrl;

Leaflet.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png')
});


type HomePageProps = {
  handleSubmit: (values: any) => void,
  history: any,
  match: any,
  most_popular_dropoff_points: any,
  most_popular_pickup_points: any
};

export function $HomePage(props: HomePageProps) {
  const { most_popular_dropoff_points, most_popular_pickup_points } = props;
  if (!most_popular_dropoff_points && !most_popular_pickup_points) {
    return null;
  }
  let dropoffFeatures = [];
  let pickupFeatures = [];
  if (most_popular_dropoff_points.length > 0 || most_popular_pickup_points.length > 0) {
    const geoObject = JSON.parse(most_popular_dropoff_points);
    dropoffFeatures = geoObject.features;
    const geoObject2 = JSON.parse(most_popular_pickup_points);
    pickupFeatures = geoObject2.features;
  }

  useEffect(() => {
    const listener = e => {
      if (e.key === 'Escape') {
        setMarkerPosition([0, 0]);
      }
    };
    window.addEventListener('keydown', listener);
    return () => {
      window.removeEventListener('keydown', listener);
    };
  }, []);

  const [markerPosition, setMarkerPosition] = useState([0, 0]);
  const position = [52.5074, 13.4253];
  const pos = [0, 0];
  return (
    <Content>
      <MapWrapper>
        <Map
          center={position}
          dragging={true}
          onClick={e => {
            setMarkerPosition([e.latlng.lat, e.latlng.lng]);
          }}
          zoom={10}
          style={{ height: '500px', width: 'auto' }}
        >
          <TileLayer
            attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {dropoffFeatures.length > 0
            ? dropoffFeatures.map(dropoff => (
                <GeoJSON
                  key={dropoff.properties.id}
                  data={dropoff}
                />
              ))
            : null}
          {pickupFeatures.length > 0
            ? pickupFeatures.map(pickup => <GeoJSON key={pickup.properties.id} data={pickup} />)
            : null}
          <Marker position={position}>
            <Popup>Son Konum</Popup>
          </Marker>
          <Marker position={markerPosition}>
            <Popup>second</Popup>
          </Marker>
        </Map>
      </MapWrapper>
      <ButtonWrapper>
        {markerPosition > pos ? (
          <Button
            primary
            position="center"
            content="Get the simulation results"
            onClick={() => props.handleSubmit([position, markerPosition])}
          />
        ) : null}
        <Header as="h2" color="black">To get some simulation results please put second point on the map. You can change the location of the second point by clicking anywhere on the map.</Header>
      </ButtonWrapper>
    </Content>
  );
}

export function mapStateToProps(state: RootState) {
  return {
    booking_distance_bins: state.simulationResult.booking_distance_bins,
    most_popular_dropoff_points: state.simulationResult.most_popular_dropoff_points,
    most_popular_pickup_points: state.simulationResult.most_popular_pickup_points
  };
}

export function mapDispatchToProps(dispatch: Object => void) {
  return {
    handleSubmit: values => dispatch(getSimulationSagaAction(values))
  };
}

export const HomePage = withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )($HomePage)
);
