class ApiResponse {
    constructor(statusCode = 100) {
        this._statusCode = statusCode;
        this._payload = [];
    }

    addPayload(key, value) {
        this._payload.push({ key, value });
    }

    toJson() {
        const result = {
            status: this._statusCode === 100 ? 'OK' : 'ERROR',
            code: this._statusCode
        }

        if(Array.isArray(this._payload) && this._payload.length > 0) {
            for(let kV of this._payload) {
                result[kV.key] = kV.value;
            }
        }

        return result;
    }
}

module.exports = ApiResponse;