const express = require('express');
const ApiResponse = require("./models/apiResponse");
const SMS = require("./models/sms");
const SmsStatus = require("./models/smsStatusResponse");
const {codes} = require("./models/status");

const router = express();

router.use(express.json());
router.use(express.urlencoded({ extended: true }));

router.get('/', (req, res) => {
    res.send('pong');
});

router.get('/sms/send', (req, res) => {
    let hasIssues = false, code = null, messages = [];

    const phones = (req.query.to || '').split(','),
        message = req.query.msg || '';

    for(let to of phones) {
        const sms = new SMS(to, message, 'usedesk'),
            weight = Math.floor(100 * Math.random()) + 1;

        let outcome;

        if(weight > 50) {
            outcome = sms.succeed();
        } else if(weight > 10) {
            outcome = sms.queue();
        } else {
            outcome = sms.failWithRandomStatus();

            code = outcome.code;
            hasIssues = true;
        }

        messages.push(outcome);
    }

    const response = new ApiResponse(hasIssues ? code : 100);

    response.addPayload('balance', Math.floor(1000 * Math.random()) + Math.random());

    const messagesPayload = {};

    for (let message of messages) {
        messagesPayload[message.id] = message.toJson();
    }

    response.addPayload('sms', messagesPayload);

    return res.json(response.toJson());
});

router.get('/sms/status', (req, res) => {
    const ids = (req.query.sms_id || '').split(','),
        messages = [];

    for(let id of ids) {
        const weight = Math.floor(100 * Math.random()) + 1;

        console.log(weight);

        let outcome;

        if(weight > 50) {
            outcome = new SmsStatus(id, codes.message_delivered);
        } else {
            const codeValues = Object.values(codes);
            const status = codeValues[Math.floor(codeValues.length * Math.random()) + 1];
            outcome = new SmsStatus(id, status);
        }

        messages.push(outcome);
    }

    const response = new ApiResponse();

    response.addPayload('balance', Math.floor(1000 * Math.random()) + Math.random());

    const messagesPayload = {};

    for (let message of messages) {
        messagesPayload[message.id] = message.toJson();
    }

    response.addPayload('sms', messagesPayload);

    return res.json(response.toJson());
});

router.listen(
    process.env.SERVER_PORT || 3000,
    () => {
        console.log(`Gateway is listening on http://${process.env.SERVER_HOST || '0.0.0.0'}:${process.env.SERVER_PORT || 3000}`)
    }
);