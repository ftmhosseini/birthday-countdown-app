import { db_firebase } from '../utilities/firebase_db.js';

export default class ImageModel {
    static getImages = async () => {       
        const images = await db_firebase.ref('images').once('value');

        const res =  images.exists() ? Object.values(images.val()) : [];
        
        return res;
    }
    static getImageBirth = async () => {
        const images = await db_firebase.ref('images').once('value');
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


