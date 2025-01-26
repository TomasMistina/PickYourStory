export interface Item{
    id: string;
    value: string;
}

export interface DrawnItem extends Item{
    isDone: boolean;
}

export enum HatType {
  characters = "POSTAVY",
  magical_items = "MAGICKÉ PREDMETY",
  phrases = "VÝROKY"
}


export type HatThemeMode = "edit_mode" | "showcase_mode" | "draw_words_mode";

export interface HatThemePreview{
  _id: string;
  title: string;
}

export interface DrawnWordsPreview{
  _id: string;
  originHatTitle: string;
}