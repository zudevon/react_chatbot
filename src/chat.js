import {ApiAiClient} from "api-ai-javascript";
import {applyMiddleware, createStore} from "redux";


const accessToken = '352088e786114e9c9f9004eaf8a590e1';
const client = new ApiAiClient({accessToken})


const ON_MESSAGE = 'ON_MESSAGE';

export const sendMessage = (text, sender='user') => ({
    type: ON_MESSAGE,
    payload: {text, sender}
});

const messageMiddleware = () => next => action => {

    next(action);

    function onSuccess(response) {
            const {result: {fulfillment}} = response;
            next(sendMessage(fulfillment.speech, 'bot'));
        }

    if(action.type === ON_MESSAGE) {
        const {text} = action.payload;
        client.textRequest(text)
            .then( onSuccess )

    }
};

const initState = [{text: 'Start by typing a greeting.'}];

const messageReducer = (state = initState, action) => {
    switch (action.type) {

        case ON_MESSAGE:
            return [...state, action.payload];

        default:
            return state;

    }
};

export const store = createStore(messageReducer, applyMiddleware(messageMiddleware));