import axios, {AxiosInstance} from "axios";

export type Artist = {
    id: number;
    name: string;
    photo: string;
}


class AfroviceApi {
    private http: AxiosInstance;

    constructor() {
        this.http = axios.create({
            baseURL: import.meta.env.VITE_AFRO_VICE_API_URL,
        })
    }

    async getArtists(): Promise<Array<Artist>> {
        const response = await this.http.get<Array<Artist>>('/artists');

        return response.data;
    }
}

export default new AfroviceApi();