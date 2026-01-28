 import { UtenteDto } from "./utente-dto";
 import { Codice } from "./codice";

 export interface RuoloDto {
    id?: number;
    codice: Codice;
    descrizione: string;
    utenti?: UtenteDto[];
 }