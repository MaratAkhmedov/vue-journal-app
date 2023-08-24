import axios from "axios";

//console.log(process.env.NODE_ENV);

export default axios.create({
    baseURL: 'https://vue-demos-3012b-default-rtdb.europe-west1.firebasedatabase.app'
})

