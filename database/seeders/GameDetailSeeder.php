<?php

namespace Database\Seeders;

use App\Models\Game;
use App\Models\GameDetail;
use App\Models\Genre;
use App\Models\Tag;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class GameDetailSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $genres = Genre::all();
        $tags = Tag::all();

        GameDetail::factory()->count(10)
            ->recycle(Game::all())
            ->create()
            ->each(function (GameDetail $gameDetail) use ($genres, $tags) {
                $gameDetail->genres()->attach(
                    $genres->random(rand(1, 3))->pluck('id')->toArray()
                );
                $gameDetail->tags()->attach(
                    $tags->random(rand(1, 5))->pluck('id')->toArray()
                );
            });
    }
}
