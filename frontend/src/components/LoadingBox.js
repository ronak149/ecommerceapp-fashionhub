import React from "react";

export const LoadingButton = () => {
    <p class="placeholder-glow">
        <a href="#" tabindex="-1" class="btn btn-primary disabled placeholder col-4" aria-hidden="true"></a>
    </p>
}

const LoadingBox = () => {
    return (
        <div class="spinner-border text-secondary m-auto mt-2" role="status">
            <span class="visually-hidden">Loading...</span>
        </div>
    );
}

export default LoadingBox;