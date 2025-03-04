export interface Item{
    id: string;
    value: string;
}

export interface DrawnItem extends Item{
    isDone: boolean;
}

export enum HatType {
  characters = "POSTAVY",
  magical_items = "PREDMETY",
  phrases = "VÝROKY"
}


export type HatThemeMode = "edit_mode" | "showcase_mode" | "draw_words_mode";

export interface HatThemePreview{
  _id: string;
  title: string;
}

export interface DrawnWordsPreview{
  _id: string;
  originHatTheme: OriginHatThemePreview;
}

export interface OriginHatThemePreview{
  title: string;
}

export interface GroupPreview{
  _id: string;
  groupName: string;
}

export interface LessonPreview{
  _id: string;
  lessonName: string;
}

export interface LessonHatThemePreview{
  _id: string;
  hatTheme: OriginHatThemePreview;
  description: string;
}
