import React from "react";

const Ratings = (props) => {
    const {ratings, numOfReviews} = props;
    return (
        <div>
            <p>{ratings}</p>
            <p>{numOfReviews}</p>
        </div>
    );
}

export default Ratings;