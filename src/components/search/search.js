import React from "react";
import { useState } from "react";
import { AsyncPaginate } from "react-select-async-paginate";
import { GET_API_URL, geoApiOptions, getApiOptions } from "../../citi-api";

const Search = ({ onSearchChange }) => {
	const [search, setsearch] = useState(null);
	const handleOnChange = (searchData) => {
		setsearch(searchData);
		//console.log(search);
		onSearchChange(searchData);
	};

	const loadOptions = (inputValue) => {
		return fetch(
			`${GET_API_URL}/cities?minPopulation=1000000&namePrefix=${inputValue}`,
			getApiOptions
		)
			.then((response) => response.json())
			.then((response) => {
				return {
					options: response.data.map((city) => {
						return {
							value: `${city.latitude} ${city.longitude}`,
							label: `${city.name}, ${city.countryCode}`,
						};
					}),
				};
			})
			.catch((err) => console.error(err));
	};

	return (
		<AsyncPaginate
			placeholder="Search for city"
			debounceTimeout={600}
			value={search}
			onChange={handleOnChange}
			loadOptions={loadOptions}
		/>
	);
};

export default Search;
