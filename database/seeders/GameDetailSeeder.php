<?php

namespace Database\Seeders;

use App\Models\Game;
use App\Models\GameDetail;
use App\Models\Genre;
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

        GameDetail::factory()->count(10)
            ->recycle(Game::all())
            ->create()
            ->each(function (GameDetail $gameDetail) use ($genres) {
                $gameDetail->genres()->attach(
                    $genres->random(rand(1, 3))->pluck('id')->toArray()
                );
            });
    }
}
