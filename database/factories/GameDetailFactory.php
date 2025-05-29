<?php

namespace Database\Factories;

use App\Models\Game;
use App\Models\Screenshot;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\GameDetail>
 */
class GameDetailFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'game_id' => Game::factory(),
            'thumbnail' => fake()->imageUrl(640, 480, 'games', true)
        ];
    }
}
