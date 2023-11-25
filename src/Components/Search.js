import { useState } from "react";
import { AsyncPaginate } from "react-select-async-paginate";
import { GEO_API_URL, geoApiOptions } from "../api";

const Search = ({ onSearchChange }) => {
  const [search, setSearch] = useState(null);

  const handleOnChange = (exploredata) => {
    setSearch(exploredata);
    onSearchChange(exploredata);
  }

  async function loadOptions(inputValue) {
    try {
      const response = await fetch(`${GEO_API_URL}/cities?minPopulation=1000000&namePrefix=${inputValue}`, geoApiOptions);

      if (response.status === 429) {
        console.error('Rate limit exceeded. Please try again later.');
        return {
          options: [],
        };
      }

      const response_1 = await response.json();

      if (response_1 && response_1.data && Array.isArray(response_1.data)) {
        return {
          options: response_1.data.map((city) => ({
            value: `${city.latitude} ${city.longitude}`,
            label: `${city.name} ${city.countryCode}`,
          })),
        };
      } else {
        console.error('Unexpected response format:', response_1);
        return {
          options: [],
        };
      }
    } catch (err) {
      console.error('Error fetching data:', err);
      return {
        options: [],
      };
    }
  }

  return (
    <AsyncPaginate
      placeholder="Search For City"
      debounceTimeout={300}
      value={search}
      onChange={handleOnChange}
      loadOptions={loadOptions}
    />
  );
}

export default Search;
