import { CameraDto } from "./camera-dto";

export interface HotelDto {
    id?: number;
    citta: string;
    indirizzo: string;
    civico?: number;
    nome: string;
    camere?: CameraDto[]; 
}