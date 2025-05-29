<?php

namespace Database\Seeders;

use App\Models\GameDetail;
use App\Models\Screenshot;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ScreenshotSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Screenshot::factory()->count(50)
            ->recycle(GameDetail::all())
            ->create();
    }
}
