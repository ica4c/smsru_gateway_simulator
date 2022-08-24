const {messages, codes} = require("./status");

class SmsStatusResponse {
    constructor(id, statusCode = 100) {
        this._id = id;
        this._statusCode = statusCode;
    }

    get id() {
        return this._id;
    }

    get code() {
        return this._statusCode;
    }

    get message() {
        return messages[this._statusCode];
    }

    get status() {
        return [codes.message_sent, codes.message_sending, codes.message_delivered, codes.message_queued]
            .includes(this._statusCode) ? 'OK' : 'ERROR'
    }

    toJson() {
        return {
            status: this.status,
            status_code: this.code,
            status_text: this.message
        }
    }
}

module.exports = SmsStatusResponse;