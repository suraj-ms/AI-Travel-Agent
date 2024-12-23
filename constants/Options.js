export const SelectTravellerList = [
    {
        id: 1,
        title: 'Just Me',
        desc: 'A sole traveler in exploration',
        icon: '😎',
        people: '1'
    },
    {
        id: 2,
        title: 'A Couple',
        desc: 'Two travelers in tandem',
        icon: '🥂',
        people: '2 People'
    },
    {
        id: 3,
        title: 'Family',
        desc: 'A group of fun loving adventure',
        icon: '🏡',
        people: '3 to 5 People'
    },
    {
        id: 4,
        title: 'Friends',
        desc: 'A bunch of thrill-seekes',
        icon: '⛵',
        people: '5 to 10 People'
    },
]


export const SelectBudgetOptions = [
    {
        id: 1,
        title: 'Cheap',
        desc: 'Stay concious of costs',
        icon: '💵',
    },
    {
        id: 2,
        title: 'Moderate',
        desc: 'Keep cost on the average',
        icon: '💰',
    },
    {
        id: 3,
        title: 'Luxury',
        desc: `Don't worry about the cost`,
        icon: '💸',
    },

]

export const AI_PROMPT = 'Generate Travel Plan for Location : {location}, for {totalDay} Days and {totalNight} Night for {traveler} with a {budget} budget with a Filght details, Flight Price with Booking url, Hotel options list with HotelName, Hotel address, Price, hotel image url, geo coordinates, rating, descriptions and Places to visit nearby with placeName, Place Details, Place Image URl, Geo Coordinates, ticket Pricing, Time to travel each of the location for {totalDay} day and {totalNight} night with each day plan with best time to visit in JSON format.'