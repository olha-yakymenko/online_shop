import React, { useContext, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { SearchContext } from "../../Context/SearchContext";
import all_product from "../Assets/all_product"; 
import './Search.css'
const Search = () => {
    const { setSearchResults, setSearchTerm, searchTerm } = useContext(SearchContext);  
    const searchRef = useRef(null);
    const navigate = useNavigate();

    const handleSearchChange = (e) => {
        const term = e.target.value.toLowerCase();
        setSearchTerm(term);

        const filteredResults = all_product.filter(item => item.isAvailable===true).filter((product) => {
            const nameMatch = product.name?.toLowerCase().includes(term); 
            const descriptionMatch = product.description?.toLowerCase().includes(term); 
            const priceMatch = product.new_price?.toString().includes(term); 
            const categoryMatch = product.category?.toLowerCase().includes(term);

            return nameMatch || descriptionMatch || priceMatch || categoryMatch;
        });

        setSearchResults(filteredResults);
    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            e.preventDefault();

            const filteredResults = all_product.filter(item => item.isAvailable===true).filter((product) => {
                const nameMatch = product.name?.toLowerCase().includes(searchTerm);
                const descriptionMatch = product.description?.toLowerCase().includes(searchTerm); 
                const priceMatch = product.new_price?.toString().includes(searchTerm); 
                const categoryMatch = product.category?.toLowerCase().includes(searchTerm); 
                return nameMatch || descriptionMatch || priceMatch || categoryMatch; 
            });
            setSearchResults(filteredResults);
            setSearchTerm(""); 
            navigate("/search-results");
        }
    };

    const handleClickOutside = (event) => {
        if (searchRef.current && !searchRef.current.contains(event.target)) {
            setSearchTerm(""); 
        }
    };

    useEffect(() => {
        document.addEventListener("click", handleClickOutside, true);
        return () => {
            document.removeEventListener("click", handleClickOutside, true);
        };
    }, []);

    const filteredSuggestions = searchTerm
        ? all_product.filter(item => item.isAvailable===true).filter((product) => {
              const nameMatch = product.name?.toLowerCase().includes(searchTerm);
              const descriptionMatch = product.description?.toLowerCase().includes(searchTerm);
              const priceMatch = product.new_price?.toString().includes(searchTerm); 
              const categoryMatch = product.category?.toLowerCase().includes(searchTerm);

              return nameMatch || descriptionMatch || priceMatch || categoryMatch;
          })
        : [];

    return (
        <div className="nav-search" ref={searchRef}>
            <input
                type="text"
                id="search"
                value={searchTerm}
                placeholder="Szukaj produktów..."
                onChange={handleSearchChange}
                onKeyDown={handleKeyDown} 
            />
            {searchTerm && filteredSuggestions.length > 0 && (
                <div className="search-results-list">
                    {filteredSuggestions.map((product) => (
                        <div key={product.id} className="search-result-item">
                            <Link to={`/product/${product.id}`}>{product.name}</Link>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Search;
