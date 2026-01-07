import pool from '../utilities/mysql_db.js';
import { db } from '../utilities/firebase_db.js';
// import { getDatabase, ref, get, set, push } from "firebase/database";

export default class ImageModel {
    static getImages = async () => {
        // mysql
        // const [result] = await pool.query('select * from images')
        // return result

        // firebase
        const images = await db.ref('images').once('value');
        const res =  images.exists() ? Object.values(images.val()) : [];
        console.log(`result is ${res}`);
        
        return res;
    }
    static getImageBirth = async () => {
        // mysql
        // const [result] = await pool.query('select * from images where description=?', ['birthday'])
        // console.log(result)
        // const res = await ImageModel.getImages().filter(image => image.description === 'birthday')
        // console.log(res);

        // return result

        // firebase
        const images = await db.ref('images').once('value');
        const imagesData =  images.exists() ? Object.values(images.val()) : [];
        const result = imagesData.filter(
            img => img.image_des === 'birthday'
        )
        return result;
    }

    static writeImageData(obj) {
        const imageRef = push(ImageModel.imagesRef);
        set(imageRef, {
            image_url: obj.url,
            image_info: obj.owner,
            image_des: obj.info
        })
    }
}

// const res = await ImageModel.getImageBirth()
// console.log(res);

// inserting image in firebase db:


// writeImageData({
//     url: 'https://thumbs.dreamstime.com/b/vibrant-colorful-balloons-confetti-presents-set-against-bright-blue-background-perfect-birthday-party-backdrop-vibrant-323978181.jpg',
//     owner: 'https://www.dreamstime.com/',
//     info: 'gifts'
//   });
//   writeImageData(
//   {
//     url: 'https://thumbs.dreamstime.com/b/festive-scene-colorful-balloons-yellow-red-blue-falling-gold-confetti-perfect-party-birthday-celebration-391414195.jpg',
//     owner: 'https://www.dreamstime.com/',
//     info: 'ballons'
//   });
//   writeImageData(
//   {
//     url: 'https://thumbs.dreamstime.com/b/vibrant-image-birthday-party-celebration-colorful-balloons-confetti-presents-perfect-childrens-stores-event-323978200.jpg',
//     owner: 'https://www.dreamstime.com/',
//     info: 'gifts'
//   });

//   writeImageData({
//     url: 'https://static.vecteezy.com/system/resources/previews/070/850/386/large_2x/happy-birthday-celebration-with-balloons-and-confetti-on-a-blue-background-photo.jpeg',
//     owner: 'https://www.vecteezy.com/',
//     info: 'birthday'
//   });


