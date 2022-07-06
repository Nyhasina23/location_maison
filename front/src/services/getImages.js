import axios from 'axios';
class getImage {
    static get = async (id) => {
        let result;
        await axios.get(process.env.VUE_APP_URL + '/global/image/' + id)
            .then((res) => {
                if(res.data === ''){
                    result = ''
                    
                }else{
                    result = res.data.replace('public/','')
                    result = process.env.VUE_APP_URL+"/"+result;
                }
            }).catch((err) => {
                console.log(err);
                result = "";
            })

        return result;
    }
    static blur = async (id) => {
        let result;
        await axios.get(process.env.VUE_APP_URL + '/global/image/' + id)
            .then((res) => {
                result = res;
            }).catch((err) => {
                console.log(err);
                result = "ok"
            })
        return process.env.VUE_APP_URL+'/blur/'+result.data;
    }
}
export default getImage;
