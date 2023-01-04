const {Home} = require('./models/');
const data = require('./LAdata.json')

async function seedData() {
    let seedingData = [];    
    data.forEach(d => {
        const rate = d.pricing.rate ? d.pricing.rate.amount : '';
        let photos = []

        if (d.photos.length > 0) {
            d.photos.map(p => {
                photos.push(p.pictureUrl)
            })
        }

        seedingData.push({
            name: d.name,
            address: d.address,
            location: {
                lat: d.location.lat,
                long: d.location.lng
            },
            numberOfGuests: d.numberOfGuests,
            rate: rate,
            roomType: d.roomType,
            stars: d.stars,
            url: d.url,
            photos: photos,
            host: {
                name: d.primaryHost.smartName,
                about: d.primaryHost.about,
                photo: d.primaryHost.pictureUrl,
                isSuperHost: d.primaryHost.isSuperHost
            }
        })
    });
// console.log(seedingData)
    try {
        // const allDeleted = await Home.deleteMany({})
        // console.log(allDeleted)
        
        //const seeded = await Home.insertMany(seedingData)
        console.log(seeded.length, 'homes added')
    
		}catch(err) {
        console.log(err)
    }
}

seedData();
