class ApiService {
  public async getJSON(url: string): Promise<any> {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return await fetch(url).then((res) => res.json());
  }

  public async getText(url: string): Promise<string> {
    return await fetch(url).then((res) => {
      if (res.status === 200) {
        return res.text();
      } else {
        return 'Data is not available';
      }
    });
  }

  public async getResponseStatus(url: string): Promise<number> {
    return await fetch(url).then((res) => res.status);
  }
}

const api: ApiService = new ApiService();
export default api;
