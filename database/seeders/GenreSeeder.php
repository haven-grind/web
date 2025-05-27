<?php

namespace Database\Seeders;

use App\Models\Genre;
use Illuminate\Database\Seeder;

class GenreSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $genres = [
            "Action",
            "Adventure",
            "Role-Playing Game (RPG)",
            "Shooter (FPS / TPS)",
            "Platformer",
            "Puzzle",
            "Fighting",
            "Racing",
            "Simulation",
            "Strategy (RTS / TBS)",
            "Survival",
            "Horror",
            "Stealth",
            "Sandbox / Open World",
            "Metroidvania",
            "Roguelike / Roguelite",
            "Visual Novel",
            "Point-and-Click",
            "Rhythm / Music",
            "Party",
            "MMORPG",
            "Idle / Incremental",
            "Tower Defense",
            "Card Game / Deckbuilder",
            "Battle Royale",
            "MOBA",
            "Sports",
            "Farming / Life Simulation",
            "Dating Sim",
            "City Builder / Tycoon"
        ];

        foreach ($genres as $genre) {
            Genre::create(['name' => $genre]);
        }
    }
}
