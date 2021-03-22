export type Device = {
    _id: string;
    name: string;
    protocol: Protocols;
    owner: string;
    is_running: boolean;
    interval: string;
    mqtt_host?: string;
    mqtt_username?: string;
    mqtt_password?: string;
    mqtt_topic?: string;
    data: object[] | object;
    http_host?: string;
    http_method?: HttpMethods;
    http_auth_token?: string;
}