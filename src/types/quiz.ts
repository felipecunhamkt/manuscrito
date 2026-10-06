export interface QuizAnswers {
  birthMonth?: string;
  birthDay?: number | string;
  birthDecade?: number;
  birthYear?: number;
  userName?: string;
  prayerTopic?: string;
  prayerDuration?: string;
  prayerFeeling?: string;
}

export type QuizStep =
  | 'landing'
  | 'birth-month'
  | 'birth-day'
  | 'birth-decade'
  | 'birth-year'
  | 'user-name'
  | 'prayer-topic'
  | 'prayer-duration'
  | 'prayer-feeling'
  | 'frequency-bridge'
  | 'calculating'
  | 'result'
  | 'vsl';
