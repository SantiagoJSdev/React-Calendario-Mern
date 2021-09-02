
const baseUrl = process.env.REACT_APP_API_URL;

//el endpoint al que va dirigido, la data que se envia, y el metodo q se utiliza 
export const fetchSinToken = (endpoint, data, method = 'GET') => {

    const url =`${baseUrl}/${endpoint}`;
//en caso q el method sea get va directo y si es alguno otro lo especificamos x el sino
    if (method === 'GET') {
        return fetch(url)
    } else {
        return fetch(url, {
            method,
            headers: {
                //es de este tipo estamos trabajando con mongodb 
                'content-type': 'application/json'
            },
            body: JSON.stringify(data)//la data hay q convertirla a formato json
        })
    }
}

export const fetchConnToken = (endpoint, data, method = 'GET') => {

    const url =`${baseUrl}/${endpoint}`;
    const token = localStorage.getItem('token') || '';
//en caso q el method sea get va directo y si es alguno otro lo especificamos x el sino
    if (method === 'GET') {
        return fetch(url, {
            method,
            headers: {
                'x-token': token
            }
        })
    } else {
        return fetch(url, {
            method,
            headers: {
                //es de este tipo estamos trabajando con mongodb 
                'content-type': 'application/json',
                'x-token': token
            },
            body: JSON.stringify(data)//la data hay q convertirla a formato json
        })
    }
}