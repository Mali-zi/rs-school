import React, { Component } from 'react';
import { IPlanetListProps } from '../models/index';
import Planet from './Planet';

export default class PlanetList extends Component<IPlanetListProps> {
  render() {
    const list = this.props.planets.map((planet, index) => (
      <li key={index}>
        <Planet planet={planet} />
      </li>
    ));

    return (
      <ul className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-xl-4 g-4">
        {list}
      </ul>
    );
  }
}
