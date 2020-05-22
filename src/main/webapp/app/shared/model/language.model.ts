export interface ILanguage {
  id?: number;
  isoLanguageCode?: string;
  name?: string;
}

export class Language implements ILanguage {
  constructor(public id?: number, public isoLanguageCode?: string, public name?: string) {}
}
