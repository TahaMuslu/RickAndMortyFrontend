import axios from "axios";

class HttpService {
  constructor() {

    this.BASE_URL = "https://rickandmortyapi.com/api/";

    this.httpService = axios.create({
      baseURL: this.BASE_URL,
      headers: {
        "Content-Type": "application/json",
      },
    });

  }

  get(url) {
    return this.httpService.get(url);
  }

  post(url, data) {
    return this.httpService.post(url, data);
  }

  put(url, data) {
    return this.httpService.put(url, data);
  }

  delete(url) {
    return this.httpService.delete(url);
  }
}

export default new HttpService();
