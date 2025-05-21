<?php

namespace Database\Seeders;

use App\Models\Tag;
use Illuminate\Database\Seeder;

class TagSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $tags = [
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

        foreach ($tags as $tag) {
            Tag::create(['name' => $tag]);
        }
    }
}
