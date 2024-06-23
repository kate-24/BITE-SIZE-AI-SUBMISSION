import React, { Fragment, useState, useEffect, useRef } from "react";
import "./InputAddress.css"; // Import your CSS for additional styling
import ShowSummary from "./ShowSummary";

const InputAddress = () => {
    const [address, setAddress] = useState("");
    const [showSummary, setShowSummary] = useState(false);
    const [placeDetails, setPlaceDetails] = useState(null);
    const [key, setKey] = useState(0); // Key to force remount or update
    const summaryRef = useRef(null);

    const loadGoogleMapsScript = (callback) => {
        const existingScript = document.getElementById("googleMaps");

        if (!existingScript) {
            const script = document.createElement("script");
            script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}&libraries=places&callback=initMap`;
            script.id = "googleMaps";
            document.body.appendChild(script);

            script.onload = () => {
                if (callback) callback();
            };
        } else if (callback) {
            callback();
        }
    };

    const initMap = () => {
        const placesAutocomplete = new window.google.maps.places.Autocomplete(document.getElementById("search-bar"));

        placesAutocomplete.addListener("place_changed", () => {
            const place = placesAutocomplete.getPlace();
            const placeId = place.place_id; // Get the place ID

            // Use the Place Details service to get more information
            const request = {
                placeId: placeId,
                fields: ["name", "rating", "reviews"], // Specify the fields you need
            };

            const service = new window.google.maps.places.PlacesService(document.createElement("div"));
            service.getDetails(request, async (placeDetails, status) => {
                if (status === window.google.maps.places.PlacesServiceStatus.OK) {
                    setPlaceDetails(placeDetails);
                    setAddress(placeDetails.name); // Set the address to place name
                    await onSubmitForm(placeDetails); // Submit the form with the place details
                } else {
                    console.error("Error getting place details:", status);
                }
            });
        });
    };

    const onSubmitForm = async (placeDetails) => {
        try {
            const body = { address: placeDetails.name, summary: placeDetails.reviews.map(review => review.text).join('\n') };
            const response = await fetch(`${process.env.REACT_APP_API_URL}/bites`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body),
            });
            console.log(`env var : ${process.env.REACT_APP_API_URL}`);
            console.log(response);
            setShowSummary(true); // Show summary after successful search
            setKey(prevKey => prevKey + 1); // Update key to force remount or update ShowSummary
        } catch (err) {
            console.error(err.message);
        }
    };

    useEffect(() => {
        loadGoogleMapsScript(() => {
            if (window.google) {
                initMap();
            }
        });
    }, []);

    useEffect(() => {
        if (showSummary && summaryRef.current) {
            summaryRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
        }
    }, [showSummary, key]); // Include key in dependencies to trigger effect on key change

    return (
        <Fragment>
            <div className="input-address-container">
                <div className="background-image">
                    <img src={"/bg1.jpg"} alt="Background" className="background-img" />
                    <div className="overlay"></div>
                </div>
                <div className="content">
                    <h1 className="text-center">Find Your Restaurant</h1>
                    <input
                        type="text"
                        id="search-bar"
                        className="form-control search-input"
                        placeholder="Enter address..."
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        onFocus={(e) => (e.target.placeholder = "")}
                        onBlur={(e) => (e.target.placeholder = "Enter address...")}
                    />
                </div>
            </div>
            {showSummary && placeDetails && (
                <div className="summary-wrapper" key={key}>
                    <div ref={summaryRef}>
                        <ShowSummary placeDetails={placeDetails} />
                    </div>
                </div>
            )}
        </Fragment>
    );
};

export default InputAddress;
