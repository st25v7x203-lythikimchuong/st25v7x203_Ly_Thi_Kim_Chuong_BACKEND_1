
class ApiError extends Error {
    constructor(statusCode, message) {
        super(message);
        this.statusCode = statusCode;
    }

    static notFound(message = "Resource not found") {
        return new ApiError(404, message);
    }
}

module.exports = ApiError;
