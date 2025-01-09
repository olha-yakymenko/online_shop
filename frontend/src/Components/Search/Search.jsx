import React, { useContext, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { SearchContext } from "../../Context/SearchContext";
import all_product from "../Assets/all_product"; 
import product_availability from "../Assets/availibility";
import './Search.css';

const Search = () => {
    const { setSearchResults, setSearchTerm, searchTerm } = useContext(SearchContext);  
    const searchRef = useRef(null);
    const navigate = useNavigate();

    const getAvailableProducts = () => {
        return all_product
            .map((item) => {
                const availability = product_availability.find(avail => avail.id === item.id);
                return {
                    ...item,
                    isAvailable: availability ? availability.isAvailable : false,
                };
            })
            .filter(item => item.isAvailable === true);
    };

    const filterProducts = (products, term) => {
        return products.filter((product) => {
            const nameMatch = product.name?.toLowerCase().includes(term);
            const descriptionMatch = product.description?.toLowerCase().includes(term);
            const priceMatch = product.new_price?.toString().includes(term);
            const categoryMatch = product.category?.toLowerCase().includes(term);
            return nameMatch || descriptionMatch || priceMatch || categoryMatch;
        });
    };

    const handleSearchChange = (e) => {
        const term = e.target.value.toLowerCase();
        setSearchTerm(term);

        const availableProducts = getAvailableProducts();
        const filteredResults = filterProducts(availableProducts, term);
        
        setSearchResults(filteredResults);
    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            e.preventDefault();

            const availableProducts = getAvailableProducts();
            const filteredResults = filterProducts(availableProducts, searchTerm);
            
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
        ? filterProducts(getAvailableProducts(), searchTerm)
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
