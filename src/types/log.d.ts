export type Log = {
    _id: string;
    text: string; 
    time_stamp?: Date;
    severity: string;
    user: string;
    device: string;
}