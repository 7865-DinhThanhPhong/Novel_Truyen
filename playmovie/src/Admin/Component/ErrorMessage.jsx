function ErrorMessage({ message }) {
    if (!message) return null;

    return <p className="text-red-500 text-xs italic">{message}</p>;
}

export default ErrorMessage;