import React from "react";

const ErrorMessage = ({ message }: { message: string }) => (
    <div role="alert" className="alert alert-error alert-soft">
        <span>{message}</span>
    </div>
);

export default ErrorMessage;