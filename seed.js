// const {Home} = require('./models');
// const data = require('./data/Chicagodata.json');

async function pullData() {
const resp = await fetch('./data/LAdata.json');
const data = await resp.json();
return data;
}
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
const lat = d.location ? d.location.lat : '';
const lng = d.location ? d.location.lng : '';
        seedingData.push({
            name: d.name,
            address: d.address,
            location: {
                lat: lat,
                long: lng
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
const testData = [];
i=0;
    while (i < 11) {
        i++;
        testData.push(seedData[i])
    }
 console.log(testData)
    // try {
    //     // const allDeleted = await Home.deleteMany({})
    //     // console.log(allDeleted)
        
    //     const seeded = await Home.insertMany(seedingData)
    //     console.log(seeded.length, 'homes added')
    
	// 	}catch(err) {
    //     console.log(err)
    // }
}

//  seedData();
(async () => {
    const data = await pullData();
    let i = 0;
    const respData = [];
    while (i < 10) {
        respData.push(data[i]);
        i++;
    }
    const doc = document.getElementById('abnb');
    doc.innerHTML = JSON.stringify(respData)
})();