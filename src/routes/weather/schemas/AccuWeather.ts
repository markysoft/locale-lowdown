export interface AccuWeatherWeek {
  Headline: Headline
  DailyForecasts: AccuWeather[]
}

export interface Headline {
  EffectiveEpochDate: number
  EndEpochDate: number
  Severity: number
  Text: string
  Category: number
}

export interface AccuWeather {
  EpochDate: number
  Sun: SunRiseSet
  Moon: MoonRiseSet
  Temperature: Range
  Day: Day
}

export interface SunRiseSet {
  EpochRise: number
  EpochSet: number
}

export interface MoonRiseSet {
  EpochRise: number
  EpochSet: number
  Phase: string
  Age: number
}

export interface Range {
  Minimum: UnitValue
  Maximum: UnitValue
}

export interface Day {
  Icon: number
  IconPhrase: string
  Wind: Wind
  WindGust: Wind
  LongPhrase: string
  ShortPhrase: string
  CloudCover: number
  RelativeHumidity: Range
  RainProbability: number
}

export interface Wind {
  Speed: UnitValue
  Direction: DirectionValue
}

export interface UnitValue {
  Value: number
  Unit: string
  UnitType: number
}

export interface DirectionValue {
  Degrees: number
}

export interface FeelsLike {
  day: number
  night: number
  eve: number
  morn: number
}

