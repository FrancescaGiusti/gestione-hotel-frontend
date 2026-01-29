import { CameraRef } from "./camera-ref";
import { UtenteRef } from "./utente-ref";

 export interface PrenotazioneDto {
    id?: number;
    utente?: UtenteRef;
    camera?: CameraRef;
    dataDiPrenotazione?: string;
    dataInizioSoggiorno: string;
    dataFineSoggiorno: string;
    annullata?: boolean;
 }