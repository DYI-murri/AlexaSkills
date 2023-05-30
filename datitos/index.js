/* *
 * This sample demonstrates handling intents from an Alexa skill using the Alexa Skills Kit SDK (v2).
 * Please visit https://alexa.design/cookbook for additional examples on implementing slots, dialog management,
 * session persistence, api calls, and more.
 * */
const Alexa = require('ask-sdk-core');

const languageFacts = {
  javascript: [
    "es un lenguaje usado principalmente para desarrollo web",
    "es un lenguaje dinámico",
    "está basado en prototipos",
  ],
  ce:[
      "Fue desarrollado por Dennis Ritchie de Bell Labs entre 1972 y 1973 para construir utilidades que se ejecutaban en el sistema operativo UNIX.",
      "Ofrece una buena respuesta y una ejecución rápida de programas.",
      "Se caracteriza por la capacidad de manipular direcciones arbitrarias, por eso es preferible escribir el código de un microcontrolador en C",
      ],
      
    csharp:[
         "Sintaxis sencilla que facilita al desarrollador la escritura de código",
         "En C# puedes dividir el código en múltiples hilos de ejecución, trabajar en paralelo y sincronizarlos al final.",
         "C# es lenguaje orientado a objetos, pero también a componentes",
         ],
    java:[
        "Java es un lenguaje de programación basado en clases y orientado a objetos, lo que significa que se basa en el concepto de objetos, clases y herencia.",
        "La compatibilidad de Java con el multithreading permite ejecutar simultáneamente varios hilos de ejecución en un mismo programa.",
        "Java cuenta con una rica API y vastas bibliotecas de código abierto que proporcionan a los desarrolladores una amplia gama de funcionalidades. ",
        ],
    python:[
        "Los desarrolladores pueden leer y comprender fácilmente los programas de Python debido a su sintaxis básica similar a la del inglés.",
        "Python permite que los desarrolladores sean más productivos, ya que pueden escribir un programa de Python con menos líneas de código en comparación con muchos otros lenguajes.",
        "Python cuenta con una gran biblioteca estándar que contiene códigos reutilizables para casi cualquier tarea. De esta manera, los desarrolladores no tienen que escribir el código desde cero.",
        "Python es un lenguaje interpretado, lo que significa que ejecuta directamente el código línea por línea. Si existen errores en el código del programa, su ejecución se detiene.",
        "Python es más cercano a los idiomas humanos que otros lenguajes de programación. Por lo tanto, los programadores no deben preocuparse sobre sus funcionalidades subyacentes, como la arquitectura y la administración de la memoria.",
        "Python considera todo como un objeto, pero también admite otros tipos de programación, como la programación estructurada y la funcional.",
        "Los científicos de datos utilizan Python para realizar tareas de ciencia de datos",
        "Los programadores utilizan ampliamente los scripts de Python para automatizar muchas tareas diarias",
        "Python es útil para escribir código del lado del servidor debido a que ofrece muchas bibliotecas que constan de código preescrito para crear funciones de backend complejas.",
        ],
        
    erre:[
        "Amplio abanico de herramientas estadísticas. Entre ellas se incluyen series temporales, modelos lineales y no lineales, tests estadísticos, etc.",
        "Aunque la mayor parte de las funciones de R están escritas en este lenguaje, permite el desarrollo de bibliotecas en C, C++ y Fortran.",
        "Es un lenguaje de programación orientado a objetos.",
        "Integración con bases de datos.",
        "La capacidad gráfica de R está fuera de toda duda. Incluso posee su propio formato para este tipo de archivos. Está basado en LaTeX.",
        "Procesa matrices y vectores sin aplicar bucles. Otro aspecto que agiliza mucho el trabajo, ya que no necesita realizar iteraciones (repeticiones) constantes.",
        "Su entorno brinda la posibilidad de completar tareas complejas dando solo unas pocas órdenes.",
        ],
        
    go:[
        "Aun siendo un lenguaje diseñado para la programación de sistemas, lenguaje Go dispone de un recolector de basura como la mayoría de los lenguajes modernos. ",
        "El lenguaje Go usa tipado estático y es tan eficiente como C. Está pensado para facilitar la vida al máximo a los programadores. Permite detectar errores en la sintaxis durante la compilación y no durante la ejecución, a diferencia de otros lenguajes compilados. ",
        "La simplicidad es la característica principal de Go. Con una sintaxis clara, limpia y organizada, la idea de la programación en Go es diferenciarse de la complejidad de C.",
        ],
};

const LaunchRequestHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'LaunchRequest';
    },
    handle(handlerInput) {
        const speakOutput = 'Hola, bienvenido a curiosidades de Programación ,puedo darte datos relacionados a un lenguaje de programación, solo tienes que mencionarlo por ejemplo, prueba diciendo JavaScript';
        const respuesta="Puedo hacer algo mas por ti? Puedes intentar nuevamente";
        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
             .reprompt(respuesta)
            .getResponse();
    }
};

const CustomLanguageIntentHandler = {
  canHandle(handlerInput) {
    return (
      Alexa.getRequestType(handlerInput.requestEnvelope) === "IntentRequest" &&
      Alexa.getIntentName(handlerInput.requestEnvelope) ===
        "CustomLanguageIntent"
    );
  },
  handle(handlerInput) {
    const { language } = handlerInput.requestEnvelope.request.intent.slots;
    let response;
    if (language && languageFacts[language.value]) {
      response =
        languageFacts[language.value][
          Math.floor(Math.random() * languageFacts[language.value].length)
        ];
    } else {
      response =
        "No tengo información sobre el lenguaje que has mencionado, prueba con otro";
    }
    return handlerInput.responseBuilder
      .speak(response)
      .reprompt(response)
      .getResponse();
  },
};

const HelpIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.HelpIntent';
    },
    handle(handlerInput) {
        const speakOutput = '¡Puedes saludarme! Cómo puedo ayudar?';

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
        const speakOutput = 'Que las buenas practicas te acompañen y que tengas buen codigo!';

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
        const speakOutput = 'Lo siento, no se la peticion que estas pidiendo. Intenta de nuevo.';

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
        const speakOutput = 'Lo siento, tuve problemas para hacer lo que me pediste. Inténtalo de nuevo.';
        console.log(`~~~~ Error handled: ${JSON.stringify(error)}`);

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};

/**
 * This handler acts as the entry point for your skill, routing all request and response
 * payloads to the handlers above. Make sure any new handlers or interceptors you've
 * defined are included below. The order matters - they're processed top to bottom 
 * */
exports.handler = Alexa.SkillBuilders.custom()
    .addRequestHandlers(
        LaunchRequestHandler,
        CustomLanguageIntentHandler,
        HelpIntentHandler,
        CancelAndStopIntentHandler,
        FallbackIntentHandler,
        SessionEndedRequestHandler,
        IntentReflectorHandler)
    .addErrorHandlers(
        ErrorHandler)
    .withCustomUserAgent('sample/hello-world/v1.2')
    .lambda();