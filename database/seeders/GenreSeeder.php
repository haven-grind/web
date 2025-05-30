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
            "City Builder / Tycoon",
            "Singleplayer",
            "Multiplayer",
            "Co-op",
            "Local Co-op",
            "Online PvP",
            "Story Rich",
            "Narrative-Driven",
            "Character Customization",
            "Exploration",
            "Crafting",
            "Loot",
            "Replayability",
            "Choices Matter",
            "Open World",
            "Pixel Art",
            "2D",
            "3D",
            "Top-Down",
            "First-Person",
            "Third-Person",
            "Turn-Based",
            "Real-Time",
            "Fast-Paced",
            "Casual",
            "Hardcore",
            "Controller Support",
            "Retro",
            "Anime",
            "Fantasy",
            "Sci-Fi"
        ];

        foreach ($genres as $genre) {
            Genre::create(['name' => $genre]);
        }
    }
}
