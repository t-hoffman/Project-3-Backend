const {Home} = require('./models');
const data = require('./data/Chicagodata.json');

const {Review} = require('./models');
// const data = require('./data/LAdata.json');
// (async () => {
//     const findHome = await Home.find({});
//     const ids = [];
//     findHome.map(h => {
//         ids.push(h._id);
//     })

//     data.forEach(async (d,i) => {console.log(i)
//         const seedingData = [];
//         if (d.reviews.length > 0) {
//             d.reviews.map(async r => {
//                 // seedingData.push()

//                 const seedData = await Review.create({
//                     author: {
//                         name: r.author.smartName,
//                         photo: r.author.pictureUrl,
//                     },
//                     comments: r.comments,
//                     cratedDate: r.createdAt,
//                     date: r.localizedDate,
//                     response: r.response,
//                     ratings: {
//                         home: r.rating,
//                         cleanliness: Math.floor(Math.random() * 6 - 0),
//                         checkin: Math.floor(Math.random() * 6 - 0),
//                         accuracy: Math.floor(Math.random() * 6 - 0),
//                         location: Math.floor(Math.random() * 6 - 0),
//                         value: Math.floor(Math.random() * 6 - 0)
//                     }
//                 });
//                 const homeUpdate = await Home.findByIdAndUpdate(
//                     ids[(i+269)], {
//                         $push: {
//                             reviews: {
//                                 _id: seedData._id,
//                                 author: {
//                                     name: seedData.author.name,
//                                     photo: seedData.author.photo,
//                                 },
//                                 comments: seedData.comments,
//                                 cratedDate: seedData.createdDate,
//                                 date: seedData.date,
//                                 response: seedData.response,
//                                 ratings: {
//                                     home: seedData.ratings.home,
//                                     cleanliness: seedData.ratings.cleanliness,
//                                     checkin: seedData.ratings.checkin,
//                                     accuracy: seedData.ratings.accuracy,
//                                     location: seedData.ratings.location,
//                                     value: seedData.ratings.value
//                                 }
//                             }
//                         }
//                     }
//                 )
//             })
//         }
//         //console.log(seedingData)
//     })
// })


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