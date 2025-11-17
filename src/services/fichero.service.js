import axios from 'axios';

const Global = {
  url: "https://apipostfiles.azurewebsites.net/"
};

class ServiceFile {
  createFile(file) {
    return new Promise(function (resolve) {
      let fullurl = Global.url + "api/TestingFiles";
      axios.post(fullurl, file).then((response) => {
        console.log(response);
        resolve(response);
      });
    });
  }
}

export default ServiceFile;