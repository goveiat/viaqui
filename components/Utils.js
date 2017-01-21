export default class Utils{

    static formatparams(params){
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
        body: Utils.formatparams(data)
      })
      .then((response) =>
          response.json()
          .catch((err)=>500)
      );
    }

    static get(uri, data){
      if(typeof data !== 'undefined'){
        uri = uri+'?'+Utils.formatparams(data);
      }

      return fetch(uri).then((response) => response.json());
    }

    static formatDate(date){
      let year = date.getFullYear();
      let month = date.getMonth() + 1;
      let day = date.getDate();
      let hours = date.getHours();
      let minutes = date.getMinutes();
      let seconds = date.getSeconds();

      return year + "-" + month + "-" + day + " " + hours + ":" + minutes + ":" + seconds;
    }

    static fileName(url){
      return url.substring(url.lastIndexOf('/')+1);
    }

}