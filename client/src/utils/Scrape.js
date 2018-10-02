import axios from 'axios';

const news = (topic,syear,eyear) => {
    return axios.get('https://api.nytimes.com/svc/search/v2/articlesearch.json',{
        params: {
            'api-key' : '4d749f584f764079b64a8b60e62e976a',
            q: topic,
            begin_date: ""+syear+"0101",
            end_date: ""+eyear+"1231"
        }
    })
};

export default news;