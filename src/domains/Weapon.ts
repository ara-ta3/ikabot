export function JapaneseToEnglish(j: string): string {
    const e = javaneseToEnglish.get(j);
    if (e === undefined) {
        return 'Unknown';
    }
    return e;
}

const javaneseToEnglish: Map<string, string> = new Map([
    ['シューター', 'Shooters'],
    ['ブラスター', 'Blasters'],
    ['リールガン', 'Nozzlenose'],
    ['マニューバー', 'Dualies'],
    ['ローラー', 'Rollers'],
    ['フデ', 'Brushes'],
    ['チャージャー', 'Chargers'],
    ['スロッシャー', 'Sloshers'],
    ['スピナー', 'Splatlings'],
    ['シェルター', 'Brellas'],
]);

export enum Type {
    Shooters = 'Shooters',
    Blasters = 'Blasters',
    Nozzlenose = 'Nozzlenose',
    Dualies = 'Dualies',
    Rollers = 'Rollers',
    Brushes = 'Brushes',
    Chargers = 'Chargers',
    Sloshers = 'Sloshers',
    Splatlings = 'Splatlings',
    Brellas = 'Brellas',
    Unknown = 'Unknown',
}

export enum Category {
    Shooters = 'Shooters',
    Rollers = 'Rollers',
    Chargers = 'Chargers',
    Sloshers = 'Sloshers',
    Splatlings = 'Splatlings',
    Brellas = 'Brellas',
    Unknown = 'Unknown',
}

export interface Weapon {
    name: string;
    type: Type;
    category: Category;
}
