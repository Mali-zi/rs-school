import React, { Component } from 'react';
import BottomSection from './BottomSection';
import { DefaultProps, ITopSectionState } from '../models/index';

interface Props extends DefaultProps {}

export default class TopSection extends Component<Props, ITopSectionState> {
  public static readonly defaultProps = {};

  constructor(props: Props) {
    super(props);
    this.state = {
      value: '',
      searchQuery: '',
      isValid: true,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    this.setState({ value: e.target.value });
  }

  handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (this.state.value.trim()) {
      localStorage.setItem('search', JSON.stringify(this.state.value.trim()));
      this.setState((prevState) => ({
        ...prevState,
        searchQuery: this.state.value,
        isValid: true,
      }));
    } else {
      this.setState((prevState) => ({
        ...prevState,
        isValid: false,
      }));
    }
  };

  componentDidMount() {
    const prevSearch = localStorage.getItem('search');
    if (prevSearch) {
      this.setState({ value: JSON.parse(prevSearch) });
    }
  }

  render() {
    return (
      <>
        <section className="col-lg-6 col-md-12">
          <h2 className="planet-list-header">Planet List</h2>
          <div className="mb-3">
            <form onSubmit={(e) => this.handleSubmit(e)}>
              <label
                htmlFor="search-form"
                className="form-label d-flex flex-column justify-content-start align-items-start fs-5"
              >
                Search by planet name
                <div className="container-fluid d-flex p-0 align-items-stretch mt-2">
                  <input
                    id="search-form"
                    type="text"
                    className="form-control w-100 border-4 border-primary"
                    placeholder="Enter a search query"
                    autoFocus
                    value={this.state.value}
                    onChange={this.handleChange}
                  />
                  <input
                    type="submit"
                    className="btn btn-primary ms-2 flex-shrink-1"
                    value="Search"
                  />
                </div>
              </label>
            </form>
            {this.state.isValid ? (
              <></>
            ) : (
              <p className="text-danger fs-5">The query isn&apos;t valid</p>
            )}
          </div>
        </section>
        <hr />
        <BottomSection searchQuery={this.state.searchQuery} />
      </>
    );
  }
}
