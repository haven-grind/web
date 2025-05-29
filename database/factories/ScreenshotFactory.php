<?php

namespace Database\Factories;

use App\Models\GameDetail;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Screenshot>
 */
class ScreenshotFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'game_detail_id' => GameDetail::factory(),
            'image_url' => fake()->imageUrl(640, 480, 'games', true),
        ];
    }
}
