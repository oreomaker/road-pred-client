export interface UserInfo {
    phone: string;
    name: string;
    identity_number: string;
    address: string;
    client_level: number;
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