import cloudinary from "cloudinary";
import axios from "axios";


import uploadImage from "@/helpers/uploadImage";
import cloudinaryApi from '@/api/cloudinaryApi';

// Configura el mock para cloudinaryApi
// jest.mock('@/api/cloudinaryApi');
cloudinary.config({
    cloud_name: 'davmlwt1l',
    api_key: '429539241893455',
    api_secret: 'kaYaNfAvfU_9bwOk_V3nDIkWgHg'
})

describe('Test uploadImage', () => {
    it('Test upload image response correct data with real data', async() => {
        const { data } = await axios.get('https://res.cloudinary.com/davmlwt1l/image/upload/v1692643367/tigerrr_ifayyy.jpg', {
            responseType: 'arraybuffer'
        })
        const file = new File([data], 'foto.jpg')
        const url = await uploadImage(file)
        expect( typeof url ).toBe('string')

        // Tomar el ID
        const segments = url.split('/')
        const imageId = segments[ segments.length - 1 ].replace('.jpg','')
        
        await cloudinary.v2.api.delete_resources( `curso-vue/${imageId}`, {}, () => {} )
    });


    /* it('Test upload image response correct data with MOCK of API', async() => {
        const cloudinaryApiMock = jest.spyOn(cloudinaryApi, 'post');  // spy on post
        cloudinaryApiMock.mockImplementation(() => ({data: {secure_url: "https://cloudinary.com/my_image123.jpg"}}));  // replace implementation
        
        const { data } = await axios.get('https://res.cloudinary.com/davmlwt1l/image/upload/v1692534928/curso-vue/yq8cwanwyevtnqjbgjta.jpg', {
            responseType: 'arraybuffer'
        })
        const file = new File([data], 'foto.jpg')
        const url = await uploadImage(file)
        expect( url ).toBe('https://cloudinary.com/my_image123.jpg')
    }); */

});