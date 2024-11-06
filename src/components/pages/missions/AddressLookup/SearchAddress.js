import { useState, useEffect } from "react";
import AddressList from "./AddressList";
import "./AddressList.css";

const NOMINATIM_BASE_URL = "https://nominatim.openstreetmap.org/search";

const SearchAddress = (props) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [listPlace, setListPlace] = useState([]);
  const [isCustomAddress, setIsCustomAddress] = useState(false);

  function useDebounce(value, delay) {
    const [debouncedValue, setDebouncedValue] = useState(value);

    useEffect(() => {
      const timer = setTimeout(() => {
        setDebouncedValue(value);
      }, delay);

      return () => {
        clearTimeout(timer);
      };
    }, [value, delay]);

    return debouncedValue;
  }

  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  const fetchInfo = () => {
    const params = {
      q: searchTerm,
      format: "json",
      addressdetails: 1,
      polygon_geojson: 0,
    };

    const queryString = new URLSearchParams(params).toString();

    fetch(`${NOMINATIM_BASE_URL}?${queryString}`, {
      method: "GET",
      redirect: "follow",
    })
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setListPlace(data);
          setIsCustomAddress(false);
        } else {
          setListPlace([]);
          setIsCustomAddress(true);
        }
      })
      .catch((err) => {
        console.error("Error fetching data:", err);
        setListPlace([]);
        setIsCustomAddress(true);
      });
  };

  useEffect(() => {
    if (debouncedSearchTerm !== "") {
      fetchInfo();
    } else {
      setListPlace([]);
      setIsCustomAddress(false);
    }
  }, [debouncedSearchTerm]);

  const handleAddressSelection = () => {
    if (isCustomAddress) {

      props.setFullAddress(searchTerm);
      setListPlace([]);
    }
  };

  return (
    <div className="SearchBox">
      <div className="form-group">
        <label htmlFor="address">Address</label>
        <input
          type="text"
          id="address"
          name="address"
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setIsCustomAddress(false); 
          }}
          onBlur={handleAddressSelection}
          onKeyDown={(e) => {
            if (searchTerm !== "" && e.code === "Enter") {
              fetchInfo();
            }
          }}
          required
        />
      </div>
      {listPlace && listPlace.length > 0 && (
        <div className="searchAddressListBox">
          <AddressList
            listPlace={listPlace}
            setSearchTerm={setSearchTerm}
            setPicked={props.setPicked}
            setAddressVal={props.setAddressVal}
            setFullAddress={props.setFullAddress}
            setListPlace={setListPlace}
          />
        </div>
      )}
    </div>
  );
};

export default SearchAddress;
