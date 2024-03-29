interface Pseudo {
    weaponName: string;
    gearPoint: number;
    damage: number;
}

const PrimeShooterPseudo: Array<Pseudo> = [
    {
        weaponName: 'プライムシューター',
        gearPoint: 3.3,
        damage: 49.8,
    },
    {
        weaponName: 'プライムシューター',
        gearPoint: 2.7,
        damage: 49.8,
    },

    {
        weaponName: 'プライムシューター',
        gearPoint: 3.4,
        damage: 49.9,
    },
    {
        weaponName: 'プライムシューター',
        gearPoint: 2.8,
        damage: 49.9,
    },
];

const H3NozzlenosePseudo: Array<Pseudo> = [
    {
        weaponName: 'H3リールガン',
        gearPoint: 3.3,
        damage: 49.6,
    },
    {
        weaponName: 'H3リールガン',
        gearPoint: 2.7,
        damage: 49.8,
    },
    {
        weaponName: 'H3リールガン',
        gearPoint: 3.4,
        damage: 49.9,
    },
    {
        weaponName: 'H3リールガン',
        gearPoint: 2.8,
        damage: 49.9,
    },
];

const L3NozzlenosePseudo: Array<Pseudo> = [
    {
        weaponName: 'L3リールガン',
        gearPoint: 1.5,
        damage: 33.3,
    },
    {
        weaponName: 'L3リールガン',
        gearPoint: 0.8,
        damage: 33.3,
    },
    {
        weaponName: 'L3リールガン',
        gearPoint: 2.2,
        damage: 33.3,
    },
];

const SplatDualiesPseudo: Array<Pseudo> = [
    {
        weaponName: 'スプラマニューバー',
        gearPoint: 1.7,
        damage: 33.2,
    },
    {
        weaponName: 'スプラマニューバー',
        gearPoint: 1.8,
        damage: 33.3,
    },
    {
        weaponName: 'スプラマニューバー',
        gearPoint: 2.4,
        damage: 33.3,
    },
    {
        weaponName: 'スプラマニューバー',
        gearPoint: 3.1,
        damage: 33.3,
    },
];

const DualSquelcherPseudo: Array<Pseudo> = [
    {
        weaponName: 'デュアルスイーパー',
        gearPoint: 2.8,
        damage: 33.2,
    },
    {
        weaponName: 'デュアルスイーパー',
        gearPoint: 3.5,
        damage: 33.2,
    },
    {
        weaponName: 'デュアルスイーパー',
        gearPoint: 2.9,
        damage: 33.3,
    },
    {
        weaponName: 'デュアルスイーパー',
        gearPoint: 3.6,
        damage: 33.3,
    },
];
const TetraDualiesPseudo: Array<Pseudo> = [
    {
        weaponName: 'クアッドホッパー',
        gearPoint: 2.8,
        damage: 33.2,
    },
    {
        weaponName: 'クアッドホッパー',
        gearPoint: 3.5,
        damage: 33.2,
    },
    {
        weaponName: 'クアッドホッパー',
        gearPoint: 2.9,
        damage: 33.3,
    },
    {
        weaponName: 'クアッドホッパー',
        gearPoint: 3.6,
        damage: 33.3,
    },
];

const BamboozlerPseudo: Array<Pseudo> = [
    {
        weaponName: '竹',
        gearPoint: 2.8,
        damage: 99.9,
    },
    {
        weaponName: '竹',
        gearPoint: 3.5,
        damage: 99.9,
    },
];

const SplashOMaticPseudo: Array<Pseudo> = [
    {
        weaponName: 'シャープマーカー',
        gearPoint: 1.7,
        damage: 33.3,
    },
    {
        weaponName: 'シャープマーカー',
        gearPoint: 2.4,
        damage: 33.3,
    },
    {
        weaponName: 'シャープマーカー',
        gearPoint: 3.1,
        damage: 33.3,
    },
];

const HydraSplatling: Array<Pseudo> = [
    {
        weaponName: 'ハイドラント',
        gearPoint: 0.5,
        damage: 33.3,
    },
    {
        weaponName: 'ハイドラント',
        gearPoint: 1.2,
        damage: 33.3,
    },
    {
        weaponName: 'ハイドラント',
        gearPoint: 1.1,
        damage: 33.2,
    },
];

export const Pseudo: Array<Pseudo> = []
    .concat(SplashOMaticPseudo)
    .concat(PrimeShooterPseudo)
    .concat(SplatDualiesPseudo)
    .concat(DualSquelcherPseudo)
    .concat(TetraDualiesPseudo)
    .concat(L3NozzlenosePseudo)
    .concat(H3NozzlenosePseudo)
    .concat(BamboozlerPseudo)
    .concat(HydraSplatling);
