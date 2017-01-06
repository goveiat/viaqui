export default class Utils{

    static format(params){
      let query = "";
      for (key in params) {
          query += encodeURIComponent(key)+"="+encodeURIComponent(params[key])+"&";
      }
      return query;
    }


    static post(uri, data){
      return fetch(uri, {
        method: 'post',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
          'Accept': 'application/json, application/xml, text/plain, text/html, *.*',
        },
        body: Utils.format(data)
      })
      .then((response) => response.json());
    }

    static get(uri, data){
      if(typeof data !== 'undefined'){
        uri = uri+'?'+Utils.format(data);
      }

      return fetch(uri).then((response) => response.json());
    }

}