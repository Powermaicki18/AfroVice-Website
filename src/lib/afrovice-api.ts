import axios, {AxiosInstance} from "axios";

export type Artist = {
    id: number;
    name: string;
    photo: string;
}

export type NewArtist = Omit<Artist, 'id'>;

export type Event = {
    id: number;
    name: string;
    logo: string;
    price: number;
}

export type NewEvent = Omit<Event, 'id'>;

export type User = {
    id: number;
    name: string;
    email: string;
    photo: string;
    role_id: number;
}

export type NewUser = Omit<User, 'id'>;

export type Gender = {
    id: number;
    name: string;
}

export type NewGender= Omit<Gender, 'id'>;

export type Presentation = {
    id: number;
    event_id: number;
    flyer: string;
    date_start: Date;
    date_end: Date;
}

export type NewPresentation= Omit<Presentation, 'id'>;

export type Ticket = {
    id: number;
    user_id: number;
    presentation_id: number;
}

export type NewTicket= Omit<Ticket, 'id'>;

export type Comment = {
    id: number;
    message: string;
    presentation: Presentation;
    user: User;
    created_at: string;
}

export type NewComment = Pick<Comment, 'message'> & {
    user_id: User['id'];
    presentation_id: Presentation['id'];
};

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

    async createArtist(artist: NewArtist): Promise<Artist> {
        const response = await this.http.post<Artist>('/artists', artist);

        return response.data;
    }

    async getArtist(artistId: Artist['id']): Promise<Artist> {
        const response = await this.http.get<Artist>(`/artists/${artistId}`);

        return response.data;
    }

    async getEvents(): Promise<Array<Event>> {
        const response = await this.http.get<Array<Event>>('/events');

        return response.data;
    }

    async createEvent(event: NewEvent): Promise<Event> {
        const response = await this.http.post<Event>('/events', event);

        return response.data;
    }

    async getEvent(eventId: Event['id']): Promise<Event> {
        const response = await this.http.get<Event>(`/events/${eventId}`);

        return response.data;
    }

    async getUsers(): Promise<Array<User>> {
        const response = await this.http.get<Array<User>>('/users');

        return response.data;
    }

    async getUser(userId: User['id']): Promise<User> {
        const response = await this.http.get<User>(`/users/${userId}`);

        return response.data;
    }

    async createUser(user: NewUser): Promise<User> {
        const response = await this.http.post<User>('/users', user);

        return response.data;
    }

    async getGenders(): Promise<Array<Gender>> {
        const response = await this.http.get<Array<Gender>>('/genders');

        return response.data;
    }

    async createGender(gender: NewGender): Promise<Gender> {
        const response = await this.http.post<User>('/genders', gender);

        return response.data;
    }

    async getPresentations(): Promise<Array<Presentation>> {
        const response = await this.http.get<Array<Presentation>>('/presentations');

        return response.data;
    }

    async createPresentation(presentation: NewPresentation): Promise<Presentation> {
        const response = await this.http.post<Presentation>('/presentations', presentation);

        return response.data;
    }

    async getPresentation(presentationId: Presentation['id']): Promise<Presentation> {
        const response = await this.http.get<Presentation>(`/presentations/${presentationId}`);

        return response.data;
    }

    async getTickets(): Promise<Array<Ticket>> {
        const response = await this.http.get<Array<Ticket>>('/tickets');

        return response.data;
    }

    async creatTicket(ticket: NewTicket): Promise<Ticket> {
        const response = await this.http.post<Ticket>('/tickets', ticket);

        return response.data;
    }

    async getComments(): Promise<Array<Comment>> {
        const response = await this.http.get<Array<Comment>>('/comments');

        return response.data;
    }

    async createComment(comment: NewComment): Promise<Comment> {
        const response = await this.http.post<Comment>('/comments', comment);

        return response.data;
    }
}

export default new AfroviceApi();