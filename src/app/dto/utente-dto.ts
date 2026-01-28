import { PrenotazioneDto } from "./prenotazione-dto";
import { RuoloDto } from "./ruolo-dto";


export interface UtenteDto {
    id?: number;
    username: string;
    password: string;
    nome: string;
    cognome: string;
    codiceFiscale: string;
    creditoDisponibile?: number;
    prenotazioni?: PrenotazioneDto[];
    ruoli?: RuoloDto[];
}