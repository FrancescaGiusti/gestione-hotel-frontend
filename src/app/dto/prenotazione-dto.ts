 import { CameraDto } from "./camera-dto";
 import { UtenteDto } from "./utente-dto";

 export interface PrenotazioneDto {
    id?: number;
    utente: UtenteDto;
    camera?: CameraDto;
    dataDiPrenotazione: string;
    dataInizioSoggiorno: string;
    dataFineSoggiorno: string;
    annullata?: string;
 }