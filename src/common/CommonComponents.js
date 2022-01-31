// import React, {useState} from "react";

//////////////////////////////////////////////////////////////////////////////////

const ColoredLine = ({ color }) => (
    <hr
        style={{
            color: color,
            backgroundColor: color,
            height: 1
        }}
    />
);

//////////////////////////////////////////////////////////////////////////////////

function SearchForm({ searchFor }) {
    console.debug("SearchForm", "searchFor=", typeof searchFor);
  
    const [searchTerm, setSearchTerm] = useState("");
  
    function handleSubmit(evt) {
      evt.preventDefault();
      searchFor(searchTerm.trim() || undefined);
      setSearchTerm(searchTerm.trim());
    }
  
    function handleChange(evt) {
      setSearchTerm(evt.target.value);
    }
  
    return (
        <div className="SearchForm mb-4">
          <form className="form-inline" onSubmit={handleSubmit}>
            <input
                className="form-control form-control-lg flex-grow-1"
                name="searchTerm"
                placeholder="Enter search term.."
                value={searchTerm}
                onChange={handleChange}
            />
            <button type="submit" className="btn btn-lg btn-primary">
              Submit
            </button>
          </form>
        </div>
    );
  }
  
  export {SearchForm,ColoredLine};

//////////////////////////////////////////////////////////////////////////////////



//////////////////////////////////////////////////////////////////////////////////

