// All schemas for ScheduleShop collections

// Reserves 
const reserve = {
    day: '2', // Day (monday, tu...)
    date: 10,
    month: 0,
    year: 2023,
    service: ['id', 'id2'], // Services reserved for
    hourId: 'adn89dn2d29',
    hourTime: {
        from: '10',
        to: '11'
    },
    verificationId: 'lucasf14', // Here its possible to add six digit codes 
    // or QRs instead of username, this code is unique for each user
    total: 200,
    currency: 'USD',
    paymentMethod: 'paypal',
    payed: true,
    reservedAt: {
        day: '2',
        date: 9,
        month: 0,
        year: 2023
    }
}
// Days
const day = {
    name: 'lunes',
    id: 1,
    _24h: false, // If 24 hours service
    closed: false, // If closed that day
    services: {
        all: true,
        services: [] // In case only a few services
    },
    schedule: [
        {
            fH: '8',
            fM: '30',
            tH: '12',
            tM: '0',
            mid: 'd098nq89nd209',
            hours: [
                {
                    fH: 8, // From hour
                    tH: 12, // To Hour
                    fM: 30, // From Minute
                    tM: 30, // To Minute
                    mid: 'dn0qa9nda'
                }
                // ...
            ]
        } // ...
    ]
}
// Services
const service = {
    price: 180,
    requiredHours: 1,
    service: 'Corte de barba',
    description: 'lorem ipsum...',
    mid: 'dmq0xn2endq92'
}
// Config (only one item in collection, with id: 0)
const config = {
    id: 0,
    scheduleIsConfigured: false, // If this is false, then when first setUp the user
    // will see the setUp pages
    automaticIntervalId: 60 // To cut the schedule in separated hours or minutes, valid intervals: [0, 15, 30, 45, 60, 120]
}

const user = {
    role: 'superAdmin', // user, admin and superAdmin [0, 1, 2]
    username: 'lucas',
    password: 'wnd09qan23d09a29er'
}