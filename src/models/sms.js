const { v4: uuidv4 } = require('uuid');
const { codes } = require('./status');
const SmsStatusResponse = require("./smsStatusResponse");
const SmsSendResponse = require("./smsSendResponse");

class SMS {
    constructor(to, message, from = null, id = null) {
        this._to = to;
        this._message = message;
        this._from = from;
        this._id = id || uuidv4().toString();
        this._status = null;
    }

    get to() {
        return this._to;
    }

    get message() {
        return this._message;
    }

    get from() {
        return this._from;
    }

    get id() {
        return this._id;
    }

    succeed() {
        return new SmsSendResponse(this.to, codes.message_sent);
    }

    failWithRandomStatus() {
        const codeValues = Object.values(codes);
        const status = codeValues[Math.floor(codeValues.length * Math.random()) + 1];
        return new SmsSendResponse(this.to, status);
    }

    queue() {
        const queueStatuses = [codes.message_queued, codes.message_sending];
        const status = queueStatuses[Math.floor(queueStatuses.length * Math.random()) + 1];
        return new SmsSendResponse(this.to, status);
    }
}

module.exports = SMS;