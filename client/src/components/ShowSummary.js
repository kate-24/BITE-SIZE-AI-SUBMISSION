import React, { Fragment, useEffect, useState } from "react";
import StarRating from "./StarRating"; // Assuming this is your StarRating component

const ShowSummary = ({ placeDetails }) => {
    const [bite, setBite] = useState(null);
    const [averageRating, setAverageRating] = useState(0);

    useEffect(() => {
        const fetchLatestBite = async () => {
            try {
                const response = await fetch(`/bites/latest`);
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                const jsonData = await response.json();
                console.log("Fetched bite data:", jsonData); // Log fetched data
                setBite(jsonData);
            } catch (err) {
                console.error(err.message);
            }
        };

        fetchLatestBite();
    }, []);

    useEffect(() => {
        if (placeDetails) {
            const totalRatings = placeDetails.reviews?.reduce((sum, review) => sum + review.rating, 0) || 0;
            const avgRating = placeDetails.reviews?.length ? totalRatings / placeDetails.reviews.length : 0;
            setAverageRating(avgRating);
        }
    }, [placeDetails]);

    console.log("Current bite state:", bite); // Log current state

    return (
        <Fragment>
            <div style={styles.container}>
                <div style={styles.header}>
                    <h1 style={styles.headerText}>Here is your Bite.</h1>
                </div>
                {bite ? (
                    <div style={styles.contentContainer}>
                        <div style={styles.summaryContainer}>
                            <div className="bite-mark"></div> {/* Bite mark added here */}
                            <h2 style={styles.left}>{placeDetails.name || bite.address}</h2>
                            <StarRating rating={averageRating} />
                            <div style={styles.reviews}>
                                <p style={styles.numreviews}>{placeDetails.reviews?.length || 0} Reviews</p>
                            </div>
                            <div id="place-reviews">
                                {placeDetails.reviews?.map((review, index) => (
                                    <div key={index}>
                                        <p>{review.author_name}:</p>
                                        <p>{review.text}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                ) : (
                    <p>Loading bite details...</p>
                )}
            </div>
        </Fragment>
    );
};

const styles = {
    container: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        minHeight: "100vh",
        background: "#f0f0f0", // Background color for the entire page
        padding: "2rem",
    },
    header: {
        width: "100%",
        textAlign: "center",
        marginBottom: "2rem",
    },
    headerText: {
        fontSize: "2.5rem",
        fontWeight: "bold",
    },
    contentContainer: {
        display: "flex",
        width: "100%",
        justifyContent: "center",
    },
    summaryContainer: {
        position: "relative", // Make position relative to contain absolute child
        width: "50%", // Takes up half of the container width initially
        padding: "2rem",
        background: "#343a40", // Dark background color
        color: "#ffffff", // Text color
        borderRadius: "8px", // Rounded corners
        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.8)", // Box shadow
        overflow: "hidden", // Ensure content inside does not overflow
    },
    biteMark: {
        position: "absolute",
        top: "-20px", // Adjust position to align with top of summary container
        right: "-20px", // Adjust position to align with right of summary container
        width: "40px",
        height: "40px",
        transform: "rotate(45deg)",
        background: "#ff6347", // Orange color
        clipPath: "polygon(100% 0, 100% 100%, 0 100%)", // Create a triangular shape
    },
    reviews: {
        marginTop: "1rem",
        textAlign: "left",
    },
    left: {
        textAlign: "left",
    },
    numreviews: {
        color: "#7e7f85",
    },
};

export default ShowSummary;
