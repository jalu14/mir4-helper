export interface IItem {
    name: string;
    img: string;
    rarity: 'common' | 'uncommon' | 'rare' | 'epic' | 'legendary';
    type: 'crafting' | 'equipment';
}