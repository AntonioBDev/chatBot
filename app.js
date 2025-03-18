const { createBot, createProvider, createFlow, addKeyword } = require('@bot-whatsapp/bot')

const QRPortalWeb = require('@bot-whatsapp/portal')
const BaileysProvider = require('@bot-whatsapp/provider/baileys')
const MockAdapter = require('@bot-whatsapp/database/mock')

const flowGracias = addKeyword(['gracias', 'grac']).addAnswer(
    [
        'Saludos cordiales 🚀',
    ]
)

const flowContactar = addKeyword(['Si','si','Sí', 'sí'])
    .addAnswer(
        [
            'Por favor, espere unos momentos...',
            '\n Un miembro de nuestro equipo se pondrá en contacto con usted.'
        ]
    )



const flowFuncion = addKeyword(['info', '1', 'Sí, quiero saber cómo funciona', 'Quiero saber cómo funciona', 'sí', 'si'])
    .addAnswer(
        ['¿Cómo funciona el negocio?']
    )
    .addAnswer(
        ['*1*.	_Aprende_ _y_ _acciona_: A través de nuestro material que encontrarás en Google Drive, aprenderás las bases y estrategias para lanzar campañas 📚. Los videos y guías están hechos para que puedas seguir el paso a paso sin complicaciones 🎥.',
        '\n*2*.	_Publicidad_ _efectiva_: Usamos Facebook Ads como la herramienta principal para generar ventas . Con anuncios bien estructurados, llegarás a un público ideal 🎯',
        '\n*3*.	_Grupo_ _de_ _apoyo_: Aquí en el grupo de WhatsApp, no solo compartiremos consejos 🤝, sino que también podremos resolver dudas y celebrar juntos los logros. Estamos aquí para apoyarnos mutuamente.',
        '\n*4*.	_Estrategias_ _probadas_: Todo lo que compartimos está basado en experiencias reales y estrategias que han demostrado funcionar 💡. No tienes que reinventar la rueda; te damos los recursos para que puedas replicar el negocio 🔄.'
        ]
    ) 
    .addAnswer(
        ['Te proporcionamos todo el material a través de Google Drive 📂 para que puedas comenzar a vender. Incluimos guías en video paso a paso para crear tus campañas. También te agregamos a nuestro grupo privado de WhatsApp 💬 donde compartirás consejos con personas más experimentadas.',
        '\nSolo necesitas hacer un único pago de *$200 MX*.'
        ]
    )
    .addAnswer(
        ['¿Te interesa? ¿Te gustaría que te enviemos los métodos de pago?',
            '👉*Si*'
        ],
        null,
        null,
        [flowGracias, flowContactar]
    )

const flowPrecio = addKeyword(['2', 'precio', 'Precio']).addAnswer(
    [
        'Solo necesitas hacer un único pago de *$200 MX*.',
        '\n👉*info* Obten mas información para saber cómo funciona.',
    ],
    null,
    null,
    [flowFuncion]
)



const flowPrincipal = addKeyword(['¡Hola! Quiero más información.', 'Más Información','Más información', 'más información', 'mas informacion'])
    .addAnswer('¡Hola! Gracias por unirte e interesarte sobre nosotros. ¡Estoy aquí para ayudarte en todo lo que necesites! 😊')
    .addAnswer(
    [
        'Te ayudaré a obtener toda la información que necesitas para empezar a vender con nosotros.',
        'Primero, ¿te gustaría saber cómo funciona el negocio?',
        '👉*1*  Sí, quiero saber cómo funciona',
        '👉*2*  No, solo quiero saber el precio',
    ],
    null,
    null,
    [flowPrecio, flowGracias, flowFuncion]
)

const main = async () => {
    const adapterDB = new MockAdapter()
    const adapterFlow = createFlow([flowPrincipal])
    const adapterProvider = createProvider(BaileysProvider)

    createBot({
        flow: adapterFlow,
        provider: adapterProvider,
        database: adapterDB,
    })

    QRPortalWeb()
}

main()
