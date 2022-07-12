export interface UserInfo {
    id: number;
    username: string;
    first_name: string;
    last_name: string;
    email: string;
    is_staff: boolean;
    date_joined: string;
    last_login: string;
}

export interface PredHistory {
    id: number;
    request_time: string;
    latitude: number;
    longitude: number;
    temperature: number;
    humidity: number;
    visibility: number;
    weather: number;
    dawn_dusk: number;
    severity: number;
}