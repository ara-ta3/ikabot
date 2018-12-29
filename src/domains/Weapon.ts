interface Weapon {
    name: string;
    category: WeaponCategory;
    sub: SubWeapon;
    special: Special;
}

enum SubWeapon {
    QuickBomb
}

enum Special {
    Chakuchi
}

enum WeaponCategory {
    Blaster,
    Brella,
    Brush,
    Charger,
    Maneuver,
    Reelgun,
    Roller,
    Shooter,
    Slosher,
    Splatling
}