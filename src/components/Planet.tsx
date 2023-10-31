import React, { Component } from 'react';
import { IPlanetProps } from '../models';

export default class Planet extends Component<IPlanetProps> {
  render() {
    const { name, orbital_period, population, climate, gravity } =
      this.props.planet;
    return (
      <div className="card border-dark mb-3 h-100 card-style">
        <div className="card-header fs-4">{name}</div>
        <div className="card-body text-dark">
          <ul className="list-group list-group-flush">
            <li className="list-group-item">
              orbital_period: {orbital_period}
            </li>
            <li className="list-group-item">population: {population}</li>
            <li className="list-group-item">climate: {climate}</li>
            <li className="list-group-item">gravity: {gravity}</li>
          </ul>
        </div>
      </div>
    );
  }
}
