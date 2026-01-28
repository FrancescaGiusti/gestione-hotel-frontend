import { TipoCamera } from "./tipo-camera";
import { HotelDto } from "./hotel-dto";
import { PrenotazioneDto } from "./prenotazione-dto";

export interface CameraDto {
    id?: number;
    numeroCamera: number;
    tipoCamera: TipoCamera;
    maxOcppupanti: number;
    prezzoPerNotte: number;
    hotel?: HotelDto;
    prenotazioni?: PrenotazioneDto[];
}