/* *
 * This sample demonstrates handling intents from an Alexa skill using the Alexa Skills Kit SDK (v2).
 * Please visit https://alexa.design/cookbook for additional examples on implementing slots, dialog management,
 * session persistence, api calls, and more.
 * */
const Alexa = require('ask-sdk-core');
// i18n dependencies. i18n is the main module, sprintf allows us to include variables with '%s'.
const i18n = require('i18next');
const sprintf = require('i18next-sprintf-postprocessor');


const languageStrings = {
  en: {
    translation: {
      WELCOME_MESSAGE: 'Hello, welcome to MediConversor. I can do conversions to the British system. Try saying when equals 1 yard to feet',
      HELP_MESSAGE: 'I can help you convert any measurement. For example, you can ask me to convert feet to yards.',
      GOODBYE_MESSAGE: 'See you soon I hope I have been of great help, have an excellent day!',
       FALLBACK_MESSAGE: 'Sorry, I don\'t know about that. Please try again.',
      MPulgadaMilla:'%s inch equals %s mile',
       MMillaPulgada:'%s mile equals %s inch',
      MYardaFoot:'%s yard equals %s foot',
       MYardaPie:'%s foot equals %s yada',
       Msj5:'Enter only positive numbers'
    
    }
  },
  es:{
    translation: {
      WELCOME_MESSAGE: 'Hola, bienvenido a MediConversor. Puedo hacer conversiones al sistema britanico. Prueba diciendo cuando equivale 1 yarda  a pies',
      HELP_MESSAGE: 'Puedo aydarte a convertir cualquier medida. Por ejemplo Puedes pedirme que convertor pie a yarda',
      GOODBYE_MESSAGE: 'Hasta pronto espero haber sido de gran ayuda, que tengas un exletente día!',
      FALLBACK_MESSAGE: 'Lo siento, no se nada sobre eso. Por favor inténtalo otra vez.',
      MPulgadaMilla:'%s pulgada equivale %s milla',
      MMillaPulgada:'%s milla equivale %s pulgada',
      MYardaPie:'%s yarda equivale %s pie',
      MPieYarda:'%s pie equivale %s yada',
     Msj5:'Ingresa sólo numeros positivos',
     
      
    }
  }
}

const LaunchRequestHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'LaunchRequest';
    },
    handle(handlerInput) {
       const requestAttributes = handlerInput.attributesManager.getRequestAttributes();
        const speakOutput = requestAttributes.t('WELCOME_MESSAGE');

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};

const Convertir_pulgada_milla_Handler = {
     canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'Convertir_pulgada_milla_Handler';
    },
    handle(handlerInput) {
        const pulgada = handlerInput.requestEnvelope.request.intent.slots.pulgada.value;
         const requestAttributes = handlerInput.attributesManager.getRequestAttributes();

        if (pulgada>=1){
            const valor = 1.5783;
        const resultado = (pulgada*valor).toFixed(2);
          const speakOutput =  requestAttributes.t('MPulgadaMilla',pulgada,resultado);
        
        return handlerInput.responseBuilder
            .speak(speakOutput)
            .getResponse();
    }
    else{
          const speakOutput =  requestAttributes.t('Msj5');
        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
     }
    }
};

const Convertir_milla_pulgada_Handler = {
     canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'Convertir_milla_pulgada_Handler';
    },
    handle(handlerInput) {
        const milla = handlerInput.requestEnvelope.request.intent.slots.milla.value;
          const requestAttributes = handlerInput.attributesManager.getRequestAttributes();

        if (milla>=1){
            const valor = 63360;
        const resultado = (milla*valor).toFixed(2);
          const speakOutput =  requestAttributes.t('MMillaPulgada',milla,resultado);
      
        
        return handlerInput.responseBuilder
            .speak(speakOutput)
            //.reprompt(speakOutput)
            .getResponse();
    }
    else{
          const speakOutput =  requestAttributes.t('Msj5');
        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
     }
    }
};

const Convertir_Yarda_pie_Handler = {
     canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'Convertir_Yarda_pie_Handler';
    },
    handle(handlerInput) {
        const Yarda = handlerInput.requestEnvelope.request.intent.slots.Yarda.value;
           const requestAttributes = handlerInput.attributesManager.getRequestAttributes();

        if (Yarda>=1){
            const valor = 3;
        const resultado = (Yarda*valor).toFixed(2);
         const speakOutput =  requestAttributes.t('MYardaPie',Yarda,resultado);
     
        
        return handlerInput.responseBuilder
            .speak(speakOutput)
            //.reprompt(speakOutput)
            .getResponse();
    }
    else{
           const speakOutput =  requestAttributes.t('Msj5');
        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
     }
    }
};

const Convertir_pie_Yarda_Handler = {
     canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'Convertir_pie_Yarda_Handler';
    },
    handle(handlerInput) {
        const pie = handlerInput.requestEnvelope.request.intent.slots.pie.value;
           const requestAttributes = handlerInput.attributesManager.getRequestAttributes();

        if (pie>=1){
            const valor = 0.333333;
        const resultado = (pie*valor).toFixed(2);
         const speakOutput =  requestAttributes.t('MYardaPie',pie,resultado);
     
        
        return handlerInput.responseBuilder
            .speak(speakOutput)
            //.reprompt(speakOutput)
            .getResponse();
    }
    else{
           const speakOutput =  requestAttributes.t('Msj5');
        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
     }
    }
};


const HelpIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.HelpIntent';
    },
    handle(handlerInput) {
           const requestAttributes = handlerInput.attributesManager.getRequestAttributes();
        const speakOutput = requestAttributes.t('HELP_MESSAGE');

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};

const CancelAndStopIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && (Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.CancelIntent'
                || Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.StopIntent');
    },
    handle(handlerInput) {
         const requestAttributes = handlerInput.attributesManager.getRequestAttributes();
        const speakOutput = requestAttributes.t('GOODBYE_MESSAGE');

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .getResponse();
    }
};
/* *
 * FallbackIntent triggers when a customer says something that doesn’t map to any intents in your skill
 * It must also be defined in the language model (if the locale supports it)
 * This handler can be safely added but will be ingnored in locales that do not support it yet 
 * */
const FallbackIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.FallbackIntent';
    },
    handle(handlerInput) {
        const speakOutput = 'Sorry, I don\'t know about that. Please try again.';

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};
/* *
 * SessionEndedRequest notifies that a session was ended. This handler will be triggered when a currently open 
 * session is closed for one of the following reasons: 1) The user says "exit" or "quit". 2) The user does not 
 * respond or says something that does not match an intent defined in your voice model. 3) An error occurs 
 * */
const SessionEndedRequestHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'SessionEndedRequest';
    },
    handle(handlerInput) {
        console.log(`~~~~ Session ended: ${JSON.stringify(handlerInput.requestEnvelope)}`);
        // Any cleanup logic goes here.
        return handlerInput.responseBuilder.getResponse(); // notice we send an empty response
    }
};
/* *
 * The intent reflector is used for interaction model testing and debugging.
 * It will simply repeat the intent the user said. You can create custom handlers for your intents 
 * by defining them above, then also adding them to the request handler chain below 
 * */
const IntentReflectorHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest';
    },
    handle(handlerInput) {
        const intentName = Alexa.getIntentName(handlerInput.requestEnvelope);
        const speakOutput = `You just triggered ${intentName}`;

        return handlerInput.responseBuilder
            .speak(speakOutput)
            //.reprompt('add a reprompt if you want to keep the session open for the user to respond')
            .getResponse();
    }
};
/**
 * Generic error handling to capture any syntax or routing errors. If you receive an error
 * stating the request handler chain is not found, you have not implemented a handler for
 * the intent being invoked or included it in the skill builder below 
 * */
const ErrorHandler = {
    canHandle() {
        return true;
    },
    handle(handlerInput, error) {
        const speakOutput = 'Sorry, I had trouble doing what you asked. Please try again.';
        console.log(`~~~~ Error handled: ${JSON.stringify(error)}`);

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};
// This request interceptor will log all incoming requests to this lambda
const LoggingRequestInterceptor = {
    process(handlerInput) {
        console.log(`Incoming request: ${JSON.stringify(handlerInput.requestEnvelope.request)}`);
    }
};

// This response interceptor will log all outgoing responses of this lambda
const LoggingResponseInterceptor = {
    process(handlerInput, response) {
      console.log(`Outgoing response: ${JSON.stringify(response)}`);
    }
};
// This request interceptor will bind a translation function 't' to the requestAttributes.
const LocalizationInterceptor = {
  process(handlerInput) {
    const localizationClient = i18n.use(sprintf).init({
      lng: handlerInput.requestEnvelope.request.locale,
      fallbackLng: 'en',
      overloadTranslationOptionHandler: sprintf.overloadTranslationOptionHandler,
      resources: languageStrings,
      returnObjects: true
    });

    const attributes = handlerInput.attributesManager.getRequestAttributes();
    attributes.t = function (...args) {
      return localizationClient.t(...args);
    }
  }
}

/**
 * This handler acts as the entry point for your skill, routing all request and response
 * payloads to the handlers above. Make sure any new handlers or interceptors you've
 * defined are included below. The order matters - they're processed top to bottom 
 * */
exports.handler = Alexa.SkillBuilders.custom()
    .addRequestHandlers(
        LaunchRequestHandler,
        Convertir_pulgada_milla_Handler,
        Convertir_milla_pulgada_Handler,
        Convertir_Yarda_pie_Handler,
        Convertir_pie_Yarda_Handler,
        HelpIntentHandler,
        CancelAndStopIntentHandler,
        FallbackIntentHandler,
        SessionEndedRequestHandler,
        IntentReflectorHandler)
    .addErrorHandlers(
        ErrorHandler)
    .withCustomUserAgent('sample/hello-world/v1.2')
    .addRequestInterceptors(
        LocalizationInterceptor,
        LoggingRequestInterceptor)
    .addResponseInterceptors(
        LoggingResponseInterceptor)
    .lambda();