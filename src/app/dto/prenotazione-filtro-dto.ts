export interface PrenotazioneFiltroDto {
    idUtente?: number;
    idCamera?: number;
    dataDa?: string;
    dataA?: string;
    annullata?: boolean;
}